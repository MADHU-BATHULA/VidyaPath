import { useState } from "react";
import AuraChat from "./AuraChat";
import "./chatbot.css";

export default function ChatbotLauncher() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Floating Button */}
            <button
                className="chatbot-fab"
                onClick={() => setOpen(true)}
                aria-label="Open AI Assistant"
            >
                ✦
            </button>

            {/* Chatbot Modal */}
            {open && (
                <div className="chatbot-overlay">
                    <div className="chatbot-modal">
                        <button className="chatbot-close" onClick={() => setOpen(false)}>
                            ✕
                        </button>
                        <AuraChat />
                    </div>
                </div>
            )}
        </>
    );
}