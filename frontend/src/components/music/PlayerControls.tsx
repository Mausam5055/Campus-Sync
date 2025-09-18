import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2, Loader2 } from "lucide-react";

interface PlayerControlsProps {
  isPlaying: boolean;
  audioLoading: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  progress: number;
  onTogglePlayPause: () => void;
  onSeek: (value: number[]) => void;
  onVolumeChange: (value: number[]) => void;
  formatTime: (time: number) => string;
}

export function PlayerControls({
  isPlaying,
  audioLoading,
  currentTime,
  duration,
  volume,
  progress,
  onTogglePlayPause,
  onSeek,
  onVolumeChange,
  formatTime
}: PlayerControlsProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="hover:bg-primary/10">
          <Shuffle className="h-4 w-4" />
        </Button>
        <Button variant="ghost" className="hover:bg-primary/10">
          <SkipBack className="h-5 w-5" />
        </Button>
        <Button 
          onClick={onTogglePlayPause} 
          size="lg" 
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg w-14 h-14 rounded-full"
          disabled={audioLoading}
        >
          {audioLoading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6 ml-1" />
          )}
        </Button>
        <Button variant="ghost" className="hover:bg-primary/10">
          <SkipForward className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="sm" className="hover:bg-primary/10">
          <Repeat className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="w-full">
        <Slider
          value={[progress]}
          onValueChange={onSeek}
          max={100}
          step={0.1}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted-foreground mt-2 font-mono">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Volume2 className="h-4 w-4 text-muted-foreground" />
        <Slider
          value={[volume]}
          onValueChange={onVolumeChange}
          max={100}
          step={1}
          className="w-24"
        />
        <span className="text-xs text-muted-foreground w-8 text-right">{volume}%</span>
      </div>
    </div>
  );
}