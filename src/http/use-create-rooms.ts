import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateRoomsRequest } from './types/create-room-request';
import type { CreateRoomsResponse } from './types/create-room-response';
const apiUrl = import.meta.env.VITE_API_URL;

export function useCreateRooms() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateRoomsRequest) => {
      const response = await fetch(`${apiUrl}/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result: CreateRoomsResponse = await response.json();

      return result;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-rooms'] });
    },
  });
}
