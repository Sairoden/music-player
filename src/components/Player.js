import React, { useEffect } from "react";

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
  songs,
  setCurrentSong,
  setSongs,
}) => {
  // Use Effect
  useEffect(() => {
    const newSong = songs.map(song => {
      if (song.id === currentSong.id) return { ...song, active: true };
      else return { ...song, active: false };
    });

    setSongs(newSong);
  }, [currentSong]);

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

  const skipTrackHandler = direction => {
    let currentIndex = songs.findIndex(song => song.id === currentSong.id);

    if (direction === "skip-forward") {
      // if (currentIndex >= songs.length - 1) return;
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      console.log(currentIndex + 1);
      console.log(`LENGTH ${songs.length}`);
    }

    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1)
        return setCurrentSong(songs[songs.length - 1]);

      setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      console.log(currentIndex);
    }

    setIsPlaying(false);
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration || 0}
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
          onClick={() => skipTrackHandler("skip-back")}
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
          onClick={() => skipTrackHandler("skip-forward")}
        ></FontAwesomeIcon>
      </div>
    </div>
  );
};

export default Player;
