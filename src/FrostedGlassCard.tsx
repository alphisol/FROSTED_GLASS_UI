import { useRef, useState, useEffect, type MouseEvent } from "react";

const REST_DEG = 0.001;
const REST_Y_DEG = -0.0021;
const MAX_ROTATE_X = 7.62;
const MAX_ROTATE_Y = 14.23;
const LERP = 0.35; 
const AVATAR_LERP = 0.12;

function buildTransform(rotateX: number, rotateY: number) {
  return `translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(0deg) skew(0deg, 0deg)`;
}

export function FrostedGlassCard() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState<string>(() =>
    buildTransform(REST_DEG, REST_Y_DEG)
  );
  const [isHovered, setIsHovered] = useState(false);

  const targetX = useRef(REST_DEG);
  const targetY = useRef(REST_Y_DEG);
  const currentX = useRef(REST_DEG);
  const currentY = useRef(REST_Y_DEG);
  const rafId = useRef<number | null>(null);

  const targetAvatarY = useRef(32);
  const targetAvatarZ = useRef(0);
  const currentAvatarY = useRef(32);
  const currentAvatarZ = useRef(0);
  const [avatarTransform, setAvatarTransform] = useState<string>(
    "translate3d(0px, 32px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)"
  );

  const tick = () => {
    const dx = targetX.current - currentX.current;
    const dy = targetY.current - currentY.current;
    const dAvatarY = targetAvatarY.current - currentAvatarY.current;
    const dAvatarZ = targetAvatarZ.current - currentAvatarZ.current;

    const done =
      Math.abs(dx) < 0.001 &&
      Math.abs(dy) < 0.001 &&
      Math.abs(dAvatarY) < 0.05 &&
      Math.abs(dAvatarZ) < 0.05;

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
        `translate3d(0px, ${currentAvatarY.current}px, ${currentAvatarZ.current}px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`
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
    targetAvatarY.current = 0; 
    targetAvatarZ.current = 150;
    setIsHovered(true);
    scheduleTick();
  };

  const handleMouseLeave = () => {
    targetX.current = REST_DEG;
    targetY.current = REST_Y_DEG;
    targetAvatarY.current = 32;
    targetAvatarZ.current = 0;
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
      <div className="relative flex h-full w-[168px] flex-col justify-end overflow-hidden rounded-l-[8px]">
        
        <div
          className="icons relative z-10 flex h-[72px] w-[168px] shrink-0 justify-between self-end overflow-hidden p-6"
        >
          <img
            src="https://uploads-ssl.webflow.com/5fd0f3edc08992febba491a1/5fd37eae218ff0b99752dcde_heart.svg"
            alt=""
            className="iconstyle inline-block h-6 w-6 max-w-full cursor-pointer align-middle"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered
                ? "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)"
                : "translate3d(0px, 50px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
              transformStyle: "preserve-3d",
              transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
              transitionDelay: isHovered ? "0ms" : "0ms", 
            }}
          />
          <img
            src="https://uploads-ssl.webflow.com/5fd0f3edc08992febba491a1/5fd37ead47da6caeb10d8e43_coffee.svg"
            alt=""
            className="iconstyle inline-block h-6 w-6 max-w-full cursor-pointer align-middle"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered
                ? "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)"
                : "translate3d(0px, 50px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
              transformStyle: "preserve-3d",
              transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
              transitionDelay: isHovered ? "80ms" : "0ms", 
            }}
          />
          <img
            src="https://uploads-ssl.webflow.com/5fd0f3edc08992febba491a1/5fd37eada350a7820fe59538_at-sign.svg"
            alt=""
            className="iconstyle inline-block h-6 w-6 max-w-full cursor-pointer align-middle"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered
                ? "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)"
                : "translate3d(0px, 50px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
              transformStyle: "preserve-3d",
              transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
              transitionDelay: isHovered ? "160ms" : "0ms", 
            }}
          />
        </div>
      </div>

      <div
        className="relative z-0 flex w-[332px] flex-col justify-between overflow-hidden rounded-r-[8px] bg-white"
        style={{
          perspective: "1200px",
          transform: "perspective(1200px)",
        }}
      >
  
        <div
          className="flex flex-1 flex-col justify-center"
          style={{
            perspective: "1200px",
            transform: "perspective(1200px)",
          }}
        >
          <div
            className="flex flex-1 flex-col justify-center"
            style={{
              perspective: "1200px",
              transform: "perspective(1200px)",
            }}
          >
            <div
              className="textwrapper ml-[77px] flex flex-1 flex-col items-start justify-center pl-0 pr-6"
            >
              <h2
                className="heading mt-0 mb-4 text-[20px] font-extrabold leading-[20px] text-[#151515]"
                style={{ fontFamily: "Lora, sans-serif", cursor: "default" }}
              >
                A Large Heading
              </h2>
              <p
                className="paragraph mt-0 mb-0 text-[12px] leading-[150%] text-[#444545]"
                style={{ fontFamily: "Maven Pro, sans-serif", cursor: "default" }}
              >
                Quam sed mus sed gravida at quis maecenas duis. Id nunc, et cras
                pretium nullam nunc nec, massa accumsan.
              </p>
            </div>
          </div>
        </div>

        {/* btn (barra rosa inferior) */}
        <div
          className="btn flex w-[332px] cursor-pointer items-center justify-between rounded-br-[8px] bg-[#fe6189] px-6 transition-all duration-300 ease-out"
          style={{
            height: isHovered ? "72px" : "0px",
            overflow: "hidden",
          }}
        >
          <div
            className="text-block text-[20px] uppercase text-white transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              fontFamily: "Maven Pro, sans-serif",
            }}
          >
            enter
          </div>
          <img
            src="https://uploads-ssl.webflow.com/5fd0f3edc08992febba491a1/5fd38746dfa3cc3899d9cbdb_arrow-up-right.svg"
            loading="lazy"
            alt=""
            className="inline-block max-w-full border-0 align-middle transition-opacity duration-300"
            style={{ opacity: isHovered ? 1 : 0 }}
          />
        </div>
      </div>

      <div
        className="avatarwrapper absolute left-[24%] top-5/12 h-[106px] w-[106px] self-center rounded-[8px] bg-cover bg-center"
        style={{
          zIndex: 100,
          transform: avatarTransform,
          transformStyle: "preserve-3d",
          boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.4)",
          backgroundImage: "url('https://uploads-ssl.webflow.com/5fd0f3edc08992febba491a1/5fd47eaed29d918676049882_pexels-andrea-piacquadio-3765114.jpg')",
          backgroundPosition: "50% 50%",
          backgroundSize: "cover",
        }}
      />
    </div>
  );
}
