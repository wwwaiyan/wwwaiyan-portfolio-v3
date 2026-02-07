import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Calendar, Clock, BookOpen, Loader2, ChevronDown, ChevronUp } from 'lucide-react';

interface BlogPost {
    title: string;
    link: string;
    pubDate: string;
    thumbnail: string;
    description: string;
    categories: string[];
}

interface MediumRSSResponse {
    status: string;
    feed: {
        title: string;
        link: string;
        author: string;
        description: string;
        image: string;
    };
    items: Array<{
        title: string;
        pubDate: string;
        link: string;
        guid: string;
        author: string;
        thumbnail: string;
        description: string;
        content: string;
        categories: string[];
    }>;
}

export const Blog: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showAll, setShowAll] = useState(false);

    const INITIAL_DISPLAY_COUNT = 4;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Using RSS2JSON to convert Medium RSS feed to JSON
                const response = await fetch(
                    'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@wwwaiyan'
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch blog posts');
                }

                const data: MediumRSSResponse = await response.json();

                if (data.status === 'ok') {
                    const formattedPosts = data.items.map(item => ({
                        title: item.title,
                        link: item.link,
                        pubDate: item.pubDate,
                        thumbnail: item.thumbnail || extractImageFromContent(item.content),
                        description: stripHtml(item.description).slice(0, 150) + '...',
                        categories: item.categories || []
                    }));
                    setPosts(formattedPosts);
                } else {
                    throw new Error('Invalid response from RSS feed');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load posts');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // Helper to extract first image from HTML content
    const extractImageFromContent = (content: string): string => {
        const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
        return imgMatch ? imgMatch[1] : '';
    };

    // Helper to strip HTML tags
    const stripHtml = (html: string): string => {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };

    // Format date
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Estimate read time (average 200 words per minute)
    const getReadTime = (description: string): string => {
        const wordCount = description.split(/\s+/).length;
        const minutes = Math.max(1, Math.ceil(wordCount / 200) * 3); // Estimate full article
        return `${minutes} min read`;
    };

    if (loading) {
        return (
            <section className="py-24 bg-zinc-100 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-900/50 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-cyan-500" />
                    <p className="text-zinc-500 mt-4">Loading blog posts...</p>
                </div>
            </section>
        );
    }

    if (error || posts.length === 0) {
        return (
            <section className="py-24 bg-zinc-100 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-900/50 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-zinc-900 dark:text-white tracking-tight">
                            Latest from Medium
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-8">
                            Technical articles and insights on DevOps, Cloud, and Infrastructure.
                        </p>
                        <a
                            href="https://medium.com/@wwwaiyan"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full font-bold hover:bg-cyan-600 dark:hover:bg-cyan-400 transition-colors"
                        >
                            <BookOpen size={18} />
                            Visit My Medium Blog
                            <ExternalLink size={14} />
                        </a>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-24 bg-zinc-100 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-900/50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-zinc-900 dark:text-white tracking-tight">
                        Latest from Medium
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
                        Technical articles and insights on DevOps, Cloud, and Infrastructure.
                    </p>
                </motion.div>

                {/* Blog Grid - Responsive columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                    <AnimatePresence>
                        {(showAll ? posts : posts.slice(0, INITIAL_DISPLAY_COUNT)).map((post, index) => (
                            <motion.a
                                key={post.link}
                                href={post.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{
                                    duration: 0.5,
                                    ease: [0.22, 1, 0.36, 1],
                                    delay: index * 0.1
                                }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                layout
                                className="group relative flex flex-col bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-900/10 transition-all duration-300"
                            >
                                {/* Clean Cover Image */}
                                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900">
                                    {post.thumbnail && (
                                        <img
                                            src={post.thumbnail}
                                            alt={post.title}
                                            loading="lazy"
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                    )}

                                    {/* Hover indicator */}
                                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <ExternalLink size={14} className="text-white" />
                                    </div>
                                </div>

                                {/* Content below image */}
                                <div className="p-4">
                                    {/* Category */}
                                    {post.categories.length > 0 && (
                                        <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-2 block">
                                            {post.categories[0]}
                                        </span>
                                    )}

                                    {/* Title */}
                                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white leading-snug line-clamp-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                        {post.title}
                                    </h3>

                                    {/* Meta */}
                                    <div className="flex items-center gap-3 mt-3 text-[10px] text-zinc-500 dark:text-zinc-500 font-mono">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={10} />
                                            {formatDate(post.pubDate)}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock size={10} />
                                            {getReadTime(post.description)}
                                        </span>
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Show More / Show Less Button - Icon only */}
                {posts.length > INITIAL_DISPLAY_COUNT && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-center mb-8"
                    >
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-500 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-cyan-500/25 hover:scale-110"
                            aria-label={showAll ? "Show less" : "Show more"}
                        >
                            {showAll ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                        </button>
                    </motion.div>
                )}

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <a
                        href="https://medium.com/@wwwaiyan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full font-bold hover:bg-cyan-600 dark:hover:bg-cyan-400 transition-colors"
                    >
                        <BookOpen size={18} />
                        View All Articles
                        <ExternalLink size={14} />
                    </a>
                </motion.div>
            </div>
        </section>
    );
};
