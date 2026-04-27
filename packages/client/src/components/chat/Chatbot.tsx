import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import TypingIndicator from "./TypingIndicator";
import type { Message } from "./ChatMessages";
import ChatMessages from "./ChatMessages";
import ChatInput, { type ChatFormData } from "./ChatInput";

type chatRespose = {
  message: string;
};

const Chatboat = () => {
  // 1. Change state to hold the history format Gemini expects
  const [messages, setMessages] = useState<Message[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async ({ prompt }: ChatFormData) => {
    // 2. Create the new user message object
    const userMessage: Message = { role: "user", parts: [{ text: prompt }] };
    const newHistory = [...messages, userMessage];

    setMessages(newHistory);
    setIsBotTyping(true);

    try {
      setError(null);
      // 3. Send the WHOLE history array to the backend
      const { data } = await axios.post<chatRespose>("/api/chat", {
        history: newHistory,
      });

      // 4. Add the AI's response to history
      const modelMessage: Message = {
        role: "model",
        parts: [{ text: data.message }],
      };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (err: any) {
      const errMsg = err.response?.data?.details;
      setError("Something went wrong. Please try again.");
      toast(errMsg, { duration: 5000 });
    } finally {
      setIsBotTyping(false);
    }
  };

  return (
    <div className="flex flex-col  h-full">
      <div className="flex flex-col gap-2 flex-1 p-4 overflow-y-auto">
        <ChatMessages messages={messages} />
        {isBotTyping && <TypingIndicator />}
        {error && <div className="text-red-500">{error}</div>}
      </div>
      <ChatInput onSubmit={onSubmit} />
    </div>
  );
};

export default Chatboat;
