'use client';

import { useEffect, useState } from 'react';

export default function JournalHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`journal-topbar${isScrolled ? ' is-scrolled' : ''}`}>
      <a className="wordmark" href="#top" aria-label="Ravi Rekhi, home">RR<span>.</span></a>
      <nav className="section-nav" aria-label="Portfolio sections">
        <a href="#about"><span />About</a>
        <a href="#films"><span />Films</a>
        <a href="#portraits"><span />Portraits</a>
        <a href="#contact"><span />Contact</a>
      </nav>
    </div>
  );
}
