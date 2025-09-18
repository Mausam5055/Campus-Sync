import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, Sparkles, Code } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  features: Feature[];
}

export const FeaturesSection = ({ features }: FeaturesSectionProps) => {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-background via-muted/30 to-background px-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-8 sm:mb-12">
          <div className="flex justify-center">
            <Badge variant="outline" className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30 backdrop-blur-sm text-xs sm:text-sm px-3 py-1">
              <Sparkles className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              The Future of
            </Badge>
          </div>
          
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-black tracking-tighter px-4 sm:px-0 text-center">
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent drop-shadow-sm">
                  Academic Excellence
                </span>
              </h2>
              
              {/* Decorative separator */}
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
                <div className="w-2 h-2 rounded-full bg-primary/40"></div>
                <div className="h-px w-16 bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30"></div>
                <div className="w-2 h-2 rounded-full bg-primary/40"></div>
                <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
              </div>
            </div>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground/90 max-w-3xl lg:max-w-5xl mx-auto leading-relaxed md:leading-9 lg:leading-10 px-4 sm:px-0 font-normal tracking-normal text-center">
              Experience <span className="font-semibold text-foreground/90">award-winning technology</span> designed to <em className="text-primary/90 not-italic font-semibold">transform</em> how students learn, collaborate, and succeed in their academic journey.
            </p>
          </div>
        </div>

        {/* Hero Feature Card - Mobile optimized */}
        <div className="mb-6 sm:mb-8">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-card via-card/95 to-muted/20 border border-border/50 p-4 sm:p-6 lg:p-8">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop')] bg-cover bg-center opacity-80 dark:opacity-30" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/95 via-background/80 to-background/40 dark:from-background/80 dark:via-background/60 dark:to-background/30 backdrop-blur-sm sm:backdrop-blur-md" />
            <div className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl sm:rounded-2xl flex items-center justify-center">
                    <Code className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">Built for Students</h3>
                  <p className="text-foreground text-sm sm:text-base leading-relaxed">
                    Meticulously crafted by students, for students. Every feature addresses real academic challenges.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 sm:mt-6">
                    <div className="bg-background/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-3">
                      <h4 className="font-semibold mb-1 text-sm">Student-Centric Design</h4>
                      <p className="text-xs text-muted-foreground">By students, for students</p>
                    </div>
                    <div className="bg-background/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-3">
                      <h4 className="font-semibold mb-1 text-sm">Real-World Solutions</h4>
                      <p className="text-xs text-muted-foreground">Addressing actual needs</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 mt-6 lg:mt-0">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl sm:rounded-2xl p-4 sm:p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                      <span className="text-xs sm:text-sm font-medium text-primary">Lightning Fast</span>
                    </div>
                    <p className="text-foreground font-semibold text-sm sm:text-base">Experience blazing-fast performance with optimized infrastructure.</p>
                    <div className="mt-3 flex items-center gap-2 text-xs sm:text-sm text-primary">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>99.9% Uptime Guaranteed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid - Mobile optimized */}
        <div className="grid gap-4 sm:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-card via-card/95 to-background/50 border border-border/60 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 hover:border-primary/40 hover:ring-2 hover:ring-primary/20 transition-all duration-500 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardContent className="relative p-4 sm:p-5 lg:p-6 space-y-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-primary/20">
                  <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary group-hover:text-primary/90 transition-colors duration-300 drop-shadow-sm" />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold group-hover:text-primary transition-colors duration-300 font-serif tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="font-sans text-sm md:text-base text-muted-foreground/90 leading-relaxed md:leading-7 group-hover:text-muted-foreground transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
                
                {/* Enhanced visual elements */}
                <div className="flex items-center gap-2 pt-2">
                  <div className="h-1 bg-gradient-to-r from-primary/60 to-primary/20 rounded-full flex-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <div className="w-2 h-2 bg-primary/40 rounded-full group-hover:bg-primary/60 transition-colors duration-300" />
                </div>
                
                {/* Enhanced badges for special features */}
                {(feature.title === "Secure & Private" || feature.title === "Smart Features") && (
                  <div className="pt-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary bg-gradient-to-r from-primary/10 to-primary/5 px-3 py-1.5 rounded-full border border-primary/20 backdrop-blur-sm shadow-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                      {feature.title === "Secure & Private" ? "Bank-Level Encryption" : "AI-Powered"}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};