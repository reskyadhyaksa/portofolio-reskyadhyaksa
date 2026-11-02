import type { Metadata } from "next";
import ChatContainer from "./components/ChatContainer";
import { resolveStudioTab } from "./services/chat-routing";

export const metadata: Metadata = {
  title: "AI Chat - Resky Adhyaksa",
  description: "Chat with AI models through Resky Adhyaksa's personal AI router.",
};

interface ChatPageProps {
  searchParams?: Promise<{ tab?: string; model?: string }>;
}

export default async function ChatPage({ searchParams }: ChatPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const initialTab = resolveStudioTab(resolvedParams.tab);
  const initialModel = resolvedParams.model ?? null;

  return (
    <main aria-label="AI chat" className="h-dvh w-full overflow-hidden bg-[#131314] text-[#e3e3e3]">
      <ChatContainer initialTab={initialTab} initialModel={initialModel} />
    </main>
  );
}
