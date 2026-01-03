import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '../content/siteConfig';
import { getLocalizedText, Language } from '../lib/i18n';

interface VideoPlayerProps {
  videoId: string;
  language: Language;
  onOpen: (videoId: string) => void;
}

function VideoPlayer({ videoId, language, onOpen }: VideoPlayerProps) {
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <button
      onClick={() => onOpen(videoId)}
      className="glass-button group relative aspect-video w-full overflow-hidden rounded-[6px] bg-gray-900/40 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-black"
    >
      {/* Thumbnail */}
      <img
        src={thumbnailUrl}
        alt={getLocalizedText(siteConfig.accessibility.videoThumbnail, language)}
        className="h-full w-full object-cover transition-transform group-hover:scale-105"
        loading="lazy"
      />

      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 transition-transform group-hover:scale-110">
          <svg
            className="h-8 w-8 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  );
}

interface YouTubeProps {
  language: Language;
}

export function YouTube({ language }: YouTubeProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const isAdjusting = useRef(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const autoScrollRef = useRef<number | null>(null);
  const tripledVideos = [
    ...siteConfig.youtube.videos,
    ...siteConfig.youtube.videos,
    ...siteConfig.youtube.videos
  ];

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const setWidth = carousel.scrollWidth / 3;
    carousel.scrollLeft = setWidth;
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    if (window.innerWidth >= 768) return;

    const step = () => {
      carousel.scrollLeft += 0.18;
      autoScrollRef.current = requestAnimationFrame(step);
    };

    autoScrollRef.current = requestAnimationFrame(step);
    return () => {
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!activeVideoId) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveVideoId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeVideoId]);

  const handleScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel || isAdjusting.current) return;

    const setWidth = carousel.scrollWidth / 3;
    const left = carousel.scrollLeft;
    const min = setWidth * 0.25;
    const max = setWidth * 1.75;

    if (left < min) {
      isAdjusting.current = true;
      carousel.scrollLeft = left + setWidth;
      requestAnimationFrame(() => {
        isAdjusting.current = false;
      });
    } else if (left > max) {
      isAdjusting.current = true;
      carousel.scrollLeft = left - setWidth;
      requestAnimationFrame(() => {
        isAdjusting.current = false;
      });
    }
  };

  return (
    <section id="music" className="bg-transparent py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-[2.4rem] leading-[1.1] font-black tracking-tight text-white sm:text-6xl md:text-7xl">
            {getLocalizedText(siteConfig.youtube.title, language)}
          </h2>
        </div>

        <div className="md:hidden">
            <div
              ref={carouselRef}
              onScroll={handleScroll}
              className="flex gap-6 overflow-x-auto overflow-y-visible pb-6 pt-2 px-6 md:snap-x md:snap-mandatory"
            >
            {tripledVideos.map((video, index) => (
              <div
                key={`${video.id}-${index}`}
              className="glass-card min-w-[80%] rounded-[6px] p-4 transform-gpu transition-transform duration-300"
              style={{
                transform: `rotate(-1.5deg) translateY(${[14, 2, -10, 6][index % 4]}px)`
              }}
            >
              <VideoPlayer
                videoId={video.id}
                language={language}
                onOpen={setActiveVideoId}
              />
                <p className="mt-3 text-sm uppercase tracking-wide text-gray-300">
                  {getLocalizedText(video.title, language)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
          {siteConfig.youtube.videos.map((video, index) => (
            <div key={`${video.id}-${index}`} className="glass-card rounded-[6px] p-4">
              <VideoPlayer
                videoId={video.id}
                language={language}
                onOpen={setActiveVideoId}
              />
              <p className="mt-3 text-sm uppercase tracking-wide text-gray-300">
                {getLocalizedText(video.title, language)}
              </p>
            </div>
          ))}
        </div>

        {activeVideoId && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            role="dialog"
            aria-modal="true"
            aria-label={getLocalizedText(siteConfig.accessibility.youtubePlayerTitle, language)}
          >
            <button
              type="button"
              className="absolute inset-0 cursor-pointer"
              aria-label={getLocalizedText(siteConfig.accessibility.closeModal, language)}
              onClick={() => setActiveVideoId(null)}
            />
            <div className="relative z-10 w-full max-w-4xl">
              <button
                type="button"
                onClick={() => setActiveVideoId(null)}
                className="absolute -top-12 right-0 text-xs uppercase tracking-wider text-white/70 hover:text-white"
              >
                {getLocalizedText(siteConfig.accessibility.closeModal, language)}
              </button>
              <div className="aspect-video w-full overflow-hidden rounded-[6px] bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&controls=1`}
                  title={getLocalizedText(siteConfig.accessibility.youtubePlayerTitle, language)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
