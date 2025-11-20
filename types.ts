
export interface TestCase {
  input: any[];
  expected: any;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  examples: TestCase[];
  testCases: TestCase[]; // Hidden test cases for submission
  starterCode: string;
}

export interface TestResult {
  testCase: TestCase;
  passed: boolean;
  actual: any;
}

export enum ExecutionStatus {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  FINISHED = 'FINISHED',
}
