
import { GoogleGenAI } from "@google/genai";
import type { Problem } from '../types';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this environment, we assume it's always available.
  console.warn("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const getHint = async (problem: Problem, userCode: string): Promise<string> => {
  const prompt = `
You are an expert coding tutor. A student is working on a coding problem and has asked for a hint.
Your goal is to guide them towards the correct solution without giving away the answer directly.

**Coding Problem:**
- **Title:** ${problem.title}
- **Description:** ${problem.description.replace(/<[^>]*>/g, '')}
- **Example 1 Input:** ${JSON.stringify(problem.examples[0].input)}
- **Example 1 Output:** ${JSON.stringify(problem.examples[0].expected)}

**Student's Current Code:**
\`\`\`javascript
${userCode}
\`\`\`

**Your Task:**
Provide a concise, helpful hint based on their code.
- Analyze their current approach.
- If their logic is flawed, gently point out the area of concern. For example, "Consider what happens in your loop when..." or "Think about edge cases like...".
- If they are on the right track but stuck, suggest the next logical step or a concept they might need. For example, "You're using a loop which is a good start. Have you thought about a way to store values you've already seen?"
- DO NOT provide the complete, corrected code.
- Keep the hint to 2-3 sentences. Be encouraging.
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to get a hint from the AI tutor.");
  }
};
