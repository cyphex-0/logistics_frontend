'use client';

import React from 'react';
import Link from 'next/link';
import { Bot, User, AlertCircle, Sparkles } from 'lucide-react';
import { SupportChatMessage as ChatMessageType } from '@/types/support';
import { cn } from '@/lib/utils';

interface SupportChatMessageProps {
  message: ChatMessageType;
  onRetry?: () => void;
}

/**
 * Parses simple markdown link syntax [text](url) and newlines safely without dangerouslySetInnerHTML.
 */
function renderMessageContent(content: string) {
  // Regex to match [link text](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push(content.substring(lastIndex, match.index));
    }

    const text = match[1];
    const url = match[2];

    const isInternal = url.startsWith('/') || url.startsWith('#');
    if (isInternal) {
      parts.push(
        <Link
          key={`${url}-${match.index}`}
          href={url}
          className="font-medium underline text-primary hover:text-primary/80 transition-colors"
        >
          {text}
        </Link>
      );
    } else {
      parts.push(
        <a
          key={`${url}-${match.index}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-0.5"
        >
          {text}
        </a>
      );
    }

    lastIndex = linkRegex.lastIndex;
  }

  if (lastIndex < content.length) {
    parts.push(content.substring(lastIndex));
  }

  return parts.length > 0 ? parts : content;
}

export function SupportChatMessage({ message, onRetry }: SupportChatMessageProps) {
  const isUser = message.role === 'user';
  const formattedTime = new Intl.DateTimeFormat('default', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(new Date(message.createdAt));

  return (
    <div
      className={cn(
        'flex gap-2.5 my-2 max-w-[85%] text-sm leading-relaxed',
        isUser ? 'ml-auto flex-row-reverse' : 'mr-auto flex-row'
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-medium',
          isUser
            ? 'bg-primary text-primary-foreground'
            : message.isError
            ? 'bg-destructive/10 text-destructive'
            : 'bg-muted text-foreground border border-border/60'
        )}
        aria-hidden="true"
      >
        {isUser ? (
          <User className="h-3.5 w-3.5" />
        ) : message.isError ? (
          <AlertCircle className="h-3.5 w-3.5" />
        ) : (
          <Sparkles className="h-3.5 w-3.5 text-primary" />
        )}
      </div>

      {/* Bubble Content */}
      <div className="flex flex-col gap-1">
        <div
          className={cn(
            'rounded-2xl px-3.5 py-2.5 break-words shadow-xs',
            isUser
              ? 'bg-primary text-primary-foreground rounded-tr-xs'
              : message.isError
              ? 'bg-destructive/10 text-destructive border border-destructive/20 rounded-tl-xs'
              : 'bg-muted/80 text-foreground border border-border/50 rounded-tl-xs'
          )}
        >
          <div className="whitespace-pre-wrap">
            {renderMessageContent(message.content)}
          </div>

          {message.isError && onRetry && (
            <button
              onClick={onRetry}
              className="mt-2 text-xs font-semibold underline hover:opacity-80 block text-left"
            >
              Retry sending
            </button>
          )}
        </div>

        {/* Timestamp & grounded indicator */}
        <div
          className={cn(
            'flex items-center gap-1.5 px-1 text-[11px] text-muted-foreground',
            isUser ? 'justify-end' : 'justify-start'
          )}
        >
          <span>{formattedTime}</span>
          {!isUser && message.grounded && (
            <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
              • Verified Info
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
