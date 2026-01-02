import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '../content/siteConfig';
import { getLocalizedText, Language } from '../lib/i18n';

interface VideoPlayerProps {
  videoId: string;
  language: Language;
}

function VideoPlayer({ videoId, language }: VideoPlayerProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  if (!isLoaded) {
    return (
      <button
        onClick={() => setIsLoaded(true)}
        className="group relative aspect-video w-full overflow-hidden rounded-[6px] bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
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

  return (
    <div className="aspect-video w-full overflow-hidden rounded-[6px]">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={getLocalizedText(siteConfig.accessibility.youtubePlayerTitle, language)}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}

interface YouTubeProps {
  language: Language;
}

export function YouTube({ language }: YouTubeProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const isAdjusting = useRef(false);
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
    <section id="music" className="bg-black py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl">
            {getLocalizedText(siteConfig.youtube.title, language)}
          </h2>
        </div>

        <div className="md:hidden">
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 px-6"
          >
            {tripledVideos.map((video, index) => (
              <div
                key={`${video.id}-${index}`}
                className="min-w-[80%] snap-center"
              >
                <VideoPlayer videoId={video.id} language={language} />
                <p className="mt-3 text-sm uppercase tracking-wide text-gray-300">
                  {getLocalizedText(video.title, language)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
          {siteConfig.youtube.videos.map((video, index) => (
            <div key={`${video.id}-${index}`}>
              <VideoPlayer videoId={video.id} language={language} />
              <p className="mt-3 text-sm uppercase tracking-wide text-gray-300">
                {getLocalizedText(video.title, language)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
