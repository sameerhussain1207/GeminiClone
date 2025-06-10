
import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new  GoogleGenerativeAI("AIzaSyCpqIXe1blc2zHdGYrAgFWKhIp6i9yckPY" );


async function main(prompt) {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Something went wrong. Please try again later.";
  }
}



 export default main;