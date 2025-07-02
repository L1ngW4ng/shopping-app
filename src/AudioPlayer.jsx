import React, { useRef, useState, useEffect } from "react";
import "./AudioPlayer.css";

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.1);
  const maxVolume = 0.3;

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = 0;

    const tryAutoplay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        fadeIn(volume);
      } catch (err) {
        console.warn("Autoplay blockerad – kräver användarinteraktion:", err);
        setIsPlaying(false);
      }
    };

    tryAutoplay();
  }, []);

  const fadeIn = (targetVolume) => {
    const audio = audioRef.current;
    let currentVolume = 0;
    const step = 0.01;
    const interval = setInterval(() => {
      currentVolume += step;
      if (currentVolume >= targetVolume) {
        audio.volume = targetVolume;
        clearInterval(interval);
      } else {
        audio.volume = currentVolume;
      }
    }, 200);
  };

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        audio.volume = volume;
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn("Kunde inte spela upp ljud:", err);
      }
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = Math.min(parseFloat(e.target.value), maxVolume);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  return (
    <div className="audio-player">
      <audio ref={audioRef} src="/music/music.mp3" loop />

      <button className="circle-button" onClick={togglePlay}>
        {isPlaying ? "❚❚" : "▶"}
      </button>

      <div className="volume-cloud-container">
        {/*
        <svg
        className="cloud-svg"
        viewBox="0 0 100 25"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        >
        <path
            d="
            M10 20
            a10 10 0 0 1 10 -10
            a15 15 0 0 1 40 0
            a10 10 0 0 1 20 10
            h-70
            z
            "
            fill="#cceeff"
            stroke="#99ccff"
            strokeWidth="1"
        />
        </svg>
        */}

        <svg
        className="cloud-svg"
        viewBox="-10 0 200 1"  /* flyttat startpunkt 10 enheter vänster, ökat bredd till 200 */
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        >
        <path
            d="
            M10 20
            a25 20 0 0 1 30 -20
            a40 25 0 0 1 70 0
            a25 20 0 0 1 40 20
            h-140
            z
            "
            fill="#cceeff"
            stroke="#99ccff"
            strokeWidth="1"
        />
        </svg>







        <input
            className="audio-volume-on-cloud"
            type="range"
            min="0"
            max={maxVolume}
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
        />
        </div>
    </div>
  );
};

export default AudioPlayer;
