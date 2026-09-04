import { useState, useEffect } from 'react';

/**
 * Hook to animate number counting up from 0 to target value
 * @param {number} end - Target value to count up to
 * @param {number} duration - Duration in milliseconds (default 1200ms)
 * @param {boolean} startOnMount - Whether to start immediately
 */
export function useCountUp(end, duration = 1200, startOnMount = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startOnMount || end === undefined || end === null) return;

    let startTime = null;
    let animationFrameId;
    const target = typeof end === 'number' ? end : parseFloat(end) || 0;

    const easeOutQuad = (t) => t * (2 - t);

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = easeOutQuad(progress) * target;
      
      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration, startOnMount]);

  return count;
}
