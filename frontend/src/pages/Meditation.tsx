import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MeditationSkeleton } from "@/components/ui/meditation-skeleton";
import { usePageLoading } from "@/hooks/use-page-loading";
import { Play, Pause, RotateCcw, Heart, Share, Clock, Waves, Wind, Sparkles, Brain, Leaf } from "lucide-react";
import quoteBg from "@/assets/quote-bg.jpg";

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

const meditationContent: MeditationContent[] = [
  {
    id: "1",
    title: "Morning Mindfulness",
    description: "Start your day with clarity and intention through this gentle 10-minute guided meditation.",
    type: "guided",
    duration: "10 min",
    videoId: "inpok4MKVLM",
    benefits: ["Reduces stress", "Improves focus", "Enhances mood"],
    tags: ["Morning", "Beginner", "Guided"],
    color: "from-amber-400/20 to-orange-500/20",
    icon: Sparkles
  },
  {
    id: "2",
    title: "4-7-8 Breathing Technique",
    description: "A powerful breathing technique to calm your nervous system and reduce anxiety instantly.",
    type: "breathing",
    duration: "5 min",
    instructions: [
      "Exhale completely through your mouth",
      "Close your mouth and inhale through your nose for 4 counts",
      "Hold your breath for 7 counts",
      "Exhale through your mouth for 8 counts",
      "Repeat the cycle 3-4 times"
    ],
    benefits: ["Reduces anxiety", "Improves sleep", "Calms mind"],
    tags: ["Breathing", "Quick", "Anxiety Relief"],
    color: "from-blue-400/20 to-cyan-500/20",
    icon: Wind
  },
  {
    id: "3",
    title: "Deep Sleep Meditation",
    description: "Drift into peaceful sleep with this calming guided meditation designed for bedtime.",
    type: "guided",
    duration: "20 min",
    videoId: "aEqlQvczMJQ",
    benefits: ["Better sleep", "Relaxation", "Stress relief"],
    tags: ["Sleep", "Evening", "Relaxation"],
    color: "from-indigo-500/20 to-purple-600/20",
    icon: Sparkles
  },
  {
    id: "4",
    title: "Ocean Waves Meditation",
    description: "Let the soothing sounds of ocean waves wash away your stress and tension.",
    type: "music",
    duration: "30 min",
    videoId: "fn3KWM1kuAw",
    benefits: ["Deep relaxation", "Stress relief", "Mental clarity"],
    tags: ["Nature", "Ambient", "Long"],
    color: "from-teal-400/20 to-blue-600/20",
    icon: Waves
  },
  {
    id: "5",
    title: "Mindful Walking",
    description: "Transform your daily walk into a meditation practice with mindful awareness.",
    type: "mindfulness",
    duration: "15 min",
    instructions: [
      "Start walking at a comfortable, slow pace",
      "Focus on the sensation of your feet touching the ground",
      "Notice the rhythm of your breathing",
      "Observe your surroundings without judgment",
      "When your mind wanders, gently return focus to walking",
      "End with three deep breaths"
    ],
    benefits: ["Mindful awareness", "Grounding", "Present moment"],
    tags: ["Walking", "Mindfulness", "Outdoor"],
    color: "from-green-400/20 to-emerald-600/20",
    icon: Wind
  },
  {
    id: "6",
    title: "Loving Kindness Meditation",
    description: "Cultivate compassion and love for yourself and others through this heart-opening practice.",
    type: "guided",
    duration: "12 min",
    videoId: "sz7cpV7ERsM",
    benefits: ["Increases compassion", "Reduces negative emotions", "Improves relationships"],
    tags: ["Compassion", "Heart-opening", "Self-love"],
    color: "from-pink-400/20 to-rose-500/20",
    icon: Heart
  }
];

