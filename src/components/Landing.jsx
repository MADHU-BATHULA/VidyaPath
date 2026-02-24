import { C } from '../styles/theme';
import { Dot } from './common/Dot';

export function Landing({ onEnter }) {
    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            {/* Hero */}
            <div style={{
                flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", padding: "40px 20px", textAlign: "center",
                background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${C.accentDim}, transparent)`,
                position: "relative", overflow: "hidden",
            }}>
                {/* Decorative grid */}
                <div style={{
                    position: "absolute", inset: 0, opacity: 0.04,
                    backgroundImage: `linear-gradient(${C.accent} 1px, transparent 1px), linear-gradient(90deg, ${C.accent} 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                }} />

                <div className="fade-up" style={{ position: "relative", zIndex: 1 }}>
                    <div style={{
                        display: "inline-flex", alignItems: "center", gap: 8,
                        padding: "6px 16px", borderRadius: 30, marginBottom: 24,
                        background: C.accentDim, border: `1px solid ${C.accent}40`,
                        fontSize: 12, fontWeight: 600, color: C.accent,
                    }}>
                        <Dot color={C.green} /> AI-Powered Inclusive Education
                    </div>

                    <h1 style={{
                        fontFamily: "'Sora', sans-serif", fontSize: "clamp(42px, 8vw, 80px)",
                        fontWeight: 800, lineHeight: 1.05, marginBottom: 20,
                        background: `linear-gradient(135deg, ${C.text} 30%, ${C.accent})`,
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    }}>
                        VidyaPath
                    </h1>

                    <p style={{ fontSize: 18, color: C.textMid, maxWidth: 520, margin: "0 auto 12px", lineHeight: 1.65 }}>
                        Every learner deserves personalised education — regardless of language, disability, or location.
                    </p>

                    <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
                        {["🗣 Multilingual", "♿ Accessible", "🧠 Adaptive", "📊 Analytics"].map(f => (
                            <span key={f} className="tag" style={{ fontSize: 12 }}>{f}</span>
                        ))}
                    </div>

                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <button className="btn btn-primary" style={{ fontSize: 16, padding: "14px 32px" }} onClick={() => onEnter("student")}>
                            👨🎓 I'm a Student
                        </button>
                        <button className="btn btn-ghost" style={{ fontSize: 16, padding: "14px 32px" }} onClick={() => onEnter("teacher")}>
                            👩🏫 I'm a Teacher
                        </button>
                    </div>
                </div>
            </div>

            {/* Features strip */}
            <div style={{
                display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 1, background: C.border,
            }}>
                {[
                    { icon: "🌐", title: "5 Indian Languages", desc: "Telugu, Hindi, Tamil, Kannada + English" },
                    { icon: "🔤", title: "Dyslexia Mode", desc: "Adaptive fonts, spacing & colour overlays" },
                    { icon: "🎯", title: "Gap Detection", desc: "AI identifies exactly what you don't know" },
                    { icon: "📈", title: "Teacher Dashboard", desc: "Real-time class analytics & alerts" },
                ].map(f => (
                    <div key={f.title} style={{
                        background: C.surface, padding: "24px 20px", textAlign: "center",
                    }}>
                        <div style={{ fontSize: 28, marginBottom: 8 }}>{f.icon}</div>
                        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{f.title}</div>
                        <div style={{ fontSize: 12, color: C.textMid, lineHeight: 1.5 }}>{f.desc}</div>
                    </div>
                ))}
            </div>

            <div style={{ textAlign: "center", padding: "16px", fontSize: 11, color: C.textDim }}>
                Built for EduTech Hackathon · Powered by Claude AI · Bhashini · Azure Cognitive Services
            </div>
        </div>
    );
}
