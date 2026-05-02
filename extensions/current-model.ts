import { Type } from "typebox";

export default function (pi) {
  pi.registerTool({
    name: "get_current_model",
    label: "Current Model",
    description: "Returns the current active pi model provider and ID",
    promptSnippet: "Get the currently active model provider and ID",
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
}
