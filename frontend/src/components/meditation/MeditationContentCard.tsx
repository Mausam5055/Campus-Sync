import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Share, Clock, Play, Pause, RotateCcw, Info, Brain, Leaf } from "lucide-react";

interface MeditationContent {
  id: string;
  title: string;
  description: string;
  type: 'guided' | 'music' | 'breathing' | 'mindfulness';
  duration: string;
  videoId?: string;
  instructions?: string[];
  benefits: string[];
  tags: string[];
  color: string;
  icon: React.ElementType;
}

interface MeditationContentCardProps {
  content: MeditationContent;
  isLiked: boolean;
  onLike: (id: string) => void;
  onShare: (content: MeditationContent) => void;
  onStartTimer?: (minutes: number) => void;
}

export function MeditationContentCard({ 
  content, 
  isLiked, 
  onLike, 
  onShare,
  onStartTimer
}: MeditationContentCardProps) {
  const [timer, setTimer] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = (minutes: number) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setTimer(minutes * 60);
    setIsTimerRunning(true);
    
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev === null || prev <= 1) {
          setIsTimerRunning(false);
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsTimerRunning(false);
    setTimer(null);
  };

  const renderVideoSection = () => {
    if (!content.videoId) return null;

    return (
      <div className="w-full max-w-5xl mx-auto">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
          
          <div className="relative bg-card/95 backdrop-blur-xl border border-border/40 rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-teal-600/10 backdrop-blur-sm border-b border-border/30 p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-md opacity-60 animate-pulse" />
                    <div className="relative w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 rounded-xl flex items-center justify-center shadow-xl">
                      <content.icon className="h-6 w-6 md:h-7 md:w-7 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg md:text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {content.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground">Premium guided meditation experience</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-video bg-black/5 dark:bg-black/20">
                <iframe
                  src={`https://www.youtube.com/embed/${content.videoId}?rel=0&modestbranding=1&controls=1&autoplay=0&fs=1&cc_load_policy=0&iv_load_policy=3&theme=dark`}
                  title={content.title}
                  className="w-full h-full border-0"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  loading="lazy"
                />
              </div>
              
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Badge className="bg-black/80 text-white text-xs border-none backdrop-blur-sm shadow-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" />
                  HD Quality
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderInstructionsSection = () => {
    if (!content.instructions) return null;

    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4 md:mb-6">
            <div className="flex items-center gap-3">
              <content.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              <h3 className="text-lg md:text-xl font-semibold">Instructions</h3>
            </div>
            <Badge variant="outline" className="w-fit sm:ml-auto">
              <Clock className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              <span className="text-xs md:text-sm">{content.duration}</span>
            </Badge>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 mb-6 md:mb-8">
            {content.instructions.map((instruction, index) => (
              <div key={index} className="flex items-start gap-3 md:gap-4">
                <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 bg-primary/20 rounded-full flex items-center justify-center text-xs md:text-sm font-semibold text-primary">
                  {index + 1}
                </div>
                <p className="text-sm md:text-base text-foreground/90 leading-relaxed pt-0.5 md:pt-1">
                  {instruction}
                </p>
              </div>
            ))}
          </div>

          {/* Timer */}
          <div className="border-t border-border/50 pt-4 md:pt-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {timer !== null && (
                <div className="text-2xl md:text-3xl font-mono font-bold text-primary">
                  {formatTime(timer)}
                </div>
              )}
              <div className="flex gap-2">
                <Button
                  onClick={() => startTimer(parseInt(content.duration))}
                  disabled={isTimerRunning}
                  size="default"
                  className="gap-2"
                >
                  <Play className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="text-xs md:text-sm">Start</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={isTimerRunning ? stopTimer : () => setTimer(null)}
                  size="default"
                  className="gap-2"
                >
                  {isTimerRunning ? (
                    <>
                      <Pause className="h-3 w-3 md:h-4 md:w-4" />
                      <span className="text-xs md:text-sm">Pause</span>
                    </>
                  ) : (
                    <>
                      <RotateCcw className="h-3 w-3 md:h-4 md:w-4" />
                      <span className="text-xs md:text-sm">Reset</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 md:space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 px-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className={`p-3 rounded-2xl bg-gradient-to-br ${content.color} shadow-lg backdrop-blur-sm`}>
            <content.icon className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">{content.title}</h2>
            <p className="text-muted-foreground">{content.description}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2">
          {content.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex justify-center gap-2">
          <Button 
            variant={isLiked ? "default" : "outline"} 
            size="sm"
            onClick={() => onLike(content.id)}
          >
            <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
            {isLiked ? "Liked" : "Like"}
          </Button>
          <Button variant="outline" size="sm" onClick={() => onShare(content)}>
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Content */}
      {content.videoId ? renderVideoSection() : renderInstructionsSection()}
    </div>
  );
}