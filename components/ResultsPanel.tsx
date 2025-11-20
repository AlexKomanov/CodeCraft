
import React from 'react';
import type { TestResult } from '../types';
import { ExecutionStatus } from '../types';

interface ResultsPanelProps {
  status: ExecutionStatus;
  results: TestResult[];
  hint: string;
}


const ResultCard: React.FC<{ result: TestResult; index: number }> = ({ result, index }) => (
  <div className={`p-4 rounded-lg mb-3 ${result.passed ? 'bg-green-900/50' : 'bg-red-900/50'}`}>
    <div className="flex items-center justify-between">
      <h4 className="font-semibold text-gray-200">
        Test Case {index + 1}
      </h4>
      <span className={`px-3 py-1 text-xs font-bold rounded-full ${result.passed ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
        {result.passed ? 'Passed' : 'Failed'}
      </span>
    </div>
    {!result.passed && (
      <div className="mt-3 pt-3 border-t border-gray-700/50 text-sm">
        <p><strong className="text-gray-400">Input:</strong> <code className="text-cyan-300">{JSON.stringify(result.testCase.input)}</code></p>
        <p><strong className="text-gray-400">Expected:</strong> <code className="text-cyan-300">{JSON.stringify(result.testCase.expected)}</code></p>
        <p><strong className="text-gray-400">Got:</strong> <code className="text-red-400">{JSON.stringify(result.actual)}</code></p>
      </div>
    )}
  </div>
);

const HintDisplay: React.FC<{ hint: string }> = ({ hint }) => (
    <div className="p-4 rounded-lg bg-blue-900/50">
        <h3 className="font-semibold text-lg text-blue-300 mb-2">💡 Hint from AI Tutor</h3>
        <p className="text-gray-300 whitespace-pre-wrap">{hint}</p>
    </div>
);


export const ResultsPanel: React.FC<ResultsPanelProps> = ({ status, results, hint }) => {
  const allPassed = results.length > 0 && results.every(r => r.passed);

  return (
    <div className="p-4 bg-gray-800 h-full">
      {status === ExecutionStatus.IDLE && !hint && (
        <div className="flex items-center justify-center h-full text-gray-500">
          <p>Click 'Run Code' or 'Submit' to see the results.</p>
        </div>
      )}
      {status === ExecutionStatus.RUNNING && (
        <div className="flex items-center justify-center h-full text-gray-400">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p>Running tests...</p>
        </div>
      )}
       {status === ExecutionStatus.FINISHED && (
         <div>
            {hint && <HintDisplay hint={hint} />}
            {results.length > 0 && (
                <div className={hint ? 'mt-4' : ''}>
                    {allPassed && (
                        <div className="p-4 rounded-lg mb-3 bg-green-900/50 text-center">
                            <h3 className="text-2xl font-bold text-green-400">Congratulations!</h3>
                            <p className="text-gray-300">All tests passed successfully.</p>
                        </div>
                    )}
                    {results.map((result, index) => (
                        <ResultCard key={index} result={result} index={index} />
                    ))}
                </div>
            )}
         </div>
      )}
      {status === ExecutionStatus.IDLE && hint && <HintDisplay hint={hint} />}
    </div>
  );
};
