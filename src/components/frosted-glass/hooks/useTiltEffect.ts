import { useRef, useState, useEffect, type MouseEvent } from "react";
import { REST_DEG, REST_Y_DEG, MAX_ROTATE_X, MAX_ROTATE_Y, LERP } from "../constants";
import { buildTransform } from "../utils";

export function useTiltEffect() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState<string>(() => buildTransform(REST_DEG, REST_Y_DEG));
  const [isHovered, setIsHovered] = useState(false);

  const targetX = useRef(REST_DEG);
  const targetY = useRef(REST_Y_DEG);
  const currentX = useRef(REST_DEG);
  const currentY = useRef(REST_Y_DEG);
  const rafId = useRef<number | null>(null);

  const tick = () => {
    const dx = targetX.current - currentX.current;
    const dy = targetY.current - currentY.current;

    if (Math.abs(dx) < 0.001 && Math.abs(dy) < 0.001) {
      currentX.current = targetX.current;
      currentY.current = targetY.current;
      rafId.current = null;
    } else {
      currentX.current += dx * LERP;
      currentY.current += dy * LERP;
      setTransform(buildTransform(currentX.current, currentY.current));
      rafId.current = requestAnimationFrame(tick);
    }
  };

  const scheduleTick = () => {
    if (rafId.current === null) {
      rafId.current = requestAnimationFrame(tick);
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const normX = (x - midX) / midX;
    const normY = (y - midY) / midY;

    targetX.current = -normY * MAX_ROTATE_X;
    targetY.current = normX * MAX_ROTATE_Y;
    setIsHovered(true);
    scheduleTick();
  };

  const handleMouseLeave = () => {
    targetX.current = REST_DEG;
    targetY.current = REST_Y_DEG;
    setIsHovered(false);
    scheduleTick();
  };

  useEffect(() => {
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return {
    cardRef,
    transform,
    isHovered,
    handleMouseMove,
    handleMouseLeave,
  };
}
