import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  FlaskConical,
  GraduationCap,
  HelpCircle,
  LayoutDashboard,
  MessageSquare,
  PanelLeftClose,
  Plus,
  Stethoscope,
} from "lucide-react";

interface SidebarProps {
  className?: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function AppSidebar({ className, isOpen, onToggle }: SidebarProps) {
  const menuItems = [
    { icon: MessageSquare, label: "Chat IA", active: true },
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: BookOpen, label: "Ciencias Básicas" },
    { icon: GraduationCap, label: "Residencia" },
    { icon: Stethoscope, label: "Especialidades" },
  ];

  const adminItems = [
    { icon: FlaskConical, label: "Laboratorio" },
    { icon: HelpCircle, label: "Ayuda & Soporte" },
  ];

  return (
    <div className={cn("flex flex-col h-full bg-transparent", className)}>
      {/* 1. HEADER (FUERA DEL BOX) */}
      {/* Aquí está el logo y el botón toggle flotando sobre el fondo */}
      <div
        className={cn(
          "flex items-center justify-between px-5 h-16 transition-all",
          !isOpen && "justify-center px-0"
        )}>
        {/* Logo Area */}
        <div
          className={cn(
            "flex items-center gap-2 overflow-hidden",
            !isOpen && "hidden"
          )}>
          <div className="w-8 h-8 bg-medical-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-medical-500/30 shrink-0">
            C
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight whitespace-nowrap">
            EchoAi
          </span>
        </div>

        {/* Logo Icon Only (cuando está cerrado) */}
        {!isOpen && (
          <div className="w-8 h-8 bg-medical-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
            C
          </div>
        )}

        {/* Toggle Button (Fuera del box, alineado a la derecha del sidebar) */}
        {isOpen && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 hidden md:flex">
            <PanelLeftClose className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* 2. MENU BOX (CONTENEDOR PLOMO/BLANCO) */}
      {/* Este es el recuadro que se ve en la imagen */}
      <div
        className={cn(
          "flex-1 flex flex-col bg-slate-100/50 border border-slate-200 shadow-sm rounded-3xl mx-4 mb-4 overflow-hidden transition-all duration-300",
          !isOpen && "mx-2 rounded-2xl bg-white/50" // Diseño más sutil cuando está cerrado
        )}>
        {/* Botón Nuevo Chat */}
        <div className="p-3 pb-0">
          <Button
            className={cn(
              "w-full bg-white text-slate-600 hover:bg-white border border-slate-200/60 shadow-none justify-start gap-2 rounded-xl h-11 transition-all",
              !isOpen && "justify-center px-0 bg-transparent border-0"
            )}
            variant="ghost">
            <Plus className="w-5 h-5 text-slate-500" />
            {isOpen && <span className="font-medium">New Chat</span>}
          </Button>
        </div>

        {/* Scrollable Content */}
        <ScrollArea className="flex-1 px-3 py-4">
          <div className="space-y-6">
            {/* Main Menu */}
            <div>
              {isOpen && (
                <h4 className="mb-2 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Features
                </h4>
              )}
              <div className="space-y-1">
                {menuItems.map((item, i) => (
                  <Button
                    key={i}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3 h-10 font-medium rounded-xl transition-all",
                      item.active
                        ? "bg-white text-slate-900"
                        : "text-slate-500 hover:text-slate-900 hover:bg-white",
                      !isOpen && "justify-center px-0"
                    )}>
                    <item.icon className="w-5 h-5 shrink-0" />
                    {isOpen && <span>{item.label}</span>}
                  </Button>
                ))}
              </div>
            </div>

            {/* Admin / Tools */}
            <div>
              {isOpen && (
                <div className="flex items-center justify-between px-3 mb-2">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Admin Pages
                  </h4>
                  <Badge
                    variant="outline"
                    className="text-[10px] text-cyan-600 bg-cyan-50 border-cyan-200 px-1.5 py-0">
                    PRO
                  </Badge>
                </div>
              )}
              <div className="space-y-1">
                {adminItems.map((item, i) => (
                  <Button
                    key={i}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3 h-10 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl",
                      !isOpen && "justify-center px-0"
                    )}>
                    <item.icon className="w-5 h-5 shrink-0" />
                    {isOpen && <span>{item.label}</span>}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
