
import { Hammer } from 'lucide-react';

export default function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full px-4 text-center">
      <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6">
        <Hammer className="w-10 h-10 text-zinc-400" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
        {title}
      </h1>
      <p className="text-lg text-zinc-500 max-w-md mx-auto">
        We're working hard to bring you this feature. Check back soon!
      </p>
    </div>
  );
}
