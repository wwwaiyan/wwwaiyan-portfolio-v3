import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, BookOpen, Calendar, ChevronDown, ChevronUp, Clock, Loader2 } from 'lucide-react';

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  categories: string[];
  readTime: string;
}

interface MediumRSSResponse {
  status: string;
  items: Array<{
    title: string;
    pubDate: string;
    link: string;
    description: string;
    categories?: string[];
  }>;
}

const INITIAL_DISPLAY_COUNT = 3;
const MAX_POST_COUNT = 9;
const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

const decodeEntities = (value: string) => value
  .replace(/&nbsp;/gi, ' ')
  .replace(/&amp;/gi, '&')
  .replace(/&quot;/gi, '"')
  .replace(/&#39;|&apos;/gi, "'")
  .replace(/&lt;/gi, '<')
  .replace(/&gt;/gi, '>')
  .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
  .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCharCode(Number.parseInt(code, 16)));

const toPlainText = (html: string) => decodeEntities(
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim(),
);

const truncate = (value: string, length: number) => (
  value.length > length ? `${value.slice(0, length).trimEnd()}...` : value
);

const createExcerpt = (html: string) => {
  const parsed = new DOMParser().parseFromString(html, 'text/html');
  const paragraphs = Array.from(parsed.querySelectorAll('p'));
  const usefulParagraph = paragraphs.find((paragraph) => {
    const text = toPlainText(paragraph.innerHTML);
    const numberedItems = text.match(/\b\d+(?:\.\d+)*\./g)?.length ?? 0;
    return text.length >= 70 && paragraph.querySelectorAll('a').length < 4 && numberedItems < 4;
  });

  return truncate(
    usefulParagraph ? toPlainText(usefulParagraph.innerHTML) : toPlainText(html),
    135,
  );
};

