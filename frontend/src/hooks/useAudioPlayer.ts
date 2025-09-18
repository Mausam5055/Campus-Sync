import { useState, useRef, useEffect, useCallback } from 'react';

export interface AudioTrack {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  genre: string;
  coverArt: string;
  audioUrl: string;
  favorite: boolean;
}

export const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(75);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.preload = 'metadata';
    
    const audio = audioRef.current;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.pause();
    };
  }, []);

  // Update volume when volume state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const playTrack = useCallback(async (track: AudioTrack) => {
    if (!audioRef.current) return;

    try {
      setIsLoading(true);
      
      // If same track, just toggle play/pause
      if (currentTrack?.id === track.id) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          await audioRef.current.play();
          setIsPlaying(true);
        }
        return;
      }

      // Load new track
      setCurrentTrack(track);
      audioRef.current.src = track.audioUrl;
      audioRef.current.load();
      
      // Wait for audio to be ready and play
      audioRef.current.addEventListener('canplay', async () => {
        if (audioRef.current) {
          await audioRef.current.play();
          setIsPlaying(true);
        }
      }, { once: true });
      
    } catch (error) {
      console.error('Error playing track:', error);
      setIsLoading(false);
      setIsPlaying(false);
    }
  }, [currentTrack, isPlaying]);

  const togglePlayPause = useCallback(async () => {
    if (!audioRef.current || !currentTrack) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error toggling play/pause:', error);
    }
  }, [isPlaying, currentTrack]);

  const seekTo = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const setVolumeLevel = useCallback((newVolume: number) => {
    setVolume(newVolume);
  }, []);

  const skipToNext = useCallback(() => {
    // This would be implemented with a playlist context
    console.log('Skip to next track');
  }, []);

  const skipToPrevious = useCallback(() => {
    // This would be implemented with a playlist context
    console.log('Skip to previous track');
  }, []);

  const formatTime = useCallback((time: number) => {
    if (!time || isNaN(time)) return '0:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  return {
    currentTrack,
    isPlaying,
    volume,
    currentTime,
    duration,
    isLoading,
    playTrack,
    togglePlayPause,
    seekTo,
    setVolumeLevel,
    skipToNext,
    skipToPrevious,
    formatTime,
    progress: duration > 0 ? (currentTime / duration) * 100 : 0
  };
};