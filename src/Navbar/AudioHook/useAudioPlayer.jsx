import { useState, useEffect, useRef } from 'react';

const useAudioPlayer = (audioSrc) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [title, setTitle] = useState('노래 제목 예시 노래 제...');
  const audioRef = useRef(null);

  useEffect(() => {
    try {
      audioRef.current = new Audio(audioSrc);
      console.log('Audio object created successfully');
    } catch (error) {
      console.error('Failed to create Audio object:', error);
    }

    const audio = audioRef.current;

    if (!audio) {
      console.error('Audio object is null');
      return;
    }

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    const handlePlay = () => {
      setIsPlaying(true);
      setTitle('Ludoric - Summer Travel Vlog');
      console.log('Title updated:', 'Ludoric - Summer Travel Vlog') // 실제 노래 제목으로 변경
    };

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('play', handlePlay);

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('play', handlePlay);
    };
  }, [audioSrc]);

  
  useEffect(() => {
    console.log('Current title:', title); // title 상태가 변경될 때마다 로그 출력
  }, [title]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(error => {
        console.error("Audio playback failed:", error);
      });
    }
  };

  const seekTo = (time) => {
    const audio = audioRef.current;
    audio.currentTime = time;
    setCurrentTime(time);
  };

  return {
    isPlaying,
    currentTime,
    duration,
    title,
    togglePlay,
    seekTo,
  };
};

export default useAudioPlayer;