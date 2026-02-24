import { useState } from "react";
import { C } from "../../styles/theme";

export default function HtmlCssLab() {
    const [code, setCode] = useState(
        `<h1>Hello VidyaPath</h1>
<p>This is HTML preview</p>
<style>
  body { font-family: sans-serif; color: green; }
</style>`
    );

    return (
        <div>
            <textarea
                value={code}
                onChange={e => setCode(e.target.value)}
                rows={8}
                style={{
                    width: "100%", background: C.surface, color: "#E6EDF3",
                    padding: "16px", borderRadius: "8px", border: `1px solid ${C.border}`,
                    fontFamily: "'Fira Code', monospace", outline: "none", resize: "vertical",
                    marginBottom: 16
                }}
            />
            <div style={{ background: "#fff", padding: "8px", borderRadius: "8px", height: "300px" }}>
                <iframe
                    title="preview"
                    style={{ width: "100%", height: "100%", border: "none", background: "#fff" }}
                    srcDoc={code}
                />
            </div>
        </div>
    );
}
