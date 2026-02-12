import { AVATAR_IMAGE_URL } from "./constants";

interface FrostedGlassAvatarProps {
  transform: string;
  name?: string;
}

export function FrostedGlassAvatar({ transform, name = "Profile picture" }: FrostedGlassAvatarProps) {
  return (
    <div
      className="avatarwrapper absolute left-[24%] top-5/12 h-[106px] w-[106px] self-center rounded-[8px] overflow-hidden"
      style={{
        zIndex: 100,
        transform,
        transformStyle: "preserve-3d",
        boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.4)",
      }}
    >
      <img
        src={AVATAR_IMAGE_URL}
        alt={name}
        fetchPriority="high"
        width="106"
        height="106"
        loading="eager"
        decoding="async"
        className="h-full w-full object-cover"
        style={{
          objectPosition: "50% 50%",
        }}
      />
    </div>
  );
}
