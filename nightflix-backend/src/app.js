import cors from "cors";
import express from "express";
import helmet from "helmet";
import { chatRouter } from "./routes/chatRoutes.js";

const allowedOrigins = ["http://localhost:5173", process.env.CLIENT_URL].filter(
  Boolean
);

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api/chat", chatRouter);

export default app;
