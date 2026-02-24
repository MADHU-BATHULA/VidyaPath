import { useState } from 'react';
import { C } from '../styles/theme';
import { LANGS } from '../data/mockData';
import { LearnTab } from './tabs/LearnTab';
import { QuizTab } from './tabs/QuizTab';
import { AITutorTab } from './tabs/AITutorTab';
import { ProgressTab } from './tabs/ProgressTab';
import { SettingsTab } from './tabs/SettingsTab';
import VirtualLabs from '../pages/VirtualLabs';
import LabRunner from '../pages/LabRunner';

export function StudentApp({
    profile,
    lang,
    setLang,
    dyslexia,
    setDyslexia,
    highContrast,
    setHighContrast,
    tab,
    setTab,
    onBack
}) {
    const tabs = [
        { id: "learn", label: "Learn", icon: "📚" },
        { id: "quiz", label: "Quiz", icon: "🎯" },
        { id: "ai", label: "AI Tutor", icon: "🤖" },
        { id: "progress", label: "Progress", icon: "📊" },
        { id: "labs", label: "Labs", icon: "🔬" },
        { id: "settings", label: "Settings", icon: "⚙️" }
    ];

    const [activeLab, setActiveLab] = useState(null);

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            {/* Top bar */}
            <div style={{
                background: C.surface,
                borderBottom: `1px solid ${C.border}`,
                padding: "12px 20px",
                display: "flex",
                alignItems: "center",
                gap: 12
            }}>
                <button className="btn btn-ghost" style={{ padding: "6px 10px", fontSize: 12 }} onClick={onBack}>←</button>
                <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 18, color: C.accent }}>VidyaPath</div>
                <div style={{ flex: 1 }} />
                <select className="input" style={{ width: "auto", padding: "6px 10px", fontSize: 12 }} value={lang} onChange={e => setLang(e.target.value)}>
                    {Object.entries(LANGS).map(([k, v]) => (
                        <option key={k} value={k}>{v}</option>
                    ))}
                </select>
                <div style={{
                    width: 34, height: 34, borderRadius: "50%",
                    background: `linear-gradient(135deg, ${C.accent}, ${C.purple})`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 700, fontSize: 14, color: "#0D1117", flexShrink: 0
                }}>
                    {profile?.name?.[0]?.toUpperCase() || "S"}
                </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflowY: "auto" }}>
                {tab === "learn" && <LearnTab profile={profile} lang={lang} />}
                {tab === "quiz" && <QuizTab profile={profile} lang={lang} />}
                {tab === "ai" && <AITutorTab profile={profile} lang={lang} />}
                {tab === "progress" && <ProgressTab profile={profile} />}
                {tab === "labs" && !activeLab && <VirtualLabs setActiveLab={setActiveLab} />}
                {tab === "labs" && activeLab && <LabRunner activeLab={activeLab} onBack={() => setActiveLab(null)} />}
                {tab === "settings" && (
                    <SettingsTab
                        dyslexia={dyslexia}
                        setDyslexia={setDyslexia}
                        highContrast={highContrast}
                        setHighContrast={setHighContrast}
                    />
                )}
            </div>

            {/* Bottom Nav */}
            <div style={{
                background: C.surface, borderTop: `1px solid ${C.border}`,
                display: "flex", padding: "8px 4px 12px",
                position: "sticky", bottom: 0,
            }}>
                {tabs.map(t => (
                    <button key={t.id} onClick={() => {
                        setTab(t.id);
                        if (t.id !== "labs") setActiveLab(null);
                    }} style={{
                        flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                        padding: "8px 4px", border: "none", background: "transparent", cursor: "pointer",
                        color: tab === t.id ? C.accent : C.textMid,
                        transition: "color 0.18s",
                    }}>
                        <span style={{ fontSize: 20, lineHeight: 1 }}>{t.icon}</span>
                        <span style={{ fontSize: 10, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>{t.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}