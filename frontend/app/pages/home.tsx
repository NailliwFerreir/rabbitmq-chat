import Image from "next/image";
import rabbitmqIcon from "@/app/assets/images/rabbitmq-icon.png"
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          <h1 className="text-md font-bold text-center sm:text-left">Welcome to the</h1>
          <h1 className="text-3xl font-bold text-center sm:text-left">RabbitMQ Chat</h1>
        </div>
        {/* <ModeToggle /> */}
        <Image
          className="dark:invert"
          src={rabbitmqIcon}
          alt="RabbitMQ logo"
          width={180}
          height={38}
          priority
        />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p className="text-sm text-muted-foreground text-pretty italic">By Will 🚀.</p>
      </footer>
    </div>
  );
}
