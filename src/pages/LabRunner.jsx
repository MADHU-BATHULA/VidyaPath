import OhmsLawLab from "../labs/physics/OhmsLawLab";
import PendulumLab from "../labs/physics/PendulumLab";
import PHScaleLab from "../labs/chemistry/PHScaleLab";
import ReactionRateLab from "../labs/chemistry/ReactionRateLab";
import JavaScriptLab from "../labs/programming/JavaScriptLab";
import PythonLab from "../labs/programming/PythonLab";
import HtmlCssLab from "../labs/programming/HtmlCssLab";
import DemoLab from "../labs/programming/DemoLab";
import { C } from "../styles/theme";

const LAB_MAP = {
    OhmsLawLab,
    PendulumLab,
    PHScaleLab,
    ReactionRateLab,
    JavaScriptLab,
    PythonLab,
    HtmlCssLab,
    DemoLab,
};

export default function LabRunner({ activeLab, onBack }) {
    if (!activeLab) return null;

    const LabComponent = LAB_MAP[activeLab.lab.component];

    if (!LabComponent) {
        return (
            <div style={{ padding: 20 }}>
                <button className="btn btn-ghost" style={{ fontSize: 12, marginBottom: 16 }} onClick={onBack}>
                    ← Back to Labs
                </button>
                <div className="card fade-up">
                    <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 16 }}>
                        {activeLab.lab.title}
                    </h2>
                    <p>Lab simulation is not currently available.</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ padding: 20 }}>
            <button className="btn btn-ghost" style={{ fontSize: 12, marginBottom: 16 }} onClick={onBack}>
                ← Back to Labs
            </button>
            <div className="card fade-up">
                <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 16, color: C.accent }}>
                    {activeLab.lab.title}
                </h2>
                <LabComponent language={activeLab.lab.title} />
            </div>
        </div>
    );
}
