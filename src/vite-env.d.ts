/// <reference types="vite/client" />

interface YT {
  Player: new (
    element: HTMLElement | null,
    config: {
      events?: {
        onReady?: (event: { target: YT.Player }) => void;
      };
    }
  ) => void;
}

interface Window {
  YT: YT;
  onYouTubeIframeAPIReady: () => void;
}