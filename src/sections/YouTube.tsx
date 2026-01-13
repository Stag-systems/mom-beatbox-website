import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '../content/siteConfig';
import { getLocalizedText, Language } from '../lib/i18n';

interface VideoPlayerProps {
  videoId: string;
  thumbnailUrl?: string;
  language: Language;
  onOpen: (videoId: string) => void;
}

function VideoPlayer({ videoId, thumbnailUrl, language, onOpen }: VideoPlayerProps) {
  const thumbnailOptions = [
    ...(thumbnailUrl ? [thumbnailUrl] : []),
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/default.jpg`
  ];
  const [thumbIndex, setThumbIndex] = useState(0);
  const activeThumbnailUrl = thumbnailOptions[thumbIndex] ?? thumbnailOptions[0];

  return (
    <button
      onClick={() => onOpen(videoId)}
      className="group relative aspect-video w-full overflow-hidden bg-gray-900/40 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-black"
    >
      {/* Thumbnail */}
      <img
        src={activeThumbnailUrl}
        alt={getLocalizedText(siteConfig.accessibility.videoThumbnail, language)}
        className="h-full w-full object-cover transition-transform group-hover:scale-105"
        loading="lazy"
        onError={() => {
          if (thumbIndex < thumbnailOptions.length - 1) {
            setThumbIndex(thumbIndex + 1);
          }
        }}
      />

      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
        <div className="glass-button flex h-14 w-14 items-center justify-center rounded-full transition-transform group-hover:scale-110">
          <svg
            className="h-7 w-7 text-white"
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
  const desktopCarouselRef = useRef<HTMLDivElement | null>(null);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'musicvideos' | 'battle' | 'concert'>('all');
  type VideoCategory = 'musicvideos' | 'battle' | 'concert';
  const filteredVideos =
    activeFilter === 'all'
      ? siteConfig.youtube.videos
      : siteConfig.youtube.videos.filter((video) => {
          const categories = 'categories' in video ? video.categories : undefined;
          const categoryList = (categories ?? [video.category]) as VideoCategory[];
          return categoryList.includes(activeFilter as VideoCategory);
        });
  
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

  const scrollDesktop = (direction: 'left' | 'right') => {
    const carousel = desktopCarouselRef.current;
    if (!carousel) return;
    const card = carousel.querySelector<HTMLElement>('[data-carousel-item]');
    const scrollAmount = card ? card.offsetWidth + 24 : carousel.clientWidth;
    carousel.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section id="music" className="py-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-gray-300 mb-[6px]">
            {getLocalizedText(siteConfig.youtube.eyebrow, language)}
          </p>
          <h2 className="text-[2.16rem] leading-[1.1] font-black tracking-[0.02em] text-white uppercase sm:text-6xl md:text-7xl">
            {getLocalizedText(siteConfig.youtube.title, language)}
          </h2>
          <p className="mt-4 text-sm text-gray-300">
            {language === 'de'
              ? 'Als Vorgeschmack geeignet. Für optimale Wirkung wird der Live-Genuss von MOM empfohlen.'
              : 'Enjoy as a preview. For optimal effect, experiencing MOM live is recommended.'}
          </p>
        </div>

        <div className="mt-8 mb-12 flex flex-wrap items-center justify-center gap-3 text-[10px] uppercase tracking-wide text-white/70">
          {(['all', 'musicvideos', 'battle', 'concert'] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`flex items-center gap-2 rounded-[6px] border border-white/10 border-hairline px-6 py-2 text-[10px] font-medium tracking-wider uppercase text-white transition hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-black ${
                activeFilter === filter
                  ? 'bg-white/5 text-white'
                  : 'text-white/80'
            }`}
          >
              {filter === 'all'
                ? 'ALL'
                : filter === 'battle'
                  ? 'COMPETITION'
                  : filter === 'musicvideos'
                    ? 'MUSIC VIDEOS'
                    : filter.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="mt-14 md:hidden">
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto overflow-y-visible pb-6 pt-8 px-0"
            >
            {filteredVideos.map((video, index) => (
              <div
                key={`${video.id}-${index}`}
              className="glass-card min-w-[80%] rounded-[6px] p-4 transform-gpu transition-transform duration-300"
              style={{
                transform: `rotate(-1.5deg) translateY(${[14, 2, -10, 6][index % 4]}px)`
              }}
            >
              <VideoPlayer
                videoId={video.id}
                thumbnailUrl={'thumbnailUrl' in video ? video.thumbnailUrl : undefined}
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

        {filteredVideos.length > 3 ? (
          <div className="mt-14 relative hidden md:block">
            <button
              type="button"
              onClick={() => scrollDesktop('left')}
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
              aria-label="Scroll left"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M12 5l-5 5 5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollDesktop('right')}
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
              aria-label="Scroll right"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M8 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div
              ref={desktopCarouselRef}
              className="overflow-x-auto scroll-smooth px-10"
            >
              <div className="flex gap-6">
                {filteredVideos.map((video, index) => (
                  <div
                    key={`${video.id}-${index}`}
                    data-carousel-item
                    className="glass-card w-[calc((100%-3rem)/3)] flex-shrink-0 rounded-[6px] p-4 transition-shadow md:hover:shadow-[0_0_18px_rgba(255,255,255,0.18)]"
                  >
                    <VideoPlayer
                      videoId={video.id}
                      thumbnailUrl={'thumbnailUrl' in video ? video.thumbnailUrl : undefined}
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
          </div>
        ) : (
          <div className="mt-14 hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
            {filteredVideos.map((video, index) => (
              <div
                key={`${video.id}-${index}`}
                className="glass-card rounded-[6px] p-4 transition-shadow md:hover:shadow-[0_0_18px_rgba(255,255,255,0.18)]"
              >
                <VideoPlayer
                  videoId={video.id}
                  thumbnailUrl={'thumbnailUrl' in video ? video.thumbnailUrl : undefined}
                  language={language}
                  onOpen={setActiveVideoId}
                />
                <p className="mt-3 text-sm uppercase tracking-wide text-gray-300">
                  {getLocalizedText(video.title, language)}
                </p>
              </div>
            ))}
          </div>
        )}

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
