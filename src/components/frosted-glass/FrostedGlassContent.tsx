export function FrostedGlassContent() {
  return (
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
        <article
          className="textwrapper ml-[77px] flex flex-1 flex-col items-start justify-center pl-0 pr-6"
          aria-labelledby="card-heading"
        >
          <h2
            id="card-heading"
            className="heading mt-0 mb-4 text-[20px] font-extrabold leading-[20px] text-[#151515]"
            style={{ fontFamily: "Lora, sans-serif", cursor: "default" }}
          >
            A Large Heading
          </h2>
          <p
            className="paragraph mt-0 mb-0 text-[12px] leading-[150%] text-[#444545]"
            style={{
              fontFamily: "Maven Pro, sans-serif",
              cursor: "default",
            }}
          >
            Quam sed mus sed gravida at quis maecenas duis. Id nunc, et cras pretium nullam nunc nec, massa accumsan.
          </p>
        </article>
      </div>
    </div>
  );
}
