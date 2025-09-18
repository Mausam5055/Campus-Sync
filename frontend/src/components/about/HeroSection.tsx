import { Badge } from "@/components/ui/badge";
import { useEffect, useRef } from "react";
import { Lightbulb, Users, Shield } from "lucide-react";

interface HeroSectionProps {
  stats: Array<{ number: string; label: string }>;
}

export const HeroSection = ({ stats }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] flex items-start justify-center bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden px-0">
      {/* Animated background elements - Mobile optimized */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-4 sm:top-20 sm:left-10 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-10 right-4 sm:bottom-20 sm:right-10 w-24 h-24 sm:w-40 sm:h-40 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-full blur-xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full blur-xl animate-pulse delay-1000" />
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-6 lg:space-y-8">
            {/* Badge */}
            <div className="flex justify-center lg:justify-start">
              <Badge variant="outline" className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30 backdrop-blur-sm text-xs sm:text-sm px-3 py-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse mr-2" />
                Our Mission
              </Badge>
            </div>
            
            {/* Main heading */}
            <div className="space-y-4 lg:space-y-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold tracking-tight leading-tight">
                Revolutionizing{" "}
                <span className="block sm:inline bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  Academic Excellence
                </span>
              </h1>
              
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Empowering students worldwide with cutting-edge technology that transforms academic management into an intuitive, efficient, and enjoyable experience.
              </p>
            </div>
            
            {/* Mission statement */}
            <div className="space-y-3">
              <div className="w-6 sm:w-8 h-1 bg-gradient-to-r from-primary to-primary/60 mb-3 sm:mb-4" />
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                We believe every student deserves access to tools that amplify their capabilities, foster collaboration, and provide insights that drive academic success.
              </p>
            </div>
            
            {/* Core values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {[
                { title: "Innovation", subtitle: "Cutting-edge solutions", icon: Lightbulb },
                { title: "Accessibility", subtitle: "For every student", icon: Users },
                { title: "Reliability", subtitle: "Always dependable", icon: Shield }
              ].map((value, index) => (
                <div 
                  key={index}
                  className="group bg-gradient-to-br from-card via-card/95 to-muted/20 border border-border/50 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg mb-2 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <value.icon className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base mb-1">{value.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{value.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Content - Stats and Awards */}
          <div className="space-y-4 lg:space-y-6 mt-8 lg:mt-0">
            {/* Student Growth Chart */}
            <div className="bg-gradient-to-br from-card via-card/95 to-muted/20 border border-border/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <h3 className="font-semibold text-sm sm:text-base lg:text-lg">Student Growth</h3>
                <Badge variant="secondary" className="ml-auto text-xs">+24% this month</Badge>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3">Monthly active users</p>
              
              {/* Growth bars */}
              <div className="space-y-3 sm:space-y-4">
                {[
                  { month: "Apr", users: "5,300", percentage: 75 },
                  { month: "May", users: "6,800", percentage: 85 },
                  { month: "Jun", users: "8,200", percentage: 95 }
                ].map((data, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground">{data.month}</span>
                      <span className="font-medium">{data.users} students</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-primary/70 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${data.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-gradient-to-br from-card via-card/95 to-muted/20 border border-border/50 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center hover:shadow-lg transition-all duration-300">
                  <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground font-medium leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Award Badge */}
            <div className="bg-gradient-to-br from-card via-card/95 to-muted/20 border border-border/50 rounded-lg sm:rounded-xl p-4 sm:p-5 text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 text-primary">⭐</div>
              </div>
              <h4 className="font-semibold text-sm sm:text-base lg:text-lg mb-2">Award-Winning Platform</h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Recognized as "Best Student Management Platform 2024" by EdTech Innovation Awards
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};