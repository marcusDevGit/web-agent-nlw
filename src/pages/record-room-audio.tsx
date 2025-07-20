import { Button } from '@/components/ui/button';
import { useRef, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function';

type RoomParams = {
  roomId: string;
};

export default function RecordRoomAudio() {
  const params = useParams<RoomParams>();
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecord = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<NodeJS.Timeout>(null);

  function stopRecording() {
    setIsRecording(false);

    if (mediaRecord.current && mediaRecord.current.state !== 'inactive') {
      mediaRecord.current.stop();
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData();

    formData.append('file', audio, 'audio.webm');

    const response = await fetch(`${apiUrl}/rooms/${params.roomId}/audio`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    console.log(result);
  }

  function createRecorder(audio: MediaStream) {
    mediaRecord.current = new MediaRecorder(audio, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000,
    });

    mediaRecord.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data);
      }
    };

    mediaRecord.current.onstart = () => {
      console.log('Gravação iniciada!');
    };

    mediaRecord.current.onstop = () => {
      console.log('Gravação encerrada/pausada!');
    };

    mediaRecord.current.start();
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      alert('O seu navegador não suporta gravação de audio!');
      return;
    }
    setIsRecording(true);

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    });

    createRecorder(audio);

    intervalRef.current = setInterval(() => {
      mediaRecord.current?.stop();

      createRecorder(audio);
    }, 5000);
  }

  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      {isRecording ? (
        <Button onClick={stopRecording}>Para Gravação</Button>
      ) : (
        <Button onClick={startRecording}>Gravar</Button>
      )}

      {isRecording ? <p>Gravando....</p> : <p>Pausado</p>}
    </div>
  );
}
('');
