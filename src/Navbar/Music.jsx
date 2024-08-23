import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import musicPlayerImage from '../components/pic/music.svg';
import audioFile from '../assets/beethoven-moonlight-sonata-op-27-nr-2-concert-grand-version-227468.mp3';

const MusicContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 100%;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 1000;
`;

const MusicPlayer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MusicImage = styled.div`
  width: 150px;
  height: 150px;
  background-image: url(${musicPlayerImage});
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const SongTitle = styled.p`
  font-size: 16px;
  margin-bottom: 15px;
  text-align: center;
  transition: color 0.3s ease;
  color: ${props => props.isPlaying ? '#888' : 'black'};
`;

const Controls = styled.div`
  display: flex;
  gap: 15px;
`;

const ControlButton = styled.button`
  background-color: white;
  color: ${props => props.isPlaying && !props.main ? '#888' : 'black'};
  border: none;
  border-radius: 50%;
  width: ${props => props.main ? '50px' : '30px'};
  height: ${props => props.main ? '50px' : '30px'};
  font-size: ${props => props.main ? '24px' : '14px'};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: color 0.3s ease;

  &:hover {
    background-color: ${props => props.isPlaying && !props.main ? '#f0f0f0' : 'white'};
  }

  ${props => props.main && `
    transform: translateY(-13px);
  `}
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const TimeDisplay = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`;

function Music({ onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(audioFile);
    const audio = audioRef.current;

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });
    audio.addEventListener('error', (e) => {
      console.error("Audio error:", e);
    });

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('error', (e) => {
        console.error("Audio error:", e);
      });
      audio.pause();
    };
  }, []);

  const updateTime = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error("Audio playback failed:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <MusicContainer>
      <MusicPlayer>
        <MusicImage />
        <SongTitle isPlaying={isPlaying}>Beethoven - Moonlight Sonata</SongTitle>
        <TimeDisplay>{formatTime(currentTime)} / {formatTime(duration)}</TimeDisplay>
        <Controls>
          <ControlButton isPlaying={isPlaying} onClick={() => audioRef.current.currentTime -= 10}>&#9668;&#9668;</ControlButton>
          <ControlButton main onClick={togglePlay}>
            {isPlaying ? '❚❚' : '▶'}
          </ControlButton>
          <ControlButton isPlaying={isPlaying} onClick={() => audioRef.current.currentTime += 10}>&#9658;&#9658;</ControlButton>
        </Controls>
      </MusicPlayer>
      <CloseButton onClick={onClose}>✕</CloseButton>
    </MusicContainer>
  );
}

export default Music;