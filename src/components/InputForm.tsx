import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useForm } from "@tanstack/react-form";
import {
  BrainCircuit,
  Link as LinkIcon,
  Mic,
  Paperclip,
  PenTool,
  Send,
  Sparkles,
} from "lucide-react";

interface InputFormProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export function InputForm({ onSendMessage, isLoading }: InputFormProps) {
  const form = useForm({
    defaultValues: {
      message: "",
    },
    onSubmit: async ({ value, formApi }) => {
      if (!value.message.trim()) return;
      onSendMessage(value.message);
      formApi.reset();
    },
  });

  return (
    <div className="max-w-4xl mx-auto w-full px-4 pb-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="relative flex flex-col bg-white border border-slate-200 rounded-[26px] shadow-xl shadow-slate-200/40 focus-within:ring-2 focus-within:ring-medical-500/10 focus-within:border-medical-500/50 transition-all duration-300 group">
        {/* Area de Texto */}
        <div className="px-4 pt-4 flex gap-3">
          <div className="shrink-0">
            <Sparkles className="w-5 h-5 text-medical-500 fill-medical-100 animate-pulse" />
          </div>
          <form.Field
            name="message"
            children={(field) => (
              <Textarea
                placeholder="Start your request, and let orion handle everything"
                className="min-h-[50px] max-h-[200px] border-0 focus-visible:ring-0 resize-none p-0 text-base text-slate-700 placeholder:text-slate-300 bg-transparent w-full leading-relaxed selection:bg-medical-100"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    form.handleSubmit();
                  }
                }}
              />
            )}
          />
        </div>

        {/* Barra de Herramientas Inferior */}
        <div className="flex justify-between items-center p-2 mt-2">
          {/* Izquierda: Herramientas y Modos */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {/* Botones Pequeños (Link / File) */}
            <Button
              variant="ghost"
              size="icon"
              type="button"
              className="text-slate-400 hover:text-medical-600 hover:bg-medical-50 rounded-xl w-9 h-9 shrink-0">
              <LinkIcon className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              type="button"
              className="text-slate-400 hover:text-medical-600 hover:bg-medical-50 rounded-xl w-9 h-9 shrink-0">
              <Paperclip className="w-5 h-5" />
            </Button>

            {/* Separador Vertical */}
            <div className="w-px h-5 bg-slate-200 mx-1 shrink-0"></div>

            {/* Pills: Reasoning & Writing Style */}
            <Button
              type="button"
              variant="outline"
              className="h-8 rounded-full border-slate-200 bg-slate-50/50 text-slate-500 text-xs font-medium hover:bg-white hover:text-medical-600 hover:border-medical-200 gap-2 px-3 transition-colors shrink-0">
              <BrainCircuit className="w-3.5 h-3.5" />
              Reasoning
            </Button>

            <Button
              type="button"
              variant="outline"
              className="h-8 rounded-full border-slate-200 bg-slate-50/50 text-slate-500 text-xs font-medium hover:bg-white hover:text-medical-600 hover:border-medical-200 gap-2 px-3 transition-colors shrink-0">
              Writing Style
              <PenTool className="w-3 h-3 opacity-50" />
            </Button>
          </div>

          {/* Derecha: Acciones (Mic / Send) */}
          <div className="flex items-center gap-2 pl-2">
            <Button
              variant="ghost"
              size="icon"
              type="button"
              className="text-slate-400 hover:text-slate-600 rounded-full w-9 h-9 shrink-0">
              <Mic className="w-5 h-5" />
            </Button>

            <Button
              disabled={isLoading}
              type="submit"
              size="icon"
              className={cn(
                "rounded-xl h-10 w-10 transition-all shadow-md shadow-medical-200 hover:scale-105 active:scale-95 shrink-0",
                isLoading
                  ? "bg-slate-300 cursor-not-allowed"
                  : "bg-linear-to-br from-medical-500 to-medical-600 text-white hover:opacity-90"
              )}>
              <Send className="w-5 h-5 ml-0.5" strokeWidth={2.5} />
            </Button>
          </div>
        </div>
      </form>

      {/* Disclaimer */}
      <p className="text-[11px] text-center text-slate-400 mt-3 font-medium opacity-70">
        CEAM-GPT puede cometer errores. Verifica la información médica
        importante.
      </p>
    </div>
  );
}
