import { useRef, useState, useEffect } from "react";
import { AVATAR_LERP, AVATAR_REST_Y, AVATAR_REST_Z, AVATAR_HOVER_Y, AVATAR_HOVER_Z } from "../constants";
import { buildAvatarTransform } from "../utils";

export function useAvatarAnimation(isHovered: boolean) {
  const targetAvatarY = useRef(AVATAR_REST_Y);
  const targetAvatarZ = useRef(AVATAR_REST_Z);
  const currentAvatarY = useRef(AVATAR_REST_Y);
  const currentAvatarZ = useRef(AVATAR_REST_Z);
  const rafId = useRef<number | null>(null);
  const [avatarTransform, setAvatarTransform] = useState<string>(buildAvatarTransform(AVATAR_REST_Y, AVATAR_REST_Z));

  const tick = () => {
    const dAvatarY = targetAvatarY.current - currentAvatarY.current;
    const dAvatarZ = targetAvatarZ.current - currentAvatarZ.current;

    if (Math.abs(dAvatarY) < 0.05 && Math.abs(dAvatarZ) < 0.05) {
      currentAvatarY.current = targetAvatarY.current;
      currentAvatarZ.current = targetAvatarZ.current;
      rafId.current = null;
    } else {
      currentAvatarY.current += dAvatarY * AVATAR_LERP;
      currentAvatarZ.current += dAvatarZ * AVATAR_LERP;
      setAvatarTransform(buildAvatarTransform(currentAvatarY.current, currentAvatarZ.current));
      rafId.current = requestAnimationFrame(tick);
    }
  };

  const scheduleTick = () => {
    if (rafId.current === null) {
      rafId.current = requestAnimationFrame(tick);
    }
  };

  useEffect(() => {
    if (isHovered) {
      targetAvatarY.current = AVATAR_HOVER_Y;
      targetAvatarZ.current = AVATAR_HOVER_Z;
    } else {
      targetAvatarY.current = AVATAR_REST_Y;
      targetAvatarZ.current = AVATAR_REST_Z;
    }
    scheduleTick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered]);

  useEffect(() => {
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return avatarTransform;
}
