import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Clock, User, Heart, MessageCircle, Share2, ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    role: string;
  };
  publishedAt: string;
  readTime: number;
  category: string;
  tags: string[];
  imageUrl: string;
  likes: number;
  comments: number;
  featured?: boolean;
}

const Blog = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const { toast } = useToast();

  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "Mastering Time Management: The Ultimate Student Guide",
      excerpt: "Discover proven strategies to balance your academic workload, social life, and personal development. Learn how successful students manage their time effectively.",
      content: "Time management is crucial for academic success...",
      author: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
        role: "Academic Advisor"
      },
      publishedAt: "2024-01-15",
      readTime: 8,
      category: "Study Tips",
      tags: ["productivity", "time-management", "student-life"],
      imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800",
      likes: 342,
      comments: 28,
      featured: true
    },
    {
      id: "2",
      title: "The Science of Effective Note-Taking",
      excerpt: "Explore research-backed methods for taking notes that actually help you learn and retain information better.",
      content: "Effective note-taking is an art and science...",
      author: {
        name: "Dr. Michael Torres",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        role: "Psychology Professor"
      },
      publishedAt: "2024-01-12",
      readTime: 6,
      category: "Learning",
      tags: ["note-taking", "memory", "study-methods"],
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800",
      likes: 256,
      comments: 19
    },
    {
      id: "3",
      title: "Building Your Professional Network as a Student",
      excerpt: "Start building meaningful professional relationships early in your academic career with these practical networking strategies.",
      content: "Networking isn't just for professionals...",
      author: {
        name: "Emma Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        role: "Career Counselor"
      },
      publishedAt: "2024-01-10",
      readTime: 5,
      category: "Career",
      tags: ["networking", "career-development", "professional-skills"],
      imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800",
      likes: 189,
      comments: 15
    },
    {
      id: "4",
      title: "Mental Health and Academic Success",
      excerpt: "Understanding the connection between mental wellness and academic performance, plus practical tips for maintaining balance.",
      content: "Mental health is fundamental to academic success...",
      author: {
        name: "Dr. James Kim",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        role: "Counseling Psychologist"
      },
      publishedAt: "2024-01-08",
      readTime: 7,
      category: "Wellness",
      tags: ["mental-health", "wellness", "stress-management"],
      imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800",
      likes: 423,
      comments: 45
    },
    {
      id: "5",
      title: "Technology Tools Every Student Should Know",
      excerpt: "A comprehensive guide to digital tools and apps that can revolutionize your study experience and boost productivity.",
      content: "Technology can be a game-changer for students...",
      author: {
        name: "Alex Johnson",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
        role: "Tech Educator"
      },
      publishedAt: "2024-01-05",
      readTime: 9,
      category: "Technology",
      tags: ["technology", "productivity-tools", "digital-learning"],
      imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800",
      likes: 298,
      comments: 32
    },
    {
      id: "6",
      title: "Study Abroad: Making the Most of Your Experience",
      excerpt: "Essential tips for international students and those planning to study abroad, from cultural adaptation to academic success.",
      content: "Studying abroad is a transformative experience...",
      author: {
        name: "Maria Santos",
        avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150",
        role: "International Programs Coordinator"
      },
      publishedAt: "2024-01-03",
      readTime: 6,
      category: "International",
      tags: ["study-abroad", "international-education", "cultural-exchange"],
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
      likes: 167,
      comments: 21
    }
  ];

  const categories = ["All", "Study Tips", "Learning", "Career", "Wellness", "Technology", "International"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleLike = (postId: string) => {
    toast({
      title: "Liked!",
      description: "Thanks for the feedback on this post.",
    });
  };

  const handleShare = (postId: string, title: string) => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Post link has been copied to clipboard.",
      });
    }
  };

  const PostCard = ({ post, featured = false }: { post: BlogPost; featured?: boolean }) => (
    <Card className={`group cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 border-border/50 hover:border-primary/20 ${
      featured ? 'md:col-span-2 lg:col-span-3' : ''
    }`}>
      <div className={`${featured ? 'md:flex md:items-center' : ''}`}>
        <div className={`relative overflow-hidden ${featured ? 'md:w-1/2' : ''}`}>
          <img
            src={post.imageUrl}
            alt={post.title}
            className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
              featured ? 'h-64 md:h-80' : 'h-48'
            }`}
          />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
              {post.category}
            </Badge>
          </div>
        </div>
        <div className={`${featured ? 'md:w-1/2 md:p-8' : ''}`}>
          <CardHeader className={featured ? 'md:pb-6' : 'pb-6'}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm mb-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback className="text-xs font-medium">
                    {post.author.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="font-semibold text-foreground">{post.author.name}</span>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" />
                  <span className="font-medium">{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">{post.readTime} min read</span>
                </div>
              </div>
            </div>
            <CardTitle className={`group-hover:text-primary transition-colors duration-200 font-bold tracking-tight leading-tight ${
              featured ? 'text-2xl md:text-3xl' : 'text-xl'
            }`}>
              {post.title}
            </CardTitle>
          </CardHeader>
          <CardContent className={featured ? 'md:pt-0' : 'pt-0'}>
            <p className={`text-muted-foreground leading-relaxed mb-4 italic ${
              featured ? 'text-lg' : 'text-base'
            }`}>
              {post.excerpt}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs font-medium px-3 py-1">
                  #{tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <Button 
                variant="outline" 
                size="sm" 
                className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors font-medium"
                onClick={() => window.location.href = `/blog/${post.id}`}
              >
                Read More
              </Button>
              <div className="flex items-center gap-6 text-sm">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(post.id);
                  }}
                  className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors font-medium"
                >
                  <Heart className="w-4 h-4" />
                  <span>{post.likes}</span>
                </button>
                <div className="flex items-center gap-2 text-muted-foreground font-medium">
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.comments}</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare(post.id, post.title);
                  }}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );

  const trendingTopics = [
    "Study Techniques", "Time Management", "Career Development", 
    "Mental Health", "Technology Tools", "International Education"
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:pt-4 space-y-12">
        
        {/* Header Section - Hidden on desktop */}
        <div className="md:hidden text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Our Blog
          </h1>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="transition-all duration-200"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Post Section */}
        {featuredPost && selectedCategory === "All" && (
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-semibold">Featured Story</h2>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <PostCard post={featuredPost} featured={true} />
            </div>
          </section>
        )}

        {/* Latest Posts Grid */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">
            {selectedCategory === "All" ? "Latest Posts" : `${selectedCategory} Posts`}
          </h2>
          
          {/* First Row - 3 columns on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.slice(0, 3).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Second Row - 2 columns on desktop */}
          {filteredPosts.length > 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPosts.slice(3, 5).map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {/* Third Row - Back to 3 columns */}
          {filteredPosts.length > 5 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.slice(5).map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </section>

        {/* Trending Topics Sidebar */}
        <section className="bg-muted/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Trending Topics</h3>
          <div className="flex flex-wrap gap-2">
            {trendingTopics.map((topic, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {topic}
              </Badge>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-semibold mb-4">Stay Updated</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss our latest blog posts, study tips, and academic insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button className="sm:w-auto">
              Subscribe
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blog;