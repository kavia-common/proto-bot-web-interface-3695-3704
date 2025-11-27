import React, { useEffect, useMemo, useRef, useState } from 'react';
import MessageBubble from '../components/MessageBubble';

/**
 * Chat page renders a chat interface with:
 * - Scrollable message list
 * - Input with Enter to send, Shift+Enter for newline
 * - Simulated bot replies with a typing indicator (no external API)
 * - Ocean Professional theme and dark mode support
 */
// PUBLIC_INTERFACE
export default function Chat() {
  /** Chat component with internal state and mock bot behavior. */
  const [messages, setMessages] = useState(() => [
    { id: 'm1', role: 'bot', text: 'Hello! I am your Proto Bot. Ask me anything or say hi! 🤖', ts: Date.now() },
  ]);
  const [input, setInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);

  const listRef = useRef(null);
  const inputRef = useRef(null);
  const pendingBotTimer = useRef(null);

  useEffect(() => {
    // auto focus input when page loads
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    // auto scroll to bottom when messages change
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, isBotTyping]);

  useEffect(() => {
    // Cleanup timer on unmount
    return () => {
      if (pendingBotTimer.current) {
        clearTimeout(pendingBotTimer.current);
      }
    };
  }, []);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: trimmed,
      ts: Date.now(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    simulateBotResponse(trimmed);
  };

  const simulateBotResponse = (userText) => {
    // Show typing indicator
    setIsBotTyping(true);

    // Random delay between 800 - 1200ms
    const delay = 800 + Math.floor(Math.random() * 400);
    pendingBotTimer.current = setTimeout(() => {
      const replyText = `Proto Bot: You said "${userText}". I'm here to help! 🌊`;
      const botMsg = {
        id: `b-${Date.now()}`,
        role: 'bot',
        text: replyText,
        ts: Date.now(),
      };
      setMessages(prev => [...prev, botMsg]);
      setIsBotTyping(false);
      pendingBotTimer.current = null;
    }, delay);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) return; // allow newline
      e.preventDefault();
      handleSend();
    }
  };

  const placeholder = useMemo(
    () => 'Type your message... (Enter to send, Shift+Enter for a new line)',
    []
  );

  return (
    <section className="pt-24 sm:pt-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="bg-surface dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-primary/90 text-white flex items-center justify-center text-sm font-bold shadow-sm">
                💬
              </div>
              <h2 className="text-base font-semibold text-textcolor dark:text-white">Chat</h2>
            </div>
          </div>

          {/* Messages Area */}
          <div
            ref={listRef}
            className="h-[60vh] sm:h-[65vh] overflow-y-auto px-3 sm:px-4 py-4 space-y-3 bg-gradient-to-b from-blue-500/5 to-transparent dark:from-blue-900/10"
          >
            {messages.map(m => (
              <MessageBubble
                key={m.id}
                role={m.role}
                text={m.text}
                timestamp={new Date(m.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              />
            ))}

            {isBotTyping && (
              <div className="w-full flex justify-start items-center gap-2">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/90 text-white flex items-center justify-center text-sm shadow-sm">
                  B
                </div>
                <div className="px-3 py-2 rounded-2xl text-sm bg-surface text-textcolor dark:bg-neutral-800 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                  <TypingDots />
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-neutral-200 dark:border-neutral-800 p-3 sm:p-4 bg-surface dark:bg-neutral-900">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                rows={1}
                placeholder={placeholder}
                className="flex-1 resize-none max-h-40 min-h-[44px] px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-textcolor dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm"
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={!input.trim() || isBotTyping}
                className={`btn ${(!input.trim() || isBotTyping) ? 'opacity-60 cursor-not-allowed' : ''} bg-primary text-white hover:bg-blue-600 rounded-lg px-4 py-2`}
                aria-label="Send message"
              >
                Send
              </button>
            </div>
            <div className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
              Press Enter to send • Shift+Enter for a new line
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TypingDots() {
  /** Small animated typing indicator using Tailwind utilities. */
  return (
    <div className="flex items-center gap-1">
      <span className="sr-only">Bot is typing</span>
      <Dot delay="0" />
      <Dot delay="150" />
      <Dot delay="300" />
    </div>
  );
}

function Dot({ delay = '0' }) {
  return (
    <span
      className="inline-block w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-300 animate-bounce"
      style={{ animationDelay: `${delay}ms` }}
    />
  );
}
