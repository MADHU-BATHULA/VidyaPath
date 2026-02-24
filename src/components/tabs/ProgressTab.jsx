import { useState } from 'react';
import { C } from '../../styles/theme';

export function ProgressTab({ profile }) {
    const mockData = {
        streak: 7,
        totalQuizzes: 14,
        avgScore: 72,
        subjects: [
            { name: "Science", score: 78, quizzes: 5 },
            { name: "Mathematics", score: 65, quizzes: 4 },
            { name: "English", score: 82, quizzes: 3 },
            { name: "Social Studies", score: 70, quizzes: 2 },
        ],
        recentGaps: ["Fractions", "Photosynthesis", "Grammar"],
        weeklyScores: [55, 62, 58, 71, 75, 72, 78],
    };

    return (
        <div style={{ padding: 20 }}>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 22, marginBottom: 20 }}>📊 My Progress</h2>

            {/* Stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
                {[
                    { label: "Day Streak", value: `${mockData.streak}🔥`, color: C.accent },
                    { label: "Quizzes Done", value: mockData.totalQuizzes, color: C.blue },
                    { label: "Avg Score", value: `${mockData.avgScore}%`, color: C.green },
                ].map(s => (
                    <div key={s.label} className="card" style={{ textAlign: "center", padding: "16px 10px" }}>
                        <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 22, color: s.color }}>{s.value}</div>
                        <div style={{ fontSize: 10, color: C.textMid, marginTop: 4 }}>{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Weekly chart */}
            <div className="card" style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>📈 Weekly Scores</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 80 }}>
                    {mockData.weeklyScores.map((s, i) => (
                        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                            <div style={{
                                width: "100%", background: i === 6 ? C.accent : C.border,
                                borderRadius: "4px 4px 0 0", height: `${s}%`, minHeight: 4,
                                transition: "height 0.8s ease",
                            }} />
                            <span style={{ fontSize: 9, color: C.textDim }}>
                                {["M", "T", "W", "T", "F", "S", "S"][i]}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Subject breakdown */}
            <div className="card" style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Subject Performance</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {mockData.subjects.map(s => (
                        <div key={s.name}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                                <span style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</span>
                                <span style={{ fontSize: 13, color: s.score >= 70 ? C.green : C.accent }}>{s.score}%</span>
                            </div>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{
                                    width: `${s.score}%`,
                                    background: s.score >= 70 ? C.green : C.accent,
                                }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Learning gaps */}
            <div className="card" style={{ borderColor: C.red + "40", background: C.redDim }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10, color: C.red }}>⚠️ Concepts to Review</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {mockData.recentGaps.map(g => (
                        <span key={g} style={{
                            padding: "5px 12px", borderRadius: 20, background: C.surface,
                            border: `1px solid ${C.red}40`, fontSize: 12, fontWeight: 600, color: C.red,
                        }}>{g}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}
