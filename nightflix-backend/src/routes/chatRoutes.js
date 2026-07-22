import { Router } from "express";
import { createChatInteraction } from "../controllers/chatController.js";

export const chatRouter = Router();

chatRouter.post("/", createChatInteraction);
