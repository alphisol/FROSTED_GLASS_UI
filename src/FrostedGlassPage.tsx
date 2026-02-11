import { FrostedGlassCard } from "./FrostedGlassCard";

export function FrostedGlassPage() {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url('https://uploads-ssl.webflow.com/5fd0f3edc08992febba491a1/5fd47ee1837d13d70182d239_thitiphum-koonjantuek-TFqjlTmkeyY-unsplash.jpg')",
        backgroundPosition: "center top",
      }}
    >
      <div className="overlay" />

      <div className="relative z-10">
        <FrostedGlassCard />
      </div>
    </div>
  );
}
