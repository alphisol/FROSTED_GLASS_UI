import { FrostedGlassCard, BACKGROUND_IMG } from "./components/frosted-glass";

export function FrostedGlassPage() {
  return (
    <main
      className="relative min-h-screen flex items-center justify-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('${BACKGROUND_IMG}')`,
        backgroundPosition: "center top",
      }}
    >
      <div className="overlay" />
      <div className="relative z-10">
        <FrostedGlassCard />
      </div>
    </main>
  );
}
