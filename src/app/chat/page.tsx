import type { Metadata } from "next";
import TileGrid from "@/component/tilegrid";
import ChatContainer from "./components/ChatContainer";

export const metadata: Metadata = {
  title: "AI Chat - Resky Adhyaksa",
  description: "Chat with AI models through Resky Adhyaksa's personal AI router.",
};

export default function ChatPage() {
  return (
    <div className="bg-primary relative h-dvh w-full overflow-hidden text-[#e3e3e3]">
      <main className="pointer-events-none relative z-10 flex h-full w-full flex-col px-2 pb-2 pt-20 sm:px-4 sm:pb-4 sm:pt-20">
        <section
          aria-label="AI chat"
          className="pointer-events-auto mx-auto flex min-h-0 w-full max-w-[90rem] flex-1 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#131314]/80 shadow-2xl shadow-black/60 backdrop-blur-md animate-fade-in-up"
        >
          <ChatContainer />
        </section>
      </main>
      <TileGrid />
    </div>
  );
}
