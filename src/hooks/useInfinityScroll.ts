import {useEffect, useRef} from 'react';

interface IProps {
  callback: () => void;
  element: HTMLElement | null;
}

export default function useInfinityScroll({callback, element}: IProps) {
  let observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        callback();
      }
    });
  }, []);

  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;
    if (currentElement && currentObserver) {
      currentObserver.observe(currentElement);
    }
    return () => {
      if (currentElement && currentObserver) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);

  return {};
}
