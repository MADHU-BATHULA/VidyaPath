import { useState } from 'react';
import { C } from '../../styles/theme';

export function SettingsTab({ dyslexia, setDyslexia, highContrast, setHighContrast }) {
    const toggles = [
        { key: "dyslexia", label: "Dyslexia-Friendly Mode", desc: "Special font, line spacing, colour underlays", icon: "🔤", value: dyslexia, set: setDyslexia },
        { key: "contrast", label: "High Contrast Mode", desc: "Enhanced visual contrast", icon: "👁", value: highContrast, set: setHighContrast },
    ];
    return (
        <div style={{ padding: 20 }}>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 22, marginBottom: 6 }}>⚙️ Settings</h2>
            <p style={{ color: C.textMid, fontSize: 14, marginBottom: 24 }}>Accessibility & preferences</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
                {toggles.map(t => (
                    <div key={t.key} className="card" style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <span style={{ fontSize: 28 }}>{t.icon}</span>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600, fontSize: 14 }}>{t.label}</div>
                            <div style={{ fontSize: 12, color: C.textMid }}>{t.desc}</div>
                        </div>
                        <button onClick={() => t.set(!t.value)} style={{
                            width: 50, height: 28, borderRadius: 14, border: "none", cursor: "pointer",
                            background: t.value ? C.accent : C.border,
                            position: "relative", transition: "background 0.2s", flexShrink: 0,
                        }}>
                            <div style={{
                                width: 22, height: 22, borderRadius: "50%", background: "white",
                                position: "absolute", top: 3, left: t.value ? 25 : 3,
                                transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.4)",
                            }} />
                        </button>
                    </div>
                ))}
            </div>
            <div className="card" style={{ background: C.accentDim, borderColor: C.accent + "40" }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8, color: C.accent }}>🌐 Language Note</div>
                <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6 }}>
                    You can change the app language from the top bar at any time. The AI tutor and quiz questions will automatically use your chosen language.
                </p>
            </div>
        </div>
    );
}
