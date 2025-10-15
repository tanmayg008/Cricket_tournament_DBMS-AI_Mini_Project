import { useState, useRef, useEffect } from "react";
import { Button } from "./Button";
import { Card } from "./Card";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatbotProps {
  onNavigate?: (view: string) => void;
}

export function Chatbot({ onNavigate }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! 👋 I'm your Cricket Tournament Assistant. I can help you navigate the dashboard, answer questions about tournaments, teams, players, and matches. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Navigation commands
    if (lowerMessage.includes("show") || lowerMessage.includes("view")) {
      if (lowerMessage.includes("tournament")) {
        onNavigate?.("tournaments");
        return "Sure! I've navigated to the Tournaments tab for you. 🏆";
      }
      if (lowerMessage.includes("team")) {
        onNavigate?.("teams");
        return "Taking you to the Teams section now! 👥";
      }
      if (lowerMessage.includes("player")) {
        onNavigate?.("players");
        return "Here are the Players! ⚡";
      }
      if (lowerMessage.includes("match")) {
        onNavigate?.("matches");
        return "Showing you the Matches section! 🏏";
      }
    }

    // Information queries
    if (lowerMessage.includes("tournament")) {
      return "We currently have 4 tournaments: Premier League 2025, Champions Cup, Summer Series, and T20 Blast. They're held across Mumbai, Delhi, Bangalore, and Chennai. Would you like to view the tournaments tab?";
    }

    if (lowerMessage.includes("team")) {
      return "There are 4 teams registered: Mumbai Warriors, Delhi Strikers, Bangalore Royals, and Chennai Kings. Each team has 14-16 players. Want to see more details?";
    }

    if (lowerMessage.includes("player")) {
      return "We have 5 registered players including Rohit Sharma, Jasprit Bumrah, Virat Kohli, Ravindra Jadeja, and KL Rahul. They play different roles - Batsman, Bowler, and All-rounder. Would you like to see the full player list?";
    }

    if (lowerMessage.includes("match")) {
      return "There are 4 matches scheduled! Some are upcoming, one is currently live, and some have been completed. You can view match details, venues, and dates in the Matches tab.";
    }

    if (lowerMessage.includes("add")) {
      return "To add new items, use the quick action buttons at the top of the dashboard. You can add tournaments, teams, players, or matches!";
    }

    if (lowerMessage.includes("help") || lowerMessage.includes("what can you do")) {
      return "I can help you with:\n• Navigate to different sections (tournaments, teams, players, matches)\n• Provide information about the cricket data\n• Guide you on how to add new items\n• Answer general questions about the dashboard\n\nJust ask me anything!";
    }

    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return "Hello! Great to see you! 👋 How can I assist you with the tournament management today?";
    }

    if (lowerMessage.includes("thank")) {
      return "You're welcome! Feel free to ask if you need anything else! 😊";
    }

    if (lowerMessage.includes("how many") || lowerMessage.includes("count")) {
      return "Here's a quick summary:\n• 4 Tournaments\n• 4 Teams\n• 5 Players\n• 4 Matches\n\nWhat would you like to know more about?";
    }

    // Default response
    return "I'm not sure I understand that. I can help you navigate the dashboard, provide information about tournaments, teams, players, and matches. Try asking me something like 'Show me tournaments' or 'Tell me about teams'!";
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate bot thinking
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);

    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-700 hover:bg-blue-800 text-white rounded-full shadow-lg flex items-center justify-center transition-all z-50"
        aria-label="Open chat"
      >
        {isOpen ? (
          <XIcon className="w-6 h-6" />
        ) : (
          <MessageCircleIcon className="w-6 h-6" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col bg-white rounded-lg border border-slate-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <h4 className="text-white">Cricket Assistant</h4>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-blue-800 rounded p-1"
              >
                <MinusIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-blue-700 text-white"
                      : "bg-white text-slate-900 border border-slate-200"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === "user" ? "text-blue-100" : "text-slate-400"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-200 bg-white rounded-b-lg">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                onClick={handleSend}
                className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors"
              >
                <SendIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Icons for chatbot
function MessageCircleIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );
}

function XIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function MinusIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
    </svg>
  );
}

function SendIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
      />
    </svg>
  );
}
