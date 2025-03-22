import OpenAI from "openai";
import type { Assistant } from "openai/resources/beta/assistants";
import { tools } from "../../tools/allTools";
import { assistantPrompt } from "../constants/prompt";

/**
 * Creates a new assistant with the specified model, name, instructions and tools.
 * @param client The OpenAI client to use to create the assistant.
 * @returns The newly created assistant.
 */
export async function createAssistant(client: OpenAI): Promise<Assistant> {
  // Create the assistant with the specified model, name, instructions and tools.

  if (!process.env.OPENAI_API_KEY) {
      throw new Error(
      "OPENAI_API_KEY environment variable is not set. You need to set it to create the assistant."
      );
  }
  if (!process.env.OPENAI_ASSISTANT_NAME) {
      throw new Error(
      "OPENAI_ASSISTANT_NAME environment variable is not set. You need to set it to create the assistant."
      );
  }
  if (!process.env.OPENAI_MODEL) {
      throw new Error(
      "OPENAI_MODEL environment variable is not set. You need to set it to create the assistant."
      );
  }

  return await client.beta.assistants.create({
    // The model to use for the assistant.
    model: process.env.OPENAI_MODEL,
    // The name of the assistant.
    name: process.env.OPENAI_ASSISTANT_NAME,
    // The instructions to provide to the assistant.
    instructions: assistantPrompt,
    // The tools to provide to the assistant.
    tools: Object.values(tools).map((tool) => tool.definition),
  });
}
