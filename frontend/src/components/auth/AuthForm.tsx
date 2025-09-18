import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, GraduationCap, Shield } from "lucide-react";
import { AuthFormFields, AuthSocialLogin } from "./AuthFormFields";
import { userRoles } from "./AuthRoleSelection";
import { AuthBackground } from "./AuthBackground";

interface AuthFormProps {
  isSignUp: boolean;
  setIsSignUp: (value: boolean) => void;
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
  selectedRole: 'student' | 'admin' | 'teacher' | 'parent' | null;
  setSelectedRole: (role: 'student' | 'admin' | 'teacher' | 'parent' | null) => void;
  onSubmit: (e: React.FormEvent) => void;
  nextStep: () => void;
  prevStep: () => void;
  isMobile?: boolean;
  onBack?: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  isSignUp,
  setIsSignUp,
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
  selectedRole,
  setSelectedRole,
  onSubmit,
  nextStep,
  prevStep,
  isMobile = false,
  onBack
}) => {
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-purple-600 to-indigo-700 flex flex-col">
        <AuthBackground />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between p-6">
          {isSignUp && formStep === 2 ? (
            <button 
              onClick={prevStep}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back
            </button>
          ) : (
            <button 
              onClick={onBack}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back
            </button>
          )}
          <div className="inline-flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <GraduationCap className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white">CampusSync</span>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-sm space-y-6">
            {/* Welcome */}
            <div className="text-center space-y-2 mb-8">
              {selectedRole && isSignUp && (
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className={`w-8 h-8 ${userRoles.find(r => r.type === selectedRole)?.color} rounded-lg flex items-center justify-center`}>
                    {userRoles.find(r => r.type === selectedRole)?.icon && 
                      React.createElement(userRoles.find(r => r.type === selectedRole)!.icon, { className: "h-4 w-4 text-white" })
                    }
                  </div>
                  <span className="text-sm text-white/80 font-medium">
                    {userRoles.find(r => r.type === selectedRole)?.title}
                  </span>
                </div>
              )}
              <h1 className="text-3xl font-bold text-white">
                {isSignUp ? "Create Account" : "Welcome Back"}
              </h1>
              <p className="text-blue-100">
                {isSignUp ? "Start your academic transformation today" : "Continue your learning journey"}
              </p>
              
              {/* Progress indicator for signup */}
              {isSignUp && (
                <div className="flex items-center justify-center gap-2 mt-4">
                  <div className={`w-3 h-3 rounded-full transition-colors ${formStep === 1 ? 'bg-white' : 'bg-white/30'}`} />
                  <div className={`w-3 h-3 rounded-full transition-colors ${formStep === 2 ? 'bg-white' : 'bg-white/30'}`} />
                </div>
              )}
            </div>

            {/* Form Card */}
            <Card className="border-0 shadow-xl bg-white/10 backdrop-blur-md">
              <CardContent className="p-6">
                <form onSubmit={onSubmit} className="space-y-4">
                  <AuthFormFields
                    isSignUp={isSignUp}
                    formStep={formStep}
                    name={name}
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                    collegeName={collegeName}
                    setCollegeName={setCollegeName}
                    password={password}
                    setPassword={setPassword}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    showConfirmPassword={showConfirmPassword}
                    setShowConfirmPassword={setShowConfirmPassword}
                    isLoading={isLoading}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    isMobile={true}
                  />

                  {/* Social Login - only show on step 1 for signup */}
                  {(!isSignUp || formStep === 1) && (
                    <AuthSocialLogin isMobile={true} />
                  )}
                </form>

                {/* Toggle to signup/login */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-white/80">
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                    <button
                      onClick={() => {
                        setIsSignUp(!isSignUp);
                        // Reset form step when switching modes
                        if (formStep === 2) {
                          // Will be handled by parent component
                        }
                      }}
                      className="font-medium text-blue-200 hover:text-white transition-colors"
                    >
                      {isSignUp ? "Sign in" : "Sign up"}
                    </button>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Terms for signup */}
            {isSignUp && (
              <p className="text-xs text-center text-white/60 px-4">
                By creating an account, you agree to our{" "}
                <Link to="/terms" className="underline hover:text-white transition-colors">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="underline hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </p>
            )}

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 pt-4">
              <Shield className="h-4 w-4 text-green-400" />
              <span className="text-xs text-white/60">256-bit SSL encryption</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop Form
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        {!selectedRole ? (
          <div className="text-center space-y-2">
            <h3 className="text-2xl lg:text-3xl font-bold tracking-tight">Choose Your Role</h3>
            <p className="text-muted-foreground">Select the option that best describes you</p>
          </div>
        ) : (
          <>
            {/* Role Header */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3">
                <div className={`w-12 h-12 ${userRoles.find(r => r.type === selectedRole)?.color} rounded-xl flex items-center justify-center`}>
                  {userRoles.find(r => r.type === selectedRole)?.icon && 
                    React.createElement(userRoles.find(r => r.type === selectedRole)!.icon, { className: "h-6 w-6 text-white" })
                  }
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold tracking-tight">
                    {userRoles.find(r => r.type === selectedRole)?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isSignUp ? "Create Account" : "Sign In"}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => {
                  setSelectedRole(null);
                  setIsSignUp(true);
                }}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Change Role
              </button>

              {isSignUp && (
                <div className="flex items-center justify-center gap-2">
                  <div className={`w-3 h-3 rounded-full transition-colors ${formStep === 1 ? 'bg-primary' : 'bg-muted'}`} />
                  <div className={`w-3 h-3 rounded-full transition-colors ${formStep === 2 ? 'bg-primary' : 'bg-muted'}`} />
                </div>
              )}
            </div>

            {/* Form Card */}
            <Card className="border-0 shadow-xl bg-card">
              <CardContent className="p-6">
                <form onSubmit={onSubmit} className="space-y-4">
                  <AuthFormFields
                    isSignUp={isSignUp}
                    formStep={formStep}
                    name={name}
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                    collegeName={collegeName}
                    setCollegeName={setCollegeName}
                    password={password}
                    setPassword={setPassword}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    showConfirmPassword={showConfirmPassword}
                    setShowConfirmPassword={setShowConfirmPassword}
                    isLoading={isLoading}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    isMobile={false}
                  />

                  {/* Social Login - only show on step 1 for signup */}
                  {(!isSignUp || formStep === 1) && (
                    <AuthSocialLogin isMobile={false} />
                  )}
                </form>

                {/* Toggle to signup/login */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                    <button
                      onClick={() => {
                        setIsSignUp(!isSignUp);
                        // Reset form step when switching modes
                        if (formStep === 2) {
                          // Will be handled by parent component
                        }
                      }}
                      className="font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      {isSignUp ? "Sign in" : "Sign up"}
                    </button>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Terms for signup */}
            {isSignUp && (
              <p className="text-xs text-center text-muted-foreground px-4">
                By creating an account, you agree to our{" "}
                <Link to="/terms" className="underline hover:text-foreground transition-colors">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="underline hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </p>
            )}

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 pt-4">
              <Shield className="h-4 w-4 text-green-400" />
              <span className="text-xs text-muted-foreground">256-bit SSL encryption</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};