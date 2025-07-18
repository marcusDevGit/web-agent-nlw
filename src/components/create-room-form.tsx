import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { z } from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { useCreateRooms } from '@/http/use-create-rooms';

const createRoomFormSchema = z.object({
  name: z.string().min(3, { message: 'o Nome deve ter no minimo 3 caracteres' }),
  description: z.string(),
});

type CreateRoomFormData = z.infer<typeof createRoomFormSchema>;

export function CreateRoomForm() {
  const { mutateAsync: createRoom } = useCreateRooms();

  const createRoomForm = useForm<CreateRoomFormData>({
    resolver: zodResolver(createRoomFormSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  async function handleCreateRoom({ name, description }: CreateRoomFormData) {
    await createRoom({ name, description });
    await createRoomForm.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar Sala</CardTitle>
        <CardDescription>
          Crie uma nova sala para poder fazer perguntas e resceber as respostas da I.A.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...createRoomForm}>
          <form
            onSubmit={createRoomForm.handleSubmit(handleCreateRoom)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={createRoomForm.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Nome da Sala</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Digite o nome da sala..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={createRoomForm.control}
              name="description"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Descrição da Sala</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Digite o descrição da sala..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <Button type="submit" className="w-full">
              Cria Sala
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
