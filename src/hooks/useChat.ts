import { useMutation } from "@tanstack/react-query";

// Simulación de tipo de respuesta
type ChatResponse = {
  answer: string;
};

export const useChatMutation = () => {
  return useMutation({
    mutationFn: async (message: string) => {
      // Reemplaza con tu endpoint real
      // const { data } = await axios.post<ChatResponse>('/api/chat', { message })

      // Simulación de delay para efecto "pensando"
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return {
        answer: `Respuesta simulada médica para: "${message}" basada en artículos científicos.`,
      };
    },
  });
};
