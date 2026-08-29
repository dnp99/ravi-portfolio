'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export interface GalleryItem {
  src: string;
  alt: string;
  title: string;
  note: string;
  orientation: 'landscape' | 'portrait';
}

export default function ImageGallery({ items, variant = 'portrait' }: { items: GalleryItem[]; variant?: 'portrait' | 'film' }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isFilm = variant === 'film';
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowRight') setActiveIndex((index) => index === null ? 0 : (index + 1) % items.length);
      if (event.key === 'ArrowLeft') setActiveIndex((index) => index === null ? 0 : (index - 1 + items.length) % items.length);
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex, items.length]);

  const changeImage = (direction: 1 | -1) => {
    setActiveIndex((index) => index === null ? 0 : (index + direction + items.length) % items.length);
  };

  const onTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) < 48) return;
    changeImage(distance < 0 ? 1 : -1);
  };

  return (
    <>
      <div className={isFilm ? 'film-stills' : 'portrait-grid'}>
        {items.map((item, index) => (
          isFilm ? (
            <button className={`film-still film-still-${item.orientation} ${index === 0 ? 'film-still-featured' : ''}`} type="button" onClick={() => setActiveIndex(index)} aria-label={`Open ${item.title} image ${index + 1}`} key={item.src}>
              <Image src={item.src} alt={item.alt} fill sizes="(max-width: 760px) 100vw, 58vw" />
              <span className="gallery-open" aria-hidden="true">View full image ↗</span>
            </button>
          ) : (
            <figure className={`portrait-tile portrait-tile-${index % 3}`} key={item.src}>
              <button className={`portrait-placeholder portrait-placeholder-${item.orientation}`} type="button" onClick={() => setActiveIndex(index)} aria-label={`Open ${item.title}`}>
                <Image src={item.src} alt={item.alt} fill sizes="(max-width: 760px) 50vw, 30vw" />
                <span className="gallery-open" aria-hidden="true">View full image ↗</span>
              </button>
              <figcaption><strong>{item.title}</strong><span>{item.note}</span></figcaption>
            </figure>
          )
        ))}
      </div>

      {activeIndex !== null && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Full-size film portrait" onClick={() => setActiveIndex(null)}>
          <button ref={closeRef} className="gallery-close" type="button" onClick={() => setActiveIndex(null)} aria-label="Close gallery">×</button>
          <button className="gallery-control gallery-prev" type="button" onClick={(event) => { event.stopPropagation(); changeImage(-1); }} aria-label="Previous image">←</button>
          <div className={`gallery-stage gallery-stage-${items[activeIndex].orientation}`} onClick={(event) => event.stopPropagation()} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <Image src={items[activeIndex].src} alt={items[activeIndex].alt} fill sizes="90vw" className="gallery-image" priority />
            <div className="gallery-caption"><strong>{items[activeIndex].title}</strong><span>{items[activeIndex].note}</span><small>{activeIndex + 1} / {items.length}</small></div>
          </div>
          <button className="gallery-control gallery-next" type="button" onClick={(event) => { event.stopPropagation(); changeImage(1); }} aria-label="Next image">→</button>
        </div>
      )}
    </>
  );
}
