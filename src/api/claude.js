export const CLAUDE_MODEL = "claude-sonnet-4-20250514";

export async function callClaude(messages, system = "") {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: CLAUDE_MODEL,
            max_tokens: 1000,
            system,
            messages,
        }),
    });
    const data = await response.json();
    return data.content?.map((b) => b.text || "").join("") || "";
}