export const Blog: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasLoadedPosts = useRef(false);
  const prefersReducedMotion = useReducedMotion();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (!('IntersectionObserver' in window)) {
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px 0px' },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isNearViewport) return;
    let isActive = true;
    let controller = new AbortController();

    const fetchPosts = async (showLoading: boolean) => {
      if (showLoading) setLoading(true);
      try {
        const response = await fetch(
          'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@wwwaiyan',
          { signal: controller.signal, cache: 'no-store' },
        );
        if (!response.ok) throw new Error('Unable to load articles');

        const data: MediumRSSResponse = await response.json();
        if (data.status !== 'ok') throw new Error('Invalid article response');
        if (!isActive) return;

        setPosts(data.items.slice(0, MAX_POST_COUNT).map((item) => {
          const fullText = toPlainText(item.description);
          return {
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            description: createExcerpt(item.description),
            categories: item.categories ?? [],
            readTime: `${Math.max(3, Math.ceil(fullText.split(/\s+/).length / 200))} min read`,
          };
        }));
        setError(false);
        hasLoadedPosts.current = true;
      } catch (fetchError) {
        if ((fetchError as Error).name !== 'AbortError' && !hasLoadedPosts.current && isActive) {
          setError(true);
        }
      } finally {
        if (showLoading && isActive) setLoading(false);
      }
    };

    const refreshPosts = () => {
      controller.abort();
      controller = new AbortController();
      void fetchPosts(!hasLoadedPosts.current);
    };

    refreshPosts();
    const refreshTimer = window.setInterval(() => {
      if (document.visibilityState === 'visible') refreshPosts();
    }, REFRESH_INTERVAL_MS);
    const handleFocus = () => refreshPosts();
    window.addEventListener('focus', handleFocus);

    return () => {
      isActive = false;
      controller.abort();
      window.clearInterval(refreshTimer);
      window.removeEventListener('focus', handleFocus);
    };
  }, [isNearViewport]);

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const visiblePosts = showAll ? posts : posts.slice(0, INITIAL_DISPLAY_COUNT);

  return (
    <section ref={sectionRef} className="border-t border-zinc-200/80 bg-zinc-100 py-24 transition-colors duration-300 dark:border-zinc-900 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 grid gap-4 md:grid-cols-12 md:items-end"
        >
          <div className="md:col-span-7">
            <div className="mb-4 flex items-center gap-3 font-mono text-xs font-semibold uppercase text-cyan-700 dark:text-cyan-400">
              <BookOpen size={16} />
              Engineering notes
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-5xl">Latest writing</h2>
          </div>
          <p className="max-w-xl text-zinc-600 dark:text-zinc-400 md:col-span-5 md:justify-self-end">
            Technical blog posts.
          </p>
        </motion.div>

        {(!isNearViewport || loading) && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3" role="status" aria-label="Loading articles">
            {Array.from({ length: INITIAL_DISPLAY_COUNT }).map((_, index) => (
              <div key={index} className="flex min-h-[17rem] animate-pulse flex-col rounded-xl border border-zinc-200 bg-white/70 p-6 dark:border-zinc-800 dark:bg-zinc-900/70">
                <div className="mb-8 flex items-center justify-between">
                  <span className="h-3 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
                  {index === 0 && <Loader2 className="h-4 w-4 animate-spin text-cyan-600 dark:text-cyan-400" />}
                </div>
                <span className="mb-3 h-4 w-11/12 rounded bg-zinc-200 dark:bg-zinc-800" />
                <span className="h-4 w-8/12 rounded bg-zinc-200 dark:bg-zinc-800" />
                <span className="mt-auto h-px w-full bg-zinc-200 dark:bg-zinc-800" />
              </div>
            ))}
            <span className="sr-only">Loading articles</span>
          </div>
        )}

        {isNearViewport && !loading && (error || posts.length === 0) && (
          <div className="rounded-lg border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <p className="mb-5 text-zinc-600 dark:text-zinc-400">Articles are temporarily unavailable here.</p>
            <a href="https://medium.com/@wwwaiyan" target="_blank" rel="noopener noreferrer" className="ui-control inline-flex items-center gap-2 rounded-full border border-zinc-300 px-5 py-2.5 font-semibold text-zinc-900 dark:border-zinc-700 dark:text-white">
              Visit Medium <ArrowUpRight size={16} />
            </a>
          </div>
        )}

        {isNearViewport && !loading && posts.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence initial={false}>
                {visiblePosts.map((post, index) => (
                  <motion.a
                    key={post.link}
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, delay: Math.min(index * 0.035, 0.14) }}
                    className="ui-card group flex min-h-[17rem] flex-col rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <div className="mb-6 flex items-start justify-between gap-3">
                      <span className="font-mono text-[11px] font-semibold uppercase text-cyan-700 dark:text-cyan-400">
                        {post.categories[0] || 'Article'}
                      </span>
                      <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="min-h-[3.25rem] text-lg font-bold leading-snug text-zinc-900 transition-colors group-hover:text-cyan-700 dark:text-white dark:group-hover:text-cyan-300">
                      {post.title}
                    </h3>
                    {post.description && <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{post.description}</p>}
                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-zinc-100 pt-5 font-mono text-[10px] text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                      <span className="flex items-center gap-1"><Calendar size={11} />{formatDate(post.pubDate)}</span>
                      <span className="flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
                    </div>
                  </motion.a>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {posts.length > INITIAL_DISPLAY_COUNT && (
                <button
                  type="button"
                  onClick={() => setShowAll((current) => !current)}
                  aria-label={showAll ? 'Show fewer articles' : 'Show all articles'}
                  title={showAll ? 'Show fewer articles' : 'Show all articles'}
                  className="ui-icon flex h-11 w-11 items-center justify-center rounded-full border border-zinc-300 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
                >
                  {showAll ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              )}
              <a href="https://medium.com/@wwwaiyan" target="_blank" rel="noopener noreferrer" className="ui-control inline-flex h-11 items-center gap-2 rounded-full border border-zinc-300 px-5 text-sm font-semibold text-zinc-900 dark:border-zinc-700 dark:text-white">
                All articles <ArrowUpRight size={16} />
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
