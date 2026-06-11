import { useEffect, useRef } from 'react';

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4';

/** How strongly horizontal mouse travel maps onto the video timeline. */
const SENSITIVITY = 0.8;

/**
 * Full-screen background video that never autoplays. Instead, horizontal
 * mouse movement scrubs the timeline forward and backward. Seeks are
 * serialized through the `seeked` event so we never flood the decoder:
 * while a seek is in flight we only advance `targetTime`, and `onSeeked`
 * issues the follow-up seek if the target moved in the meantime.
 */
export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let prevX: number | null = null;
    let targetTime = 0;
    let seeking = false;

    const seekTo = (time: number) => {
      seeking = true;
      video.currentTime = time;
    };

    const handleSeeked = () => {
      seeking = false;
      if (Math.abs(targetTime - video.currentTime) > 0.01) {
        seekTo(targetTime);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (prevX === null) {
        prevX = event.clientX;
        return;
      }
      const delta = event.clientX - prevX;
      prevX = event.clientX;

      const { duration } = video;
      if (!Number.isFinite(duration) || duration <= 0) return;

      const offset = (delta / window.innerWidth) * SENSITIVITY * duration;
      targetTime = Math.min(Math.max(targetTime + offset, 0), duration);
      if (!seeking) seekTo(targetTime);
    };

    video.addEventListener('seeked', handleSeeked);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      video.removeEventListener('seeked', handleSeeked);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={VIDEO_SRC}
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
      className="fixed inset-0 z-0 h-full w-full object-cover"
      style={{ objectPosition: '70% center' }}
    />
  );
}
