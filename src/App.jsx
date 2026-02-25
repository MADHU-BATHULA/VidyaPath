import { useEffect, useState } from "react";
import Login from "./pages/Login";
import StudentHome from "./pages/StudentHome";
import TeacherHome from "./pages/TeacherHome";
import { getCurrentUser } from "./auth/authService";
import "./styles/global.css";
import { Landing } from "./components/Landing";
import ChatbotLauncher from "./components/chatbot/ChatbotLauncher";

export default function App() {
  const [user, setUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  // Keep accessible states for the student app here
  const [dyslexia, setDyslexia] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [lang, setLang] = useState("en");
  const [studentTab, setStudentTab] = useState("learn");

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const rootClass = [
    dyslexia && "dyslexia-mode",
    highContrast && "high-contrast-mode"
  ].filter(Boolean).join(" ");

  const renderContent = () => {
    if (user) {
      if (user.role === "teacher") {
        return <TeacherHome user={user} onLogout={() => setUser(null)} />;
      }
      const studentProps = {
        lang, setLang, dyslexia, setDyslexia, highContrast, setHighContrast,
        tab: studentTab, setTab: setStudentTab, onBack: () => setUser(null)
      };
      return <StudentHome user={user} onLogout={() => setUser(null)} studentProps={studentProps} />;
    }

    if (selectedRole) {
      return (
        <Login
          role={selectedRole}
          onLogin={setUser}
          onBack={() => setSelectedRole(null)}
        />
      );
    }

    return <Landing onEnter={setSelectedRole} />;
  };

  return (
    <div className={rootClass}>
      {renderContent()}
      <ChatbotLauncher />
    </div>
  );
}