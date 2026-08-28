'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export interface GalleryItem {
  src: string;
  alt: string;
  title: string;
  note: string;
  orientation: 'landscape' | 'portrait';
}

export default function ImageGallery({ items }: { items: GalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowRight') setActiveIndex((index) => index === null ? 0 : (index + 1) % items.length);
      if (event.key === 'ArrowLeft') setActiveIndex((index) => index === null ? 0 : (index - 1 + items.length) % items.length);
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, items.length]);

  return (
    <>
      <div className="portrait-grid">
        {items.map((item, index) => (
          <figure className={`portrait-tile portrait-tile-${index % 3}`} key={item.src}>
            <button className={`portrait-placeholder portrait-placeholder-${item.orientation}`} type="button" onClick={() => setActiveIndex(index)} aria-label={`Open ${item.title}`}>
              <Image src={item.src} alt={item.alt} fill sizes="(max-width: 760px) 50vw, 30vw" />
              <span className="gallery-open" aria-hidden="true">View full image ↗</span>
            </button>
            <figcaption><strong>{item.title}</strong><span>{item.note}</span></figcaption>
          </figure>
        ))}
      </div>

      {activeIndex !== null && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Full-size film portrait" onClick={() => setActiveIndex(null)}>
          <button className="gallery-close" type="button" onClick={() => setActiveIndex(null)} aria-label="Close gallery">×</button>
          <button className="gallery-control gallery-prev" type="button" onClick={(event) => { event.stopPropagation(); setActiveIndex((activeIndex - 1 + items.length) % items.length); }} aria-label="Previous image">←</button>
          <div className="gallery-stage" onClick={(event) => event.stopPropagation()}>
            <Image src={items[activeIndex].src} alt={items[activeIndex].alt} fill sizes="90vw" className="gallery-image" priority />
            <div className="gallery-caption"><strong>{items[activeIndex].title}</strong><span>{items[activeIndex].note}</span><small>{activeIndex + 1} / {items.length}</small></div>
          </div>
          <button className="gallery-control gallery-next" type="button" onClick={(event) => { event.stopPropagation(); setActiveIndex((activeIndex + 1) % items.length); }} aria-label="Next image">→</button>
        </div>
      )}
    </>
  );
}
