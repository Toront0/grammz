// components/ClientLayoutWrapper.jsx
"use client";

import { useAudioStore } from "../store/useAudioStore";
import Scene3D from "./Scene3D";
import LoaderScreen from "./LoadingScreen";
import Header from "./UI/Header";
import AudioController from "./controllers/AudioController";

export default function ClientLayoutWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  const appState = useAudioStore((state) => state.appState);
  const setReady = useAudioStore((state) => state.setReady);
  const setEntered = useAudioStore((state) => state.setEntered);

  return (
    <>
      <Header />
      <main className="fixed inset-0 w-screen h-screen text-white overflow-hidden select-none m-0 p-0 border-0">
        <Scene3D />
      </main>

      {appState !== "entered" && (
        <LoaderScreen
          appState={appState}
          onReady={setReady}
          onEnter={setEntered}
        />
      )}

      {children}
      <AudioController />
    </>
  );
}
