import { LAB_CATALOG } from "../data/labCatalog";
import { C } from "../styles/theme";

export default function VirtualLabs({ setActiveLab }) {
    return (
        <div style={{ padding: 20 }}>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 22, marginBottom: 20 }}>🔬 Virtual Labs</h2>

            {Object.entries(LAB_CATALOG).map(([key, subject]) => (
                <div key={key} className="card fade-up" style={{ marginBottom: 20 }}>
                    <h3 style={{ marginBottom: 16 }}>{subject.icon} {subject.name}</h3>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                        {subject.labs.map(lab => (
                            <button
                                key={lab.id}
                                onClick={() => setActiveLab({ subject: key, lab })}
                                style={{
                                    padding: "16px", borderRadius: 12, cursor: "pointer", textAlign: "left",
                                    border: `1px solid ${C.border}`,
                                    background: C.surface,
                                    color: C.text, transition: "all 0.18s", display: "flex", flexDirection: "column"
                                }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; }}
                            >
                                <div style={{ fontWeight: 600, fontSize: 15 }}>{lab.title}</div>
                                <div style={{ fontSize: 12, color: C.textMid, marginTop: 4 }}>Level: {lab.level || "All"}</div>
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
