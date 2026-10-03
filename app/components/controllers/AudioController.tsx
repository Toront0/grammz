// components/AudioController.tsx
"use client";

import { useEffect } from "react";
import { useAudioStore } from "../../store/useAudioStore";
import MusicToggleButton from "../UI/MusicToggle";

export default function AudioController() {
  const isPlaying = useAudioStore((state) => state.isPlaying);
  const initAudio = useAudioStore((state) => state.initAudio);
  const toggleMute = useAudioStore((state) => state.toggleMute);

  useEffect(() => {
    initAudio();
  }, [initAudio]);

  return (
    <div className="text-white fixed top-4 right-4 z-50 lg:top-8 lg:right-8 mix-blend-difference pointer-events-auto">
      <MusicToggleButton isPlaying={isPlaying} onToggle={toggleMute} />
    </div>
  );
}
