import { useEffect, useState } from "react";
import { C } from "../../styles/theme";

export default function PythonLab() {
    const [pyodide, setPyodide] = useState(null);
    const [code, setCode] = useState("print('Hello VidyaPath')\n");
    const [output, setOutput] = useState("Loading Python environment... please wait...");
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let isMounted = true;
        async function load() {
            try {
                if (!window.loadPyodide) {
                    setOutput("Pyodide script not loaded. Make sure it's in index.html.");
                    return;
                }
                const py = await window.loadPyodide({
                    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
                    stdout: (text) => setOutput((prev) => prev !== "Python Ready" && prev !== "Loading Python environment... please wait..." ? prev + text + "\n" : text + "\n"),
                });
                if (isMounted) {
                    setPyodide(py);
                    setOutput("Python Ready");
                }
            } catch (e) {
                if (isMounted) setOutput("Failed to load Python: " + e.message);
            }
        }
        load();
        return () => { isMounted = false; };
    }, []);

    async function runCode() {
        if (!pyodide) return;
        setIsRunning(true);
        setOutput(""); // clear prev output

        // Pyodide stdout config allows us to redirect print directly (done in initialization)
        // But since `runPython` returns the last evaluated statement, we might need a mix
        try {
            const result = await pyodide.runPythonAsync(code);
            if (result !== undefined) {
                setOutput((prev) => prev + String(result) + "\n");
            }
        } catch (err) {
            setOutput(err.toString());
        } finally {
            setIsRunning(false);
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
            <button
                className="btn btn-green"
                style={{ marginTop: 12, opacity: (!pyodide || isRunning) ? 0.6 : 1 }}
                onClick={runCode}
                disabled={!pyodide || isRunning}
            >
                {isRunning ? "⏳ Running..." : "▶ Run"}
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
