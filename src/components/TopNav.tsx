import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, PanelLeftOpen, Sun } from "lucide-react";

interface TopNavProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function TopNav({ isSidebarOpen, onToggleSidebar }: TopNavProps) {
  return (
    <header className="h-16 flex items-center justify-between px-4 md:pr-4 md:pl-0 sticky top-0 z-20 bg-[#Fdfdfd]/80 backdrop-blur-md">
      {/* Left: Sidebar Toggle (visible if closed) & Mobile Menu Trigger */}
      <div className="flex items-center gap-4">
        {!isSidebarOpen && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="text-slate-500 hover:bg-slate-100">
            <PanelLeftOpen className="w-5 h-5" />
          </Button>
        )}

        {/* Center: Pills Navigation */}
        <div className="flex bg-slate-100/50 p-1 rounded-full border border-slate-200/60 shadow-sm">
          {["Dashboard", "AI Chat", "Help", "Labs"].map((item) => (
            <button
              key={item}
              className={`px-5 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                item === "AI Chat"
                  ? "bg-white text-slate-800 shadow-sm ring-1 ring-slate-200"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
              }`}>
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Right: Actions & User Profile */}
      <div className="flex bg-slate-100/50 p-1 rounded-full border border-slate-200/60 shadow-sm items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-400 hover:text-slate-600 rounded-full w-9 h-9">
          <Sun className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-400 hover:text-slate-600 rounded-full w-9 h-9">
          <Bell className="w-5 h-5" />
        </Button>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="w-9 h-9 cursor-pointer border border-slate-200 hover:ring-2 hover:ring-green-100 transition-all">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configuración</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">
              Cerrar Sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
