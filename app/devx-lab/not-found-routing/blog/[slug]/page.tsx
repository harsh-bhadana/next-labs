import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, BookOpen } from 'lucide-react';

export async function generateStaticParams() {
  return [{ slug: 'existing-post' }];
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await params per Next.js 15+ specifications for dynamic route params
  const { slug } = await params;
  
  if (slug !== 'existing-post') {
    // This will trigger the closest not-found.tsx
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-orange-50/30 font-sans dark:bg-[#0a0500] selection:bg-orange-500/30">
      <main className="relative flex w-full max-w-3xl flex-col items-start justify-start py-20 px-6 sm:px-12 gap-8">
        
        <Link 
          href="/devx-lab/not-found-routing"
          className="group flex items-center gap-2 text-zinc-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Specimen
        </Link>

        <header className="flex flex-col gap-4 w-full border-b border-orange-200 dark:border-orange-900/50 pb-8">
           <div className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 text-sm font-bold tracking-wider">
            <BookOpen className="w-4 h-4" />
            BLOG POST
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            The Existing Post
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400">
            This post successfully matched the `slug` check and rendered without throwing a 404.
          </p>
        </header>

        <article className="text-zinc-700 dark:text-zinc-300 leading-relaxed space-y-6">
          <p>
            When a route matches but the data doesn't exist (like a blog post that isn't in your database), you can call <code>notFound()</code> to interrupt rendering and show the closest error UI.
          </p>
          <p>
            Because we navigated to <code>/blog/existing-post</code>, the check passed!
          </p>
        </article>

      </main>
    </div>
  );
}
