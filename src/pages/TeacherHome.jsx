import { logout } from "../auth/authService";
import { C } from "../styles/theme";
import { TeacherDashboard } from "../components/TeacherDashboard";

export default function TeacherHome({ user, onLogout }) {
    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <div style={{
                padding: "16px 20px", background: C.surface, color: C.text,
                borderBottom: `1px solid ${C.border}`, display: "flex",
                justifyContent: "space-between", alignItems: "center"
            }}>
                <div style={{ fontWeight: 600 }}>👨‍🏫 Teacher Dashboard - Welcome, {user.name}</div>
                <button className="btn btn-ghost" style={{ padding: "6px 14px", fontSize: 13 }} onClick={() => { logout(); onLogout(); }}>
                    Logout
                </button>
            </div>

            {/* Integrating the previous Teacher Dashboard */}
            <TeacherDashboard onBack={() => { logout(); onLogout(); }} />
        </div>
    );
}
