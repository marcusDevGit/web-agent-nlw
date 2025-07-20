import { useQuery } from '@tanstack/react-query';
import type { GetRoomQuestionsResponse } from './types/get-room-questions-response';
const apiUrl = import.meta.env.VITE_API_URL;

export function useRoomQuestions(roomId: string) {
  return useQuery({
    queryKey: ['get-questions', roomId],
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/rooms/${roomId}/questions`);
      const result: GetRoomQuestionsResponse = await response.json();

      return result;
    },
  });
}
