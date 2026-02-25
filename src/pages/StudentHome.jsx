import { StudentApp } from "../components/StudentApp";
import { logout } from "../auth/authService";
import { C } from "../styles/theme";

export default function StudentHome({ user, onLogout, studentProps }) {
    // Pass down the user dynamically as the profile
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <div style={{
                padding: "16px 20px", background: C.surface, color: C.text,
                borderBottom: `1px solid ${C.border}`, display: "flex",
                justifyContent: "space-between", alignItems: "center"
            }}>
                <div style={{ fontWeight: 600 }}>👋 Welcome, {user.name}</div>
                <button className="btn btn-ghost" style={{ padding: "6px 14px", fontSize: 13 }} onClick={() => { logout(); onLogout(); }}>
                    Logout
                </button>
            </div>
            <div style={{ flex: 1, position: "relative" }}>
                <StudentApp profile={user} {...studentProps} />
            </div>
        </div>
    );
}
