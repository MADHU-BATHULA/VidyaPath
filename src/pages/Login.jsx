import { useState } from "react";
import { login } from "../auth/authService";
import { C } from "../styles/theme";

export default function Login({ role, onLogin, onBack }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleLogin() {
        const user = login(username, password, role);
        if (!user) {
            setError("Invalid credentials");
        } else {
            onLogin(user);
        }
    }

    return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
            <div className="card fade-up" style={{ width: "100%", maxWidth: 360, padding: 32 }}>
                <button className="btn btn-ghost" style={{ fontSize: 13, marginBottom: 16, padding: "4px 8px" }} onClick={onBack}>
                    ← Back
                </button>
                <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 24, fontWeight: 700, marginBottom: 24, textAlign: "center" }}>
                    🔐 {role === "student" ? "Student" : "Teacher"} Login
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>                    <input
                    className="input"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                    <input
                        className="input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <p style={{ color: C.red, fontSize: 13, textAlign: "center", margin: 0 }}>{error}</p>}

                    <button className="btn btn-primary" style={{ justifyContent: "center", marginTop: 8 }} onClick={handleLogin}>
                        Login
                    </button>
                </div>

                <div style={{ marginTop: 24, padding: 16, background: C.surface, borderRadius: 8, fontSize: 12, color: C.textMid, lineHeight: 1.6 }}>
                    <strong>Demo accounts:</strong><br />
                    {role === "student" ? "Student → student1 / student123" : "Teacher → teacher1 / teacher123"}
                </div>
            </div>
        </div>
    );
}
