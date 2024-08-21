import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import musicPlayerImage from '../components/pic/music.svg';

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

const SongTitleContainer = styled.div`
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
`;

const SongTitle = styled.p`
  font-size: 16px;
  margin-bottom: 15px;
  text-align: center;
  transition: color 0.3s ease;
  color: ${props => props.isPlaying ? '#888' : 'black'};
  display: inline-block;
  padding-left: 100%;
  animation: ${props => props.isPlaying ? css`${marquee} 15s linear infinite` : 'none'};
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

const marquee = keyframes`
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%);}
`;

function Music({ onClose, isPlaying, currentTime, duration, togglePlay, seekTo, onUpdateSongInfo, title }) {

  const [currentSongInfo, setCurrentSongInfo] = useState({
    title: '노래 제목 예시 노래 제...',
    isPlaying: false,
    currentTime: 0,
    duration: 0
  });


  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    console.log('Music component received title:', title); // 디버깅용 로그
  }, [title]);

  useEffect(() => {
    const updatedInfo = {
      title,
      isPlaying,
      currentTime,
      duration
    };
    setCurrentSongInfo(updatedInfo);
    onUpdateSongInfo(updatedInfo);
  }, [isPlaying, currentTime, duration, onUpdateSongInfo, title]);

  return (
    <MusicContainer>
      <MusicPlayer>
        <MusicImage />
        <SongTitleContainer>
          <SongTitle isPlaying={isPlaying}>{ title || '노래 제목 없음' }</SongTitle>
        </SongTitleContainer> 
        <TimeDisplay>{formatTime(currentTime)} / {formatTime(duration)}</TimeDisplay>
        <Controls>
          <ControlButton isPlaying={isPlaying} onClick={() => seekTo(currentTime - 10)}>&#9668;&#9668;</ControlButton>
          <ControlButton main onClick={togglePlay}>
            {isPlaying ? '❚❚' : '▶'}
          </ControlButton>
          <ControlButton isPlaying={isPlaying} onClick={() => seekTo(currentTime + 10)}>&#9658;&#9658;</ControlButton>
        </Controls>
      </MusicPlayer>
      <CloseButton onClick={onClose}>✕</CloseButton>
    </MusicContainer>
  );
}

export default React.memo(Music);

