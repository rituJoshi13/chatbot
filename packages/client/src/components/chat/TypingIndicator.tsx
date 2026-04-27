import React from "react";

const TypingIndicator = () => {
  return (
    <div className="flex gap-1  rouded-xl self-start bg-gray-100">
      <Dot />
      <Dot className="[animation-delay:0.2s]" />
      <Dot className="[animation-delay:0.4s]" />
    </div>
  );
};
type DotProps = {
  className?: string;
};
const Dot = ({ className }: DotProps) => (
  <div
    className={`w-2 h-2 rounded-full bg-gray-500 animate-pulse ${className}`}
  ></div>
);
export default TypingIndicator;
