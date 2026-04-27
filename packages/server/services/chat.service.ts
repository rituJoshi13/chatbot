import { GoogleGenerativeAI } from "@google/generative-ai";

// Ensure the environment variable is loaded
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const MODEL_NAME = "gemini-3-flash-preview"; // gemini-3.1-flash-lite-preview

type MessagePart = {
  text: string;
};

type ChatMessage = {
  role: "user" | "model";
  parts: MessagePart[];
};

type ChatResponse = {
  message?: string;
};

export const chatService = {
  sendMessage: async (history: ChatMessage[]): Promise<ChatResponse> => {
    // 1. Get the model instance
    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      // System instruction is set at the model level for chat sessions
      systemInstruction:
        "You are a direct assistant. Give minimal answers unless asked for detail.",
    });

    // 2. Separate the newest message from the history
    // The history parameter in startChat should NOT include the current message
    const userMessage = history[history.length - 1]?.parts?.[0]?.text || "";
    const pastHistory = history.slice(0, -1);

    // 3. Initialize the chat session with memory
    const chatSession = model.startChat({
      history: pastHistory,
      generationConfig: {
        temperature: 0.5,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 500,
        stopSequences: ["STOP_HERE"],
      },
    });

    try {
      // 4. Send the new message through the session
      const result = await chatSession.sendMessage(userMessage);
      const response = await result.response;

      return { message: response.text() };
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  },
};
