import { GENERATED_IMAGE_REPLY } from "./chat-config";
import type { ChatMessage, GeneratedImage } from "./chat-types";
import { generateImage } from "./image-client";
import type { ImageGenerationPayload } from "./image-generation-validation";
import { insertGeneratedImage } from "./image-repository";
import { deleteMessageById, insertMessage } from "./message-repository";
import { deleteUploadedFiles } from "./upload-storage";

export interface ImageChatResult {
  image: GeneratedImage;
  userMessage: ChatMessage;
  assistantMessage: ChatMessage;
}

export async function generateImageInChat(
  sessionId: string,
  payload: ImageGenerationPayload,
  signal?: AbortSignal
): Promise<ImageChatResult> {
  const userMessage = insertMessage({
    sessionId,
    role: "user",
    content: payload.prompt,
    model: payload.model,
    attachments: payload.referenceImageUrl
      ? [{ url: payload.referenceImageUrl, type: "image", name: "Reference Image" }]
      : [],
  });
  let storedUrl: string | null = null;

  try {
    storedUrl = await generateImage(
      payload.prompt,
      payload.model,
      payload.options,
      payload.referenceImageUrl,
      signal
    );
    const image = insertGeneratedImage(sessionId, payload.prompt, storedUrl);
    const assistantMessage = insertMessage({
      sessionId,
      role: "assistant",
      content: GENERATED_IMAGE_REPLY,
      model: payload.model,
      attachments: [{ url: storedUrl, type: "image", name: payload.prompt.slice(0, 80) }],
    });
    return { image, userMessage, assistantMessage };
  } catch (error) {
    deleteMessageById(userMessage.id);
    if (storedUrl) await deleteUploadedFiles([storedUrl]);
    throw error;
  }
}
