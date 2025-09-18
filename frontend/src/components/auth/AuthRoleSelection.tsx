import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, GraduationCap, UserCog, Users, Heart } from "lucide-react";

const userRoles = [
  {
    type: 'student' as const,
    title: 'Student',
    description: 'Access courses, assignments, and track your academic progress',
    icon: GraduationCap,
    color: 'bg-blue-500',
    features: ['Course Management', 'Grade Tracking', 'Study Materials', 'Academic Calendar']
  },
  {
    type: 'admin' as const,
    title: 'Administrator',
    description: 'Manage institutional operations and oversee all activities',
    icon: UserCog,
    color: 'bg-purple-500',
    features: ['User Management', 'System Analytics', 'Institution Settings', 'Reports & Insights']
  },
  {
    type: 'teacher' as const,
    title: 'Teacher',
    description: 'Manage classes, create assignments, and track student progress',
    icon: Users,
    color: 'bg-green-500',
    features: ['Class Management', 'Assignment Creation', 'Grade Students', 'Communication Tools']
  },
  {
    type: 'parent' as const,
    title: 'Parent/Guardian',
    description: 'Monitor your child\'s academic progress and stay connected',
    icon: Heart,
    color: 'bg-orange-500',
    features: ['Progress Monitoring', 'Teacher Communication', 'Event Updates', 'Academic Reports']
  }
];

interface AuthRoleSelectionProps {
  onRoleSelect: (role: 'student' | 'admin' | 'teacher' | 'parent') => void;
  isMobile?: boolean;
}

export const AuthRoleSelection: React.FC<AuthRoleSelectionProps> = ({ onRoleSelect, isMobile = false }) => {
  const navigate = useNavigate();

  if (isMobile) {
    return (
      <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto w-full">
        {userRoles.map((role) => (
          <button
            key={role.type}
            onClick={() => {
              if (role.type === 'parent') {
                navigate('/parent');
                return;
              }
              onRoleSelect(role.type);
            }}
            className="aspect-square w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/20 transition-all group flex flex-col items-center justify-center"
          >
            <div className={`w-12 h-12 ${role.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform mb-2`}>
              <role.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-white text-center">{role.title}</h3>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {userRoles.map((role) => (
        <button
          key={role.type}
          onClick={() => {
            if (role.type === 'parent') {
              navigate('/parent');
              return;
            }
            onRoleSelect(role.type);
          }}
          className="p-4 border rounded-xl text-left hover:bg-muted/50 transition-all group"
        >
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 ${role.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
              <role.icon className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-foreground mb-1">{role.title}</h4>
              <p className="text-sm text-muted-foreground mb-2">{role.description}</p>
              <div className="flex flex-wrap gap-1">
                {role.features.slice(0, 2).map((feature, idx) => (
                  <span key={idx} className="text-xs bg-muted px-2 py-1 rounded-full">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>
        </button>
      ))}
    </div>
  );
};

export { userRoles };