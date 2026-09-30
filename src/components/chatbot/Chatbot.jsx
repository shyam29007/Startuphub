import { useState } from "react";

import {
    FaRobot,
    FaPaperPlane,
    FaTimes
} from "react-icons/fa";

import AIService from "../../services/AIService";


// ======================================================
// FLOATING ASSISTANT
// ======================================================

function FloatingAssistant({
    isOpen,
    setIsOpen
}) {

    if (isOpen) {
        return null;
    }

    return (
        <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open StartupHub AI"

            style={{
                position: "fixed",
                right: "28px",
                bottom: "28px",

                width: "108px",
                height: "108px",

                borderRadius: "50%",
                border: "none",
                padding: "0",

                background:
                    "linear-gradient(135deg, #eef5ff 0%, #ffffff 45%, #e9e5ff 100%)",

                boxShadow:
                    "0 10px 35px rgba(55, 48, 163, 0.28)",

                zIndex: 9999,
                cursor: "pointer",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                transition:
                    "transform 0.25s ease, box-shadow 0.25s ease",

                animation:
                    "startupHubFloat 3s ease-in-out infinite"
            }}

            onMouseEnter={(e) => {

                e.currentTarget.style.transform =
                    "scale(1.08)";

                e.currentTarget.style.boxShadow =
                    "0 14px 40px rgba(55, 48, 163, 0.38)";
            }}

            onMouseLeave={(e) => {

                e.currentTarget.style.transform =
                    "scale(1)";

                e.currentTarget.style.boxShadow =
                    "0 10px 35px rgba(55, 48, 163, 0.28)";
            }}
        >

            {/* ==========================================
                OUTER CIRCLE
            ========================================== */}

            <div
                style={{
                    position: "absolute",
                    inset: "5px",
                    borderRadius: "50%",
                    border:
                        "2px solid rgba(79, 70, 229, 0.35)"
                }}
            />


            {/* ==========================================
                CURVED TEXT
            ========================================== */}

            <svg
                viewBox="0 0 108 108"
                style={{
                    position: "absolute",
                    inset: "0",
                    width: "100%",
                    height: "100%",
                    overflow: "visible",
                    pointerEvents: "none"
                }}
            >

                <defs>

                    <path
                        id="startupHubCirclePath"
                        d="
                            M 54,54
                            m -41,0
                            a 41,41 0 1,1 82,0
                            a 41,41 0 1,1 -82,0
                        "
                        fill="none"
                    />

                </defs>


                <text
                    style={{
                        fontSize: "8px",
                        fontWeight: "800",
                        letterSpacing: "1px",
                        fill: "#3730a3"
                    }}
                >

                    <textPath
                        href="#startupHubCirclePath"
                        startOffset="3%"
                    >
                        HOW CAN I HELP? • STARTUPHUB AI •
                    </textPath>

                </text>

            </svg>


            {/* ==========================================
                AI AVATAR
            ========================================== */}

            <div
                style={{
                    width: "58px",
                    height: "58px",

                    borderRadius: "50%",

                    background:
                        "linear-gradient(135deg, #4f46e5, #6366f1)",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    position: "relative",
                    zIndex: 2,

                    boxShadow:
                        "0 6px 18px rgba(79, 70, 229, 0.35)"
                }}
            >

                <FaRobot
                    size={30}
                    color="white"
                />

            </div>

        </button>
    );
}


// ======================================================
// CHAT WINDOW
// ======================================================

