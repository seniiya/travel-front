import { useRef } from "react";

const useMoveScroll = () => {
  const element = useRef<HTMLDivElement>(null);
  const onMoveToElement = () => {
    element.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return { element, onMoveToElement };
};

export default useMoveScroll;