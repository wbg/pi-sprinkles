import { Type } from "typebox";

const GIT_CONVENTIONS = `
## Git Commit Conventions
When committing to git, include an Assisted-by trailer in the commit message following the Linux kernel convention:

    Assisted-by: AGENT_NAME:MODEL_VERSION [TOOL1] [TOOL2]

Where:
- AGENT_NAME is "pi"
- MODEL_VERSION is the model from the get_current_model tool
- [TOOL1] [TOOL2] are optional specialized tools used (not basic tools like git, gcc, make, editors)

Example commit message:
    Fix null pointer in config parser
    
    Assisted-by: pi:claude-opus-4-6

Always use get_current_model to determine the model. Never guess.
Never commit or push without explicit user approval.
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
