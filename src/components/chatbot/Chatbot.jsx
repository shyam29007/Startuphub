import { useState } from "react";
import {
  FaRobot,
  FaPaperPlane,
  FaTimes,
  FaRocket,
} from "react-icons/fa";

import AIService from "../../services/AIService";
import "./Chatbot.css";

/* ======================================================
   FLOATING CHATBOT BUTTON
====================================================== */

function FloatingAssistant({ isOpen, setIsOpen }) {
  if (isOpen) {
    return null;
  }

  return (
    <button
      type="button"
      className="startupHubFloatingButton"
      onClick={() => setIsOpen(true)}
      aria-label="Open StartupHub AI"
    >
      <div className="chatbotOuterRing" />

      {/* Circular text */}
      <svg
        className="chatbotCircularText"
        viewBox="0 0 108 108"
        aria-hidden="true"
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

        <text className="chatbotCircleText">
          <textPath
            href="#startupHubCirclePath"
            startOffset="3%"
          >
            HOW CAN I HELP? • STARTUPHUB AI •
          </textPath>
        </text>
      </svg>

      {/* AI Avatar */}
      <div className="chatbotAvatar">
        <FaRobot />
      </div>
    </button>
  );
}

/* ======================================================
   CHAT WINDOW
====================================================== */

function ChatWindow({
  isOpen,
  setIsOpen,
  message,
  setMessage,
  isTyping,
  messages,
  sendMessage,
  handleKeyDown,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="startupHubChatWindow">

      {/* ================= HEADER ================= */}

      <div className="startupHubChatHeader">

        <div className="chatHeaderLeft">

          <div className="chatHeaderAvatar">
            <FaRobot />
          </div>

          <div>
            <div className="chatHeaderTitle">
              StartupHub AI
            </div>

            <div className="chatHeaderSubtitle">
              Your startup assistant
            </div>
          </div>

        </div>

        <button
          type="button"
          className="chatCloseButton"
          onClick={() => setIsOpen(false)}
          aria-label="Close chatbot"
        >
          <FaTimes />
        </button>

      </div>

      {/* ================= STATUS ================= */}

      <div className="chatStatusBar">
        <span className="chatOnlineDot" />
        <span>StartupHub AI is online</span>
      </div>

      {/* ================= MESSAGES ================= */}

      <div className="startupHubMessages">

        {messages.map((item) => (

          <div
            key={item.id}
            className={`chatMessageRow ${
              item.sender === "user"
                ? "userMessageRow"
                : "botMessageRow"
            }`}
          >

            {/* BOT AVATAR */}

            {item.sender === "bot" && (
              <div className="messageBotAvatar">
                <FaRobot />
              </div>
            )}

            {/* MESSAGE */}

            <div
              className={`chatMessage ${
                item.sender === "user"
                  ? "userMessage"
                  : "botMessage"
              }`}
            >
              {item.text}
            </div>

          </div>

        ))}

        {/* ================= TYPING ================= */}

        {isTyping && (
          <div className="chatMessageRow botMessageRow">

            <div className="messageBotAvatar">
              <FaRobot />
            </div>

            <div className="chatTypingBubble">
              <span className="chatTypingDot" />
              <span className="chatTypingDot" />
              <span className="chatTypingDot" />
            </div>

          </div>
        )}

      </div>

      {/* ================= INPUT ================= */}

      <div className="chatInputArea">

        <div className="chatInputWrapper">

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask StartupHub AI..."
            autoComplete="off"
          />

          <button
            type="button"
            className="chatSendButton"
            onClick={sendMessage}
            disabled={isTyping || !message.trim()}
            aria-label="Send message"
          >
            <FaPaperPlane />
          </button>

        </div>

        <div className="chatPoweredText">
          <FaRocket />
          Powered by StartupHub AI
        </div>

      </div>

    </div>
  );
}

/* ======================================================
   MAIN CHATBOT
====================================================== */

export default function Chatbot() {

  const [isOpen, setIsOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text:
        "Hello! 👋 I'm StartupHub AI Assistant.\n\nHow can I help you with startups, projects, development or StartupHub?",
    },
  ]);

  /* ======================================================
     SEND MESSAGE
  ====================================================== */

  async function sendMessage() {

    const userText = message.trim();

    if (!userText) {
      return;
    }

    if (isTyping) {
      return;
    }

    /* Add user message */

    const userMessage = {
      id: `${Date.now()}-user`,
      sender: "user",
      text: userText,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setMessage("");

    setIsTyping(true);

    try {

      /* Call deployed StartupHub AI */

      const botResponse =
        await AIService.getResponse(userText);

      /* Add AI response */

      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-bot`,
          sender: "bot",
          text: botResponse,
        },
      ]);

    } catch (error) {

      console.error(
        "StartupHub Chatbot Error:",
        error
      );

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

    } finally {

      setIsTyping(false);

    }
  }

  /* ======================================================
     ENTER KEY
  ====================================================== */

  function handleKeyDown(e) {

    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {

      e.preventDefault();

      sendMessage();
    }
  }

  return (
    <>
      <FloatingAssistant
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

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