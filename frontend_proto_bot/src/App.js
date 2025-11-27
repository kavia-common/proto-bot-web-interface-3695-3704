import React, { useEffect, useState } from 'react';
import './index.css';
import Chat from './pages/Chat';

/**
 * NavBar with brand, simple links, a Chat link, and a dark mode toggle.
 */
// PUBLIC_INTERFACE
function NavBar({ theme, onToggleTheme, currentView, onNavigate }) {
  /** NavBar for Proto Bot site header with Chat entry point. */
  const linkBase =
    'text-sm text-neutral-600 dark:text-neutral-300 hover:text-primary transition-colors';
  const active =
    'text-primary dark:text-primary font-semibold';

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-surface/80 dark:bg-neutral-900/80 backdrop-blur border-b border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-primary/90 flex items-center justify-center text-white font-bold shadow-sm">P</div>
          <button
            className="text-lg font-semibold text-textcolor dark:text-white"
            onClick={() => onNavigate('home')}
            aria-label="Go to Home"
          >
            Proto Bot
          </button>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <button onClick={() => onNavigate('home')} className={`${linkBase} ${currentView === 'home' ? active : ''}`}>Home</button>
          <button onClick={() => onNavigate('chat')} className={`${linkBase} ${currentView === 'chat' ? active : ''}`}>Chat</button>
          <a href="#features" className={linkBase}>Features</a>
          <a href="#about" className={linkBase}>About</a>
          <a href="#contact" className={linkBase}>Contact</a>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
          >
            {theme === 'light' ? '🌙' : '☀️'}
            <span className="text-sm">{theme === 'light' ? 'Dark' : 'Light'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

/**
 * Hero section for the home page with CTA buttons.
 */
// PUBLIC_INTERFACE
function HomeHero({ onNavigate }) {
  /** Centered hero with gradient background and CTAs. */
  return (
    <section className="pt-24 sm:pt-28">
      <div className="relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-500/10 to-gray-50 dark:from-blue-900/10 dark:to-neutral-900" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-textcolor dark:text-white">
              Build Faster with Proto Bot
            </h1>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              A lightweight React + Tailwind starter featuring an Ocean Professional theme, ready for rapid prototyping.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('chat')}
                className="btn btn-primary shadow-sm"
              >
                Open Chat
              </button>
              <a
                href="#learn-more"
                className="btn btn-secondary"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Footer component.
 */
// PUBLIC_INTERFACE
function Footer() {
  /** Footer for the site with subtle border and brand. */
  return (
    <footer className="mt-auto border-t border-neutral-200 dark:border-neutral-800 bg-surface dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          © {new Date().getFullYear()} Proto Bot. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm">
          <a href="#privacy" className="text-neutral-600 dark:text-neutral-400 hover:text-primary transition-colors">Privacy</a>
          <a href="#terms" className="text-neutral-600 dark:text-neutral-400 hover:text-primary transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}

/**
 * Main App composing NavBar, HomeHero, Chat and Footer with simple in-app view state.
 */
// PUBLIC_INTERFACE
function App() {
  /** Main app with theme toggling and lightweight client-side 'routing' via local state. */
  const [theme, setTheme] = useState('light');
  const [view, setView] = useState('home'); // 'home' | 'chat'

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  const onNavigate = (next) => setView(next);

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-neutral-950">
      <NavBar theme={theme} onToggleTheme={toggleTheme} currentView={view} onNavigate={onNavigate} />
      <main className="flex-1">
        {view === 'home' && <HomeHero onNavigate={onNavigate} />}
        {view === 'chat' && <Chat />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
