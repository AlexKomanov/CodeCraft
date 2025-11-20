
import type { TestCase, TestResult } from '../types';

// A helper for deep equality check
function deepEqual(obj1: any, obj2: any): boolean {
  try {
    // Quick check for primitive types and null
    if (obj1 === obj2) return true;
    if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
      return false;
    }

    // A more robust check might be needed for complex cases (e.g., Maps, Sets, functions)
    // For this app, JSON stringify is a good enough approximation.
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  } catch (e) {
    return false;
  }
}

export const runCode = async (code: string, testCases: TestCase[]): Promise<TestResult[]> => {
  return new Promise((resolve) => {
    const results: TestResult[] = [];
    
    // Extract function name from the starter code provided. Assumes 'const funcName = ...'
    const functionNameMatch = code.match(/const\s+(\w+)\s*=/);
    if (!functionNameMatch) {
        throw new Error("Could not determine the function name from your code. Please use the format 'const yourFunctionName = (...) => ...'.");
    }
    const functionName = functionNameMatch[1];

    // Append a call to the user's function within the code string.
    // This allows us to use the Function constructor to create an executable block.
    // The `_args_` will be replaced by the test case inputs.
    const executableCode = `
      ${code}
      return ${functionName}(..._args_);
    `;

    for (const testCase of testCases) {
      try {
        // Create a function with the user's code. 
        // The function takes one argument, `_args_`, which will be our array of inputs.
        const userFunction = new Function('_args_', executableCode);

        const actualOutput = userFunction(testCase.input);

        // For problems like "Reverse String" that modify input in-place and return undefined
        let finalOutput = actualOutput;
        if(actualOutput === undefined && testCase.input.length > 0){
             // If the function returns undefined, we assume it's an in-place modification problem
             // and the result is the modified first input argument.
             finalOutput = testCase.input[0];
        }

        const passed = deepEqual(finalOutput, testCase.expected);
        
        results.push({
          testCase,
          passed,
          actual: finalOutput,
        });

      } catch (error: any) {
        results.push({
          testCase,
          passed: false,
          actual: `Runtime Error: ${error.message}`,
        });
      }
    }
    resolve(results);
  });
};
