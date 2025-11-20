
import React from 'react';

interface CodeEditorPanelProps {
  code: string;
  setCode: (code: string) => void;
  onRun: () => void;
  onSubmit: () => void;
  onGetHint: () => void;
  isLoading: boolean;
  isHintLoading: boolean;
}

const ActionButton: React.FC<{ onClick: () => void; disabled: boolean; children: React.ReactNode; className?: string; }> = ({ onClick, disabled, children, className }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
        {children}
    </button>
);


export const CodeEditorPanel: React.FC<CodeEditorPanelProps> = ({ code, setCode, onRun, onSubmit, onGetHint, isLoading, isHintLoading }) => {
  return (
    <div className="h-full flex flex-col bg-gray-800">
      <div className="flex-1 p-2">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-full bg-gray-900 text-gray-200 p-4 rounded-md resize-none font-mono text-sm border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Write your code here..."
          spellCheck="false"
        />
      </div>
      <div className="flex items-center justify-end space-x-4 p-3 bg-gray-800 border-t border-gray-700">
        <ActionButton onClick={onGetHint} disabled={isLoading || isHintLoading} className="bg-yellow-600 hover:bg-yellow-700 text-white focus:ring-yellow-500">
            {isHintLoading ? 'Getting Hint...' : 'Get Hint'}
        </ActionButton>
        <ActionButton onClick={onRun} disabled={isLoading} className="bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500">
            {isLoading ? 'Running...' : 'Run Code'}
        </ActionButton>
        <ActionButton onClick={onSubmit} disabled={isLoading} className="bg-green-600 hover:bg-green-700 text-white focus:ring-green-500">
            {isLoading ? 'Submitting...' : 'Submit'}
        </ActionButton>
      </div>
    </div>
  );
};
