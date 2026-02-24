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
        name: "Programming",
        icon: "💻",
        labs: [
            { id: "c", title: "C Programming", component: "CLab", level: "All" },
            { id: "cpp", title: "C++ Programming", component: "CPPLab", level: "All" },
            { id: "java", title: "Java Programming", component: "JavaLab", level: "All" },
            { id: "python", title: "Python Programming", component: "PythonLab", level: "All" },
        ],
    },
};
