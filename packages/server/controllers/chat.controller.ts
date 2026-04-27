import type { Request, Response } from "express";
import { chatService } from "../services/chat.service";
import { z } from "zod";

// This schema matches the "history" format required by Gemini
const ChatRequestSchema = z.object({
  history: z.array(
    z.object({
      role: z.enum(["user", "model"]),
      parts: z.array(
        z.object({
          text: z.string().min(1, "Message cannot be empty"),
        }),
      ),
    }),
  ),
});

export const chatController = {
  sendMessage: async (req: Request, res: Response) => {
    // 1. Validate the entire body object
    const parseResult = ChatRequestSchema.safeParse(req.body);

    console.log("Validation Success:", parseResult.success);

    if (!parseResult.success) {
      return res.status(400).json({
        error: "Invalid input structure",
        details: parseResult.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    try {
      // 2. Extract the validated history
      const { history } = parseResult.data;

      // 3. Pass history to the service for context-aware chat
      const response = await chatService.sendMessage(history);

      // 4. Return the AI message in a consistent format
      res.json({ message: response.message });
    } catch (error) {
      console.error("Controller Error:", error);
      res.status(500).json({
        error: "AI Service Error",
        details: error instanceof Error ? error.message : String(error),
      });
    }
  },
};
