import { useChatMutation } from "@/hooks/useChat";
import { cn } from "@/lib/utils";
import { FileText, Pill, Stethoscope } from "lucide-react";
import { useEffect, useRef } from "react";
import { InputForm } from "./InputForm";

interface ChatBoxProps {
  messages: { role: "user" | "ai"; content: string }[];
  isPending: boolean;
  setMessages: React.Dispatch<
    React.SetStateAction<{ role: "user" | "ai"; content: string }[]>
  >;
}

export default function ChatBox({
  messages,
  isPending,
  setMessages,
}: ChatBoxProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { mutate } = useChatMutation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isPending]);

  const handleSend = (text: string) => {
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    mutate(text, {
      onSuccess: (data) => {
        setMessages((prev) => [...prev, { role: "ai", content: data.answer }]);
      },
    });
  };

  return (
    <div className="flex flex-col h-full w-full relative overflow-hidden">
      <div className="flex-1 overflow-y-auto w-full relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="max-w-4xl mx-auto w-full p-4 md:p-8 pb-40 relative h-full">
          {messages.length === 0 ? (
            // --- PANTALLA DE BIENVENIDA ---
            <div className="flex flex-col items-center justify-center min-h-screen md:min-h-[80vh] animate-in fade-in slide-in-from-bottom-4 duration-700 relative pb-32">
              {/* Status Badge */}
              <div className="bg-linear-to-r from-cyan-400 to-cyan-500 text-white font-bold px-4 py-1.5 rounded-full mb-8 shadow-lg shadow-cyan-200 cursor-pointer hover:scale-105 transition-transform absolute top-0">
                ✨ Nueva versión CEAM v2.0 disponible
              </div>

              {/* Icono Central Pulsante */}
              <div className="relative mb-8 group">
                <div className="absolute inset-0 bg-medical-400 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
                <div className="relative w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center border border-slate-100 group-hover:-translate-y-1 transition-transform">
                  <Stethoscope className="w-10 h-10 text-medical-600" />
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-3 text-center tracking-tight">
                Hola,{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-medical-600 to-teal-500">
                  Doctor
                </span>
              </h1>
              <p className="text-slate-400 text-lg mb-10 text-center max-w-lg">
                ¿En qué caso clínico o investigación puedo asistirte hoy?
              </p>

              {/* Tarjetas de Inicio Rápido */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                {[
                  {
                    t: "Caso Clínico",
                    d: "Analizar síntomas y dx",
                    icon: <Stethoscope className="w-6 h-6" />,
                  },
                  {
                    t: "Farmacología",
                    d: "Dosis e interacciones",
                    icon: <Pill className="w-6 h-6" />,
                  },
                  {
                    t: "Resúmenes",
                    d: "Papers y guías recientes",
                    icon: <FileText className="w-6 h-6" />,
                  },
                ].map((card, i) => (
                  <button
                    key={i}
                    className="flex flex-col gap-2 p-5 bg-white border border-slate-200 rounded-2xl hover:border-medical-400 hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-left group">
                    <span className="text-2xl mb-1 group-hover:scale-110 transition-transform block w-fit bg-slate-100 p-3 rounded-full text-medical-600">
                      {card.icon}
                    </span>
                    <div>
                      <div className="font-semibold text-slate-800 group-hover:text-medical-600">
                        {card.t}
                      </div>
                      <div className="text-xs text-slate-400 line-clamp-2">
                        {card.d}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            // --- MENSAJES DEL CHAT ---
            <div className="space-y-8 mb-28 md:mb-48">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex gap-4 md:gap-6 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-2",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}>
                  {msg.role === "ai" && (
                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-medical-500 to-teal-600 flex items-center justify-center shrink-0 text-white shadow-lg shadow-medical-200">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                  )}

                  <div
                    className={cn(
                      "relative px-6 py-4 rounded-3xl text-sm md:text-base leading-7 shadow-sm",
                      msg.role === "user"
                        ? "bg-slate-900 text-slate-100 rounded-tr-none"
                        : "bg-white border border-slate-100 text-slate-700 rounded-tl-none"
                    )}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {/* --- ESTADO DE CARGA (PUNTITOS) --- */}
              {isPending && (
                <div className="flex gap-4 max-w-4xl mx-auto animate-in fade-in">
                  <div className="w-9 h-9 rounded-xl bg-linear-to-br from-medical-600 to-medical-500 flex items-center justify-center shrink-0 text-white animate-pulse">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  {/* Burbuja de "Escribiendo..." */}
                  <div className="bg-white border border-slate-100 px-5 py-4 rounded-3xl rounded-bl-sm shadow-sm flex items-center gap-1.5 h-[46px]">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                  </div>
                </div>
              )}
              <div
                ref={messagesEndRef}
                className="h-32 md:h-48 w-full shrink-0"
              />
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 gradient-to-t from-[#F8FAFC] via-[#F8FAFC] via-70% to-transparent z-10">
        <div className="max-w-4xl mx-auto">
          <InputForm onSendMessage={handleSend} isLoading={isPending} />
        </div>
      </div>
    </div>
  );
}
