"use client";

import { useState } from "react";

const initialMessages = [
  { sender: "assistant", text: "Hello! I am your FusionNet AI assistant. Ask me anything about your workspace." },
];

export function ChatPanel() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { sender: "user", text: input.trim() },
      { sender: "assistant", text: `Thanks for asking! I can help you with FusionNet, your profile, or next steps.` },
    ];

    setMessages(newMessages);
    setInput("");
  };

  return (
    <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Chat with AI</p>
          <h3 className="text-xl font-semibold text-slate-900">AI assistant</h3>
        </div>
      </div>

      <div className="flex max-h-[320px] flex-col gap-4 overflow-y-auto pr-2">
        {messages.map((message, index) => (
          <div
            key={`${message.sender}-${index}`}
            className={`rounded-3xl px-4 py-3 ${
              message.sender === "assistant" ? "bg-slate-50 self-start text-slate-900" : "bg-slate-900 text-white self-end"
            } max-w-[90%]`}
          >
            <p className="text-sm leading-6">{message.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex gap-3">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask the AI..."
          className="min-w-0 flex-1 rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-300"
        />
        <button
          onClick={handleSend}
          className="rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Send
        </button>
      </div>
    </div>
  );
}