function ChatWindow({
    isOpen,
    setIsOpen,
    message,
    setMessage,
    isTyping,
    messages,
    sendMessage,
    handleKeyDown
}) {

    if (!isOpen) {
        return null;
    }

    return (

        <div
            className="startupHubChatWindow"

            style={{
                position: "fixed",

                right: "28px",
                bottom: "28px",

                width: "390px",
                maxWidth:
                    "calc(100vw - 30px)",

                height: "570px",
                maxHeight:
                    "calc(100vh - 30px)",

                background: "#ffffff",

                borderRadius: "22px",

                overflow: "hidden",

                boxShadow:
                    "0 20px 60px rgba(15, 23, 42, 0.25)",

                zIndex: 9999,

                display: "flex",
                flexDirection: "column",

                border:
                    "1px solid rgba(79, 70, 229, 0.12)"
            }}
        >

            {/* ==========================================
                HEADER
            ========================================== */}

            <div
                style={{
                    background:
                        "linear-gradient(135deg, #4338ca, #6366f1)",

                    color: "white",

                    padding: "17px 18px",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px"
                    }}
                >

                    <div
                        style={{
                            width: "44px",
                            height: "44px",

                            borderRadius: "50%",

                            background:
                                "rgba(255,255,255,0.18)",

                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >

                        <FaRobot size={23} />

                    </div>


                    <div>

                        <div
                            style={{
                                fontSize: "16px",
                                fontWeight: "700"
                            }}
                        >
                            StartupHub AI
                        </div>

                        <div
                            style={{
                                fontSize: "11px",
                                opacity: "0.85"
                            }}
                        >
                            Your startup assistant
                        </div>

                    </div>

                </div>


                <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close chatbot"

                    style={{
                        width: "34px",
                        height: "34px",

                        borderRadius: "50%",
                        border: "none",

                        background:
                            "rgba(255,255,255,0.15)",

                        color: "white",

                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                        cursor: "pointer"
                    }}
                >

                    <FaTimes />

                </button>

            </div>


            {/* ==========================================
                STATUS
            ========================================== */}

            <div
                style={{
                    padding: "9px 18px",

                    background: "#f8faff",

                    borderBottom:
                        "1px solid #edf0f7",

                    display: "flex",
                    alignItems: "center",

                    gap: "7px",

                    fontSize: "11px",

                    color: "#64748b"
                }}
            >

                <span
                    style={{
                        width: "7px",
                        height: "7px",

                        borderRadius: "50%",

                        background: "#22c55e"
                    }}
                />

                StartupHub AI is online

            </div>


            {/* ==========================================
                MESSAGES
            ========================================== */}

            <div
                className="startupHubMessages"

                style={{
                    flex: 1,

                    overflowY: "auto",

                    padding: "18px 15px",

                    background:
                        "linear-gradient(180deg, #fafbff 0%, #ffffff 100%)"
                }}
            >

                {messages.map((item) => (

                    <div
                        key={item.id}

                        style={{
                            display: "flex",

                            justifyContent:
                                item.sender === "user"
                                    ? "flex-end"
                                    : "flex-start",

                            marginBottom: "14px"
                        }}
                    >

                        {/* BOT AVATAR */}

                        {item.sender === "bot" && (

                            <div
                                style={{
                                    width: "30px",
                                    height: "30px",

                                    minWidth: "30px",

                                    borderRadius: "50%",

                                    background:
                                        "linear-gradient(135deg, #4f46e5, #6366f1)",

                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",

                                    marginRight: "8px",
                                    marginTop: "2px"
                                }}
                            >

                                <FaRobot
                                    size={14}
                                    color="white"
                                />

                            </div>

                        )}


                        {/* MESSAGE */}

                        <div
                            style={{
                                maxWidth: "78%",

                                padding:
                                    "10px 13px",

                                borderRadius:
                                    item.sender === "user"
                                        ? "16px 16px 4px 16px"
                                        : "16px 16px 16px 4px",

                                background:
                                    item.sender === "user"
                                        ? "linear-gradient(135deg, #4f46e5, #6366f1)"
                                        : "#f1f4fa",

                                color:
                                    item.sender === "user"
                                        ? "#ffffff"
                                        : "#263247",

                                fontSize: "13px",

                                lineHeight: "1.55",

                                whiteSpace: "pre-line",

                                boxShadow:
                                    item.sender === "user"
                                        ? "0 4px 12px rgba(79,70,229,0.18)"
                                        : "0 2px 8px rgba(15,23,42,0.05)"
                            }}
                        >

                            {item.text}

                        </div>

                    </div>

                ))}


                {/* ======================================
                    AI TYPING INDICATOR
                ====================================== */}

                {isTyping && (

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "12px"
                        }}
                    >

                        <div
                            style={{
                                width: "30px",
                                height: "30px",

                                borderRadius: "50%",

                                background:
                                    "linear-gradient(135deg, #4f46e5, #6366f1)",

                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",

                                marginRight: "8px"
                            }}
                        >

                            <FaRobot
                                size={14}
                                color="white"
                            />

                        </div>


                        <div
                            style={{
                                background: "#f1f4fa",

                                borderRadius: "16px",

                                padding:
                                    "11px 14px",

                                display: "flex",

                                alignItems: "center",

                                gap: "4px"
                            }}
                        >

                            <span className="chatTypingDot" />
                            <span className="chatTypingDot" />
                            <span className="chatTypingDot" />

                        </div>

                    </div>

                )}

            </div>


            {/* ==========================================
                INPUT
            ========================================== */}

            <div
                style={{
                    padding: "12px",

                    background: "#ffffff",

                    borderTop:
                        "1px solid #edf0f7"
                }}
            >

                <div
                    style={{
                        display: "flex",

                        alignItems: "center",

                        gap: "8px",

                        background: "#f6f7fb",

                        borderRadius: "14px",

                        padding:
                            "5px 5px 5px 13px",

                        border:
                            "1px solid #e6e9f1"
                    }}
                >

                    <input
                        type="text"

                        value={message}

                        onChange={(e) => {
                            setMessage(e.target.value);
                        }}

                        onKeyDown={handleKeyDown}

                        placeholder="Ask StartupHub AI..."

                        autoComplete="off"

                        style={{
                            flex: 1,

                            border: "none",

                            outline: "none",

                            background:
                                "transparent",

                            fontSize: "13px",

                            minWidth: 0,

                            color: "#1e293b"
                        }}
                    />


                    <button
                        type="button"

                        onClick={sendMessage}

                        disabled={
                            isTyping ||
                            !message.trim()
                        }

                        style={{
                            width: "40px",
                            height: "40px",

                            borderRadius: "11px",

                            border: "none",

                            background:
                                message.trim() && !isTyping
                                    ? "linear-gradient(135deg, #4f46e5, #6366f1)"
                                    : "#cbd5e1",

                            color: "white",

                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",

                            cursor:
                                message.trim() && !isTyping
                                    ? "pointer"
                                    : "not-allowed",

                            transition:
                                "0.2s ease"
                        }}
                    >

                        <FaPaperPlane size={14} />

                    </button>

                </div>


                <div
                    style={{
                        textAlign: "center",

                        fontSize: "9px",

                        color: "#94a3b8",

                        marginTop: "7px"
                    }}
                >
                    Powered by StartupHub AI
                </div>

            </div>

        </div>
    );
}


