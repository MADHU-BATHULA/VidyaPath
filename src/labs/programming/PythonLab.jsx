import { C } from "../../styles/theme";

export default function PythonLab() {
    return (
        <div>
            <h3>🐍 Python Lab</h3>
            <textarea
                placeholder="Write Python code here..."
                style={{ width: '100%', height: '150px', background: C.surface, color: C.text, padding: '12px', borderRadius: '8px', border: `1px solid ${C.border}`, marginTop: 16, fontFamily: 'monospace', outline: 'none' }}
            />
            <br />
            <button className="btn btn-primary" style={{ marginTop: '10px' }}>Run Code</button>
            <pre style={{ marginTop: '16px', padding: '16px', background: C.surface, borderRadius: '8px', border: `1px solid ${C.border}`, fontFamily: 'monospace', minHeight: '60px' }}>Output will appear here...</pre>
        </div>
    );
}
