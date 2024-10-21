import rabbitmqIcon from "@/app/assets/images/rabbitmq-icon.png";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center max-h-screen min-h-dvh p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center">
        <div>
          <h1 className="text-md font-bold text-center  select-none">Welcome to the</h1>
          <h1 className="text-3xl font-bold text-center  select-none">RabbitMQ Chat</h1>
        </div>
        <Link href="/chat" className="flex flex-col gap-8">
        <Image
          className="dark:invert select-none user-select-none pointer-events-none"
          src={rabbitmqIcon}
          alt="RabbitMQ logo"
          width={180}
          height={38}
          priority
        />
        <p className="text-sm text-center animate-blink select-none">
          Tap to chat
        </p>
        </Link>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p className="text-sm select-none text-muted-foreground text-pretty italic">By Grupo 5🚀.</p>
      </footer>
    </div>
  );
}
