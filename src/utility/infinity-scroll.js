import { useState } from "react";
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
            await getPostDataOfPage(getCurrentPage + 1);
          }
        },
        {
          threshold: 0.1,
        }
      );
      observer.observe(lastCardRef.current);
    }
    return () => observer && observer.disconnect();
  }, [
    getCurrentPage,
    getPostDataOfPage,
    postLength,
    setCurrentPage,
    totalElements,
    lastCardRef,
  ]);
};
export default InfinityScroll;
