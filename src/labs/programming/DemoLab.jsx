import { C } from "../../styles/theme";

export default function DemoLab({ language }) {
    return (
        <div>
            <p style={{ color: C.textMid, marginBottom: 16 }}>
                This lab demonstrates syntax, logic flow, and output examples.
                Full execution for {language} requires system-level compilers or backend processing APIs.
            </p>

            <div style={{
                background: C.surface, color: C.textDim,
                padding: "16px", borderRadius: "8px", border: `1px solid ${C.border}`,
                fontFamily: "'Fira Code', monospace", outline: "none"
            }}>
                {`// Example Structure
int main() {
    printf("Hello World\\n");
    return 0;
}`}
            </div>
        </div>
    );
}
