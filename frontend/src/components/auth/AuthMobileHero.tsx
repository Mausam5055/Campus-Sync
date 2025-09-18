import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  ArrowRight,
  CheckCircle,
  Shield,
  Zap,
  Globe
} from "lucide-react";
import { AuthBackground } from "./AuthBackground";

const features = [
  { icon: CheckCircle, text: "Track academic progress seamlessly", color: "text-green-500" },
  { icon: Globe, text: "Connect with students worldwide", color: "text-blue-500" },
  { icon: Zap, text: "AI-powered study recommendations", color: "text-yellow-500" },
  { icon: Shield, text: "Secure & privacy-focused platform", color: "text-purple-500" }
];

interface AuthMobileHeroProps {
  onGetStarted: () => void;
}

export const AuthMobileHero: React.FC<AuthMobileHeroProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-purple-600 to-indigo-700 flex flex-col">
      <AuthBackground />
      
      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 py-12">
        {/* Brand Identity */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-white font-serif tracking-tight">CampusSync</h1>
              <p className="text-xs text-blue-200 font-medium tracking-wide">Academic Excellence Platform</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-white/15 text-white border-white/20 backdrop-blur-md px-4 py-2 font-medium shadow-lg">
            Trusted by 50,000+ students worldwide
          </Badge>
        </div>

        {/* Hero Message */}
        <div className="text-center mb-16 space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white leading-[1.1] tracking-tight">
              Transform Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-orange-200 to-pink-200">
                Academic Journey
              </span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mx-auto"></div>
          </div>
          
          <p className="text-lg text-blue-50 leading-relaxed font-light max-w-sm mx-auto tracking-wide">
            Join thousands of students who've revolutionized their academic experience with our 
            <span className="font-medium text-white"> comprehensive ecosystem</span>.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 mb-16">
          <Button 
            onClick={onGetStarted}
            className="w-full h-14 text-lg font-semibold bg-white text-purple-600 hover:bg-white/90 transition-all shadow-xl"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Key Features */}
        <div className="space-y-4 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-4 text-white group">
              <div className="w-12 h-12 bg-white/15 backdrop-blur-md rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 shadow-lg">
                <feature.icon className="h-5 w-5 text-white" />
              </div>
              <span className="font-medium text-base tracking-wide">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
          <div className="text-center group">
            <div className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">50K+</div>
            <div className="text-xs text-blue-200 font-medium tracking-wide uppercase">Active Students</div>
          </div>
          <div className="text-center group">
            <div className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">98%</div>
            <div className="text-xs text-blue-200 font-medium tracking-wide uppercase">Satisfaction Rate</div>
          </div>
          <div className="text-center group">
            <div className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
            <div className="text-xs text-blue-200 font-medium tracking-wide uppercase">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};