import { useLayoutEffect, useRef } from "react";

/**
 * TypedText
 * A drop-in, accessible typewriter component with three built-in animation
 * presets ("plain", "glitch", "scramble"), ported from a CodePen typewriter
 * effect. Works on headers, paragraphs, or any text node.
 *
 * Usage:
 *   <TypedText as="h1" text="Welcome" variant="glitch" className="text-4xl font-bold" />
 *   <TypedText as="p" text="Some body copy..." variant="scramble" />
 *
 * Each variant can be overridden individually via props (see VARIANTS below
 * for the full list of tunable knobs), e.g.:
 *   <TypedText text="..." variant="glitch" typingSpeed={20} glitchChance={0.5} />
 */

const DEFAULT_SYMBOLS = "!<>-_\\/[]{}—=+*^?#_@";

const VARIANTS = {
  // Header 1: clean typewriter, no glitch
  plain: {
    typingSpeed: 35,
    glitch: false,
  },
  // Header 2: short, punchy block-character glitch on most characters
  glitch: {
    typingSpeed: 35,
    glitch: true,
    glitchCycles: 10,
    glitchInterval: 100,
    glitchChance: 1,
    glitchCycleVariance: 1,
    glitchSymbolsStart: DEFAULT_SYMBOLS,
    glitchSymbolsEnd: DEFAULT_SYMBOLS,
    glitchSymbolsVariance: 1,
  },
  // Paragraph: long, dense "decoding" scramble that resolves dashes -> digits -> letters
  scramble: {
    typingSpeed: 10,
    glitch: true,
    glitchCycles: 50,
    glitchInterval: 50,
    glitchChance: 0.99,
    glitchCycleVariance: 0.4,
    glitchSymbolsStart: "-",
    glitchSymbolsEnd: "0123456789",
    glitchSymbolsVariance: 0.5,
  },
};



export default function TypedText({
  text,
  as: Tag = "p",
  variant = "plain",
  className = "",
  startOnView = false,
  onComplete,
  // individual overrides — fall back to the chosen variant's preset
  typingSpeed,
  glitchCycles,
  glitchInterval,
  glitchChance,
  glitchCycleVariance,
  glitchSymbolsStart,
  glitchSymbolsEnd,
  glitchSymbolsVariance,
  ...rest
}) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el || !text) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // If the user prefers reduced motion, just show the plain text — no animation.
    if (prefersReducedMotion) {
      el.textContent = text;
      onComplete?.();
      return;
    }

    const preset = VARIANTS[variant] || VARIANTS.plain;
    const isGlitchy = glitchChance != null || glitchCycles != null || preset.glitch;

    const speed = typingSpeed ?? preset.typingSpeed ?? 30;
    const cycles = glitchCycles ?? preset.glitchCycles;
    const interval = glitchInterval ?? preset.glitchInterval ?? 35;
    const chance = glitchChance ?? preset.glitchChance ?? 0.4;
    const _cycleVariance = glitchCycleVariance ?? preset.glitchCycleVariance ?? 1;
    const symbolsStart = glitchSymbolsStart ?? preset.glitchSymbolsStart ?? DEFAULT_SYMBOLS;
    const symbolsEnd = glitchSymbolsEnd ?? preset.glitchSymbolsEnd ?? DEFAULT_SYMBOLS;
    const symbolsVariance = glitchSymbolsVariance ?? preset.glitchSymbolsVariance ?? 1;

    const timeouts = [];
    const intervals = [];
    let cancelled = false;

    function buildAndType() {
      if (cancelled) return;

      el.textContent = "";

      // Screen-reader-only full text, always present immediately.
      const srText = document.createElement("span");
      srText.className = "sr-only";
      srText.textContent = text;
      el.appendChild(srText);

      const animationWrapper = document.createElement("span");
      animationWrapper.setAttribute("aria-hidden", "true");
      el.appendChild(animationWrapper);

      const charSpans = [];
      text.split("").forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.className = "opacity-0 transition-opacity duration-[180ms] ease-in";
        animationWrapper.appendChild(span);
        charSpans.push(span);
      });

      let i = 0;

      function typeNext() {
        if (cancelled) return;

        if (i < charSpans.length) {
          const currentSpan = charSpans[i];
          currentSpan.classList.remove("opacity-0");
          currentSpan.classList.add("opacity-100");

          if (isGlitchy && currentSpan.textContent !== " " && Math.random() < chance) {
            const originalChar = currentSpan.textContent;
            let glitchTick = 0;
            const maxCycles = !isNaN(cycles) && cycles != null
              ? cycles
              : Math.floor(Math.random() * 3) + 2;

            const glitchTimer = setInterval(() => {
              const progress = glitchTick / maxCycles;
              const activeSymbols =
                Math.random() * symbolsVariance < progress ? symbolsEnd : symbolsStart;
              const randomSymbol =
                activeSymbols[Math.floor(Math.random() * activeSymbols.length)];
              currentSpan.textContent = randomSymbol;

              glitchTick++;
              if (glitchTick >= maxCycles) {
                clearInterval(glitchTimer);
                currentSpan.textContent = originalChar;
              }
            }, interval);
            intervals.push(glitchTimer);
          }

          i++;
          const t = setTimeout(typeNext, speed);
          timeouts.push(t);
        } else {
          onComplete?.();
        }
      }

      const t = setTimeout(typeNext, speed);
      timeouts.push(t);
    }

    let observer;
    if (startOnView) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            buildAndType();
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(el);
    } else {
      buildAndType();
    }

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
      intervals.forEach(clearInterval);
      observer?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, variant, startOnView]);

  return (
    <Tag ref={containerRef} className={className} {...rest} />
  );
}
