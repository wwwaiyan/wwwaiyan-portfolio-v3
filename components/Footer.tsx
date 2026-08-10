import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RESUME_DATA } from '../constants';
import {
    ArrowUpRight,
    Award,
    BookOpen,
    CheckCircle2,
    Github,
    Globe,
    Linkedin,
    Link,
    Mail,
    Send,
    X,
} from 'lucide-react';

interface FooterProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export const Footer: React.FC<FooterProps> = ({ isOpen, setIsOpen }) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    /* Removed useEffect that caused lint error */

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const subject = encodeURIComponent(`Portfolio inquiry from ${formData.name}`);
        const body = encodeURIComponent(`${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`);

        window.location.href = `mailto:${RESUME_DATA.contact.email}?subject=${subject}&body=${body}`;

        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const socialIcons: Record<string, React.ElementType> = {
        Award,
        BookOpen,
        Github,
        Globe,
        Linkedin,
    };

    return (
        <footer className="relative border-t border-zinc-200 bg-white py-8 transition-colors duration-300 dark:border-zinc-800 dark:bg-black md:py-10">
            <div className="mx-auto max-w-7xl px-5 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-auto flex max-w-xl flex-col items-center border-b border-zinc-200 pb-6 text-center dark:border-zinc-800 md:pb-8"
                >
                    <div className="mb-3 flex items-center gap-3 font-mono text-xs font-semibold uppercase text-cyan-700 dark:text-cyan-400">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        Get in touch
                    </div>
                    <h2 className="text-2xl font-bold leading-tight tracking-normal text-zinc-950 dark:text-white md:text-3xl">
                        Let's connect.
                    </h2>

                    <p className="mb-4 mt-2 max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        DevOps, Platform Engineering, Cloud, SRE, and Agentic Operations.
                    </p>

                    {!isOpen && (
                        <motion.button
                            whileHover={{ y: -2 }}
                            whileTap={{ y: 0 }}
                            onClick={() => { setIsOpen(true); setIsSuccess(false); }}
                            className="ui-control group inline-flex min-h-10 items-center gap-2.5 rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-cyan-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-cyan-300"
                        >
                            <Mail size={18} />
                            <span>Start a conversation</span>
                            <ArrowUpRight size={17} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </motion.button>
                    )}

                    <a
                        href={`mailto:${RESUME_DATA.contact.email}`}
                        className="mt-4 font-mono text-xs text-zinc-500 transition-colors hover:text-cyan-700 dark:text-zinc-400 dark:hover:text-cyan-300"
                    >
                        {RESUME_DATA.contact.email}
                    </a>
                </motion.div>

                <AnimatePresence mode="wait">
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden border-b border-zinc-200 dark:border-zinc-800"
                        >
                            <div className="relative mx-auto max-w-2xl py-10 text-left md:py-14">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    aria-label="Close email form"
                                    className="ui-control absolute right-0 top-8 flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-colors hover:text-zinc-900 dark:border-zinc-800 dark:hover:text-white md:top-12"
                                >
                                    <X size={20} />
                                </button>

                                {!isSuccess ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <h3 className="mb-7 flex items-center gap-3 text-xl font-bold text-zinc-900 dark:text-white">
                                            <span className="h-px w-8 bg-cyan-600 dark:bg-cyan-400" />
                                            Prepare an Email
                                        </h3>

                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div>
                                                <label htmlFor="name" className="block text-xs font-mono text-zinc-500 uppercase mb-1">Name / Company</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full rounded-md border border-zinc-300 bg-zinc-50 px-4 py-3 text-zinc-900 transition-colors placeholder:text-zinc-400 focus:border-cyan-600 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-700"
                                                    placeholder="Jane Doe"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-xs font-mono text-zinc-500 uppercase mb-1">Email Address</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full rounded-md border border-zinc-300 bg-zinc-50 px-4 py-3 text-zinc-900 transition-colors placeholder:text-zinc-400 focus:border-cyan-600 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-700"
                                                    placeholder="jane@example.com"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="message" className="block text-xs font-mono text-zinc-500 uppercase mb-1">Message</label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    required
                                                    rows={4}
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    className="w-full resize-none rounded-md border border-zinc-300 bg-zinc-50 px-4 py-3 text-zinc-900 transition-colors placeholder:text-zinc-400 focus:border-cyan-600 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-700"
                                                    placeholder="Tell me about your project..."
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-zinc-950 py-4 font-bold text-white transition-colors hover:bg-cyan-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-cyan-300"
                                            >
                                                <Send size={18} />
                                                OPEN EMAIL DRAFT
                                            </button>
                                        </form>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                            className="flex flex-col items-center justify-center py-12 text-center"
                                    >
                                        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                                            <CheckCircle2 size={40} className="text-green-500" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Email Draft Opened</h3>
                                        <p className="text-zinc-500">Your email app should open with the message ready to send.</p>
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="mt-8 px-6 py-2 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-full text-sm font-bold hover:bg-cyan-500 hover:text-white transition-colors"
                                        >
                                            Close
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        visible: { transition: { staggerChildren: 0.08 } }
                    }}
                    className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-5 md:pt-6"
                >
                    {RESUME_DATA.links.map((link, i) => {
                        const IconComponent = socialIcons[link.icon] || Link;
                        return (
                            <motion.a
                                key={i}
                                variants={{
                                    hidden: { opacity: 0, y: 8 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-cyan-700 dark:text-zinc-400 dark:hover:text-cyan-400"
                            >
                                <IconComponent size={16} />
                                <span>{link.platform}</span>
                                <ArrowUpRight size={13} className="opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                            </motion.a>
                        );
                    })}
                </motion.div>
                <div className="mt-5 border-t border-zinc-100 pt-4 text-center font-mono text-xs text-zinc-500 dark:border-zinc-900 dark:text-zinc-400">
                    <span>© {new Date().getFullYear()} Wai Yan Soe</span>
                </div>
            </div>
        </footer>
    );
};
