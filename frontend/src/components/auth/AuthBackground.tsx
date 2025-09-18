import React from 'react';

interface AuthBackgroundProps {
  className?: string;
}

export const AuthBackground: React.FC<AuthBackgroundProps> = ({ className = "" }) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* Professional gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-white/5"></div>
      
      {/* Geometric patterns for depth */}
      <div className="absolute inset-0 opacity-30 lg:opacity-40">
        <div className="absolute top-20 right-10 lg:right-20 w-64 lg:w-80 h-64 lg:h-80 bg-white/8 lg:bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 lg:bottom-32 left-10 lg:left-16 w-48 lg:w-64 h-48 lg:h-64 bg-yellow-200/10 lg:bg-yellow-200/8 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 lg:w-96 h-80 lg:h-96 bg-purple-300/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(45deg,transparent_35%,rgba(255,255,255,0.1)_50%,transparent_65%)] bg-[length:16px_16px] lg:bg-[length:20px_20px]"></div>
    </div>
  );
};