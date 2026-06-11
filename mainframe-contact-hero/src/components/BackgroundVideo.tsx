import { useEffect, useRef } from 'react';

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4';

/** Below this viewport width, scrubbing is disabled and the video simply plays. */
const DESKTOP_MIN_WIDTH = 1024;

/** A full sweep across 80% of the viewport width scrubs through the whole clip. */
const SCRUB_SENSITIVITY = 0.8;

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Desktop mouse scrubbing: horizontal mouse movement seeks through the clip.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let previousX: number | null = null;
    let targetTime = 0;
    let seeking = false;

    const seekToTarget = () => {
      seeking = true;
      video.currentTime = targetTime;
    };

    // Once the browser finishes a seek, chase the latest target so the frame
    // tracks the cursor smoothly without flooding the decoder with seeks.
    const handleSeeked = () => {
      seeking = false;
      if (Math.abs(video.currentTime - targetTime) > 0.01) seekToTarget();
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (window.innerWidth < DESKTOP_MIN_WIDTH) return; // scrubbing disabled on small screens

      if (previousX === null) {
        previousX = event.clientX;
        return;
      }

      const delta = event.clientX - previousX;
      previousX = event.clientX;

      const { duration } = video;
      if (!duration || Number.isNaN(duration)) return;

      const nextTime = targetTime + (delta / window.innerWidth) * SCRUB_SENSITIVITY * duration;
      targetTime = Math.min(Math.max(nextTime, 0), duration);

      if (!seeking) seekToTarget();
    };

    window.addEventListener('mousemove', handleMouseMove);
    video.addEventListener('seeked', handleSeeked);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, []);

  // Mobile autoplay: scrubbing is disabled below the lg breakpoint, so just play.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.innerWidth >= DESKTOP_MIN_WIDTH) return;

    video.autoplay = true;
    video.loop = true;
    const playback = video.play();
    if (playback !== undefined) {
      playback.catch(() => {
        /* Autoplay can be rejected before any interaction; the muted video stays on its poster frame. */
      });
    }
  }, []);

  return (
    <div className="order-last lg:order-none relative lg:absolute lg:inset-0 lg:z-0 overflow-hidden pointer-events-none w-full aspect-square md:aspect-video lg:aspect-auto lg:h-full bg-neutral-50 lg:bg-transparent">
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover object-right lg:object-right-bottom"
      />
    </div>
  );
}
