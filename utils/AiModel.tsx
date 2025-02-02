import { GoogleGenerativeAI } from "@google/generative-ai";
if(!process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY) {
  console.log("API key not found"); 
  throw new Error("API key not found");
}
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});
export async function generateContent(prompt: string) {
  const res = await model.generateContent(prompt);
  return res.response.text();
}
