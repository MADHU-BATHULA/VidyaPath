import { useState } from 'react';
import { C } from '../../styles/theme';
import { LANGS, SUBJECTS } from '../../data/mockData';
import { callClaude } from '../../api/claude';
import { Spinner } from '../common/Spinner';

export function LearnTab({ profile, lang }) {
    const [subject, setSubject] = useState(null);
    const [topic, setTopic] = useState(null);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [explainWord, setExplainWord] = useState("");
    const [explanation, setExplanation] = useState("");
    const [expLoading, setExpLoading] = useState(false);

    async function loadContent(subj, top) {
        setSubject(subj); setTopic(top);
        setContent(""); setLoading(true); setExplanation("");
        const langName = LANGS[lang] || "English";
        const system = `You are an expert educational content creator for Grade ${profile?.grade || 8} students in India. 
Always respond in ${langName} language. Use simple, clear language appropriate for the student's grade level.
If the language is not English, provide the explanation in that language with English key terms in parentheses.
Use culturally relevant examples from Indian context. Keep explanations engaging and educational.`;
        const prompt = `Create a comprehensive but concise lesson on "${top}" from ${subj} for Grade ${profile?.grade || 8}.
Include:
1. A simple definition/introduction (2-3 sentences)
2. Key concepts (3-4 bullet points)  
3. A relatable Indian example or analogy
4. 2 important facts to remember
Keep the total response under 300 words. Use emojis sparingly to highlight key points.`;
        try {
            const text = await callClaude([{ role: "user", content: prompt }], system);
            setContent(text);
        } catch { setContent("⚠️ Could not load content. Please check your connection."); }
        setLoading(false);
    }

    async function explainSelection() {
        const sel = window.getSelection()?.toString().trim();
        if (!sel || sel.length < 2) return;
        setExplainWord(sel); setExpLoading(true); setExplanation("");
        const langName = LANGS[lang] || "English";
        const system = `You are a helpful tutor. Always respond in ${langName}. Be concise (2-3 sentences max).`;
        const prompt = `Explain "${sel}" in very simple terms for a Grade ${profile?.grade || 8} student. Use a relatable Indian example.`;
        try {
            const text = await callClaude([{ role: "user", content: prompt }], system);
            setExplanation(text);
        } catch { setExplanation("Could not fetch explanation."); }
        setExpLoading(false);
    }

    if (!subject) return (
        <div style={{ padding: 20 }}>
            <div style={{ marginBottom: 24 }}>
                <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 22, marginBottom: 6 }}>
                    Hello, {profile?.name || "Learner"}! 👋
                </h2>
                <p style={{ color: C.textMid, fontSize: 14 }}>Grade {profile?.grade || 8} • Choose a subject to begin</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {Object.entries(SUBJECTS).map(([key, subj]) => (
                    <button key={key} onClick={() => setSubject(key)} style={{
                        background: C.card, border: `1px solid ${C.border}`, borderRadius: 14,
                        padding: "20px 16px", cursor: "pointer", textAlign: "left",
                        transition: "all 0.18s", color: C.text,
                    }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.transform = "translateY(-2px)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "none"; }}>
                        <div style={{ fontSize: 32, marginBottom: 8 }}>{subj.icon}</div>
                        <div style={{ fontWeight: 700, fontSize: 15 }}>{subj.label}</div>
                        <div style={{ fontSize: 12, color: C.textMid, marginTop: 4 }}>{subj.topics.length} topics</div>
                    </button>
                ))}
            </div>
        </div>
    );

    if (!topic) return (
        <div style={{ padding: 20 }}>
            <button className="btn btn-ghost" style={{ marginBottom: 20, fontSize: 12 }} onClick={() => setSubject(null)}>
                ← Back to subjects
            </button>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 6 }}>
                {SUBJECTS[subject].icon} {SUBJECTS[subject].label}
            </h2>
            <p style={{ color: C.textMid, fontSize: 13, marginBottom: 20 }}>Choose a topic to learn</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {SUBJECTS[subject].topics.map((t, i) => (
                    <button key={t} onClick={() => loadContent(SUBJECTS[subject].label, t)} style={{
                        display: "flex", alignItems: "center", gap: 14, padding: "16px",
                        background: C.card, border: `1px solid ${C.border}`, borderRadius: 12,
                        cursor: "pointer", color: C.text, textAlign: "left", transition: "all 0.18s",
                    }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; }}>
                        <span style={{
                            width: 32, height: 32, borderRadius: "50%", background: C.surface,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 13, fontWeight: 700, color: C.accent, flexShrink: 0,
                        }}>{i + 1}</span>
                        <span style={{ fontWeight: 600, fontSize: 15 }}>{t}</span>
                        <span style={{ marginLeft: "auto", color: C.textDim }}>→</span>
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div style={{ padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <button className="btn btn-ghost" style={{ fontSize: 12 }} onClick={() => { setTopic(null); setContent(""); }}>
                    ← Back
                </button>
                <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{topic}</div>
                    <div style={{ fontSize: 11, color: C.textMid }}>{subject}</div>
                </div>
            </div>

            {loading ? (
                <div style={{ textAlign: "center", padding: "60px 20px" }}>
                    <Spinner />
                    <p style={{ color: C.textMid, marginTop: 16, fontSize: 14 }}>Loading lesson in {LANGS[lang]}…</p>
                </div>
            ) : (
                <>
                    <div className="card" style={{ marginBottom: 16, lineHeight: 1.8 }}
                        onMouseUp={explainSelection}>
                        <p style={{ whiteSpace: "pre-wrap", fontSize: 15 }}>{content}</p>
                    </div>

                    <div className="card" style={{ background: C.accentDim, borderColor: C.accent + "50", marginBottom: 16 }}>
                        <p style={{ fontSize: 12, color: C.accent, fontWeight: 600 }}>💡 Tip: Select any text to get an instant explanation in {LANGS[lang]}</p>
                    </div>

                    {explainWord && (
                        <div className="card fade-up" style={{ borderColor: C.blue + "50", background: C.blueDim }}>
                            <div style={{ fontSize: 12, color: C.blue, fontWeight: 700, marginBottom: 8 }}>📖 Explanation: "{explainWord}"</div>
                            {expLoading ? <Spinner /> : <p style={{ fontSize: 14, lineHeight: 1.7 }}>{explanation}</p>}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
