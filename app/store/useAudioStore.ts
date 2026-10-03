import { create } from "zustand";
import * as THREE from "three";

export type AppState = "loading" | "ready" | "entered";

interface AudioState {
  isPlaying: boolean;
  audio: HTMLAudioElement | null;
  initAudio: () => void;
  toggleMute: () => void;
  destroyAudio: () => void;
  playSFX: (path: string, volume?: number) => void;

  activeSection: number; // 🌟 Track active section globally
  setActiveSection: (section: number) => void;
  resetActiveSection: () => void;

  isOverlayOpen: boolean;
  setOverlayOpen: (open: boolean) => void;
  isTransitioningToBlack: boolean;
  setTransitioningToBlack: (state: boolean) => void;

  appState: AppState;
  setReady: () => void;
  setEntered: () => void;
  setAppState: (state: AppState) => void;

  tvPosition: THREE.Vector3 | null;
  setTvPosition: (position: THREE.Vector3 | null) => void;
}

export const useAudioStore = create<AudioState>((set, get) => {
  // Helper to safely unlock audio on first interaction
  const unlockAudio = () => {
    const { audio, isPlaying } = get();
    if (audio && !isPlaying) {
      audio
        .play()
        .then(() => {
          set({ isPlaying: true });
          cleanUpListeners();
        })
        .catch(() => console.log("Autoplay blocked by browser."));
    }
  };

  const cleanUpListeners = () => {
    if (typeof window === "undefined") return;
    window.removeEventListener("click", unlockAudio);
    window.removeEventListener("scroll", unlockAudio);
    window.removeEventListener("touchstart", unlockAudio);
  };

  return {
    isPlaying: false,
    audio: null,

    initAudio: () => {
      // Prevent duplicate initialization on hot-reloads
      if (get().audio || typeof window === "undefined") return;

      const audioInstance = new Audio("/mystic-waters_95066.ogg");
      audioInstance.loop = true;
      audioInstance.volume = 0.35;

      set({ audio: audioInstance });

      window.addEventListener("click", unlockAudio);
      window.addEventListener("scroll", unlockAudio);
      window.addEventListener("touchstart", unlockAudio);
    },

    toggleMute: () => {
      const { audio, isPlaying } = get();
      if (!audio) return;

      if (isPlaying) {
        audio.pause();
        set({ isPlaying: false });
      } else {
        audio
          .play()
          .then(() => set({ isPlaying: true }))
          .catch((err) => console.error("Playback failed:", err));
      }
    },

    destroyAudio: () => {
      const { audio } = get();
      cleanUpListeners();
      if (audio) {
        audio.pause();
        set({ audio: null, isPlaying: false });
      }
    },
    playSFX: (path, volume = 0.5) => {
      if (typeof window === "undefined") return;

      if (!get().isPlaying) return;

      const sfx = new Audio(path);
      sfx.volume = volume;

      sfx.play().catch(() => {
        console.log("SFX blocked. Needs user interaction first.");
      });

      sfx.onended = () => sfx.remove(); // Cleanup memory
    },
    activeSection: 0,
    setActiveSection: (section) => set({ activeSection: section }),
    resetActiveSection: () => {
      const { activeSection: act } = get();

      if (act === 0) {
        return;
      }

      set({ activeSection: 0 });
    },
    isOverlayOpen: false,
    setOverlayOpen: (open) => set({ isOverlayOpen: open }),
    isTransitioningToBlack: false,
    setTransitioningToBlack: (state) => set({ isTransitioningToBlack: state }),
    appState: "loading",
    setReady: () => set({ appState: "ready" }),
    setEntered: () => set({ appState: "entered" }),
    setAppState: (state) => set({ appState: state }),
    tvPosition: null,
    setTvPosition: (position) => set({ tvPosition: position })
  };
});
