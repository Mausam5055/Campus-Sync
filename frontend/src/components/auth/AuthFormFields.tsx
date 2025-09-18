import React from 'react';
import { Link } from 'react-router-dom';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Chrome, 
  GraduationCap,
  ArrowRight
} from "lucide-react";

interface AuthFormFieldsProps {
  isSignUp: boolean;
  formStep: number;
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  collegeName: string;
  setCollegeName: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (value: boolean) => void;
  isLoading: boolean;
  nextStep: () => void;
  prevStep: () => void;
  isMobile?: boolean;
}

export const AuthFormFields: React.FC<AuthFormFieldsProps> = ({
  isSignUp,
  formStep,
  name,
  setName,
  email,
  setEmail,
  collegeName,
  setCollegeName,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  isLoading,
  nextStep,
  prevStep,
  isMobile = false
}) => {
  const inputClassName = isMobile 
    ? "pl-10 h-12 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:border-white/50"
    : "pl-10 h-12 transition-all focus:ring-2 focus:ring-primary/20";
    
  const iconClassName = isMobile 
    ? "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60"
    : "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground";
    
  const labelClassName = isMobile 
    ? "text-sm font-medium text-white"
    : "text-sm font-medium";

  if (isSignUp) {
    return (
      <>
        {/* Step 1: Personal Information */}
        {formStep === 1 && (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <div className="space-y-2">
              <Label htmlFor="name" className={labelClassName}>Full Name</Label>
              <div className="relative">
                <User className={iconClassName} />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClassName}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className={labelClassName}>Email Address</Label>
              <div className="relative">
                <Mail className={iconClassName} />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClassName}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="collegeName" className={labelClassName}>College/University</Label>
              <div className="relative">
                <GraduationCap className={iconClassName} />
                <Input
                  id="collegeName"
                  type="text"
                  placeholder="Enter your college or university"
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  className={inputClassName}
                  required
                />
              </div>
            </div>

            <Button 
              type="button" 
              onClick={nextStep}
              className={`w-full h-12 font-medium ${isMobile ? 'bg-white text-purple-600 hover:bg-white/90' : ''}`}
              disabled={!name || !email || !collegeName}
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Step 2: Security */}
        {formStep === 2 && (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <div className="space-y-2">
              <Label htmlFor="password" className={labelClassName}>Password</Label>
              <div className="relative">
                <Lock className={iconClassName} />
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${inputClassName} pr-10`}
                  required 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 ${isMobile ? 'text-white/60 hover:text-white' : 'text-muted-foreground hover:text-foreground'} transition-colors`}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className={labelClassName}>Confirm Password</Label>
              <div className="relative">
                <Lock className={iconClassName} />
                <Input 
                  id="confirmPassword" 
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`${inputClassName} pr-10`}
                  required 
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 ${isMobile ? 'text-white/60 hover:text-white' : 'text-muted-foreground hover:text-foreground'} transition-colors`}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className={`${isMobile ? 'flex gap-3 pt-2' : 'flex gap-3'}`}>
              <Button 
                type="button" 
                variant="outline"
                onClick={prevStep}
                className={`flex-1 h-12 ${isMobile ? 'bg-white/15 border-white/30 text-white hover:bg-white/25' : ''}`}
              >
                Back
              </Button>
              <Button 
                type="submit" 
                className={`flex-1 h-12 font-medium ${isMobile ? 'bg-white text-purple-600 hover:bg-white/90' : ''}`}
                disabled={isLoading || !password || !confirmPassword || password !== confirmPassword}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 border-2 ${isMobile ? 'border-purple-600/20 border-t-purple-600' : 'border-white/20 border-t-white'} rounded-full animate-spin`} />
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Login Form
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className={labelClassName}>Email Address</Label>
        <div className="relative">
          <Mail className={iconClassName} />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClassName}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className={labelClassName}>Password</Label>
          {isMobile && (
            <Link
              to="/forgot-password"
              className="text-xs text-blue-200 hover:text-white transition-colors"
            >
              Forgot password?
            </Link>
          )}
        </div>
        <div className="relative">
          <Lock className={iconClassName} />
          <Input 
            id="password" 
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${inputClassName} pr-10`}
            required 
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute right-3 top-1/2 -translate-y-1/2 ${isMobile ? 'text-white/60 hover:text-white' : 'text-muted-foreground hover:text-foreground'} transition-colors`}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <Button 
        type="submit" 
        className={`w-full h-12 font-medium ${isMobile ? 'bg-white text-purple-600 hover:bg-white/90' : ''}`}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 border-2 ${isMobile ? 'border-purple-600/20 border-t-purple-600' : 'border-white/20 border-t-white'} rounded-full animate-spin`} />
            Signing In...
          </div>
        ) : (
          "Sign In"
        )}
      </Button>
    </div>
  );
};

// Social Login Component
export const AuthSocialLogin: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  return (
    <>
      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <Separator className={`w-full ${isMobile ? 'bg-white/20' : ''}`} />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className={`bg-transparent px-2 ${isMobile ? 'text-white/60' : 'text-muted-foreground'}`}>
            Or continue with
          </span>
        </div>
      </div>

      {/* Social Login */}
      <Button 
        type="button"
        variant="outline" 
        className={`w-full h-12 font-medium ${isMobile ? 'bg-white/20 border-white/30 text-white hover:bg-white/30' : ''}`}
      >
        <Chrome className="mr-2 h-4 w-4" />
        Continue with Google
      </Button>
    </>
  );
};