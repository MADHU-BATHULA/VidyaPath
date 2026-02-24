import { useState, useRef, useEffect } from 'react';
import { C } from '../../styles/theme';
import { LANGS } from '../../data/mockData';
import { callClaude } from '../../api/claude';
import { Spinner } from '../common/Spinner';

export function AITutorTab({ profile, lang }) {
    const [messages, setMessages] = useState([
        { role: "assistant", content: `Namaste ${profile?.name || ""}! 🙏 I'm your AI tutor. Ask me anything about your studies — in any language you prefer!` }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

    async function send() {
        if (!input.trim() || loading) return;
        const userMsg = { role: "user", content: input };
        const newMsgs = [...messages, userMsg];
        setMessages(newMsgs); setInput(""); setLoading(true);
        const langName = LANGS[lang] || "English";
        const system = `You are VidyaPath AI Tutor — a warm, patient, highly skilled tutor for Grade ${profile?.grade || 8} students in India.
- Always respond in ${langName} (but keep English subject terms in parentheses if needed)
- Use simple, clear language the student can understand
- Give culturally relevant Indian examples
- Be encouraging and supportive
- If the student is confused, break the explanation down further
- Keep responses focused and concise (max 150 words unless a detailed explanation is needed)`;
        try {
            const text = await callClaude(
                newMsgs.map(m => ({ role: m.role, content: m.content })),
                system
            );
            setMessages([...newMsgs, { role: "assistant", content: text }]);
        } catch {
            setMessages([...newMsgs, { role: "assistant", content: "Sorry, I'm having trouble connecting. Please try again!" }]);
        }
        setLoading(false);
        setTimeout(() => inputRef.current?.focus(), 100);
    }

    const SUGGESTIONS = ["Explain photosynthesis with an example", "What is Newton's first law?", "Help me with fractions", "What is democracy?"];

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 120px)" }}>
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 8px" }}>
                {messages.length === 1 && (
                    <div style={{ marginBottom: 16 }}>
                        <p style={{ fontSize: 12, color: C.textMid, marginBottom: 10 }}>Try asking:</p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                            {SUGGESTIONS.map(s => (
                                <button key={s} onClick={() => { setInput(s); inputRef.current?.focus(); }}
                                    className="tag" style={{ cursor: "pointer", fontSize: 12, padding: "5px 10px" }}>
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                {messages.map((m, i) => (
                    <div key={i} className="fade-up" style={{
                        display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                        marginBottom: 12,
                    }}>
                        {m.role === "assistant" && (
                            <div style={{
                                width: 30, height: 30, borderRadius: "50%", background: C.accentDim, border: `1px solid ${C.accent}40`,
                                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
                                marginRight: 8, flexShrink: 0, alignSelf: "flex-end",
                            }}>🤖</div>
                        )}
                        <div style={{
                            maxWidth: "78%", padding: "12px 16px", borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                            background: m.role === "user" ? C.accent : C.card,
                            color: m.role === "user" ? "#0D1117" : C.text,
                            fontSize: 14, lineHeight: 1.65, border: m.role === "user" ? "none" : `1px solid ${C.border}`,
                            whiteSpace: "pre-wrap",
                        }}>
                            {m.content}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "8px 0" }}>
                        <div style={{ width: 30, height: 30, borderRadius: "50%", background: C.accentDim, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🤖</div>
                        <div style={{ display: "flex", gap: 4 }}>
                            {[0, 0.2, 0.4].map((d, i) => (
                                <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: C.textMid, animation: `pulse 1.2s ${d}s ease infinite` }} />
                            ))}
                        </div>
                    </div>
                )}
                <div ref={bottomRef} />
            </div>

            <div style={{ padding: "10px 16px 16px", background: C.surface, borderTop: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", gap: 8 }}>
                    <input ref={inputRef} className="input" value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
                        placeholder={`Ask in ${LANGS[lang]}…`}
                        style={{ flex: 1 }} />
                    <button className="btn btn-primary" onClick={send} disabled={!input.trim() || loading}
                        style={{ padding: "10px 16px" }}>
                        {loading ? <Spinner /> : "→"}
                    </button>
                </div>
            </div>
        </div>
    );
}
