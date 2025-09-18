import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Heart, Loader2 } from "lucide-react";
import { ImageLoader } from "@/components/ui/image-loader";
import { AudioTrack } from "@/hooks/useAudioPlayer";

interface SongCardProps {
  song: AudioTrack;
  isLarge?: boolean;
  isPlaying: boolean;
  isCurrentSong: boolean;
  isLoading: boolean;
  isFavorite: boolean;
  onPlay: (song: AudioTrack) => void;
  onToggleFavorite: (songId: number) => void;
}

export const SongCard = memo(function SongCard({ 
  song, 
  isLarge = false, 
  isPlaying,
  isCurrentSong,
  isLoading,
  isFavorite,
  onPlay,
  onToggleFavorite
}: SongCardProps) {
  return (
    <Card className="group hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 overflow-hidden border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
      <div className="relative">
        <ImageLoader
          src={song.coverArt} 
          alt={song.title}
          className={`w-full object-cover ${isLarge ? 'h-56' : 'h-40'} transition-transform duration-300 group-hover:scale-105`}
          key={`${song.id}-${song.coverArt}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <Button
            size={isLarge ? "lg" : "default"}
            className={`transition-all duration-300 scale-90 group-hover:scale-100 bg-primary/90 backdrop-blur-md border-0 text-primary-foreground hover:bg-primary shadow-lg ${
              isCurrentSong ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
            onClick={() => onPlay(song)}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className={`${isLarge ? 'h-6 w-6' : 'h-5 w-5'} animate-spin`} />
            ) : (isPlaying && isCurrentSong) ? (
              <Pause className={`${isLarge ? 'h-6 w-6' : 'h-5 w-5'}`} />
            ) : (
              <Play className={`${isLarge ? 'h-6 w-6' : 'h-5 w-5'} ml-1`} />
            )}
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggleFavorite(song.id)}
          className={`absolute top-3 right-3 ${isFavorite ? "text-red-500" : "text-white/80"} hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/20 backdrop-blur-sm border-0`}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
        </Button>
        <Badge 
          variant="secondary" 
          className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-sm text-white border-0"
        >
          {song.genre}
        </Badge>
      </div>
      <CardContent className="p-4 space-y-3">
        <div className="space-y-2">
          <h3 className="font-bold text-lg truncate text-foreground">{song.title}</h3>
          <p className="text-sm text-muted-foreground truncate font-medium">{song.artist}</p>
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <span className="text-xs text-muted-foreground font-medium">{song.album}</span>
            <span className="text-xs text-muted-foreground font-mono">{song.duration}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});