import { useEffect, useState } from "react";

const useFindOpenBarAndClose = (element, initialState) => {
  const [isOpen, setIsOpen] = useState(initialState);

  useEffect(() => {
    const onClick = (e) => {
      if (element.current !== null && !element.current.contains(e.target)) {
        setIsOpen((prev) => !prev);
      }
    };

    if (isOpen) {
      window.addEventListener("click", onClick);
    }

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isOpen, element]);
  return [isOpen, setIsOpen];
};

export default useFindOpenBarAndClose;
