'use client'

import rabbitmqIcon from '@/app/assets/images/rabbitmq-icon.png';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, type FormEventHandler } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useMessageStore, type Message } from '../messages/store';

export default function ChatPage() {
  const [localId, setLocalId] = useState<string | null>(null);

  useEffect(() => {
    const existingLocalId = localStorage.getItem('localId');
    if (existingLocalId) {
      setLocalId(existingLocalId);
      console.log('localId', existingLocalId);
      return;
    }
    localStorage.setItem('localId', uuidv4() );
    const localId = localStorage.getItem('localId');
    setLocalId(localId);
    console.log('localId', localId);
  }, []);

  const { messages, appendMessage, initializeSocket } = useMessageStore();

  useEffect(() => {
    console.log('Initializing socket');
    initializeSocket();
  }, [initializeSocket]);
  
  const [newMessage, setNewMessage] = useState<string>('');
  const handleSendMessage: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!newMessage) {
      return;
    }
    const msg: Message = {
      id: localId!,
      text: newMessage,
    }
    appendMessage(msg);
    setNewMessage('');
  };
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className='flex-1 dark:bg-black bg-white max-h-dvh min-h-dvh w-full h-full'>
      <div className="w-full h-16 flex items-center justify-between dark:bg-black bg-white dark:text-white text-black">
        <Link href={'/'} className="flex flex-row justify-start items-center gap-2 animate-blink ml-4 ">
        <Image
          className="dark:invert select-none user-select-none pointer-events-none w-4 h-4"
          src={rabbitmqIcon}
          alt="RabbitMQ logo"
          priority
        />
        </Link>
        <Link href={'/qrcode'} className="text-sm font-bold mr-4">Add new Rabbit</Link>
      </div>
      <div className="flex-1  max-h-[calc(100dvh-128px)] min-h-[calc(100dvh-128px)] overflow-y-auto overflow-hidden no-scrollbar dark:bg-black bg-white">
        <ScrollArea>
          {messages.map((message, index) => (
            <div key={index} className={`max-w-screen-sm mx-2 md:mx-auto lg:mx-auto mb-2 flex ${message.id === localId ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-2 rounded-lg ${message.id === localId ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
                {message.text}
              </div>
              <div ref={endOfMessagesRef} />
          </div>
          ))}
        </ScrollArea>
      </div>
      <form onSubmit={handleSendMessage}>
        <div className="flex max-w-screen-sm items-center dark:bg-black bg-white border dark:border-white border-black rounded-xl p-2 mx-2 md:mx-auto lg:mx-auto">
          <input
            type="text"
            className="flex-1 p-2 outline-none dark:bg-black bg-white dark:text-white text-black"
            value={newMessage}
            placeholder='Type a message...'
            onChange={(e) => setNewMessage(e.target.value)}
            />
          <Button
            size="icon"
            variant={'default'}
            className="w-16 dark:bg-white bg-black border rounded-3xl text-center justify-center items-center"
            onClick={handleSendMessage as FormEventHandler }
            >
            <PaperPlaneIcon className='w-full dark:text-black -rotate-12' />
          </Button>
        </div>
      </form>
    </div>
  );
}