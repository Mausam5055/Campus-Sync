import { Code, Lightbulb, Heart, Zap, Shield, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { HeroSection } from "@/components/about/HeroSection";
import { TeamSection } from "@/components/about/TeamSection";
import { FeaturesSection } from "@/components/about/FeaturesSection";
import { TestimonialsSection } from "@/components/about/TestimonialsSection";
import { ContactSection } from "@/components/about/ContactSection";
import { SEO } from "@/components/SEO";

const AboutUs = () => {
  const { toast } = useToast();

  const teamMembers = [
    {
      name: "Alex Chen",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      linkedin: "#"
    },
    {
      name: "Sarah Johnson",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b734?w=300&h=300&fit=crop&crop=face",
      linkedin: "#"
    },
    {
      name: "Marcus Rodriguez",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      linkedin: "#"
    },
    {
      name: "Elena Petrov",
      role: "UX Designer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      linkedin: "#"
    },
    {
      name: "James Wilson",
      role: "Product Manager",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face",
      linkedin: "#"
    },
    {
      name: "Priya Sharma",
      role: "Data Scientist",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
      linkedin: "#"
    }
  ];

  const features = [
    {
      icon: Code,
      title: "Built for Students",
      description: "Custom-built tools for academic success, designed by students for students with real-world needs in mind."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance ensures your academic tools are always ready when you need them most."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your academic data is protected with enterprise-grade security and privacy measures."
    },
    {
      icon: Globe,
      title: "Always Accessible",
      description: "Access your academic hub from anywhere, on any device, with seamless synchronization."
    },
    {
      icon: Lightbulb,
      title: "Smart Features",
      description: "AI-powered insights and automation to help you study smarter, not harder."
    },
    {
      icon: Heart,
      title: "Community Driven",
      description: "Built with feedback from thousands of students to create the perfect academic companion."
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Students" },
    { number: "50+", label: "Universities" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ];

  const testimonials = [
    {
      name: "Emily Chen",
      role: "Computer Science Student",
      university: "Stanford University",
      content: "CampusSync completely transformed how I manage my academic life. The integrated tools make everything so much easier!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b734?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Marcus Johnson",
      role: "Business Major",
      university: "Harvard University",
      content: "The best student platform I've ever used. It keeps me organized and helps me stay on top of all my assignments.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Sofia Rodriguez",
      role: "Engineering Student",
      university: "MIT",
      content: "Amazing platform! The grade calculator and timetable features are exactly what I needed for academic success.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "David Kim",
      role: "Pre-Med Student",
      university: "Johns Hopkins",
      content: "CampusSync's study tools and progress tracking have been game-changers for my medical school preparation.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Jessica Williams",
      role: "Liberal Arts Major",
      university: "Yale University",
      content: "Love how intuitive and comprehensive this platform is. It's like having a personal academic assistant!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Alex Thompson",
      role: "Graduate Student",
      university: "UC Berkeley",
      content: "The collaborative features and smart notifications keep me connected with my study groups effortlessly.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const faqs = [
    {
      question: "What is CampusSync?",
      answer: "CampusSync is a comprehensive student management platform designed to streamline academic life through integrated tools for scheduling, task management, grade tracking, and collaboration."
    },
    {
      question: "Is CampusSync free to use?",
      answer: "We offer a free tier with essential features for all students. Premium plans are available with advanced features for enhanced productivity and collaboration."
    },
    {
      question: "How secure is my data?",
      answer: "We use enterprise-grade security measures including end-to-end encryption, secure cloud storage, and regular security audits to protect your academic information."
    },
    {
      question: "Can I sync data across devices?",
      answer: "Yes! CampusSync automatically syncs your data across all your devices in real-time, ensuring you always have access to your latest information."
    },
    {
      question: "Do you offer customer support?",
      answer: "We provide 24/7 customer support through multiple channels including email, live chat, and our comprehensive help center."
    },
    {
      question: "How do I get started?",
      answer: "Simply sign up with your email address, verify your account, and start exploring our intuitive dashboard. We also offer guided tours for new users."
    }
  ];

  const handleContactSubmit = (formData: { name: string; email: string; subject: string; message: string }) => {
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden -mt-4 md:-mt-8">
      <SEO title="About Us" description="Learn about CampusSync’s mission, features, team, and student testimonials." />
      <HeroSection stats={stats} />
      <FeaturesSection features={features} />
      <TeamSection teamMembers={teamMembers} />
      <TestimonialsSection testimonials={testimonials} />
      <ContactSection onSubmit={handleContactSubmit} />
    </div>
  );
};

export default AboutUs;