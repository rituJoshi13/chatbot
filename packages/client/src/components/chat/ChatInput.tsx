import React from "react";
import { Button } from "../ui/button";
import { ArrowUpToLine } from "lucide-react";
import { useForm } from "react-hook-form";

export type ChatFormData = {
  prompt: string;
};
type Props = {
  onSubmit: (data: ChatFormData) => void;
};
const ChatInput = ({ onSubmit }: Props) => {
  const { register, handleSubmit, reset, formState } = useForm<ChatFormData>();

  const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onFormSubmit(); // Call the form submission handler
    }
  };
  const onFormSubmit = handleSubmit((data) => {
    reset({ prompt: "" });
    onSubmit(data);
  });
  return (
    <form
      onSubmit={onFormSubmit}
      onKeyDown={onKeyDown}
      className="flex flex-col gap-2 items-end border-2 border-gray-300 rounded-3xl p-4 m-4"
    >
      <textarea
        {...register("prompt", {
          required: true,
          validate: (value) => value.trim().length > 0,
        })}
        autoFocus
        placeholder="Ask anything..."
        maxLength={1000}
        className="w-full border-0  resize-none focus:ring-0 focus:outline-0"
      />
      <Button
        disabled={!formState.isValid}
        className="rounded-full w-11 h-11 cursor-pointer"
      >
        <ArrowUpToLine />
      </Button>
    </form>
  );
};

export default ChatInput;
