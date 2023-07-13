import React, {Ref, useEffect, useRef} from 'react';

interface IProps {
  element: HTMLElement;
}

export default function useIntersectionObserver({element}: IProps) {
  let observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      const first = entries[0];
      // if (first.isIntersecting) {
      //   setPage((prev) => prev + 1);
      // }
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
