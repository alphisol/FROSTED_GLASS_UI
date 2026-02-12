import { ICON_ARROW_URL } from "./constants";

interface FrostedGlassButtonProps {
  isHovered: boolean;
}

export function FrostedGlassButton({ isHovered }: FrostedGlassButtonProps) {
  return (
    <button
      type="button"
      aria-label="Enter and explore more"
      aria-expanded={isHovered}
      className="btn flex w-[332px] cursor-pointer items-center justify-between rounded-br-[8px] bg-[#fe6189] px-6 transition-all duration-300 ease-out border-0"
      style={{
        height: isHovered ? "72px" : "0px",
        overflow: "hidden",
      }}
    >
      <span
        className="text-block text-[20px] uppercase text-white transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          fontFamily: "Maven Pro, sans-serif",
        }}
        aria-hidden={!isHovered}
      >
        enter
      </span>
      <img
        src={ICON_ARROW_URL}
        loading="lazy"
        alt=""
        aria-hidden="true"
        className="inline-block max-w-full border-0 align-middle transition-opacity duration-300"
        style={{ opacity: isHovered ? 1 : 0 }}
      />
    </button>
  );
}
