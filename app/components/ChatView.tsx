import { ChatPanel } from "./ChatPanel";

export function ChatView() {
  return (
    <div className="space-y-6">
      <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-xl font-semibold text-slate-900">AI Chat</h2>
        <p className="mt-2 text-sm text-slate-600">Talk to your FusionNet AI assistant for help, ideas, or task guidance.</p>
      </div>
      <ChatPanel />
    </div>
  );
}
