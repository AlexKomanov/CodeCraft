
import React from 'react';
import type { Problem, TestCase } from '../types';

interface ProblemPanelProps {
  problem: Problem;
}

const DifficultyChip: React.FC<{ difficulty: Problem['difficulty'] }> = ({ difficulty }) => {
    const colorClasses = {
        Easy: 'bg-green-600/20 text-green-400',
        Medium: 'bg-yellow-600/20 text-yellow-400',
        Hard: 'bg-red-600/20 text-red-400',
    };
    return (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${colorClasses[difficulty]}`}>
            {difficulty}
        </span>
    );
};

const TestCaseDisplay: React.FC<{ testCase: TestCase; index: number }> = ({ testCase, index }) => (
    <div className="mt-4">
        <p className="font-semibold text-gray-300">Example {index + 1}:</p>
        <div className="bg-gray-800 rounded-md p-3 mt-2 text-sm">
            <p><strong className="text-gray-400">Input:</strong> <code className="text-cyan-300">{JSON.stringify(testCase.input)}</code></p>
            <p><strong className="text-gray-400">Output:</strong> <code className="text-cyan-300">{JSON.stringify(testCase.expected)}</code></p>
        </div>
    </div>
);

export const ProblemPanel: React.FC<ProblemPanelProps> = ({ problem }) => {
  return (
    <div className="text-gray-300 prose prose-invert prose-sm max-w-none prose-p:text-gray-300 prose-code:text-cyan-300 prose-code:bg-gray-700/50 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-strong:text-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white !mb-0">{problem.title}</h2>
        <DifficultyChip difficulty={problem.difficulty} />
      </div>

      <div dangerouslySetInnerHTML={{ __html: problem.description }} />
      
      {problem.examples.map((example, index) => (
        <TestCaseDisplay key={index} testCase={example} index={index} />
      ))}
    </div>
  );
};
