import { useEffect, useRef } from "react";
import ReactMarkDown from "react-markdown";
export type Message = {
  role: "user" | "model";
  parts: [{ text: string }];
};
type Props = {
  messages: Message[];
};
const ChatMessages = ({ messages }: Props) => {
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleCopy = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const selection = window.getSelection()?.toString().trim();
    if (selection) {
      e.preventDefault();
      e.clipboardData.setData("text/plain", selection);
    }
  };
  return (
    <div className="flex flex-col gap-3">
      {messages.map((msg, index) => (
        <div
          onCopy={handleCopy}
          key={index}
          ref={index === messages.length - 1 ? lastMessageRef : null}
          className={`px-3 py-2 rounded-xl ${msg.role === "user" ? "bg-blue-600 text-white self-end" : "bg-gray-100 text-black self-start"}`}
        >
          <ReactMarkDown>{msg.parts[0].text}</ReactMarkDown>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
