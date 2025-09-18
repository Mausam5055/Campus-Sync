import React from 'react';
import { ArrowLeft, GraduationCap } from "lucide-react";
import { AuthBackground } from "./AuthBackground";
import { AuthRoleSelection } from "./AuthRoleSelection";

interface AuthMobileRoleSelectionProps {
  onBack: () => void;
  onRoleSelect: (role: 'student' | 'admin' | 'teacher' | 'parent') => void;
}

export const AuthMobileRoleSelection: React.FC<AuthMobileRoleSelectionProps> = ({ 
  onBack, 
  onRoleSelect 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-purple-600 to-indigo-700 flex flex-col">
      <AuthBackground />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-6">
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>
        <div className="inline-flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <GraduationCap className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold text-white">CampusSync</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Choose Your Role</h1>
          <p className="text-blue-100">Select the option that best describes you</p>
        </div>

        <AuthRoleSelection onRoleSelect={onRoleSelect} isMobile={true} />
      </div>
    </div>
  );
};