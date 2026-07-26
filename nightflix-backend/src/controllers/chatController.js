import { ai } from "../config/gemini.js";
import { GEMINI_INSTRUCTION } from "../constants/geminiInstruction.js";

export const createChatInteraction = async (req, res) => {
  try {
    const { message, previousInteractionId } = req.body;

    const interaction = await ai.interactions.create({
      model: "gemini-3.6-flash",
      input: message,
      ...(previousInteractionId && {
        previous_interaction_id: previousInteractionId,
      }),
      system_instruction: GEMINI_INSTRUCTION,
    });

    return res.status(200).json({
      status: 200,
      message: interaction.output_text,
      interactionId: interaction.id,
    });
  } catch (error) {
    console.error("Gemini API error:", error);

    const status = error.status;

    switch (status) {
      case 429:
        return res.status(429).json({
          message: "Too many requests. Please wait a moment and try again",
        });
      case 503:
        return res.status(503).json({
          message:
            "The recommendation service is temporarily overloaded. Please try again later",
        });
      case 403:
        return res.status(500).json({
          message:
            "The recommendation service is temporarily unavailable due to a configuration error",
        });
      case 404:
        return res.status(500).json({
          message: "The recommendation service is not configured correctly",
        });
      default:
        return res.status(500).json({
          message: "Failed to get a recommendation. Please try again",
        });
    }
  }
};

// if (typeof message !== "string" || message.trim() === "") {
//   return res.status(400).json({
//     message: "Message must be a non-empty string",
//   });
// }
