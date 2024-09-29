import rabbitmqIcon from "@/app/assets/images/rabbitmq-icon.png";
import Image from "next/image";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { frontendUrl } from '../messages/store';

export default function Qrcode() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center max-h-screen min-h-dvh p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center">
        <Link href="/" className="flex flex-col gap-8 select-none">
          Tap here to go back
        </Link>
        <div>
          <h1 className="text-md font-bold text-center select-none">Add a new Rabbit to the</h1>
          <h1 className="text-3xl font-bold text-center select-none">RabbitMQ Chat</h1>
        </div>
        <QRCodeSVG value={frontendUrl} size={180} />
        <p className="text-sm text-center select-none">
          Scan the QR code to join the chat
        </p>
        <Image
          className="dark:invert select-none user-select-none pointer-events-none animate-blink w-8 h-8"
          src={rabbitmqIcon}
          alt="RabbitMQ logo"
          priority
        />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p className="text-sm select-none text-muted-foreground text-pretty italic">By Will 🚀.</p>
      </footer>
    </div>
  );
}
