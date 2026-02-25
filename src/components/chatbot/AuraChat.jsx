import { useState, useRef, useEffect } from 'react';
import { C } from '../../styles/theme';
import { callClaude } from '../../api/claude';
import { Spinner } from '../common/Spinner';

export default function AuraChat() {
    const [messages, setMessages] = useState([
        { role: "assistant", content: `Hello! 👋 I'm your AI assistant, Aura. How can I help you today?` }
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
        setMessages(newMsgs);
        setInput("");
        setLoading(true);

        const system = `You are Aura, an AI assistant for VidyaPath. Be helpful, concise, and friendly.`;

        try {
            const text = await callClaude(
                newMsgs.map(m => ({ role: m.role, content: m.content })),
                system
            );
            setMessages([...newMsgs, { role: "assistant", content: text }]);
        } catch {
            setMessages([...newMsgs, { role: "assistant", content: "Sorry, I'm having trouble connecting at the moment. Please try again later!" }]);
        }
        setLoading(false);
        setTimeout(() => inputRef.current?.focus(), 100);
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%", background: C.bg }}>
            {/* Header */}
            <div style={{
                padding: "16px", background: C.surface, color: C.text,
                borderBottom: `1px solid ${C.border}`, display: "flex",
                alignItems: "center", fontWeight: 600, fontSize: 16
            }}>
                <span style={{ marginRight: 8, fontSize: 20 }}>🤖</span>
                Aura AI Assistant
            </div>

            {/* Chat Area */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
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
                            maxWidth: "80%", padding: "12px 16px", borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
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

            {/* Input Area */}
            <div style={{ padding: "16px", background: C.surface, borderTop: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", gap: 8 }}>
                    <input
                        ref={inputRef}
                        className="input"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
                        placeholder={"Type a message..."}
                        style={{ flex: 1, padding: "12px 16px" }}
                    />
                    <button
                        className="btn btn-primary"
                        onClick={send}
                        disabled={!input.trim() || loading}
                        style={{ padding: "0 20px" }}
                    >
                        {loading ? <Spinner /> : "→"}
                    </button>
                </div>
            </div>
        </div>
    );
}
