'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Sparkles, X } from 'lucide-react';
import { SupportChatPanel } from './SupportChatPanel';
import { cn } from '@/lib/utils';

export function SupportChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  // Close with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center print:hidden">
      {/* Interactive Chat Panel */}
      <SupportChatPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/* Floating Prompt Pill (shown when chat is closed on larger screens) */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="hidden sm:inline-flex items-center gap-2 rounded-full bg-card/95 backdrop-blur-md px-3.5 py-2 text-xs font-medium text-foreground shadow-lg border border-border/70 mr-3 hover:bg-muted/80 hover:border-primary/40 transition-all duration-200 cursor-pointer group"
        >
          <Sparkles className="size-3.5 text-primary group-hover:rotate-12 transition-transform duration-200" />
          <span>
            Need help? <strong className="text-primary font-semibold">Chat with AI</strong>
          </span>
        </button>
      )}

      {/* Floating Action Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close AI Support Chat' : 'Open AI Support Chat'}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className={cn(
          'relative flex size-14 items-center justify-center rounded-full shadow-xl transition-all duration-300 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer shrink-0',
          isOpen
            ? 'bg-muted text-foreground border border-border/80 hover:bg-muted/80 rotate-90 scale-95 shadow-md'
            : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:scale-105 active:scale-95'
        )}
      >
        {isOpen ? (
          <X className="size-6 transition-transform duration-200" />
        ) : (
          <>
            <MessageSquare className="size-6 transition-transform duration-200" />

            {/* Online Status Indicator on outer top-right perimeter */}
            <span
              className="absolute -top-0.5 -right-0.5 flex size-3.5 items-center justify-center"
              aria-hidden="true"
            >
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-3.5 rounded-full bg-emerald-500 ring-2 ring-background" />
            </span>
          </>
        )}
      </button>
    </div>
  );
}
