import { useState } from 'react';
import { siteConfig } from '../content/siteConfig';

interface VideoPlayerProps {
  videoId: string;
}

function VideoPlayer({ videoId }: VideoPlayerProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  if (!isLoaded) {
    return (
      <button
        onClick={() => setIsLoaded(true)}
        className="group relative aspect-video w-full overflow-hidden rounded-lg bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
      >
        {/* Thumbnail */}
        <img
          src={thumbnailUrl}
          alt="Video thumbnail"
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
    <div className="aspect-video w-full overflow-hidden rounded-lg">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}

export function YouTube() {
  return (
    <section id="music" className="bg-black py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl">
            MUSIC
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {siteConfig.youtube.videoIds.map((videoId, index) => (
            <VideoPlayer key={`${videoId}-${index}`} videoId={videoId} />
          ))}
        </div>
      </div>
    </section>
  );
}
