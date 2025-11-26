// src/components/Layout.tsx
import { useChatMutation } from "@/hooks/useChat";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AppSidebar } from "./AppSidebar";
import ChatBox from "./ChatBox"; // Asegúrate de importar tu nuevo componente
import { TopNav } from "./TopNav";

export default function Layout() {
  // 1. Estado para controlar si el sidebar está abierto o cerrado
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; content: string }[]
  >([]);

  const { isPending } = useChatMutation();

  return (
    <div className="flex h-full md:h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-hidden selection:bg-medical-100">
      {/* 1. SIDEBAR DESKTOP */}
      <aside
        className={cn(
          "hidden md:flex flex-col fixed inset-y-0 left-0 z-30 transition-all duration-300 ease-in-out",
          isSidebarOpen ? "w-72" : "w-[90px]"
        )}>
        <AppSidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </aside>

      {/* 2. CONTENIDO PRINCIPAL */}
      <main
        className={cn(
          "flex-1 flex flex-col h-full relative transition-all duration-300 ease-in-out",
          isSidebarOpen ? "md:pl-72" : "md:pl-[90px]"
        )}>
        {/* Top Navigation */}
        <TopNav
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* 
           ChatBox: Ocupa todo el espacio disponible (flex-1).
           Le pasamos isPending para que maneje la animación de carga internamente.
        */}
        <ChatBox
          messages={messages}
          isPending={isPending}
          setMessages={setMessages}
        />
      </main>
    </div>
  );
}
