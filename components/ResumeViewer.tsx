import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, ExternalLink, X } from 'lucide-react';

interface ResumeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

const resumeFilename = 'Wai-Yan-Soe-DevOps-Engineer.pdf';
const resumeUrl = `/assets/${resumeFilename}`;

export const ResumeViewer: React.FC<ResumeViewerProps> = ({ isOpen, onClose }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;

    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      previousFocus?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] bg-black/75 p-0 backdrop-blur-sm md:p-6"
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-viewer-title"
        initial={{ opacity: 0, y: 18, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.99 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex h-full max-w-6xl flex-col overflow-hidden border border-zinc-300 bg-zinc-100 shadow-2xl dark:border-zinc-700 dark:bg-zinc-900 md:rounded-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex min-h-16 items-center justify-between gap-3 border-b border-zinc-300 bg-white px-4 dark:border-zinc-700 dark:bg-zinc-950 md:px-5">
          <div className="min-w-0">
            <h2
              id="resume-viewer-title"
              className="truncate text-sm font-semibold text-zinc-950 dark:text-white md:text-base"
            >
              Wai Yan Soe - DevOps Engineer
            </h2>
            <p className="hidden text-xs text-zinc-500 sm:block">DevOps Engineer</p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open resume in a new tab"
              title="Open in new tab"
              className="ui-icon inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 text-zinc-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:border-zinc-700 dark:text-zinc-300"
            >
              <ExternalLink size={18} />
            </a>

            <a
              href={resumeUrl}
              download={resumeFilename}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-zinc-950 px-4 text-sm font-semibold text-white transition-colors hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-white dark:text-zinc-950 dark:hover:bg-cyan-300"
            >
              <Download size={17} />
              <span className="hidden sm:inline">Download</span>
            </a>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close resume viewer"
              title="Close"
              className="ui-icon inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 text-zinc-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:border-zinc-700 dark:text-zinc-300"
            >
              <X size={20} />
            </button>
          </div>
        </header>

        <div className="min-h-0 flex-1 bg-zinc-200 dark:bg-zinc-800">
          <iframe
            src={`${resumeUrl}#view=FitH&toolbar=1`}
            title="Wai Yan Soe resume PDF"
            className="h-full w-full border-0"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};
