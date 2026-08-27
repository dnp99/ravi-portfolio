"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import type { PortfolioProject } from "../content/portfolio";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function ProjectCarousel({ project }: { project: PortfolioProject }) {
  const slides = project.screenshots?.length
    ? project.screenshots
    : project.screenshot
      ? [project.screenshot]
      : [];
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      setIsDarkTheme(document.documentElement.dataset.theme !== "light");
      setActiveIndex(0);
    };
    updateTheme();
    window.addEventListener("themechange", updateTheme);
    return () => window.removeEventListener("themechange", updateTheme);
  }, []);

  const themeSlides = isDarkTheme && project.darkScreenshots?.length
    ? project.darkScreenshots
    : slides;

  const move = (direction: 1 | -1) => {
    setActiveIndex((index) => (index + direction + themeSlides.length) % themeSlides.length);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
      if (event.key === "ArrowLeft") {
        setActiveIndex((index) => (index - 1 + themeSlides.length) % themeSlides.length);
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((index) => (index + 1) % themeSlides.length);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, slides.length, themeSlides.length]);

  if (!themeSlides.length) return null;

  return (
    <>
      <figure className="project-screenshot project-thumbnail">
        <button
          className="thumbnail-trigger"
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={`Open ${project.name} screenshots`}
        >
          <Image
            src={`${basePath}${themeSlides[0].src}`}
            alt={themeSlides[0].alt}
            width={themeSlides[0].width ?? 1600}
            height={themeSlides[0].height ?? 900}
            className="project-thumbnail-image"
            sizes="(max-width: 960px) calc(100vw - 80px), 52vw"
            style={{ objectPosition: themeSlides[0].position ?? "center" }}
            priority
          />
          <span className="thumbnail-overlay">View screenshots <span aria-hidden="true">↗</span></span>
        </button>
      </figure>

      {isOpen && createPortal(
        <div className="gallery-modal" role="dialog" aria-modal="true" aria-label={`${project.name} screenshots`}>
          <button className="gallery-backdrop" type="button" onClick={() => setIsOpen(false)} aria-label="Close gallery" />
          <div className="gallery-panel">
            <button className="gallery-close" type="button" onClick={() => setIsOpen(false)} aria-label="Close gallery">×</button>
            <div
              className="gallery-stage"
              onTouchStart={(event) => setTouchStart(event.changedTouches[0].clientX)}
              onTouchEnd={(event) => {
                if (touchStart === null) return;
                const distance = event.changedTouches[0].clientX - touchStart;
                if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1);
                setTouchStart(null);
              }}
            >
              <Image
                src={`${basePath}${themeSlides[activeIndex].src}`}
                alt={themeSlides[activeIndex].alt}
                width={themeSlides[activeIndex].width ?? 1600}
                height={themeSlides[activeIndex].height ?? 900}
                className="gallery-main-image"
                sizes="90vw"
                style={{ objectFit: "contain", objectPosition: themeSlides[activeIndex].position ?? "center" }}
              />
              {themeSlides.length > 1 && (
                <>
                  <button className="gallery-arrow gallery-arrow-prev" type="button" onClick={() => move(-1)} aria-label="Previous screenshot">←</button>
                  <button className="gallery-arrow gallery-arrow-next" type="button" onClick={() => move(1)} aria-label="Next screenshot">→</button>
                </>
              )}
              <span className="gallery-count">{activeIndex + 1} / {themeSlides.length}</span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

export function ProjectVisual({ project }: { project: PortfolioProject }) {
  if (project.screenshot || project.screenshots?.length) return <ProjectCarousel project={project} />;

  if (project.visual === "route") {
    return (
      <div className="route-visual" aria-hidden="true">
        <div className="visual-topline"><span>Tomorrow</span><b>6 visits</b></div>
        <div className="route-map">
          <span className="route-line" />
          <span className="map-dot dot-a">A</span>
          <span className="map-dot dot-b">B</span>
          <span className="map-dot dot-c">C</span>
          <span className="map-dot dot-d">D</span>
        </div>
        <div className="route-status"><i /> Schedule looks good <b>4:20 PM</b></div>
      </div>
    );
  }

  if (project.visual === "budget") {
    return (
      <div className="sprout-visual" aria-hidden="true">
        <div className="visual-topline"><span>July budget</span><b>On track</b></div>
        <div className="money-layout">
          <div className="money-ring"><strong>$842</strong><span>safe to spend</span></div>
          <div className="money-bars">
            <span><i style={{ width: "72%" }} /></span>
            <span><i style={{ width: "46%" }} /></span>
            <span><i style={{ width: "61%" }} /></span>
          </div>
        </div>
        <div className="capture-pill">{' + "coffee five dollars"'}</div>
      </div>
    );
  }

  return (
    <div className="generic-visual" aria-hidden="true">
      <div className="visual-topline"><span>Selected project</span><b>Built to ship</b></div>
      <div className="generic-project-name">{project.name}</div>
      <div className="generic-project-data">
        <span><small>Focus</small>{project.type}</span>
        <span><small>Stack</small>{project.stack}</span>
        <span><small>Proof</small>{project.proof.length} engineering highlights</span>
      </div>
    </div>
  );
}
