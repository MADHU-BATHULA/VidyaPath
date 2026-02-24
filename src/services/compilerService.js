const JUDGE0_URL = "https://judge0-ce.p.rapidapi.com/submissions";
const API_KEY = import.meta.env.VITE_JUDGE0_API_KEY || "";

export async function runCode(languageId, sourceCode, stdin = "") {
    if (!API_KEY) {
        throw new Error("Missing API Key. Please add VITE_JUDGE0_API_KEY to your .env file.");
    }

    const response = await fetch(`${JUDGE0_URL}?base64_encoded=false&wait=true`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": API_KEY,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
        body: JSON.stringify({
            language_id: languageId,
            source_code: sourceCode,
            stdin,
        }),
    });

    return await response.json();
}
