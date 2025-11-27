import React from 'react';

/**
 * MessageBubble component renders a single chat message as a styled bubble.
 * Supports user or bot variants, optional avatar/badge, timestamp and dark mode styles.
 */
// PUBLIC_INTERFACE
export default function MessageBubble({ role = 'user', text, timestamp, showAvatar = true }) {
  /** Render a single message bubble with styling based on role (user/bot). */
  const isUser = role === 'user';

  return (
    <div className={`w-full flex ${isUser ? 'justify-end' : 'justify-start'} items-end gap-2`}>
      {!isUser && showAvatar && (
        <div
          className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/90 text-white flex items-center justify-center text-sm shadow-sm"
          aria-hidden="true"
          title="Bot"
        >
          B
        </div>
      )}

      <div className={`max-w-[82%] sm:max-w-[70%]`}>
        <div
          className={[
            'px-3 py-2 rounded-2xl text-sm shadow-sm',
            isUser
              ? 'bg-primary text-white rounded-br-sm'
              : 'bg-surface text-textcolor dark:bg-neutral-800 dark:text-neutral-100 rounded-bl-sm border border-neutral-200 dark:border-neutral-700',
          ].join(' ')}
        >
          <p className="whitespace-pre-wrap leading-relaxed">{text}</p>
        </div>
        {timestamp && (
          <div className={`mt-1 text-[10px] ${isUser ? 'text-blue-50' : 'text-neutral-500 dark:text-neutral-400'}`}>
            {timestamp}
          </div>
        )}
      </div>

      {isUser && showAvatar && (
        <div
          className="flex-shrink-0 h-8 w-8 rounded-full bg-secondary text-black flex items-center justify-center text-sm shadow-sm"
          aria-hidden="true"
          title="You"
        >
          U
        </div>
      )}
    </div>
  );
}
