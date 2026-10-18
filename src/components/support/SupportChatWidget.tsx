'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Sparkles, X } from 'lucide-react';
import { SupportChatPanel } from './SupportChatPanel';
import { Button } from '@/components/ui/button';
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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end print:hidden">
      {/* Interactive Chat Panel */}
      <SupportChatPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/* Floating Trigger Button */}
      <Button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close AI Support Chat' : 'Open AI Support Chat'}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className={cn(
          'relative h-13 w-13 rounded-full shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 flex items-center justify-center p-0',
          isOpen ? 'bg-muted-foreground hover:bg-muted-foreground/90 text-background' : 'bg-primary hover:bg-primary/90 text-primary-foreground'
        )}
      >
        {isOpen ? (
          <X className="h-6 w-6 transition-transform duration-200" />
        ) : (
          <div className="relative flex items-center justify-center">
            <MessageSquare className="h-6 w-6" />
            <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-amber-300 animate-pulse" />
            {/* Green active dot */}
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-background" />
          </div>
        )}
      </Button>
    </div>
  );
}
