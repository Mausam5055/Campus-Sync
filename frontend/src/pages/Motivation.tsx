import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MotivationSkeleton } from "@/components/ui/motivation-skeleton";
import { usePageLoading } from "@/hooks/use-page-loading";
import { Play, Pause, RotateCcw, Heart, Share, BookOpen, Target, Zap, Star } from "lucide-react";
import quoteBg from "@/assets/quote-bg.jpg";

interface MotivationContent {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'quote' | 'story';
  videoId?: string;
  quote?: string;
  author?: string;
  story?: string;
  tags: string[];
  color: string;
}

const motivationContent: MotivationContent[] = [
  {
    id: "1",
    title: "The Power of Yet",
    description: "Transform your mindset from 'I can't' to 'I can't yet' and unlock unlimited potential.",
    type: "video",
    videoId: "hiiEeMN7vbQ",
    tags: ["Growth", "Mindset", "Potential"],
    color: "from-purple-600/20 to-pink-600/20"
  },
  {
    id: "2",
    title: "Believe in Yourself",
    description: "The only person you are destined to become is the person you decide to be.",
    type: "quote",
    quote: "The only person you are destined to become is the person you decide to be.",
    author: "Ralph Waldo Emerson",
    tags: ["Self-belief", "Destiny", "Choice"],
    color: "from-blue-600/20 to-cyan-600/20"
  },
  {
    id: "3",
    title: "Overcoming Challenges",
    description: "Every challenge is an opportunity to grow stronger and wiser.",
    type: "video",
    videoId: "mgmVOuLgFB0",
    tags: ["Resilience", "Growth", "Strength"],
    color: "from-green-600/20 to-emerald-600/20"
  },
  {
    id: "4",
    title: "The Art of Persistence",
    description: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    type: "quote",
    quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    tags: ["Persistence", "Courage", "Success"],
    color: "from-orange-600/20 to-red-600/20"
  },
  {
    id: "5",
    title: "Finding Your Purpose",
    description: "Discover what drives you and align your actions with your deepest values.",
    type: "video",
    videoId: "u4ZoJKF_VuA",
    tags: ["Purpose", "Values", "Direction"],
    color: "from-indigo-600/20 to-purple-600/20"
  },
  {
    id: "6",
    title: "The Growth Story",
    description: "A bamboo tree grows 90 feet in just 6 weeks, but it takes 5 years to build its root system first.",
    type: "story",
    story: "A Chinese bamboo tree is planted and watered for years without any visible growth above ground. For five long years, nothing seems to happen. Then, in the sixth year, it suddenly shoots up 90 feet in just 6 weeks. The question is: did it grow 90 feet in 6 weeks, or did it grow 90 feet in 5 years? The answer is obvious - it grew 90 feet in 5 years. For five years, it was developing a strong root system that could support its incredible growth. Your dreams work the same way. Keep watering them, even when you can't see the growth.",
    author: "Ancient Chinese Wisdom",
    tags: ["Patience", "Growth", "Foundation"],
    color: "from-teal-600/20 to-green-600/20"
  }
];

