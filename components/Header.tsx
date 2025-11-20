
import React from 'react';
import type { Problem } from '../types';

interface HeaderProps {
  problems: Problem[];
  activeProblemId: string;
  onProblemChange: (problemId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ problems, activeProblemId, onProblemChange }) => {
  return (
    <header className="flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700 shadow-md">
      <div className="flex items-center space-x-4">
        <h1 
          className="text-2xl font-bold text-cyan-400 cursor-pointer hover:text-cyan-300 transition-colors select-none"
          onClick={() => problems.length > 0 && onProblemChange(problems[0].id)}
          role="button"
          aria-label="Return to home"
        >
          CodeCraft
        </h1>
        <div className="relative">
          <select
            value={activeProblemId}
            onChange={(e) => onProblemChange(e.target.value)}
            className="bg-gray-700 text-white rounded-md px-3 py-1.5 appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
          >
            {problems.map((problem) => (
              <option key={problem.id} value={problem.id}>
                {problem.title}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
             <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>
      <div>
        {/* Placeholder for future elements like user profile */}
      </div>
    </header>
  );
};
