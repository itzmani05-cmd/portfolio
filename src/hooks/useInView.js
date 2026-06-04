import { useEffect, useRef, useState } from 'react';

/**
 * Returns [ref, inView].
 * Attach `ref` to the element you want to observe.
 * `inView` flips to true once the element enters the viewport (one-shot).
 */
export function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}
