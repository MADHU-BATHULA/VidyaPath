import { useState } from 'react';
import { C } from '../styles/theme';
import { LANGS } from '../data/mockData';

export function Onboard({ onDone }) {
    const [step, setStep] = useState(0);
    const [data, setData] = useState({ name: "", grade: "8", lang: "te", dyslexia: false, visual: false });

    const steps = [
        {
            title: "What's your name?",
            content: (
                <div>
                    <input className="input" placeholder="Enter your name..." value={data.name}
                        onChange={e => setData({ ...data, name: e.target.value })}
                        style={{ fontSize: 18, padding: "14px 18px" }} autoFocus />
                </div>
            ),
            valid: data.name.trim().length > 0,
        },
        {
            title: "Select your grade & language",
            content: (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <select className="input" value={data.grade} onChange={e => setData({ ...data, grade: e.target.value })}>
                        {[6, 7, 8, 9, 10, 11, 12].map(g => <option key={g} value={g}>Grade {g}</option>)}
                    </select>
                    <select className="input" value={data.lang} onChange={e => setData({ ...data, lang: e.target.value })}>
                        {Object.entries(LANGS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                </div>
            ),
            valid: true,
        },
        {
            title: "Accessibility preferences",
            content: (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                        { key: "dyslexia", label: "Dyslexia-friendly mode", desc: "Larger text, special font, coloured underlays", icon: "🔤" },
                        { key: "visual", label: "High-contrast mode", desc: "Increased contrast for visual comfort", icon: "👁" },
                    ].map(({ key, label, desc, icon }) => (
                        <button key={key} onClick={() => setData({ ...data, [key]: !data[key] })}
                            style={{
                                display: "flex", alignItems: "center", gap: 14, padding: "16px",
                                borderRadius: 12, border: `2px solid ${data[key] ? C.accent : C.border}`,
                                background: data[key] ? C.accentDim : C.surface, cursor: "pointer",
                                textAlign: "left", transition: "all 0.18s",
                            }}>
                            <span style={{ fontSize: 28 }}>{icon}</span>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: 14, color: C.text }}>{label}</div>
                                <div style={{ fontSize: 12, color: C.textMid }}>{desc}</div>
                            </div>
                            <div style={{
                                marginLeft: "auto", width: 22, height: 22, borderRadius: "50%",
                                background: data[key] ? C.accent : C.surface, border: `2px solid ${data[key] ? C.accent : C.border}`,
                                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                            }}>
                                {data[key] && <span style={{ fontSize: 12, color: "#0D1117", fontWeight: 900 }}>✓</span>}
                            </div>
                        </button>
                    ))}
                    <p style={{ fontSize: 12, color: C.textDim, textAlign: "center" }}>You can change these anytime in settings</p>
                </div>
            ),
            valid: true,
        },
    ];

    const cur = steps[step];

    return (
        <div style={{
            minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
            padding: 20, background: `radial-gradient(ellipse 60% 40% at 50% 100%, ${C.accentDim}, transparent)`,
        }}>
            <div className="card fade-up" style={{ width: "100%", maxWidth: 440, padding: "32px" }}>
                {/* Progress */}
                <div style={{ display: "flex", gap: 6, marginBottom: 32 }}>
                    {steps.map((_, i) => (
                        <div key={i} style={{
                            flex: 1, height: 4, borderRadius: 2,
                            background: i <= step ? C.accent : C.border,
                            transition: "background 0.3s",
                        }} />
                    ))}
                </div>

                <div style={{ fontSize: 12, color: C.textMid, marginBottom: 8 }}>Step {step + 1} of {steps.length}</div>
                <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 24, fontWeight: 700, marginBottom: 24 }}>{cur.title}</h2>

                {cur.content}

                <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
                    {step > 0 && (
                        <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setStep(s => s - 1)}>Back</button>
                    )}
                    <button className="btn btn-primary" style={{ flex: 2 }}
                        disabled={!cur.valid}
                        onClick={() => {
                            if (step < steps.length - 1) setStep(s => s + 1);
                            else onDone(data);
                        }}>
                        {step < steps.length - 1 ? "Continue →" : "Start Learning 🚀"}
                    </button>
                </div>
            </div>
        </div>
    );
}
