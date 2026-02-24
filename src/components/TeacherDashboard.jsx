import { useState } from 'react';
import { C } from '../styles/theme';
import { Dot } from './common/Dot';
import { Spinner } from './common/Spinner';
import { MOCK_STUDENTS, MOCK_CONCEPT_STATS } from '../data/mockData';
import { callClaude } from '../api/claude';

export function TeacherDashboard({ onBack }) {
    const [tab, setTab] = useState("overview");
    const [lessonLoading, setLessonLoading] = useState(false);
    const [lessonPlan, setLessonPlan] = useState("");
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [studentReport, setStudentReport] = useState("");
    const [reportLoading, setReportLoading] = useState(false);

    const atRisk = MOCK_STUDENTS.filter(s => s.risk);
    const avgScore = Math.round(MOCK_STUDENTS.reduce((a, s) => a + s.score, 0) / MOCK_STUDENTS.length);

    async function generateLessonPlan() {
        setLessonLoading(true); setLessonPlan("");
        const weakConcepts = MOCK_CONCEPT_STATS.filter(c => c.struggling > 35).map(c => c.concept);
        const system = "You are an expert curriculum designer for Indian government schools. Create practical, engaging lesson plans.";
        const prompt = `Create a concise 40-minute lesson plan for tomorrow's Grade 8 class.
Class data: Average score ${avgScore}%, ${atRisk.length} students at risk.
Weakest concepts class-wide: ${weakConcepts.join(", ")}.
Format:
OBJECTIVE: [one clear learning objective]
WARM-UP (5 min): [activity]
MAIN TEACHING (20 min): [explanation approach focusing on weak areas]
PRACTICE (10 min): [activity]
ASSESSMENT (5 min): [quick check]
TEACHER TIP: [one specific tip for struggling students]`;
        try {
            const text = await callClaude([{ role: "user", content: prompt }], system);
            setLessonPlan(text);
        } catch { setLessonPlan("Could not generate plan. Please try again."); }
        setLessonLoading(false);
    }

    async function getStudentReport(student) {
        setSelectedStudent(student); setStudentReport(""); setReportLoading(true);
        const system = "You are an empathetic educational counsellor. Give practical, actionable advice.";
        const prompt = `Student report for ${student.name}:
Score: ${student.score}% (trend: ${student.trend > 0 ? "+" : ""}${student.trend}% this week)
Risk status: ${student.risk ? "At Risk" : "On Track"}
Active: ${student.active ? "Yes" : "No - not logged in for 3+ days"}
Identified gaps: ${student.gaps.length ? student.gaps.join(", ") : "None"}

Write a 3-paragraph teacher action report:
1. Assessment of the student's current situation
2. Specific immediate interventions the teacher can take
3. What to monitor in the next 2 weeks`;
        try {
            const text = await callClaude([{ role: "user", content: prompt }], system);
            setStudentReport(text);
        } catch { setStudentReport("Could not generate report."); }
        setReportLoading(false);
    }

    const tabs = [
        { id: "overview", label: "Overview", icon: "📊" },
        { id: "students", label: "Students", icon: "👥" },
        { id: "concepts", label: "Concepts", icon: "🎯" },
        { id: "lesson", label: "Lesson Plan", icon: "📝" },
    ];

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            {/* Header */}
            <div style={{
                background: C.surface, borderBottom: `1px solid ${C.border}`,
                padding: "14px 20px", display: "flex", alignItems: "center", gap: 12,
                position: "sticky", top: 0, zIndex: 100,
            }}>
                <button className="btn btn-ghost" style={{ padding: "6px 10px", fontSize: 12 }} onClick={onBack}>←</button>
                <div>
                    <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 16, color: C.accent }}>
                        VidyaPath · Teacher View
                    </div>
                    <div style={{ fontSize: 11, color: C.textMid }}>Grade 8 · Section A · {MOCK_STUDENTS.length} Students</div>
                </div>
                <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
                    <span className="badge" style={{ background: C.redDim, color: C.red }}>
                        ⚠️ {atRisk.length} at risk
                    </span>
                    <Dot color={C.green} />
                </div>
            </div>

            {/* Tab content */}
            <div style={{ flex: 1, overflowY: "auto" }}>
                {/* Overview */}
                {tab === "overview" && (
                    <div style={{ padding: 20 }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                            {[
                                { label: "Class Avg", value: `${avgScore}%`, color: avgScore >= 70 ? C.green : C.accent, icon: "📊" },
                                { label: "At Risk", value: atRisk.length, color: C.red, icon: "⚠️" },
                                { label: "Active Today", value: MOCK_STUDENTS.filter(s => s.active).length, color: C.green, icon: "✅" },
                                { label: "Total Students", value: MOCK_STUDENTS.length, color: C.blue, icon: "👥" },
                            ].map(s => (
                                <div key={s.label} className="card" style={{ textAlign: "center" }}>
                                    <div style={{ fontSize: 24, marginBottom: 4 }}>{s.icon}</div>
                                    <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 26, color: s.color }}>{s.value}</div>
                                    <div style={{ fontSize: 11, color: C.textMid }}>{s.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Score distribution bar */}
                        <div className="card" style={{ marginBottom: 16 }}>
                            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Score Distribution</div>
                            <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 80 }}>
                                {[
                                    { range: "0-40", students: MOCK_STUDENTS.filter(s => s.score <= 40), color: C.red },
                                    { range: "41-60", students: MOCK_STUDENTS.filter(s => s.score > 40 && s.score <= 60), color: C.accent },
                                    { range: "61-80", students: MOCK_STUDENTS.filter(s => s.score > 60 && s.score <= 80), color: C.blue },
                                    { range: "81-100", students: MOCK_STUDENTS.filter(s => s.score > 80), color: C.green },
                                ].map(b => (
                                    <div key={b.range} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                                        <div style={{
                                            width: "100%", borderRadius: "4px 4px 0 0",
                                            background: b.color,
                                            height: `${(b.students.length / MOCK_STUDENTS.length) * 100}%`,
                                            minHeight: 4,
                                        }} />
                                        <span style={{ fontSize: 10, color: C.textMid }}>{b.range}</span>
                                        <span style={{ fontSize: 11, fontWeight: 700, color: b.color }}>{b.students.length}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* At-risk alerts */}
                        <div className="card" style={{ borderColor: C.red + "40" }}>
                            <div style={{ fontWeight: 700, fontSize: 14, color: C.red, marginBottom: 12 }}>🚨 Students Needing Attention</div>
                            {atRisk.map(s => (
                                <div key={s.id} style={{
                                    display: "flex", alignItems: "center", gap: 12, padding: "10px 0",
                                    borderBottom: `1px solid ${C.border}`,
                                }}>
                                    <div style={{
                                        width: 36, height: 36, borderRadius: "50%",
                                        background: `linear-gradient(135deg, ${C.red}60, ${C.accent}60)`,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontWeight: 700, color: C.text, fontSize: 14, flexShrink: 0,
                                    }}>{s.name[0]}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 600, fontSize: 13 }}>{s.name}</div>
                                        <div style={{ fontSize: 11, color: C.textMid }}>
                                            {s.score}% · {s.trend < 0 ? `${s.trend}% this week` : ""} · {!s.active ? "⚡ Inactive" : ""}
                                        </div>
                                    </div>
                                    <button className="btn btn-ghost" style={{ fontSize: 11, padding: "5px 10px" }}
                                        onClick={() => { setTab("students"); setSelectedStudent(s); getStudentReport(s); }}>
                                        View →
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Students */}
                {tab === "students" && (
                    <div style={{ padding: 20 }}>
                        <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 16 }}>👥 All Students</h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            {MOCK_STUDENTS.map(s => (
                                <div key={s.id} className="card" style={{
                                    borderColor: s.risk ? C.red + "40" : C.border,
                                    background: s.risk ? C.redDim : C.card,
                                }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                        <div style={{
                                            width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
                                            background: `linear-gradient(135deg, ${s.risk ? C.red : C.green}60, ${C.blue}60)`,
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontWeight: 700, color: C.text, fontSize: 16,
                                        }}>{s.name[0]}</div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 700, fontSize: 14 }}>{s.name}</div>
                                            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 4 }}>
                                                <span className="badge" style={{ background: s.score >= 70 ? C.greenDim : C.redDim, color: s.score >= 70 ? C.green : C.red }}>
                                                    {s.score}%
                                                </span>
                                                <span className="badge" style={{ background: s.trend >= 0 ? C.greenDim : C.redDim, color: s.trend >= 0 ? C.green : C.red }}>
                                                    {s.trend >= 0 ? "↑" : "↓"} {Math.abs(s.trend)}%
                                                </span>
                                                {!s.active && <span className="badge" style={{ background: C.accentDim, color: C.accent }}>Inactive</span>}
                                                {s.risk && <span className="badge" style={{ background: C.redDim, color: C.red }}>At Risk</span>}
                                            </div>
                                        </div>
                                        <button className="btn btn-ghost" style={{ fontSize: 11, padding: "6px 12px", flexShrink: 0 }}
                                            onClick={() => getStudentReport(s)}>
                                            AI Report
                                        </button>
                                    </div>
                                    {s.gaps.length > 0 && (
                                        <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${C.border}` }}>
                                            <span style={{ fontSize: 11, color: C.textMid }}>Gaps: </span>
                                            {s.gaps.map(g => <span key={g} className="tag" style={{ marginRight: 4, fontSize: 10 }}>{g}</span>)}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Student report modal */}
                        {selectedStudent && (
                            <div style={{
                                position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)",
                                zIndex: 200, display: "flex", alignItems: "flex-end",
                                padding: 0,
                            }} onClick={() => { setSelectedStudent(null); setStudentReport(""); }}>
                                <div style={{
                                    width: "100%", maxHeight: "80vh", background: C.card,
                                    borderRadius: "20px 20px 0 0", padding: 24, overflowY: "auto",
                                    border: `1px solid ${C.border}`,
                                }} onClick={e => e.stopPropagation()}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                                        <div>
                                            <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 18 }}>{selectedStudent.name}</div>
                                            <div style={{ fontSize: 12, color: C.textMid }}>AI-Generated Report</div>
                                        </div>
                                        <button className="btn btn-ghost" style={{ padding: "6px 12px" }} onClick={() => { setSelectedStudent(null); setStudentReport(""); }}>✕</button>
                                    </div>
                                    {reportLoading ? (
                                        <div style={{ textAlign: "center", padding: 40 }}>
                                            <Spinner />
                                            <p style={{ color: C.textMid, marginTop: 12, fontSize: 13 }}>Generating AI report…</p>
                                        </div>
                                    ) : (
                                        <p style={{ fontSize: 14, lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{studentReport}</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Concepts */}
                {tab === "concepts" && (
                    <div style={{ padding: 20 }}>
                        <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 16 }}>🎯 Concept Mastery</h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            {MOCK_CONCEPT_STATS.map(c => (
                                <div key={c.concept} className="card">
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                                        <span style={{ fontWeight: 700, fontSize: 14 }}>{c.concept}</span>
                                        <div style={{ display: "flex", gap: 8 }}>
                                            <span className="badge" style={{ background: C.greenDim, color: C.green }}>{c.mastered}% mastered</span>
                                            <span className="badge" style={{ background: C.redDim, color: C.red }}>{c.struggling}% struggling</span>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", height: 10, borderRadius: 5, overflow: "hidden", gap: 2 }}>
                                        <div style={{ width: `${c.mastered}%`, background: C.green, borderRadius: "4px 0 0 4px" }} />
                                        <div style={{ width: `${c.struggling}%`, background: C.red, borderRadius: "0 4px 4px 0" }} />
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                                        <span style={{ fontSize: 11, color: C.green }}>✓ {c.mastered}% students</span>
                                        <span style={{ fontSize: 11, color: C.red }}>⚠ {c.struggling}% students</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="card" style={{ marginTop: 16, borderColor: C.accent + "40", background: C.accentDim }}>
                            <div style={{ fontWeight: 700, fontSize: 13, color: C.accent, marginBottom: 8 }}>📌 Focus Area for This Week</div>
                            <p style={{ fontSize: 13, lineHeight: 1.7 }}>
                                <strong>Fractions</strong> (55% struggling) and <strong>Photosynthesis</strong> (38% struggling) need the most attention. Generate a lesson plan to get targeted teaching strategies.
                            </p>
                        </div>
                    </div>
                )}

                {/* Lesson Plan */}
                {tab === "lesson" && (
                    <div style={{ padding: 20 }}>
                        <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 6 }}>📝 AI Lesson Plan Generator</h2>
                        <p style={{ color: C.textMid, fontSize: 13, marginBottom: 20 }}>
                            Generate a personalised lesson plan based on your class's current performance data
                        </p>

                        <div className="card" style={{ marginBottom: 20, background: C.blueDim, borderColor: C.blue + "40" }}>
                            <div style={{ fontWeight: 700, fontSize: 13, color: C.blue, marginBottom: 8 }}>📊 Current Class Summary</div>
                            <div style={{ fontSize: 13, color: C.textMid, lineHeight: 1.8 }}>
                                Class Average: <strong style={{ color: C.text }}>{avgScore}%</strong> · At-risk students: <strong style={{ color: C.red }}>{atRisk.length}</strong>
                                <br />Weakest areas: <strong style={{ color: C.text }}>Fractions, Photosynthesis</strong>
                            </div>
                        </div>

                        <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: 16, fontSize: 15, marginBottom: 20 }}
                            onClick={generateLessonPlan} disabled={lessonLoading}>
                            {lessonLoading ? <><Spinner /> Generating…</> : "🎯 Generate Tomorrow's Lesson Plan"}
                        </button>

                        {lessonPlan && (
                            <div className="card fade-up">
                                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>📋 Lesson Plan — Tomorrow</div>
                                <p style={{ fontSize: 14, lineHeight: 1.9, whiteSpace: "pre-wrap" }}>{lessonPlan}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Bottom nav */}
            <div style={{
                background: C.surface, borderTop: `1px solid ${C.border}`,
                display: "flex", padding: "8px 4px 12px",
                position: "sticky", bottom: 0,
            }}>
                {tabs.map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} style={{
                        flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                        padding: "8px 4px", border: "none", background: "transparent", cursor: "pointer",
                        color: tab === t.id ? C.accent : C.textMid, transition: "color 0.18s",
                    }}>
                        <span style={{ fontSize: 20, lineHeight: 1 }}>{t.icon}</span>
                        <span style={{ fontSize: 10, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>{t.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
