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
          message:
            "Слишком много запросов. Пожалуйста, подождите немного и попробуйте снова.",
        });
      case 503:
        return res.status(503).json({
          message:
            "Сервис рекомендаций временно перегружен. Попробуйте немного позже.",
        });
      case 403:
        return res.status(500).json({
          message:
            "Сервис рекомендаций временно недоступен из-за ошибки конфигурации.",
        });
      case 404:
        return res.status(500).json({
          message: "Сервис рекомендаций настроен некорректно.",
        });
      default:
        return res.status(500).json({
          message: "Не удалось получить рекомендацию. Попробуйте ещё раз.",
        });
    }
  }
};

// if (typeof message !== "string" || message.trim() === "") {
//   return res.status(400).json({
//     message: "Message must be a non-empty string",
//   });
// }