export default function Motivation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedContent, setLikedContent] = useState<Set<string>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);
  const isLoading = usePageLoading();

  const currentContent = motivationContent[currentIndex];


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

  const handleShare = async (content: MotivationContent) => {
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


  const renderVideoSection = (content: MotivationContent) => (
    <div className="w-full max-w-5xl mx-auto">
      {/* Video header with stats */}
      <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-t-xl md:rounded-t-2xl p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-red-600 rounded-lg flex items-center justify-center">
              <Play className="h-5 w-5 md:h-6 md:w-6 text-white fill-current" />
            </div>
            <div>
              <h3 className="font-semibold text-base md:text-lg">Motivational Video</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Transform your mindset</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs md:text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live inspiration</span>
            </div>
            <span>HD Quality</span>
          </div>
        </div>
      </div>
      
      {/* Enhanced video container */}
      <div className="relative">
        <div className="aspect-video rounded-b-xl md:rounded-b-2xl overflow-hidden shadow-2xl border border-t-0 border-border/50">
          <iframe
            src={`https://www.youtube.com/embed/${content.videoId}?rel=0&modestbranding=1&controls=1`}
            title={content.title}
            className="w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
        
        {/* Video overlay badges */}
        <div className="absolute top-3 right-3 flex gap-2">
          <Badge className="bg-black/70 text-white text-xs border-none backdrop-blur-sm">
            Motivational
          </Badge>
        </div>
      </div>
      
      {/* Video description panel */}
      <div className="bg-card/60 backdrop-blur-sm border border-t-0 border-border/30 rounded-b-lg p-4 md:p-6 mt-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex-1">
            <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
              Watch this powerful video to ignite your inner motivation and unlock your true potential.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="gap-1">
              <Heart className="h-3 w-3" />
              <span className="text-xs">Save</span>
            </Button>
            <Button size="sm" variant="outline" className="gap-1">
              <Share className="h-3 w-3" />
              <span className="text-xs">Share</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQuoteSection = (content: MotivationContent) => (
    <div className="relative max-w-3xl mx-auto">
      <div 
        className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl"
        style={{
          backgroundImage: `url(${quoteBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
        
        <div className="relative z-10 px-6 py-8 md:px-8 md:py-12 lg:px-12 lg:py-16 text-center">
          <div className="relative">
            <div className="text-3xl md:text-4xl text-white/60 absolute -top-1 -left-2">"</div>
            <blockquote className="text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-white italic px-4">
              {content.quote}
            </blockquote>
            <div className="text-3xl md:text-4xl text-white/60 absolute -bottom-1 -right-2">"</div>
          </div>
          {content.author && (
            <p className="text-sm md:text-base text-white/80 font-medium mt-4">— {content.author}</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderStorySection = (content: MotivationContent) => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-primary" />
          <h3 className="text-lg md:text-xl font-semibold">Story</h3>
        </div>
        <p className="text-base md:text-lg leading-relaxed text-foreground/90 mb-4 md:mb-6">
          {content.story}
        </p>
        {content.author && (
          <p className="text-sm md:text-base text-muted-foreground italic font-medium">— {content.author}</p>
        )}
      </div>
    </div>
  );

  if (isLoading) {
    return <MotivationSkeleton />;
  }

  return (
    <div className="min-h-screen relative bg-background overflow-hidden">
      {/* Animated grid background */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
          animation: 'float 20s ease-in-out infinite'
        }}
      />

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-3/4 w-24 h-24 bg-secondary/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>


      {/* Content sections - Vertical scrolling layout */}
      <div className="space-y-8 md:space-y-12 py-8">
        {motivationContent.map((content, index) => (
          <div
            key={content.id}
            className={`relative rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-br ${content.color} border border-border/20`}
          >
            <div className="absolute inset-0 bg-background/80 dark:bg-background/90" />
            
            <div className="relative z-10 p-6 md:p-8 lg:p-12 space-y-6 md:space-y-8">
              {/* Enhanced Header */}
              <div className="text-center space-y-4">
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
                    <div className="relative w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                      {content.type === 'video' && <Play className="h-6 w-6 md:h-8 md:w-8 text-white" />}
                      {content.type === 'quote' && <Star className="h-6 w-6 md:h-8 md:w-8 text-white" />}
                      {content.type === 'story' && <BookOpen className="h-6 w-6 md:h-8 md:w-8 text-white" />}
                    </div>
                  </div>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
                    {content.title}
                  </h2>
                </div>
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  {content.description}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge variant="outline" className="px-3 py-1 bg-primary/10 border-primary/20">
                    <Target className="h-3 w-3 mr-1" />
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
                {content.type === 'video' && (
                  <div className="w-full max-w-4xl">
                    {renderVideoSection(content)}
                  </div>
                )}
                {content.type === 'quote' && renderQuoteSection(content)}
                {content.type === 'story' && renderStorySection(content)}
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
                    <Zap className="h-4 w-4 md:mr-2" />
                    <span className="hidden md:inline">Get More</span>
                  </Button>
                </div>
                
                {/* Impact metrics */}
                <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3 text-red-500" />
                    <span>{Math.floor(Math.random() * 1000) + 500} loves</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Share className="h-3 w-3" />
                    <span>{Math.floor(Math.random() * 200) + 50} shares</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="h-3 w-3 text-yellow-500" />
                    <span>Inspiring</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
        `
      }} />
    </div>
  );
}