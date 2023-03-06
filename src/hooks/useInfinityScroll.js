// import { useState } from "react";
// import { useEffect } from "react";

// const useInfinityScroll = (
//   totalPostNumber,
//   postLength,
//   lastCardRef,
//   category
// ) => {
//   const [selectedCategory, setSelectedCategory] = useState(category);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [currentPageMap, setCurrentPageMap] = useState({});
//   const [categoryDataMap, setCategoryDataMap] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [totalPagesMap, setTotalPagesMap] = useState({});

//   useEffect(() => {
//     if (totalPostNumber === postLength) return;

//     let observer;
//     if (lastCardRef.current) {
//       observer = new IntersectionObserver(
//         async ([entry]) => {
//           if (entry.isIntersecting) {
//             setOffset((prev) => prev + 20);
//           }
//         },
//         {
//           threshold: 0.1,
//         }
//       );
//       observer.observe(lastCardRef.current);
//     }
//     return () => observer && observer.disconnect();
//   });

//   return { offset };
// };

// export default useInfinityScroll;
