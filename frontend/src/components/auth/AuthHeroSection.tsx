import React from 'react';
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
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

export const AuthHeroSection: React.FC = () => {
  return (
    <div className="relative lg:w-1/2 bg-gradient-to-br from-primary via-purple-600 to-indigo-700 flex flex-col justify-start px-8 lg:px-16 py-8 lg:py-16 overflow-hidden">
      <AuthBackground />
      
      {/* Content */}
      <div className="relative z-10 max-w-2xl">
        {/* Brand Identity */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl lg:text-4xl font-bold text-white font-serif tracking-tight">CampusSync</h1>
              <p className="text-sm text-blue-200 font-medium tracking-wide">Academic Excellence Platform</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-white/15 text-white border-white/20 backdrop-blur-md px-4 py-2 font-medium shadow-lg">
            Trusted by 50,000+ students worldwide
          </Badge>
        </div>

        {/* Hero Message */}
        <div className="mb-16 space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-6xl font-serif font-bold text-white leading-[1.1] tracking-tight">
              Transform Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-orange-200 to-pink-200">
                Academic Journey
              </span>
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
          </div>
          
          <p className="text-lg lg:text-xl text-blue-50 leading-relaxed font-light max-w-2xl tracking-wide">
            Join thousands of students who've revolutionized their academic experience with our 
            <span className="font-medium text-white"> comprehensive ecosystem</span> of learning tools.
          </p>
        </div>

        {/* Key Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3 group">
              <div className="w-10 h-10 bg-white/15 backdrop-blur-md rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 shadow-lg">
                <feature.icon className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <span className="text-white font-medium text-sm leading-relaxed tracking-wide">{feature.text}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center group">
            <div className="text-2xl lg:text-3xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">50K+</div>
            <div className="text-xs text-blue-200 font-medium tracking-wide uppercase">Active Students</div>
          </div>
          <div className="text-center group">
            <div className="text-2xl lg:text-3xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">98%</div>
            <div className="text-xs text-blue-200 font-medium tracking-wide uppercase">Satisfaction Rate</div>
          </div>
          <div className="text-center group">
            <div className="text-2xl lg:text-3xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">24/7</div>
            <div className="text-xs text-blue-200 font-medium tracking-wide uppercase">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};