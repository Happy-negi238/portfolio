import { HomePage } from '@/components/home/home';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center  bg-neutral-950 font-sans dark:bg-black">
      <main
        className="flex w-full max-w-4xl flex-col justify-between 
      py-8 text-white bg-neutral-950 dark:bg-black 
      sm:items-start border-l border-r border-neutral-800 border-dashed"
      >
        <HomePage />
      </main>
    </div>
  );
}
