import { Type } from "typebox";

const GIT_CONVENTIONS = `
Git commits require an Assisted-by trailer: "Assisted-by: pi:<model>" where <model> comes from get_current_model. Example: "Assisted-by: pi:claude-opus-4-6". Optional: append tool names (not basic tools).
`;

export default function (pi) {
  pi.registerTool({
    name: "get_current_model",
    label: "Current Model",
    description: "Returns the current active pi model provider and ID",
    promptSnippet: "Get the currently active model provider and ID",
    promptGuidelines: [
      "Use get_current_model to determine the active model for git commit Assisted-by trailers. Never guess the model.",
    ],
    parameters: Type.Object({}),
    async execute(toolCallId, params, signal, onUpdate, ctx) {
      const model = ctx.model;
      if (!model) {
        return {
          content: [{ type: "text", text: "No model currently active" }],
          details: {},
        };
      }
      return {
        content: [{ type: "text", text: `${model.provider}/${model.id}` }],
        details: { provider: model.provider, id: model.id },
      };
    },
  });

  pi.on("before_agent_start", async (event, ctx) => {
    return {
      systemPrompt: event.systemPrompt + GIT_CONVENTIONS,
    };
  });
}
