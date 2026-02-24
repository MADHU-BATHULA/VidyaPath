export const LANGS = { en: "English", te: "Telugu (తెలుగు)", hi: "Hindi (हिंदी)", ta: "Tamil (தமிழ்)", kn: "Kannada (ಕನ್ನಡ)" };

export const SUBJECTS = {
    science: {
        label: "Science", icon: "🔬",
        topics: ["Photosynthesis", "The Human Eye", "Newton's Laws", "Electricity", "Atoms & Molecules"],
    },
    math: {
        label: "Mathematics", icon: "📐",
        topics: ["Fractions", "Algebra Basics", "Geometry", "Statistics", "Trigonometry"],
    },
    english: {
        label: "English", icon: "📖",
        topics: ["Grammar", "Reading Comprehension", "Essay Writing", "Vocabulary", "Poetry"],
    },
    social: {
        label: "Social Studies", icon: "🌍",
        topics: ["Indian History", "Geography", "Civics", "Economics", "Environment"],
    },
};

export const MOCK_STUDENTS = [
    { id: 1, name: "Arjun Kumar", score: 82, trend: +5, risk: false, active: true, gaps: ["Fractions", "Algebra"] },
    { id: 2, name: "Priya Lakshmi", score: 45, trend: -12, risk: true, active: true, gaps: ["Photosynthesis", "Atoms"] },
    { id: 3, name: "Ravi Teja", score: 91, trend: +3, risk: false, active: true, gaps: [] },
    { id: 4, name: "Sameera Banu", score: 38, trend: -8, risk: true, active: false, gaps: ["Grammar", "Vocabulary"] },
    { id: 5, name: "Kiran Reddy", score: 67, trend: +1, risk: false, active: true, gaps: ["Geometry"] },
    { id: 6, name: "Anjali Sharma", score: 55, trend: -4, risk: true, active: true, gaps: ["Newton's Laws", "Electricity"] },
    { id: 7, name: "Mohan Das", score: 78, trend: +9, risk: false, active: true, gaps: ["Statistics"] },
    { id: 8, name: "Divya Nair", score: 29, trend: -15, risk: true, active: false, gaps: ["Fractions", "Geometry", "Algebra"] },
];

export const MOCK_CONCEPT_STATS = [
    { concept: "Photosynthesis", mastered: 62, struggling: 38 },
    { concept: "Fractions", mastered: 45, struggling: 55 },
    { concept: "Newton's Laws", mastered: 71, struggling: 29 },
    { concept: "Grammar", mastered: 58, struggling: 42 },
    { concept: "Indian History", mastered: 80, struggling: 20 },
];
