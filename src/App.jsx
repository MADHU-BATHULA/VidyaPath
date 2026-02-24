import { useState } from "react";
import { Landing } from "./components/Landing";
import { Onboard } from "./components/Onboard";
import { TeacherDashboard } from "./components/TeacherDashboard";
import { StudentApp } from "./components/StudentApp";
import './styles/global.css';

export default function App() {
  const [view, setView] = useState("landing"); // landing | onboard | student | teacher
  const [profile, setProfile] = useState(null);
  const [dyslexia, setDyslexia] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [lang, setLang] = useState("en");
  const [studentTab, setStudentTab] = useState("learn");

  const rootClass = [dyslexia && "dyslexia-mode", highContrast && "high-contrast-mode"].filter(Boolean).join(" ");

  if (view === "landing") return (
    <div className={rootClass}>
      <Landing onEnter={(role) => setView(role === "teacher" ? "teacher" : "onboard")} />
    </div>
  );

  if (view === "onboard") return (
    <div className={rootClass}>
      <Onboard onDone={(p) => { setProfile(p); setLang(p.lang); setDyslexia(p.dyslexia); setView("student"); }} />
    </div>
  );

  if (view === "teacher") return (
    <div className={rootClass}>
      <TeacherDashboard onBack={() => setView("landing")} />
    </div>
  );

  return (
    <div className={rootClass}>
      <StudentApp
        profile={profile}
        lang={lang}
        setLang={setLang}
        dyslexia={dyslexia}
        setDyslexia={setDyslexia}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        tab={studentTab}
        setTab={setStudentTab}
        onBack={() => setView("landing")}
      />
    </div>
  );
}
