import type { Metadata } from "next";
import ChatContainer from "./components/ChatContainer";

export const metadata: Metadata = {
  title: "AI Chat - Resky Adhyaksa",
  description: "Chat with AI models through Resky Adhyaksa's personal AI router.",
};

export default function ChatPage() {
  return (
    <main aria-label="AI chat" className="h-dvh w-full overflow-hidden bg-[#131314] text-[#e3e3e3]">
      <ChatContainer />
    </main>
  );
}
