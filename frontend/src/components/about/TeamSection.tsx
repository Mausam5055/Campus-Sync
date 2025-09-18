import { Badge } from "@/components/ui/badge";
import { Linkedin, Users, Star } from "lucide-react";
import { useRef, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin: string;
}

interface TeamSectionProps {
  teamMembers: TeamMember[];
}

export const TeamSection = ({ teamMembers }: TeamSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Auto-scroll for team section (left to right) - desktop only
    if (isMobile) return;

    const teamContainer = scrollRef.current;
    if (teamContainer) {
      let animationId: number;
      let scrollSpeed = 0.8; // Match testimonials speed but opposite direction

      const animateScroll = () => {
        if (teamContainer) {
          teamContainer.scrollLeft += scrollSpeed;
          // Seamless loop with duplicated content
          const resetPoint = teamContainer.scrollWidth / 2;
          if (teamContainer.scrollLeft >= resetPoint) {
            teamContainer.scrollLeft = 0;
          }
        }
        animationId = requestAnimationFrame(animateScroll);
      };

      animationId = requestAnimationFrame(animateScroll);

      // Pause on hover
      const handleMouseEnter = () => {
        cancelAnimationFrame(animationId);
      };

      const handleMouseLeave = () => {
        animationId = requestAnimationFrame(animateScroll);
      };

      teamContainer.addEventListener('mouseenter', handleMouseEnter);
      teamContainer.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        cancelAnimationFrame(animationId);
        teamContainer.removeEventListener('mouseenter', handleMouseEnter);
        teamContainer.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [isMobile]);

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-background via-muted/30 to-background overflow-hidden px-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-8 sm:mb-12">
          <div className="flex justify-center">
            <Badge variant="outline" className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30 backdrop-blur-sm text-xs sm:text-sm px-3 py-1">
              <Users className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Our Team
            </Badge>
          </div>
          
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-black tracking-tighter px-4 sm:px-0 text-center">
                Meet the{" "}
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent drop-shadow-sm">
                  Innovators
                </span>
              </h2>
              
              {/* Decorative separator with team theme */}
              <div className="flex items-center justify-center gap-2">
                <div className="h-px w-6 bg-gradient-to-r from-transparent to-primary/30"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                <div className="h-px w-12 bg-primary/30"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                <div className="h-px w-6 bg-gradient-to-l from-transparent to-primary/30"></div>
              </div>
            </div>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground/90 max-w-3xl lg:max-w-5xl mx-auto leading-relaxed md:leading-9 lg:leading-10 px-4 sm:px-0 font-normal tracking-normal text-center">
              <span className="font-semibold text-foreground/90">Passionate educators</span> and <em className="text-primary/90 not-italic font-semibold">technologists</em> working together to revolutionize student experiences.
            </p>
          </div>
        </div>

        {/* Team Members Scroll Container - Mobile optimized */}
        <div className="relative">

          <div 
            ref={scrollRef}
            className="flex flex-col md:flex-row gap-3 sm:gap-4 lg:gap-6 overflow-hidden md:overflow-x-auto md:scrollbar-hide pb-4 scroll-smooth px-2 sm:px-4 lg:px-16"
          >
            {/* Double the team members for seamless loop */}
            {(isMobile ? teamMembers : [...teamMembers, ...teamMembers]).map((member, index) => (
              <div
                key={index}
                className="w-full md:w-72 lg:w-80 md:flex-shrink-0 bg-card/80 backdrop-blur-sm p-4 sm:p-5 lg:p-6 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col gap-4"
              >
                {/* Half Photo Preview with Blend */}
                <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                
                {/* Member Info */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">{member.name}</h3>
                    <p className="text-sm font-medium text-primary">{member.role}</p>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed italic">
                    {member.role === "UX Designer" && "\"Design innovator creating intuitive interfaces that make complex academic management effortless and enjoyable.\""}
                    {member.role === "Product Manager" && "\"Strategic product leader translating student needs into powerful features that drive academic success and engagement.\""}
                    {member.role === "Data Scientist" && "\"AI specialist developing intelligent insights that help students make data-driven decisions about their academic journey.\""}
                    {member.role === "CEO & Founder" && "\"Visionary leader with 10+ years in EdTech, passionate about revolutionizing student experiences through innovative technology solutions.\""}
                    {member.role === "CTO" && "\"Technical architect driving our platform's cutting-edge infrastructure and ensuring scalable, secure solutions for millions of students.\""}
                    {member.role === "Lead Developer" && "\"Full-stack expert crafting seamless user experiences with clean, efficient code that powers our award-winning platform.\""}
                  </p>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors duration-300"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};