import { useEffect } from "react";

const InfinityScroll = (
  postLength,
  setCurrentPage,
  getCurrentPage,
  lastCardRef,
  getPostDataOfPage,
  totalElements
) => {
  useEffect(() => {
    if (totalElements === postLength) return;

    let observer;
    if (lastCardRef.current) {
      observer = new IntersectionObserver(
        async ([entry]) => {
          if (entry.isIntersecting) {
            setCurrentPage();
            const page = getCurrentPage + 1;
            await getPostDataOfPage(page);
          }
        },
        {
          threshold: 0.1,
        }
      );
      observer.observe(lastCardRef.current);
    }
    return () => observer && observer.disconnect();
  });
};
export default InfinityScroll;