// ======================================================
// MAIN CHATBOT
// ======================================================

export default function Chatbot() {

    // ==========================================
    // CHAT STATE
    // ==========================================

    const [isOpen, setIsOpen] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [isTyping, setIsTyping] =
        useState(false);

    const [messages, setMessages] =
        useState([
            {
                id: 1,

                sender: "bot",

                text:
                    "Hello! 👋 I'm StartupHub AI Assistant.\n\nHow can I help you with startups, projects, development or StartupHub?"
            }
        ]);


    // ==========================================
    // SEND MESSAGE
    // ==========================================

    async function sendMessage() {

        const userText =
            message.trim();

        // Don't send empty messages

        if (!userText) {
            return;
        }

        // Prevent sending another request
        // while Gemini is responding

        if (isTyping) {
            return;
        }


        // ======================================
        // ADD USER MESSAGE
        // ======================================

        const userMessage = {
            id:
                `${Date.now()}-user`,

            sender: "user",

            text: userText
        };


        setMessages((prev) => [
            ...prev,
            userMessage
        ]);


        // Clear input immediately

        setMessage("");


        // ======================================
        // SHOW AI TYPING
        // ======================================

        setIsTyping(true);


        try {

            // ==================================
            // CALL GEMINI THROUGH AI SERVICE
            // ==================================

            const botResponse =
                await AIService.getResponse(
                    userText
                );



            


            // ==================================
            // ADD BOT RESPONSE
            // ==================================

            setMessages((prev) => [
                ...prev,

                {
                    id:
                        `${Date.now()}-bot`,

                    sender: "bot",

                    text:
                        botResponse
                }
            ]);

        }

        catch (error) {
            console.error("StartupHub Chatbot Error:", error);

            setMessages((prev) => [
                ...prev,
                {
                    id: `${Date.now()}-error`,
                    sender: "bot",
                    text:
                        error.message ||
                        "StartupHub AI is temporarily unavailable. Please try again later.",
                },
            ]);
        }

        finally {

            setIsTyping(false);

        }
    }


    // ==========================================
    // ENTER KEY
    // ==========================================

    function handleKeyDown(e) {

        if (
            e.key === "Enter" &&
            !e.shiftKey
        ) {

            e.preventDefault();

            sendMessage();

        }
    }


    // ==========================================
    // COMPONENT
    // ==========================================

    return (

        <>

            <style>
                {`

                    /* =================================
                       FLOATING BUTTON
                    ================================= */

                    @keyframes startupHubFloat {

                        0% {
                            transform: translateY(0px);
                        }

                        50% {
                            transform: translateY(-6px);
                        }

                        100% {
                            transform: translateY(0px);
                        }

                    }


                    /* =================================
                       AI TYPING DOTS
                    ================================= */

                    @keyframes chatTyping {

                        0% {
                            opacity: 0.25;
                            transform: translateY(0);
                        }

                        50% {
                            opacity: 1;
                            transform: translateY(-3px);
                        }

                        100% {
                            opacity: 0.25;
                            transform: translateY(0);
                        }

                    }


                    .chatTypingDot {

                        width: 6px;
                        height: 6px;

                        border-radius: 50%;

                        background: #6366f1;

                        display: inline-block;

                        animation:
                            chatTyping
                            1.2s
                            infinite
                            ease-in-out;

                    }


                    .chatTypingDot:nth-child(2) {

                        animation-delay:
                            0.2s;

                    }


                    .chatTypingDot:nth-child(3) {

                        animation-delay:
                            0.4s;

                    }


                    /* =================================
                       INPUT FOCUS
                    ================================= */

                    .startupHubChatWindow input:focus {

                        outline: none !important;

                        box-shadow: none !important;

                    }


                    /* =================================
                       SCROLLBAR
                    ================================= */

                    .startupHubMessages::-webkit-scrollbar {

                        width: 5px;

                    }


                    .startupHubMessages::-webkit-scrollbar-track {

                        background:
                            transparent;

                    }


                    .startupHubMessages::-webkit-scrollbar-thumb {

                        background:
                            #c7d2fe;

                        border-radius:
                            10px;

                    }


                    /* =================================
                       MOBILE
                    ================================= */

                    @media (max-width: 576px) {

                        .startupHubChatWindow {

                            right:
                                15px !important;

                            bottom:
                                15px !important;

                            width:
                                calc(100vw - 30px) !important;

                            height:
                                calc(100vh - 30px) !important;

                        }

                    }

                `}
            </style>


            {/* ======================================
                FLOATING ASSISTANT
            ====================================== */}

            <FloatingAssistant
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />


            {/* ======================================
                CHAT WINDOW
            ====================================== */}

            <ChatWindow

                isOpen={isOpen}

                setIsOpen={setIsOpen}

                message={message}

                setMessage={setMessage}

                isTyping={isTyping}

                messages={messages}

                sendMessage={sendMessage}

                handleKeyDown={handleKeyDown}

            />

        </>

    );
}