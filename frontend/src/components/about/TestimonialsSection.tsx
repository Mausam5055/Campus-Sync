import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";
import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface Testimonial {
  name: string;
  role: string;
  university: string;
  content: string;
  rating: number;
  image: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  useEffect(() => {
    if (isMobile) return;

    const testimonialContainer = scrollRef.current;
    if (testimonialContainer) {
      let animationId: number;
      let scrollSpeed = -0.8; // Negative for reverse direction, slower speed

      const scrollTestimonials = () => {
        if (testimonialContainer) {
          testimonialContainer.scrollLeft += scrollSpeed;
          // Reset scroll when reaching the beginning (since we're going backwards)
          if (testimonialContainer.scrollLeft <= 0) {
            testimonialContainer.scrollLeft = testimonialContainer.scrollWidth - testimonialContainer.clientWidth;
          }
        }
        animationId = requestAnimationFrame(scrollTestimonials);
      };

      animationId = requestAnimationFrame(scrollTestimonials);

      // Pause on hover
      const handleMouseEnter = () => {
        cancelAnimationFrame(animationId);
      };

      const handleMouseLeave = () => {
        animationId = requestAnimationFrame(scrollTestimonials);
      };

      testimonialContainer.addEventListener('mouseenter', handleMouseEnter);
      testimonialContainer.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        cancelAnimationFrame(animationId);
        testimonialContainer.removeEventListener('mouseenter', handleMouseEnter);
        testimonialContainer.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [isMobile]);

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-muted/20 via-background to-muted/30 overflow-hidden px-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-8 sm:mb-12">
          <div className="flex justify-center">
            <Badge variant="outline" className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30 backdrop-blur-sm text-xs sm:text-sm px-3 py-1">
              <Quote className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Student Testimonials
            </Badge>
          </div>
          
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-black tracking-tighter px-4 sm:px-0 text-center">
                What Students Say{" "}
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent drop-shadow-sm">
                  About Us
                </span>
              </h2>
              
              {/* Quote-themed decorative separator */}
              <div className="flex items-center justify-center gap-3">
                <Quote className="h-3 w-3 text-primary/40 rotate-180" />
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
                <div className="w-2 h-2 rounded-full bg-primary/50"></div>
                <div className="h-px w-20 bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30"></div>
                <div className="w-2 h-2 rounded-full bg-primary/50"></div>
                <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
                <Quote className="h-3 w-3 text-primary/40" />
              </div>
            </div>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground/90 max-w-3xl lg:max-w-5xl mx-auto leading-relaxed md:leading-9 lg:leading-10 px-4 sm:px-0 font-normal tracking-normal text-center">
              Hear from <span className="font-semibold text-foreground/90">real students</span> who have <em className="text-primary/90 not-italic font-semibold">transformed</em> their academic experience with CampusSync.
            </p>
          </div>
        </div>

        {/* Testimonials Scroll Container - Mobile optimized */}
        <div 
          ref={scrollRef}
          className="flex flex-col md:flex-row gap-3 sm:gap-4 lg:gap-6 overflow-hidden md:overflow-x-auto md:scrollbar-hide pb-4 scroll-smooth px-2 sm:px-4"
        >
          {/* Double the testimonials for seamless loop */}
          {(isMobile ? testimonials : [...testimonials, ...testimonials]).map((testimonial, index) => (
            <div 
              key={index}
              className="w-full md:w-80 lg:w-96 md:flex-shrink-0 bg-background/50 backdrop-blur-sm p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 space-y-4"
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              {/* Quote */}
              <div className="relative">
                <Quote className="absolute -top-1 -left-1 h-3 w-3 sm:h-4 sm:w-4 text-primary/30" />
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed italic pl-3 sm:pl-4">
                  "{testimonial.content}"
                </p>
              </div>
              
              {/* User Info */}
              <div className="flex items-center gap-3 pt-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden ring-2 ring-primary/20 flex-shrink-0">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-xs sm:text-sm text-foreground truncate">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-muted-foreground truncate">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};