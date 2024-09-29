import { toast } from '@/hooks/use-toast';
import io from 'socket.io-client';
import { create } from 'zustand';

export type Message = {
  id: string;
  text: string;
};

type MessagesStore = {
  messages: Message[];
  appendMessage: (message: Message) => void;
  initializeSocket: () => void;
};

export const useMessageStore = create<MessagesStore>((set) => {
  const socket = io('https://57sb6m12-3001.brs.devtunnels.ms', {
    autoConnect: false,
  });

  socket.on('connect', () => {
    console.log('Connected to socket server');
  });

  socket.on('chat message', (message: string) => {
    const parsedMessage: Message = JSON.parse(message);
    set((state) => ({ messages: [...state.messages, parsedMessage] }));
  });

  return {
    messages: [],
    appendMessage: (message: Message) => {
      console.log('Sending message', message);
      try {
        socket.emit('chat message', JSON.stringify(message));
        toast({
          duration: 500,
          title: 'Message sent',
          description: 'Your message was sent successfully',
        })
      } catch (error) {
        console.error('Error sending message', error);
        toast({
          variant: 'destructive',
          duration: 500,
          title: 'Error',
          description: 'There was an error sending your message',
        });
      }
    },
    initializeSocket: () => {
      socket.connect();
    },
  };
});