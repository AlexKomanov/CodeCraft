
import type { Problem } from './types';

export const CODING_PROBLEMS: Problem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    description: `
<p class="mb-4">Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p>
<p class="mb-4">You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p>
<p>You can return the answer in any order.</p>
    `,
    examples: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { input: [[3, 2, 4], 6], expected: [1, 2] },
      { input: [[3, 3], 6], expected: [0, 1] },
    ],
    testCases: [
        { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
        { input: [[3, 2, 4], 6], expected: [1, 2] },
        { input: [[3, 3], 6], expected: [0, 1] },
        { input: [[-1, -2, -3, -4, -5], -8], expected: [2, 4] },
        { input: [[0, 4, 3, 0], 0], expected: [0, 3] },
    ],
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = (nums, target) => {
  // Your code here
};
`,
  },
  {
    id: 'is-palindrome',
    title: 'Palindrome Number',
    difficulty: 'Easy',
    description: `
<p class="mb-4">Given an integer <code>x</code>, return <code>true</code> if <code>x</code> is a palindrome, and <code>false</code> otherwise.</p>
<p class="mb-4">An integer is a palindrome when it reads the same backward as forward.</p>
    `,
    examples: [
      { input: [121], expected: true },
      { input: [-121], expected: false },
      { input: [10], expected: false },
    ],
    testCases: [
      { input: [121], expected: true },
      { input: [-121], expected: false },
      { input: [10], expected: false },
      { input: [12321], expected: true },
      { input: [0], expected: true },
      { input: [1], expected: true },
      { input: [11], expected: true },
    ],
    starterCode: `/**
 * @param {number} x
 * @return {boolean}
 */
const isPalindrome = (x) => {
  // Your code here
};
`,
  },
    {
    id: 'reverse-string',
    title: 'Reverse String',
    difficulty: 'Easy',
    description: `
<p class="mb-4">Write a function that reverses a string. The input string is given as an array of characters <code>s</code>.</p>
<p class="mb-4">You must do this by modifying the input array in-place with O(1) extra memory.</p>
    `,
    examples: [
      { input: [["h","e","l","l","o"]], expected: ["o","l","l","e","h"] },
      { input: [["H","a","n","n","a","h"]], expected: ["h","a","n","n","a","H"] },
    ],
    testCases: [
       { input: [["h","e","l","l","o"]], expected: ["o","l","l","e","h"] },
      { input: [["H","a","n","n","a","h"]], expected: ["h","a","n","n","a","H"] },
      { input: [["a"]], expected: ["a"] },
      { input: [["a", "b"]], expected: ["b", "a"] },
      { input: [[]], expected: [] },
    ],
    starterCode: `/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
const reverseString = (s) => {
  // Your code here
};
`,
  },
];
