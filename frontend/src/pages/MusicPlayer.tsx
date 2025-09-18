import { useState, useMemo, useCallback, memo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Shuffle, 
  Repeat, 
  Heart, 
  Search,
  Music,
  ListMusic,
  Download,
  Loader2
} from "lucide-react";
import { usePageLoading } from "@/hooks/use-page-loading";
import { GenericPageSkeleton } from "@/components/ui/page-skeleton";
import { ImageLoader } from "@/components/ui/image-loader";
import { useAudioPlayer, type AudioTrack } from "@/hooks/useAudioPlayer";
import lofiStudyCover from "@/assets/lofi-study-cover.jpg";
import ambientFocusCover from "@/assets/ambient-focus-cover.jpg";
import electronicCodingCover from "@/assets/electronic-coding-cover.jpg";
import jazzCoffeeCover from "@/assets/jazz-coffee-cover.jpg";
import classicalStudyCover from "@/assets/classical-study-cover.jpg";
import natureSoundsCover from "@/assets/nature-sounds-cover.jpg";
import ambientFocusAudio from "@/assets/audio/ambient-focus.mp3";

// Using AudioTrack interface from useAudioPlayer hook

const MusicPlayer = () => {
  const isLoading = usePageLoading();
  const {
    currentTrack,
    isPlaying,
    volume,
    currentTime,
    duration,
    isLoading: audioLoading,
    playTrack,
    togglePlayPause,
    seekTo,
    setVolumeLevel,
    formatTime,
    progress
  } = useAudioPlayer();

  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<number[]>([1, 3, 5]);
  const [loadingSongId, setLoadingSongId] = useState<number | null>(null);

  const songs: AudioTrack[] = [
    {
      id: 1,
      title: "Lo-fi Study Beat",
      artist: "Chill Beats",
      album: "Study Session Vol. 1",
      duration: "3:03",
      genre: "Lo-fi",
      coverArt: lofiStudyCover,
      audioUrl: ambientFocusAudio, // Using available audio file
      favorite: true
    },
    {
      id: 2,
      title: "Deep Focus",
      artist: "Ambient Works",
      album: "Concentration",
      duration: "4:00",
      genre: "Ambient",
      coverArt: ambientFocusCover,
      audioUrl: ambientFocusAudio,
      favorite: false
    },
    {
      id: 3,
      title: "Midnight Coding",
      artist: "Code Tunes",
      album: "Late Night Sessions",
      duration: "3:30",
      genre: "Electronic",
      coverArt: electronicCodingCover,
      audioUrl: ambientFocusAudio,
      favorite: true
    },
    {
      id: 4,
      title: "Jazz Coffee",
      artist: "Morning Blend",
      album: "Cafe Sounds",
      duration: "4:15",
      genre: "Jazz",
      coverArt: jazzCoffeeCover,
      audioUrl: ambientFocusAudio,
      favorite: false
    },
    {
      id: 5,
      title: "Classical Study",
      artist: "Academia",
      album: "Focus Classical",
      duration: "5:20",
      genre: "Classical",
      coverArt: classicalStudyCover,
      audioUrl: ambientFocusAudio,
      favorite: true
    },
    {
      id: 6,
      title: "Nature Sounds",
      artist: "Peaceful Mind",
      album: "Natural Ambience",
      duration: "8:00",
      genre: "Nature",
      coverArt: natureSoundsCover,
      audioUrl: ambientFocusAudio,
      favorite: false
    }
  ];

  const playlists = [
    { name: "Study Focus", songs: 12, genre: "Lo-fi, Ambient" },
    { name: "Coding Sessions", songs: 8, genre: "Electronic" },
    { name: "Relaxation", songs: 15, genre: "Nature, Classical" },
    { name: "Morning Study", songs: 10, genre: "Jazz, Classical" }
  ];

  const filteredSongs = songs.filter(song => 
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const favoriteSongs = songs.filter(song => favorites.includes(song.id));

  const handlePlaySong = useCallback(async (song: AudioTrack) => {
    setLoadingSongId(song.id);
    try {
      await playTrack(song);
    } finally {
      setLoadingSongId(null);
    }
  }, [playTrack]);

  const toggleFavorite = (songId: number) => {
    setFavorites(prev => 
      prev.includes(songId) 
        ? prev.filter(id => id !== songId)
        : [...prev, songId]
    );
  };

  const handleSeek = (value: number[]) => {
    const newTime = (value[0] / 100) * duration;
    seekTo(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolumeLevel(value[0]);
  };

  // Memoized SongCard component to prevent unnecessary re-renders
  const SongCard = memo(({ song, isLarge = false }: { song: AudioTrack, isLarge?: boolean }) => {
    const isFavorite = favorites.includes(song.id);
    const isCurrentSong = currentTrack?.id === song.id;
    const isCardLoading = loadingSongId === song.id;
    
    return (
    <Card className="group hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 overflow-hidden border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
      <div className="relative">
        <ImageLoader
          src={song.coverArt} 
          alt={song.title}
          className={`w-full object-cover ${isLarge ? 'h-56' : 'h-40'} transition-transform duration-300 group-hover:scale-105`}
          key={`${song.id}-${song.coverArt}`} // Stable key to prevent image reloads
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <Button
            size={isLarge ? "lg" : "default"}
            className={`transition-all duration-300 scale-90 group-hover:scale-100 bg-primary/90 backdrop-blur-md border-0 text-primary-foreground hover:bg-primary shadow-lg ${
              isCurrentSong ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
            onClick={() => handlePlaySong(song)}
            disabled={isCardLoading}
          >
            {isCardLoading ? (
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
          onClick={() => toggleFavorite(song.id)}
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

  if (isLoading) {
    return <GenericPageSkeleton />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-primary/70 shadow-lg">
            <Music className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="mobile-heading-large font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Music Player</h1>
            <p className="text-muted-foreground text-lg mobile-hide-description">Listen to music while you study</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2 border-primary/30 hover:bg-primary/10">
            <Download className="h-4 w-4" />
            Download
          </Button>
          <Button className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
            Focus Mode
          </Button>
        </div>
      </div>

      {/* Current Player */}
      {currentTrack && (
        <Card className="bg-gradient-to-r from-card/95 to-card/90 backdrop-blur-lg border-primary/20 shadow-2xl">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <ImageLoader
                  src={currentTrack.coverArt} 
                  alt={currentTrack.title}
                  className="w-32 h-32 rounded-2xl object-cover shadow-2xl"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent" />
                {isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                      <div className="w-4 h-4 bg-primary rounded-full animate-pulse" />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex-1 text-center md:text-left space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{currentTrack.title}</h3>
                  <p className="text-lg text-muted-foreground font-medium">{currentTrack.artist}</p>
                  <Badge variant="outline" className="mt-2 border-primary/30 text-primary">
                    {currentTrack.genre}
                  </Badge>
                </div>
                <div className="mt-4">
                  <Slider
                    value={[progress]}
                    onValueChange={handleSeek}
                    max={100}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2 font-mono">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                    <Shuffle className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" className="hover:bg-primary/10">
                    <SkipBack className="h-5 w-5" />
                  </Button>
                  <Button 
                    onClick={togglePlayPause} 
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
                <div className="flex items-center gap-3">
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  <Slider
                    value={[volume]}
                    onValueChange={handleVolumeChange}
                    max={100}
                    step={1}
                    className="w-24"
                  />
                  <span className="text-xs text-muted-foreground w-8 text-right">{volume}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search songs or artists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-background"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Songs</TabsTrigger>
              <TabsTrigger value="playlists">Playlists</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSongs.map((song) => (
                  <SongCard key={song.id} song={song} isLarge />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="playlists" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Playlists</CardTitle>
                  <CardDescription>Curated music collections</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {playlists.map((playlist, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                          <ListMusic className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="font-medium">{playlist.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {playlist.songs} songs • {playlist.genre}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost">
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="favorites" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoriteSongs.map((song) => (
                  <SongCard key={song.id} song={song} isLarge />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recently Played</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-3">
                {songs.slice(0, 3).map((song) => (
                  <div key={song.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <ImageLoader
                      src={song.coverArt} 
                      alt={song.title}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{song.title}</div>
                      <div className="text-xs text-muted-foreground truncate">{song.artist}</div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePlaySong(song)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Play className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{songs.length}</div>
                <div className="text-sm text-muted-foreground">Total Songs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{favoriteSongs.length}</div>
                <div className="text-sm text-muted-foreground">Favorites</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">2h 30m</div>
                <div className="text-sm text-muted-foreground">Listened Today</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;