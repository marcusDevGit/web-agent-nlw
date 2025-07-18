import { CreateRoomForm } from '@/components/create-room-form';
import { RoomList } from '@/components/room-list';
export function CreatRoom() {
  return (
    <div className="min-h-screen px-4 py-8 '">
      <div className="max-auto  max-w-4xl">
        <div className="grid gap-8 grid-cols-2 items-start ">
          <CreateRoomForm />
          <RoomList />
        </div>
      </div>
    </div>
  );
}
