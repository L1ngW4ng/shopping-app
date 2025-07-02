import React from "react";
import WaveTitle from "./WaveTitle";
import AudioPlayer from "./AudioPlayer";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <AudioPlayer />

      <div className="sky"></div>
      <div className="sun"></div>

      {/* Vågor */}
      <svg
        className="waves"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -20 150 60"
        preserveAspectRatio="none"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 30 c30 0 58 -12 88 -12 s58 12 88 12 58 -12 88 -12 58 12 88 12 v40 h-352z"
          />

          <pattern
            id="foam-pattern"
            x="0"
            y="0"
            width="150"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="
                M0 6
                C5 4, 12 8, 20 5
                C28 2, 35 6, 42 4
                C50 2, 55 6, 60 5
                C65 4, 72 9, 80 6
                C88 3, 95 7, 100 5
                C110 2, 115 7, 120 5
                C125 4, 132 8, 140 5
                C145 3, 150 6, 150 6
                V10
                H0
                Z
              "
              fill="white"
            />
          </pattern>
        </defs>

        <g className="parallax">
          {/* Gentle waves i bakgrunden */}
          <use xlinkHref="#gentle-wave" x="48" y="-20" fill="rgb(11, 65, 107)" />
          <use xlinkHref="#gentle-wave" x="48" y="-13" fill="rgba(33, 113, 173, 0.9)" />
          <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(28, 178, 242, 0.8)" />

          {/* Foam våg - rektangel fylld med mönster */}
          <rect
            x="0"
            y="32"
            width="300"
            height="10"
            fill="url(#foam-pattern)"
            className="foam"
          />
        </g>
      </svg>

      {/* Sand med rak topplinje */}
      <div className="sand"></div>

      {/* Text med wave-effekt */}
      <WaveTitle text="Welcome to my Beach Shop" />
    </div>
  );
}

export default App;
