import { useState, useRef, useEffect } from "react";

const useImageLazyLoad = (src) => {
  const [imageSrc, setImageSrc] = useState("");
  const imageRef = useRef(null);

  useEffect(() => {
    let observer;
    if (imageRef) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observer.unobserve(imageRef.current);
          }
        },
        {
          threshold: [0],
          rootMargin: "200px",
        }
      );
      observer.observe(imageRef.current);
    }
    return () => observer && observer.disconnect(imageRef);
  }, [src]);

  return [imageSrc, imageRef];
};

export default useImageLazyLoad;
