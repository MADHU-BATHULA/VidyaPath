import { useState } from "react";
import { C } from "../../styles/theme";

export default function JavaScriptLab() {
    const [code, setCode] = useState("console.log('Hello VidyaPath');");
    const [output, setOutput] = useState("");

    function runCode() {
        try {
            const logs = [];
            const originalLog = console.log;
            console.log = (...args) => logs.push(args.join(" "));

            // eslint-disable-next-line no-eval
            eval(code);

            console.log = originalLog;
            setOutput(logs.join("\n") || "No output");
        } catch (err) {
            setOutput(err.toString());
        }
    }

    return (
        <div>
            <textarea
                value={code}
                onChange={e => setCode(e.target.value)}
                rows={8}
                style={{
                    width: "100%", background: C.surface, color: "#E6EDF3",
                    padding: "16px", borderRadius: "8px", border: `1px solid ${C.border}`,
                    fontFamily: "'Fira Code', monospace", outline: "none", resize: "vertical"
                }}
            />
            <button className="btn btn-green" style={{ marginTop: 12 }} onClick={runCode}>
                ▶ Run
            </button>
            <pre style={{
                marginTop: "16px", padding: "16px", background: C.bg,
                borderRadius: "8px", border: `1px solid ${C.border}`,
                fontFamily: "'Fira Code', monospace", minHeight: "80px",
                color: "#3FB950", whiteSpace: "pre-wrap", wordBreak: "break-all"
            }}>
                {output || "// Output will appear here..."}
            </pre>
        </div>
    );
}
