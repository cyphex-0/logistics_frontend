'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Send,
  X,
  RotateCcw,
  Sparkles,
  Languages,
  Bot,
  ExternalLink,
  Loader2
} from 'lucide-react';
import {
  SupportChatMessage as ChatMessageType,
  SUGGESTED_QUESTIONS,
  SuggestedQuestion
} from '@/types/support';
import { SupportChatMessage } from './SupportChatMessage';
import { supportService } from '@/services/support.service';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SupportChatPanelProps {
  onClose: () => void;
  isOpen: boolean;
}

const STORAGE_KEY = 'shiply_support_chat_history_v1';
const LOCALE_KEY = 'shiply_support_chat_locale_v1';

export function SupportChatPanel({ onClose, isOpen }: SupportChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [locale, setLocale] = useState<'en' | 'bn'>('en');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load conversation and locale from sessionStorage on mount
  useEffect(() => {
    try {
      const savedMessages = sessionStorage.getItem(STORAGE_KEY);
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
      const savedLocale = sessionStorage.getItem(LOCALE_KEY) as 'en' | 'bn' | null;
      if (savedLocale === 'en' || savedLocale === 'bn') {
        setLocale(savedLocale);
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, []);

  // Persist messages to sessionStorage
  useEffect(() => {
    try {
      if (messages.length > 0) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } else {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Ignore storage errors
    }
  }, [messages]);

  // Persist locale
  useEffect(() => {
    try {
      sessionStorage.setItem(LOCALE_KEY, locale);
    } catch {
      // Ignore storage errors
    }
  }, [locale]);

  // Auto-scroll to bottom
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom('auto');
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom('smooth');
  }, [messages, isLoading]);

  // Toggle locale
  const toggleLocale = () => {
    setLocale((prev) => (prev === 'en' ? 'bn' : 'en'));
  };

  // Reset conversation
  const handleReset = () => {
    setMessages([]);
    setErrorMessage(null);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  // Send message
  const handleSendMessage = async (textToSend?: string) => {
    const rawContent = textToSend ?? inputValue;
    const content = rawContent.trim();
    if (!content || isLoading) return;

    if (content.length > 1000) {
      setErrorMessage(
        locale === 'bn'
          ? 'বার্তাটি ১০০০ অক্ষরের কম হতে হবে।'
          : 'Message must be under 1000 characters.'
      );
      return;
    }

    setErrorMessage(null);
    setInputValue('');

    const userMessage: ChatMessageType = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      createdAt: Date.now()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Construct bounded history payload (last 6 turns, user/assistant only)
      const historyPayload = messages.slice(-6).map((msg) => ({
        role: msg.role,
        content: msg.content
      }));

      const res = await supportService.sendMessage({
        message: content,
        history: historyPayload,
        locale
      });

      const assistantMessage: ChatMessageType = {
        id: res.requestId || crypto.randomUUID(),
        role: 'assistant',
        content: res.message,
        createdAt: Date.now(),
        grounded: res.grounded
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: unknown) {
      const errorText =
        locale === 'bn'
          ? 'দুঃখিত, সংযোগে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন অথবা আমাদের সহায়তা পাতায় যোগাযোগ করুন।'
          : 'Unable to connect to support service. Please try again or visit our Contact page.';

      const failedMessage: ChatMessageType = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: errorText,
        createdAt: Date.now(),
        isError: true
      };

      setMessages((prev) => [...prev, failedMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedClick = (question: SuggestedQuestion) => {
    const query = locale === 'bn' ? question.queryBn : question.queryEn;
    handleSendMessage(query);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-label="Shiply AI Support Chat"
      className="fixed bottom-24 right-4 sm:right-6 z-50 flex flex-col w-[calc(100vw-2rem)] sm:w-[400px] h-[580px] max-h-[85vh] rounded-2xl border border-border bg-card text-card-foreground shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/40 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Sparkles className="h-4 w-4" />
            <span
              className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-card"
              title="Online"
            />
          </div>
          <div>
            <h2 className="font-semibold text-sm leading-tight">Shiply Assistant</h2>
            <p className="text-[11px] text-muted-foreground">AI Support • Online</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLocale}
            className="h-8 px-2 text-xs font-medium text-muted-foreground hover:text-foreground"
            title={locale === 'en' ? 'বাংলা ভাষায় পরিবর্তন করুন' : 'Switch to English'}
          >
            <Languages className="h-3.5 w-3.5 mr-1" />
            {locale === 'en' ? 'BN' : 'EN'}
          </Button>

          {/* Reset Conversation */}
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleReset}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              title={locale === 'bn' ? 'কথোপকথন পরিষ্কার করুন' : 'Clear conversation'}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="sr-only">Clear chat</span>
            </Button>
          )}

          {/* Close Panel */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            title="Close"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close chat</span>
          </Button>
        </div>
      </div>

      {/* AI Grounding Notice */}
      <div className="bg-primary/5 px-3 py-1.5 border-b border-primary/10 text-[11px] text-muted-foreground text-center shrink-0">
        {locale === 'bn'
          ? 'শিপলির অনুমোদিত তথ্যভাণ্ডার থেকে উত্তর প্রদান করা হয়।'
          : 'Answers generated exclusively from verified Shiply service documentation.'}
      </div>

      {/* Messages Container */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-2 py-6 text-muted-foreground">
            <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
              <Bot className="h-6 w-6" />
            </div>
            <h3 className="font-medium text-foreground text-sm mb-1">
              {locale === 'bn' ? 'স্বাগতম! কীভাবে সাহায্য করতে পারি?' : 'Welcome! How can we help?'}
            </h3>
            <p className="text-xs text-muted-foreground max-w-[280px] mb-6">
              {locale === 'bn'
                ? 'শিপিং চার্জ, বুকিং নিয়মাবলী, ডেলিভারি এলাকা এবং পেমেন্ট সম্পর্কে জানুন।'
                : 'Ask about parcel pricing, service zones, booking steps, and supported payment methods.'}
            </p>

            {/* Starter Suggestion Chips */}
            <div className="w-full space-y-2 text-left">
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider px-1">
                {locale === 'bn' ? 'সচরাচর জিজ্ঞাসিত প্রশ্নসমূহ' : 'Suggested questions'}
              </p>
              <div className="flex flex-col gap-1.5">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => handleSuggestedClick(q)}
                    className="text-xs text-left px-3 py-2 rounded-lg border border-border/80 bg-muted/30 hover:bg-muted hover:border-primary/40 text-foreground transition-all duration-150 flex items-center justify-between group"
                  >
                    <span>{locale === 'bn' ? q.labelBn : q.labelEn}</span>
                    <span className="text-primary text-[11px] opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <SupportChatMessage
                key={message.id}
                message={message}
                onRetry={
                  message.isError
                    ? () => {
                        const lastUserMsg = messages
                          .slice()
                          .reverse()
                          .find((m) => m.role === 'user');
                        if (lastUserMsg) {
                          handleSendMessage(lastUserMsg.content);
                        }
                      }
                    : undefined
                }
              />
            ))}

            {isLoading && (
              <div className="flex gap-2.5 my-2 max-w-[85%] text-sm mr-auto items-center">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-foreground border border-border/60">
                  <Sparkles className="h-3.5 w-3.5 text-primary animate-spin" />
                </div>
                <div className="rounded-2xl px-3.5 py-2 rounded-tl-xs bg-muted/80 text-muted-foreground border border-border/50 text-xs flex items-center gap-1.5">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                  <span>
                    {locale === 'bn' ? 'উত্তর তৈরি করা হচ্ছে...' : 'Shiply AI is answering...'}
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

        {/* Error alert banner */}
        {errorMessage && (
          <div className="px-4 py-1.5 text-xs bg-destructive/10 text-destructive border-t border-destructive/20 text-center">
            {errorMessage}
          </div>
        )}

      {/* Input Area */}
      <div className="p-3 border-t bg-card shrink-0">
        <div className="relative flex items-center">
          <textarea
            ref={inputRef}
            rows={1}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              locale === 'bn'
                ? 'একটি প্রশ্ন লিখুন (Enter চাপুন)...'
                : 'Ask a question (Press Enter to send)...'
            }
            maxLength={1000}
            disabled={isLoading}
            className="w-full resize-none rounded-xl border border-input bg-background px-3 py-2.5 pr-10 text-xs placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 max-h-24"
          />
          <Button
            type="button"
            size="icon"
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isLoading}
            className="absolute right-1.5 h-7 w-7 rounded-lg"
            title="Send"
          >
            <Send className="h-3.5 w-3.5" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>

        {/* Footer info & human support link */}
        <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground px-1">
          <span>{inputValue.length}/1000</span>
          <Link
            href="/contact"
            onClick={onClose}
            className="hover:text-primary transition-colors flex items-center gap-0.5 underline font-medium"
          >
            <span>{locale === 'bn' ? 'মানব প্রতিনিধির সাথে যোগাযোগ' : 'Talk to human support'}</span>
            <ExternalLink className="h-2.5 w-2.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
