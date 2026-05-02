const GIT_CONVENTIONS = `
Git commits require an Assisted-by trailer: "Assisted-by: pi:<model>" where <model> comes from get_current_model. Example: "Assisted-by: pi:claude-opus-4-6". Optional: append tool names (not basic tools).
`;

export default function (pi) {
  pi.on("before_agent_start", async (event, ctx) => {
    return {
      systemPrompt: event.systemPrompt + GIT_CONVENTIONS,
    };
  });
}