export default function Meditation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedContent, setLikedContent] = useState<Set<string>>(new Set());
  const [timer, setTimer] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();
  const isLoading = usePageLoading();

  const currentContent = meditationContent[currentIndex];


  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleLike = (id: string) => {
    setLikedContent(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleShare = async (content: MeditationContent) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: content.title,
          text: content.description,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
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

  const resetTimer = () => {
    stopTimer();
    setTimer(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };


  const renderSimpleVideoSection = (content: MeditationContent) => (
    <div className="w-full max-w-4xl mx-auto">
      {/* Simple video container for mobile */}
      <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden shadow-lg">
        {/* Simple header */}
        <div className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <content.icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-base">Guided Meditation</h3>
              <p className="text-sm text-muted-foreground">Find your inner peace</p>
            </div>
          </div>
        </div>
        
        {/* Simple video */}
        <div className="aspect-video bg-black/5 dark:bg-black/20">
          <iframe
            src={`https://www.youtube.com/embed/${content.videoId}?rel=0&modestbranding=1&controls=1`}
            title={content.title}
            className="w-full h-full border-0"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
        
        {/* Simple description */}
        <div className="p-4 border-t border-border/20">
          <p className="text-sm text-foreground/80 leading-relaxed">
            {content.description}
          </p>
        </div>
      </div>
    </div>
  );

  const renderEnhancedVideoSection = (content: MeditationContent) => (
    <div className="w-full max-w-5xl mx-auto">
      {/* Enhanced video container with premium styling */}
      <div className="relative group">
        {/* Glowing border effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
        
        {/* Main video container */}
        <div className="relative bg-card/95 backdrop-blur-xl border border-border/40 rounded-2xl overflow-hidden shadow-2xl">
          {/* Premium header */}
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
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/50 px-3 py-1.5 rounded-full">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">{content.duration}</span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 dark:bg-green-950/50 px-3 py-1.5 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-medium">Live</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Video with enhanced styling */}
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
            
            {/* Floating quality badges */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Badge className="bg-black/80 text-white text-xs border-none backdrop-blur-sm shadow-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" />
                HD Quality
              </Badge>
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs border-none shadow-lg">
                {content.type.charAt(0).toUpperCase() + content.type.slice(1)} • {content.duration}
              </Badge>
            </div>
          </div>
          
          {/* Enhanced description panel */}
          <div className="bg-gradient-to-r from-slate-50/50 via-blue-50/30 to-purple-50/50 dark:from-slate-900/50 dark:via-blue-950/30 dark:to-purple-950/50 backdrop-blur-sm border-t border-border/20 p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm md:text-base text-foreground/90 leading-relaxed mb-3">
                  {content.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {content.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs px-2 py-1 bg-primary/10 text-primary border-primary/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="gap-1 hover:bg-blue-50 dark:hover:bg-blue-950/50">
                    <Brain className="h-3 w-3 text-blue-600" />
                    <span className="text-xs font-medium">Focus</span>
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1 hover:bg-green-50 dark:hover:bg-green-950/50">
                    <Leaf className="h-3 w-3 text-green-600" />
                    <span className="text-xs font-medium">Relax</span>
                  </Button>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <div className="w-1 h-1 bg-primary rounded-full" />
                  <span>{Math.floor(Math.random() * 50) + 20}K views</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInstructionsSection = (content: MeditationContent) => (
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
          {content.instructions?.map((instruction, index) => (
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
                size={window.innerWidth < 768 ? "sm" : "default"}
                className="gap-2"
              >
                <Play className="h-3 w-3 md:h-4 md:w-4" />
                <span className="text-xs md:text-sm">Start</span>
              </Button>
              <Button
                variant="outline"
                onClick={isTimerRunning ? stopTimer : resetTimer}
                size={window.innerWidth < 768 ? "sm" : "default"}
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

  if (isLoading) {
    return <MeditationSkeleton />;
  }

  return (
    <div className="min-h-screen relative bg-background overflow-hidden">
      {/* Breathing animation background */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          animation: 'breathe 4s ease-in-out infinite'
        }}
      />

      {/* Floating meditation elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-20 h-20 bg-primary/5 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-2/3 right-1/5 w-32 h-32 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-2/3 w-16 h-16 bg-secondary/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>


      {/* Content sections - Vertical scrolling layout */}
      <div className="space-y-8 md:space-y-12 pt-4 pb-8">
        {meditationContent.map((content, index) => (
          <div
            key={content.id}
            className={`relative rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-br ${content.color} border border-border/20`}
          >
            <div className="absolute inset-0 bg-background/85 dark:bg-background/95" />
            
            <div className="relative z-10 p-6 md:p-8 lg:p-12 space-y-6 md:space-y-8">
              {/* Enhanced Header */}
              <div className="text-center space-y-4">
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse"></div>
                    <div className="relative w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 rounded-full flex items-center justify-center shadow-xl">
                      <content.icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                    </div>
                  </div>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent leading-tight">
                    {content.title}
                  </h2>
                </div>
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  {content.description}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge variant="outline" className="px-3 py-1 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                    <Clock className="h-3 w-3 mr-1 text-blue-600" />
                    {content.duration}
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1 bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
                    <content.icon className="h-3 w-3 mr-1 text-purple-600" />
                    {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
                  </Badge>
                  {content.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="px-3 py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="flex justify-center">
                {(content.type === 'guided' || content.type === 'music') && content.videoId && (
                  <div className="w-full max-w-4xl">
                    {/* Show simple video on mobile, enhanced on desktop */}
                    <div className="block md:hidden">
                      {renderSimpleVideoSection(content)}
                    </div>
                    <div className="hidden md:block">
                      {renderEnhancedVideoSection(content)}
                    </div>
                  </div>
                )}
                {(content.type === 'breathing' || content.type === 'mindfulness') && content.instructions && renderInstructionsSection(content)}
              </div>

              {/* Benefits Section */}
              <div className="max-w-3xl mx-auto">
                <div className="bg-card/40 backdrop-blur-sm border border-border/30 rounded-xl p-4 md:p-6">
                  <h3 className="text-base md:text-lg font-semibold mb-3 text-center flex items-center justify-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Benefits
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-2 md:gap-3">
                    {content.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center gap-2 p-2 md:p-3 bg-primary/5 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm md:text-base text-foreground/90">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                <div className="flex justify-center items-center gap-3 md:gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLike(content.id)}
                    className={`${likedContent.has(content.id) ? 'text-red-500 border-red-200 bg-red-50 dark:bg-red-950' : ''} hover:scale-105 transition-all duration-200 md:size-lg`}
                  >
                    <Heart className={`h-4 w-4 ${likedContent.has(content.id) ? 'fill-current' : ''} md:mr-2`} />
                    <span className="hidden md:inline">{likedContent.has(content.id) ? 'Loved' : 'Love it'}</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare(content)}
                    className="hover:scale-105 transition-all duration-200 md:size-lg"
                  >
                    <Share className="h-4 w-4 md:mr-2" />
                    <span className="hidden md:inline">Share</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:scale-105 transition-all duration-200 md:size-lg"
                  >
                    <Brain className="h-4 w-4 md:mr-2" />
                    <span className="hidden md:inline">Practice</span>
                  </Button>
                </div>
                
                {/* Community metrics */}
                <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3 text-red-500" />
                    <span>{Math.floor(Math.random() * 800) + 300} meditators</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Brain className="h-3 w-3 text-blue-500" />
                    <span>Mindful community</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Leaf className="h-3 w-3 text-green-500" />
                    <span>Peaceful</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes breathe {
            0%, 100% { 
              transform: scale(1) rotate(0deg);
              opacity: 0.03;
            }
            50% { 
              transform: scale(1.1) rotate(180deg);
              opacity: 0.06;
            }
          }
        `
      }} />
    </div>
  );
}