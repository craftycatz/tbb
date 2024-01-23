import { useState, useEffect, useRef } from "react";

export function useColumnCount(minWidth: number) {
  const [columnCount, setColumnCount] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updateColumnCount() {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        setColumnCount(Math.floor(containerWidth / minWidth));
      }
    }

    console.log(containerRef.current?.offsetWidth);

    window.addEventListener("resize", updateColumnCount);
    updateColumnCount();

    return () => window.removeEventListener("resize", updateColumnCount);
  }, [minWidth, containerRef.current?.offsetWidth]);

  console.log("Rerender colcount: ", columnCount);
  console.log("Rerender containerRef: ", containerRef.current?.offsetWidth);

  return { columnCount, containerRef };
}
