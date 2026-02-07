import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RESUME_DATA } from '../constants';
import * as Icons from 'lucide-react';
import { Send, X, Loader2, CheckCircle2, MessageSquare } from 'lucide-react';

interface FooterProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export const Footer: React.FC<FooterProps> = ({ isOpen, setIsOpen }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    // Reset success state when closing/opening
    useEffect(() => {
        if (isOpen) {
            setIsSuccess(false);
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate network delay for effect
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log('--- CONTACT FORM SUBMISSION ---');
        console.table(formData);
        console.log('-------------------------------');

        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <footer className="py-24 bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-900 relative transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tighter">
                        Let's build scalable systems.
                    </h2>

                    {!isOpen && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsOpen(true)}
                            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black rounded-full font-bold tracking-wide hover:bg-cyan-600 dark:hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
                        >
                            <MessageSquare size={20} className="group-hover:-rotate-12 transition-transform duration-300" />
                            <span>CONTACT ME</span>
                        </motion.button>
                    )}
                </motion.div>

                <AnimatePresence mode="wait">
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden mb-16"
                        >
                            <div className="max-w-md mx-auto bg-zinc-50 dark:bg-zinc-900/50 p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-left relative shadow-xl">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>

                                {!isSuccess ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                                            <span className="w-2 h-8 bg-cyan-500 rounded-full" />
                                            Send a Message
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
                                                    className="w-full bg-white dark:bg-black border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-700"
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
                                                    className="w-full bg-white dark:bg-black border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-700"
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
                                                    className="w-full bg-white dark:bg-black border border-zinc-300 dark:border-zinc-800 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-700 resize-none"
                                                    placeholder="Tell me about your project..."
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-zinc-300 dark:disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all mt-2"
                                            >
                                                {isSubmitting ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                                                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
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
                                        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Message Sent!</h3>
                                        <p className="text-zinc-500">I'll get back to you as soon as possible.</p>
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
                    className="flex justify-center gap-6 mb-12 flex-wrap"
                >
                    {RESUME_DATA.links.map((link, i) => {
                        const IconComponent = (Icons as any)[link.icon] || Icons.Link;
                        return (
                            <motion.a
                                key={i}
                                variants={{
                                    hidden: { opacity: 0, y: 10 }, // Reduced from 20
                                    visible: { opacity: 1, y: 0 }
                                }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-cyan-500/50 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all duration-300 group"
                            >
                                <IconComponent size={18} className="text-zinc-500 dark:text-zinc-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors" />
                                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white">{link.platform}</span>
                            </motion.a>
                        );
                    })}
                </motion.div>
                <p className="text-zinc-400 dark:text-zinc-600 text-xs font-mono">
                    © {new Date().getFullYear()} Wai Yan Soe • Built with passion
                </p>
            </div>
        </footer>
    );
};