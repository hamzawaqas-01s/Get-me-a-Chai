import { useEffect, useRef, useState } from "react";

// Fires once when the element enters the viewport, then disconnects.
// Deliberately NOT re-triggering on every scroll pass — a section
// re-animating every time you scroll past it reads as jittery, not polished.
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}