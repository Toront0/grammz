import { useLayoutEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenisStore } from "../store/useLenisStore";

gsap.registerPlugin(ScrollTrigger);

export function useLenisMount() {
  const setLenis = useLenisStore((state) => state.setLenis);

  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true, // ← was false, this was killing desktop smoothness
      syncTouch: false // ← try false for native mobile feel
      // or if you want touch smoothing:
      // syncTouch: true,
    });

    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    const tickerFn = (time: number) => {
      lenis.raf(time * 1000); // ← was 600
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
      setLenis(null);
      // don't nuke ALL ScrollTriggers globally
    };
  }, [setLenis]);
}
