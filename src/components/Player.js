import React, { useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({ currentSong, setIsPlaying, isPlaying }) => {
  // Ref
  const audioRef = useRef(null);

  // Event Handlers
  const playSongHandler = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();

    setIsPlaying(!isPlaying);
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>Start Time</p>
        <input type="range" />
        <p>End Time</p>
      </div>

      <div className="play-control">
        <FontAwesomeIcon
          size="2x"
          className="skip-back"
          icon={faAngleLeft}
        ></FontAwesomeIcon>

        <FontAwesomeIcon
          onClick={() => {
            playSongHandler();
          }}
          size="2x"
          className="play"
          icon={faPlay}
        ></FontAwesomeIcon>

        <FontAwesomeIcon
          size="2x"
          className="skip-forward"
          icon={faAngleRight}
        ></FontAwesomeIcon>
      </div>
      <audio ref={audioRef} src={currentSong.audio}></audio>
    </div>
  );
};

export default Player;
