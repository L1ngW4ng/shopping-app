import React, { useState, useEffect } from "react";

function WaveTitle({ text }) {
  const [drop, setDrop] = useState(false);

  const upDelay = 125; // ms mellan grupper av bokstäver som hoppar samtidigt
  const groupSize = 1; // antal bokstäver som hoppar samtidigt

  const groupsCount = Math.ceil(text.length / groupSize);
  const upDuration = groupsCount * upDelay + 100;
  const holdUpDuration = 100;
  const dropDuration = 500; // gör droppet längre och smoothare
  const holdDownDuration = 3000;

  useEffect(() => {
    const cycle = () => {
      setDrop(false); // inandning (upp)
      setTimeout(() => setDrop(true), upDuration + holdUpDuration); // utandning (dropp)
    };

    cycle();

    const interval = setInterval(
      cycle,
      upDuration + holdUpDuration + dropDuration + holdDownDuration
    );

    return () => clearInterval(interval);
  }, [text, upDuration, holdUpDuration, dropDuration, holdDownDuration]);

  return (
    <h1 className="wave-title">
      {text.split("").map((char, i) => (
        <span
          key={i}
          className={`wave-letter${drop ? " drop" : ""}`}
          style={{ "--char-index": Math.floor(i / groupSize) }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  );
}

export default WaveTitle;
