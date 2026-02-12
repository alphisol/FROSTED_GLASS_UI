import { useRef, useState, useEffect, type MouseEvent } from "react";
import {
  REST_DEG,
  REST_Y_DEG,
  MAX_ROTATE_X,
  MAX_ROTATE_Y,
  LERP,
  AVATAR_LERP,
  AVATAR_REST_Y,
  AVATAR_REST_Z,
  AVATAR_HOVER_Y,
  AVATAR_HOVER_Z,
  buildTransform,
  FrostedGlassAvatar,
  FrostedGlassIcons,
  FrostedGlassButton,
  FrostedGlassContent,
} from "./components/frosted-glass";

export function FrostedGlassCard() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState<string>(() => buildTransform(REST_DEG, REST_Y_DEG));
  const [isHovered, setIsHovered] = useState(false);

  const targetX = useRef(REST_DEG);
  const targetY = useRef(REST_Y_DEG);
  const currentX = useRef(REST_DEG);
  const currentY = useRef(REST_Y_DEG);
  const rafId = useRef<number | null>(null);

  const targetAvatarY = useRef(AVATAR_REST_Y);
  const targetAvatarZ = useRef(AVATAR_REST_Z);
  const currentAvatarY = useRef(AVATAR_REST_Y);
  const currentAvatarZ = useRef(AVATAR_REST_Z);
  const [avatarTransform, setAvatarTransform] = useState<string>(
    `translate3d(0px, ${AVATAR_REST_Y}px, ${AVATAR_REST_Z}px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`,
  );

  const tick = () => {
    const dx = targetX.current - currentX.current;
    const dy = targetY.current - currentY.current;
    const dAvatarY = targetAvatarY.current - currentAvatarY.current;
    const dAvatarZ = targetAvatarZ.current - currentAvatarZ.current;

    const done = Math.abs(dx) < 0.001 && Math.abs(dy) < 0.001 && Math.abs(dAvatarY) < 0.05 && Math.abs(dAvatarZ) < 0.05;

    if (done) {
      currentX.current = targetX.current;
      currentY.current = targetY.current;
      currentAvatarY.current = targetAvatarY.current;
      currentAvatarZ.current = targetAvatarZ.current;
      rafId.current = null;
    } else {
      currentX.current += dx * LERP;
      currentY.current += dy * LERP;
      currentAvatarY.current += dAvatarY * AVATAR_LERP;
      currentAvatarZ.current += dAvatarZ * AVATAR_LERP;

      setTransform(buildTransform(currentX.current, currentY.current));
      setAvatarTransform(
        `translate3d(0px, ${currentAvatarY.current}px, ${currentAvatarZ.current}px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`,
      );
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
    targetAvatarY.current = AVATAR_HOVER_Y;
    targetAvatarZ.current = AVATAR_HOVER_Z;
    setIsHovered(true);
    scheduleTick();
  };

  const handleMouseLeave = () => {
    targetX.current = REST_DEG;
    targetY.current = REST_Y_DEG;
    targetAvatarY.current = AVATAR_REST_Y;
    targetAvatarZ.current = AVATAR_REST_Z;
    setIsHovered(false);
    scheduleTick();
  };

  useEffect(() => {
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
    ref={cardRef}
    role="article"
    aria-label="Interactive profile card with glassmorphism effect"
    className="glasscard group relative flex h-[300px] w-[500px] items-stretch justify-center overflow-visible rounded-[8px]"
      style={{
        willChange: "transform",
        perspective: "1200px",
        transformStyle: "preserve-3d",
        transform,
        boxShadow: "0 5px 14px 0 rgba(0, 0, 0, 0.4)",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="blurbg absolute left-0 top-0 h-[300px] w-[500px] rounded-[8px] border-2 border-white/20"
        style={{
          willChange: "transform",
          transform:
            "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(-0.0018deg) rotateY(0.003deg) rotateZ(0deg) skew(0deg, 0deg)",
          transformStyle: "preserve-3d",
          zIndex: -100,
          backgroundColor: "hsla(0, 0%, 100%, 0.1)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      />
      <FrostedGlassIcons isHovered={isHovered} />
      <div
        className="relative z-0 flex w-[332px] flex-col justify-between overflow-hidden rounded-r-[8px] bg-white"
        style={{ perspective: "1200px", transform: "perspective(1200px)" }}
      >
        <FrostedGlassContent />
        <FrostedGlassButton isHovered={isHovered} />
      </div>
      <FrostedGlassAvatar transform={avatarTransform} />
    </div>
  );
}
