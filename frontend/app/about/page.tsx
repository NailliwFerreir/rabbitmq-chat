import rabbitmqIcon from "@/app/assets/images/rabbitmq-icon.png";
import Image from "next/image";

export default function About() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center">
        <div>
          <h1 className="text-md font-bold text-center  select-none">Welcome to the</h1>
          <h1 className="text-3xl font-bold text-center  select-none">RabbitMQ Chat</h1>
        </div>
        {/* <ModeToggle /> */}
        <Image
          className="dark:invert select-none user-select-none pointer-events-none"
          src={rabbitmqIcon}
          alt="RabbitMQ logo"
          width={180}
          height={38}
          priority
        />
      <p className="text-3xl text-center animate-blink select-none">This is the about page!</p>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p className="text-sm select-none text-muted-foreground text-pretty italic">By Will 🚀.</p>
      </footer>
    </div>
  );
}
