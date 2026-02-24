export const LAB_CATALOG = {
    physics: {
        name: "Physics",
        icon: "⚡",
        labs: [
            {
                id: "ohms-law",
                title: "Ohm’s Law",
                component: "OhmsLawLab",
                level: "Class 9–10",
            },
            {
                id: "pendulum",
                title: "Simple Pendulum",
                component: "PendulumLab",
                level: "Class 10",
            },
        ],
    },
    chemistry: {
        name: "Chemistry",
        icon: "🧪",
        labs: [
            {
                id: "ph-scale",
                title: "pH Scale",
                component: "PHScaleLab",
                level: "Class 8–10",
            },
            {
                id: "reaction-rate",
                title: "Reaction Rate",
                component: "ReactionRateLab",
                level: "Class 11",
            },
        ],
    },
    programming: {
        name: "Programming Labs",
        icon: "💻",
        labs: [
            { id: "js", title: "JavaScript", component: "JavaScriptLab", executable: true, level: "All" },
            { id: "python", title: "Python", component: "PythonLab", executable: true, level: "All" },
            { id: "html", title: "HTML / CSS", component: "HtmlCssLab", executable: true, level: "All" },
            { id: "c", title: "C Programming", component: "DemoLab", executable: false, level: "All" },
            { id: "cpp", title: "C++ Programming", component: "DemoLab", executable: false, level: "All" },
            { id: "java", title: "Java Programming", component: "DemoLab", executable: false, level: "All" },
        ],
    },
};
