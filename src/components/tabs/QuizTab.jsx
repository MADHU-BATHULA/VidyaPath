import { useState } from 'react';
import { C } from '../../styles/theme';
import { LANGS, SUBJECTS } from '../../data/mockData';
import { callClaude } from '../../api/claude';
import { Spinner } from '../common/Spinner';
import { ProgressRing } from '../common/ProgressRing';

export function QuizTab({ profile, lang }) {
    const [phase, setPhase] = useState("pick"); // pick | loading | active | result
    const [subject, setSubject] = useState("science");
    const [questions, setQuestions] = useState([]);
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [selected, setSelected] = useState(null);
    const [analysis, setAnalysis] = useState("");
    const [studyPlan, setStudyPlan] = useState("");
    const [analysisLoading, setAnalysisLoading] = useState(false);

    async function generateQuiz() {
        setPhase("loading");
        const subj = SUBJECTS[subject];
        const langName = LANGS[lang] || "English";
        const system = `You are a quiz generator for Grade ${profile?.grade || 8} students in India. Generate questions in ${langName}. 
Return ONLY valid JSON, no other text.`;
        const prompt = `Generate 5 multiple-choice questions about ${subj.label} for Grade ${profile?.grade || 8}.
Each question must cover a different topic from: ${subj.topics.join(", ")}.
Return JSON array:
[{"q":"question text","opts":["A","B","C","D"],"ans":0,"topic":"topic name"}]
Where "ans" is the index (0-3) of the correct option.`;
        try {
            const raw = await callClaude([{ role: "user", content: prompt }], system);
            const clean = raw.replace(/```json|```/g, "").trim();
            const parsed = JSON.parse(clean);
            setQuestions(parsed); setCurrent(0); setAnswers([]); setSelected(null);
            setPhase("active");
        } catch {
            // Fallback questions
            setQuestions([
                { q: "Which gas do plants absorb during photosynthesis?", opts: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], ans: 1, topic: "Photosynthesis" },
                { q: "What is the unit of electric current?", opts: ["Volt", "Watt", "Ampere", "Ohm"], ans: 2, topic: "Electricity" },
                { q: "Newton's first law is also called the law of:", opts: ["Acceleration", "Inertia", "Gravity", "Motion"], ans: 1, topic: "Newton's Laws" },
                { q: "What is the chemical formula of water?", opts: ["H2O2", "CO2", "H2O", "NaCl"], ans: 2, topic: "Atoms & Molecules" },
                { q: "The human eye focuses light on the:", opts: ["Cornea", "Iris", "Retina", "Pupil"], ans: 2, topic: "The Human Eye" },
            ]);
            setCurrent(0); setAnswers([]); setSelected(null);
            setPhase("active");
        }
    }

    function submitAnswer() {
        const newAnswers = [...answers, { q: current, chosen: selected, correct: questions[current].ans, topic: questions[current].topic }];
        setAnswers(newAnswers);
        if (current < questions.length - 1) {
            setCurrent(c => c + 1); setSelected(null);
        } else {
            setPhase("result");
            runAnalysis(newAnswers);
        }
    }

    async function runAnalysis(ans) {
        setAnalysisLoading(true);
        const wrong = ans.filter(a => a.chosen !== a.correct).map(a => a.topic);
        const score = ans.filter(a => a.chosen === a.correct).length;
        if (wrong.length === 0) {
            setAnalysis("🎉 Perfect score! Excellent understanding of all concepts.");
            setStudyPlan("Keep up the great work! Try a harder challenge next time.");
            setAnalysisLoading(false); return;
        }
        const langName = LANGS[lang] || "English";
        const system = `You are an empathetic learning coach. Respond in ${langName}. Be encouraging and specific.`;
        const prompt = `A Grade ${profile?.grade || 8} student scored ${score}/5 on a ${SUBJECTS[subject].label} quiz.
Wrong topics: ${wrong.join(", ")}.
1. Give a 2-sentence empathetic analysis of their learning gaps.
2. Create a 3-step micro-study plan to fix these gaps (specific, actionable).
Format as:
ANALYSIS: [your analysis]
PLAN:
Step 1: [action]
Step 2: [action]  
Step 3: [action]`;
        try {
            const text = await callClaude([{ role: "user", content: prompt }], system);
            const parts = text.split("PLAN:");
            setAnalysis(parts[0].replace("ANALYSIS:", "").trim());
            setStudyPlan(parts[1]?.trim() || text);
        } catch { setAnalysis("Review your incorrect topics and practice more."); }
        setAnalysisLoading(false);
    }

    if (phase === "pick") return (
        <div style={{ padding: 20 }}>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 22, marginBottom: 6 }}>🎯 Adaptive Quiz</h2>
            <p style={{ color: C.textMid, fontSize: 14, marginBottom: 24 }}>AI analyses your answers to find learning gaps</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
                {Object.entries(SUBJECTS).map(([key, subj]) => (
                    <button key={key} onClick={() => setSubject(key)} style={{
                        padding: "16px", borderRadius: 12, cursor: "pointer", textAlign: "center",
                        border: `2px solid ${subject === key ? C.accent : C.border}`,
                        background: subject === key ? C.accentDim : C.card,
                        color: C.text, transition: "all 0.18s",
                    }}>
                        <div style={{ fontSize: 28, marginBottom: 4 }}>{subj.icon}</div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{subj.label}</div>
                    </button>
                ))}
            </div>
            <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: 16, fontSize: 16 }}
                onClick={generateQuiz}>
                Generate 5 AI Questions →
            </button>
        </div>
    );

    if (phase === "loading") return (
        <div style={{ padding: 20, textAlign: "center", paddingTop: 80 }}>
            <Spinner />
            <p style={{ color: C.textMid, marginTop: 16, fontSize: 14 }}>Generating personalised questions…</p>
        </div>
    );

    if (phase === "active") {
        const q = questions[current];
        return (
            <div style={{ padding: 20 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                    <span style={{ fontSize: 13, color: C.textMid }}>Question {current + 1}/{questions.length}</span>
                    <span className="badge" style={{ background: C.accentDim, color: C.accent }}>{q.topic}</span>
                </div>
                <div className="progress-bar" style={{ marginBottom: 24 }}>
                    <div className="progress-fill" style={{ width: `${((current) / questions.length) * 100}%` }} />
                </div>
                <div className="card" style={{ marginBottom: 20, padding: 24 }}>
                    <p style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.6 }}>{q.q}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                    {q.opts.map((opt, i) => (
                        <button key={i} onClick={() => setSelected(i)} style={{
                            padding: "14px 18px", borderRadius: 12, cursor: "pointer", textAlign: "left",
                            border: `2px solid ${selected === i ? C.accent : C.border}`,
                            background: selected === i ? C.accentDim : C.card,
                            color: C.text, fontFamily: "inherit", fontSize: 15, transition: "all 0.15s",
                            display: "flex", alignItems: "center", gap: 12,
                        }}>
                            <span style={{
                                width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                                background: selected === i ? C.accent : C.surface,
                                color: selected === i ? "#0D1117" : C.textMid,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 12, fontWeight: 700,
                            }}>{String.fromCharCode(65 + i)}</span>
                            {opt}
                        </button>
                    ))}
                </div>
                <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: 14, fontSize: 16 }}
                    disabled={selected === null} onClick={submitAnswer}>
                    {current < questions.length - 1 ? "Next Question →" : "Submit Quiz ✓"}
                </button>
            </div>
        );
    }

    // Results
    const score = answers.filter(a => a.chosen === a.correct).length;
    const pct = Math.round((score / questions.length) * 100);
    return (
        <div style={{ padding: 20 }}>
            <div className="card fade-up" style={{ textAlign: "center", marginBottom: 20, padding: 32 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                    <div style={{ position: "relative" }}>
                        <ProgressRing pct={pct} size={100} stroke={8} color={pct >= 70 ? C.green : pct >= 40 ? C.accent : C.red} />
                        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 22 }}>{score}/{questions.length}</span>
                        </div>
                    </div>
                </div>
                <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 8 }}>
                    {pct >= 80 ? "🌟 Excellent!" : pct >= 60 ? "👍 Good job!" : "💪 Keep going!"}
                </div>
                <div style={{ color: C.textMid, fontSize: 14 }}>Score: {pct}%</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                {answers.map((a, i) => (
                    <div key={i} style={{
                        padding: "12px 16px", borderRadius: 10,
                        background: a.chosen === a.correct ? C.greenDim : C.redDim,
                        border: `1px solid ${a.chosen === a.correct ? C.green + "50" : C.red + "50"}`,
                        display: "flex", alignItems: "center", gap: 10,
                    }}>
                        <span style={{ fontSize: 18 }}>{a.chosen === a.correct ? "✅" : "❌"}</span>
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 600 }}>{questions[i]?.q?.slice(0, 60)}…</div>
                            <div style={{ fontSize: 11, color: C.textMid }}>{a.topic}</div>
                        </div>
                    </div>
                ))}
            </div>

            {analysisLoading ? (
                <div className="card" style={{ textAlign: "center", padding: 32 }}>
                    <Spinner />
                    <p style={{ color: C.textMid, marginTop: 12, fontSize: 13 }}>AI is analysing your gaps…</p>
                </div>
            ) : (
                <>
                    {analysis && (
                        <div className="card fade-up" style={{ marginBottom: 12, borderColor: C.blue + "40", background: C.blueDim }}>
                            <div style={{ fontSize: 12, color: C.blue, fontWeight: 700, marginBottom: 8 }}>🧠 AI Analysis</div>
                            <p style={{ fontSize: 14, lineHeight: 1.7 }}>{analysis}</p>
                        </div>
                    )}
                    {studyPlan && (
                        <div className="card fade-up" style={{ marginBottom: 20, borderColor: C.green + "40", background: C.greenDim }}>
                            <div style={{ fontSize: 12, color: C.green, fontWeight: 700, marginBottom: 8 }}>📋 Your Study Plan</div>
                            <p style={{ fontSize: 13, lineHeight: 1.9, whiteSpace: "pre-wrap" }}>{studyPlan}</p>
                        </div>
                    )}
                </>
            )}

            <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}
                onClick={() => setPhase("pick")}>Try Another Quiz</button>
        </div>
    );
}
