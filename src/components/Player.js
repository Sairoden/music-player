import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  currentSong,
  setIsPlaying,
  isPlaying,
  audioRef,
  songInfo,
  setSongInfo,
}) => {
  // Event Handlers
  const playSongHandler = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();

    setIsPlaying(!isPlaying);
  };

  const getTime = time => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = e => {
    const currentTime = e.target.value;

    audioRef.current.currentTime = currentTime;

    setSongInfo({ ...songInfo, currentTime });
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration}
          value={songInfo.currentTime}
          type="range"
          onChange={dragHandler}
        />
        <p>{getTime(songInfo.duration)}</p>
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
          icon={isPlaying ? faPause : faPlay}
        ></FontAwesomeIcon>

        <FontAwesomeIcon
          size="2x"
          className="skip-forward"
          icon={faAngleRight}
        ></FontAwesomeIcon>
      </div>
    </div>
  );
};

export default Player;
