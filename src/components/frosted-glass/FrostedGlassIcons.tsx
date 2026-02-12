import { ICON_HEART_URL, ICON_COFFEE_URL, ICON_AT_URL } from "./constants";

interface FrostedGlassIconsProps {
  isHovered: boolean;
}

export function FrostedGlassIcons({ isHovered }: FrostedGlassIconsProps) {
  return (
    <div
      className="relative flex h-full w-[168px] flex-col justify-end overflow-hidden rounded-l-[8px]"
      role="complementary"
      aria-label="Social media links"
    >
      <nav
        className="icons relative z-10 flex h-[72px] w-[168px] shrink-0 justify-between self-end overflow-hidden p-6"
        aria-label="Social navigation"
      >
        <button
          type="button"
          aria-label="Like or favorite"
          className="iconstyle inline-block h-6 w-6 cursor-pointer border-0 bg-transparent p-0"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered
              ? "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)"
              : "translate3d(0px, 50px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
            transformStyle: "preserve-3d",
            transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
            transitionDelay: isHovered ? "0ms" : "0ms",
          }}
        >
          <img src={ICON_HEART_URL} alt="" className="h-full w-full" aria-hidden="true" />
        </button>

        <button
          type="button"
          aria-label="Buy me a coffee"
          className="iconstyle inline-block h-6 w-6 cursor-pointer border-0 bg-transparent p-0"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered
              ? "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)"
              : "translate3d(0px, 50px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
            transformStyle: "preserve-3d",
            transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
            transitionDelay: isHovered ? "80ms" : "0ms",
          }}
        >
          <img src={ICON_COFFEE_URL} alt="" className="h-full w-full" aria-hidden="true" />
        </button>

        <button
          type="button"
          aria-label="Contact via email"
          className="iconstyle inline-block h-6 w-6 cursor-pointer border-0 bg-transparent p-0"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered
              ? "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)"
              : "translate3d(0px, 50px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
            transformStyle: "preserve-3d",
            transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
            transitionDelay: isHovered ? "160ms" : "0ms",
          }}
        >
          <img src={ICON_AT_URL} alt="" className="h-full w-full" aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
}
