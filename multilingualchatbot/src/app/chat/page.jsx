"use client";
import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiMic, FiGlobe, FiPaperclip, FiSun, FiMoon } from "react-icons/fi";

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "bn", name: "Bengali" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
  { code: "mr", name: "Marathi" },
  { code: "gu", name: "Gujarati" },
  { code: "pa", name: "Punjabi" },
  { code: "ml", name: "Malayalam" },
  { code: "kn", name: "Kannada" },
  { code: "or", name: "Odia" },
  { code: "as", name: "Assamese" },
];

const CONSTANT_USER_ID = "localUser";

const ChatStream = () => {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [question, setQuestion] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [darkMode, setDarkMode] = useState(true);
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);

  // Function to handle PDF upload (calls /api/upload endpoint)
  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("pdf", file);
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log("PDF upload result:", result);
    } catch (error) {
      console.error("PDF upload failed:", error);
    }
  };

  const synth = typeof window !== "undefined" ? window.speechSynthesis : null;

const speakText = (text) => {
  if (!synth) return;
  if (synth.speaking) {
    synth.cancel();
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = /[\u0900-\u097F]/.test(text) ? "hi-IN" : "en-US";
  synth.speak(utterance);
};

  // Trigger the hidden file input when the clip icon is clicked.
  const handleFileUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle file selection.
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  // Load chat sessions for the constant user.
  useEffect(() => {
    const loadChats = async () => {
      try {
        const res = await fetch(`/api/chat?userId=${CONSTANT_USER_ID}`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setChats(data);
            setActiveChat(data[0].chatId);
          } else {
            const defaultChat = { chatId: "1", messages: [] };
            setChats([defaultChat]);
            setActiveChat("1");
          }
        }
      } catch (error) {
        console.error("Failed to load chats:", error);
      }
    };
    loadChats();
  }, []);

  // Auto-scroll the message container (only the inner container scrolls).
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chats, activeChat]);

  const handleVoiceInput = () => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    const langMap = {
      en: "en-US",
      hi: "hi-IN",
      bn: "bn-BD",
      ta: "ta-IN",
      te: "te-IN",
      mr: "mr-IN",
      gu: "gu-IN",
      pa: "pa-IN",
      ml: "ml-IN",
      kn: "kn-IN",
      or: "or-IN",
      as: "as-IN",
    };
    recognition.lang = langMap[selectedLanguage] || "en-US";
    recognition.start();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuestion(transcript);
      sendMessage(transcript);
    };
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };
  };

  const sendMessage = async (userQuestion) => {
    if (!userQuestion.trim() || !activeChat) return;
    setQuestion("");
    // Optimistically update the UI.
    setChats((prev) =>
      prev.map((chat) =>
        chat.chatId === activeChat
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                { role: "user", type: "text", text: userQuestion },
              ],
            }
          : chat
      )
    );
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: CONSTANT_USER_ID,
          chatId: activeChat,
          question: userQuestion,
          language: selectedLanguage,
        }),
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      setChats((prev) =>
        prev.map((chat) =>
          chat.chatId === activeChat
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  { role: "ai", type: "text", text: result.text },
                ],
              }
            : chat
        )
      );
    } catch (error) {
      console.error("Error in chat:", error);
    }
  };

  const handleNewChat = () => {
    const newChatId = Date.now().toString();
    const newChat = { chatId: newChatId, messages: [] };
    setChats((prev) => [...prev, newChat]);
    setActiveChat(newChatId);
  };

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  // Define classes based on theme.
  const mainContainerClass = darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900";
  const sidebarClass = darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900 shadow";
  const chatAreaClass = darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900";
  const inputAreaClass = darkMode ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-900";
  const languageBoxClass = darkMode ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-900";

  return (
    <div className={`min-h-screen flex flex-col ${mainContainerClass}`}>
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold">Farm Assistant</h1>
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-4 py-2 rounded bg-blue-500 text-white"
        >
          {darkMode ? <FiSun /> : <FiMoon />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className={`w-64 p-4 flex flex-col ${sidebarClass} border-r border-gray-700`}>
          <h2 className="text-lg font-bold mb-4">Chats</h2>
          <button onClick={handleNewChat} className="bg-blue-600 py-2 px-4 rounded mb-4 text-white">
            New Chat
          </button>
          <div className="flex flex-col gap-2">
            {chats.map((chat) => (
              <div
                key={chat.chatId}
                className={`p-2 rounded cursor-pointer text-white ${activeChat === chat.chatId ? "bg-blue-600" : "bg-gray-700"}`}
                onClick={() => setActiveChat(chat.chatId)}
              >
                Chat {chat.chatId}
              </div>
            ))}
          </div>
        </aside>

        {/* Chat Area */}
        <main className={`flex flex-col flex-grow ${chatAreaClass} p-4`}>
          {/* Message container with fixed height and its own scroll */}
          <div className="h-[calc(100vh-160px)] overflow-hidden border border-gray-700 rounded relative">
            <div
              ref={chatContainerRef}
              className="absolute inset-0 overflow-y-auto p-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <AnimatePresence>
        {chats
          .find((chat) => chat.chatId === activeChat)
          ?.messages.map((message, index) => {
            const role = message.role || message.type;
            const content = message.content || message.text || "";
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`flex ${role === "user" ? "justify-end" : "justify-start"} mb-4`}
              >
                <div className={`max-w-lg px-4 py-3 rounded-lg ${role === "user" ? "bg-blue-600" : "bg-gray-800"} text-white`}> 
                  <p className="text-sm">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                  </p>
                  <button 
                    onClick={() => speakText(content)}
                    className="mt-2 bg-gray-500 hover:bg-gray-600 text-white py-1 px-2 rounded text-xs"
                  >🔊</button>
                </div>
              </motion.div>
            );
          })}
      </AnimatePresence>
            </div>
          </div>
          {/* Input Area */}
          <div className={`flex items-center p-4 ${inputAreaClass} rounded shadow mt-4`}>
            <select
              className={`mr-4 p-2 rounded border-2 border-gray-600 ${languageBoxClass}`}
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              className="flex-grow p-3 rounded-l border border-r-0 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Ask something..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button
              onClick={handleVoiceInput}
              className="bg-gray-600 dark:bg-gray-600 p-3 text-white"
            >
              <FiMic className="text-xl" />
            </button>
            <button
              onClick={() => sendMessage(question)}
              className="bg-blue-600 p-3 text-white rounded-r"
            >
              <FiSend className="text-xl" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChatStream;
