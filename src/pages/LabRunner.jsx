import OhmsLawLab from "../labs/physics/OhmsLawLab";
import PendulumLab from "../labs/physics/PendulumLab";
import PHScaleLab from "../labs/chemistry/PHScaleLab";
import ReactionRateLab from "../labs/chemistry/ReactionRateLab";
import CLab from "../labs/programming/CLab";
import JavaLab from "../labs/programming/JavaLab";
import PythonLab from "../labs/programming/PythonLab";
import CPPLab from "../labs/programming/CPPLab";
import { C } from "../styles/theme";

const LAB_MAP = {
    OhmsLawLab,
    PendulumLab,
    PHScaleLab,
    ReactionRateLab,
    CLab,
    CPPLab,
    JavaLab,
    PythonLab,
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
                <LabComponent />
            </div>
        </div>
    );
}
