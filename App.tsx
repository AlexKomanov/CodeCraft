
import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { ProblemPanel } from './components/ProblemPanel';
import { CodeEditorPanel } from './components/CodeEditorPanel';
import { ResultsPanel } from './components/ResultsPanel';
import type { Problem, TestResult } from './types';
import { ExecutionStatus } from './types';
import { CODING_PROBLEMS } from './constants';
import { runCode } from './services/codeRunner';
import { getHint } from './services/geminiService';

const App: React.FC = () => {
  const [activeProblem, setActiveProblem] = useState<Problem>(CODING_PROBLEMS[0]);
  const [userCode, setUserCode] = useState<string>(activeProblem.starterCode);
  const [results, setResults] = useState<TestResult[]>([]);
  const [status, setStatus] = useState<ExecutionStatus>(ExecutionStatus.IDLE);
  const [hint, setHint] = useState<string>('');
  const [isHintLoading, setIsHintLoading] = useState<boolean>(false);

  const handleProblemChange = (problemId: string) => {
    const newProblem = CODING_PROBLEMS.find(p => p.id === problemId);
    if (newProblem) {
      setActiveProblem(newProblem);
      setUserCode(newProblem.starterCode);
      setResults([]);
      setStatus(ExecutionStatus.IDLE);
      setHint('');
    }
  };

  const handleRun = useCallback(async (isSubmission: boolean = false) => {
    setStatus(ExecutionStatus.RUNNING);
    setResults([]);
    setHint('');
    
    const testCasesToRun = isSubmission ? activeProblem.testCases : activeProblem.examples;

    try {
      const testResults = await runCode(userCode, testCasesToRun);
      setResults(testResults);
    } catch (error) {
      console.error("Code execution error:", error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during execution.';
      // Display a single result showing the runtime error
      setResults([{
        testCase: { input: [], expected: '' },
        passed: false,
        actual: `Runtime Error: ${errorMessage}`,
      }]);
    } finally {
      setStatus(ExecutionStatus.FINISHED);
    }
  }, [userCode, activeProblem]);

  const handleGetHint = useCallback(async () => {
    setIsHintLoading(true);
    setHint('');
    try {
      const generatedHint = await getHint(activeProblem, userCode);
      setHint(generatedHint);
    } catch (error) {
      console.error("Error getting hint:", error);
      setHint("Sorry, I couldn't fetch a hint right now. Please try again later.");
    } finally {
      setIsHintLoading(false);
    }
  }, [activeProblem, userCode]);
  
  // Debounce code changes to avoid excessive updates if we were to add live validation
  useEffect(() => {
    const handler = setTimeout(() => {
        // You could add logic here for auto-saving or live analysis in the future
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [userCode]);


  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-200 font-sans">
      <Header 
        problems={CODING_PROBLEMS} 
        activeProblemId={activeProblem.id} 
        onProblemChange={handleProblemChange} 
      />
      <main className="flex flex-1 overflow-hidden">
        <div className="w-1/3 overflow-y-auto p-4 border-r border-gray-700">
          <ProblemPanel problem={activeProblem} />
        </div>
        <div className="w-2/3 flex flex-col">
          <div className="flex-1">
            <CodeEditorPanel
              code={userCode}
              setCode={setUserCode}
              onRun={() => handleRun(false)}
              onSubmit={() => handleRun(true)}
              onGetHint={handleGetHint}
              isLoading={status === ExecutionStatus.RUNNING}
              isHintLoading={isHintLoading}
            />
          </div>
          <div className="h-1/3 border-t border-gray-700 overflow-y-auto">
            <ResultsPanel status={status} results={results} hint={hint} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
