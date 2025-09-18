import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  CalendarDays, 
  Clock, 
  Heart, 
  MessageCircle, 
  Share2, 
  ArrowLeft,
  BookOpen,
  Quote,
  Target,
  Users,
  TrendingUp,
  Lightbulb
} from "lucide-react";
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
    bio?: string;
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

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Sample expanded blog data
  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "Mastering Time Management: The Ultimate Student Guide",
      excerpt: "Discover proven strategies to balance your academic workload, social life, and personal development. Learn how successful students manage their time effectively.",
      content: `
        <p>Time management is one of the most crucial skills every student must master to achieve academic success and maintain a healthy work-life balance. In today's fast-paced academic environment, students are constantly juggling multiple responsibilities – from attending lectures and completing assignments to participating in extracurricular activities and maintaining social relationships.</p>

        <h2>Understanding the Time Management Challenge</h2>
        <p>The modern student faces unprecedented challenges when it comes to managing time effectively. With digital distractions at every turn and an increasingly competitive academic landscape, developing strong time management skills has become more important than ever.</p>

        <blockquote>
          "Time is what we want most, but what we use worst." - William Penn
        </blockquote>

        <h2>The Foundation: Planning and Prioritization</h2>
        <p>Effective time management begins with thorough planning and smart prioritization. Here are the fundamental strategies that successful students employ:</p>

        <h3>1. The Eisenhower Matrix</h3>
        <p>This powerful tool helps you categorize tasks based on their urgency and importance:</p>
        <ul>
          <li><strong>Urgent and Important:</strong> Crisis situations, deadline-driven projects</li>
          <li><strong>Important but Not Urgent:</strong> Long-term planning, skill development</li>
          <li><strong>Urgent but Not Important:</strong> Interruptions, some emails</li>
          <li><strong>Neither Urgent nor Important:</strong> Time wasters, excessive social media</li>
        </ul>

        <h3>2. Time Blocking Technique</h3>
        <p>Allocate specific time blocks for different activities throughout your day. This method helps create structure and ensures that important tasks receive adequate attention.</p>

        <h2>Digital Tools for Modern Students</h2>
        <p>Leverage technology to enhance your time management capabilities:</p>
        <ul>
          <li><strong>Calendar Apps:</strong> Google Calendar, Apple Calendar for scheduling</li>
          <li><strong>Task Management:</strong> Todoist, Any.do for organizing to-dos</li>
          <li><strong>Focus Apps:</strong> Forest, Freedom for minimizing distractions</li>
          <li><strong>Note-taking:</strong> Notion, Obsidian for organizing information</li>
        </ul>

        <h2>Building Sustainable Habits</h2>
        <p>Remember that effective time management is not about perfection – it's about creating sustainable systems that work for your unique lifestyle and academic demands. Start small, be consistent, and gradually build upon your successes.</p>

        <p>The journey to mastering time management is ongoing, but with the right strategies and mindset, you can transform your academic experience and set yourself up for long-term success.</p>
      `,
      author: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
        role: "Academic Advisor",
        bio: "Sarah is a certified academic advisor with over 8 years of experience helping students achieve their educational goals. She specializes in study strategies and time management techniques."
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
      content: `
        <p>Note-taking is far more than just recording information – it's an active learning process that can significantly impact your academic performance. Research in cognitive psychology has revealed fascinating insights about how different note-taking methods affect comprehension and retention.</p>

        <h2>The Neuroscience Behind Note-Taking</h2>
        <p>When we take notes by hand, our brain engages in a process called "encoding," which helps transfer information from short-term to long-term memory. This process is more active than passive listening and leads to better understanding and recall.</p>

        <blockquote>
          "I never learn anything talking. I only learn things when I ask questions." - Lou Holtz
        </blockquote>

        <h2>Research-Backed Methods</h2>
        
        <h3>The Cornell Note-Taking System</h3>
        <p>Developed at Cornell University, this method divides your page into three sections:</p>
        <ul>
          <li><strong>Notes:</strong> Main content area for lecture notes</li>
          <li><strong>Cues:</strong> Keywords and questions in the left margin</li>
          <li><strong>Summary:</strong> Bottom section for key takeaways</li>
        </ul>

        <h3>Mind Mapping</h3>
        <p>Visual learners benefit from creating mind maps that connect concepts through branches and nodes. This method is particularly effective for:</p>
        <ul>
          <li>Brainstorming sessions</li>
          <li>Complex topic analysis</li>
          <li>Review and memorization</li>
        </ul>

        <h2>Digital vs. Handwritten Notes</h2>
        <p>While digital tools offer convenience and searchability, research suggests that handwritten notes often lead to better comprehension and retention. The slower pace of handwriting forces you to process and synthesize information more actively.</p>

        <h2>Optimization Strategies</h2>
        <p>To maximize the effectiveness of your note-taking:</p>
        <ul>
          <li>Review and revise notes within 24 hours</li>
          <li>Use abbreviations and symbols for efficiency</li>
          <li>Incorporate visual elements like diagrams and charts</li>
          <li>Connect new information to previously learned concepts</li>
        </ul>

        <p>Remember, the best note-taking method is the one that works for your learning style and the specific context of your studies. Experiment with different approaches and adapt them to your needs.</p>
      `,
      author: {
        name: "Dr. Michael Torres",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        role: "Psychology Professor",
        bio: "Dr. Torres is a cognitive psychology professor who has published extensively on learning strategies and memory techniques. He holds a PhD from Stanford University."
      },
      publishedAt: "2024-01-12",
      readTime: 6,
      category: "Learning",
      tags: ["note-taking", "memory", "study-methods"],
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800",
      likes: 256,
      comments: 19
    },
    // Add more detailed blog posts here...
  ];

  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Blog Post Not Found</h1>
          <Button onClick={() => navigate("/blog")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleLike = () => {
    toast({
      title: "Liked!",
      description: "Thanks for the feedback on this post.",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
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

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate("/blog")}
          className="hover:bg-muted mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>

        {/* Hero Image */}
        <div className="relative overflow-hidden rounded-2xl mb-8">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6">
            <Badge variant="secondary" className="bg-primary/90 text-primary-foreground mb-4">
              {post.category}
            </Badge>
          </div>
        </div>

        {/* Article Header */}
        <div className="space-y-6 mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-muted-foreground italic leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author Info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback className="text-sm font-medium">
                  {post.author.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">{post.author.name}</h3>
                <p className="text-sm text-muted-foreground">{post.author.role}</p>
                {post.author.bio && (
                  <p className="text-sm text-muted-foreground mt-1 max-w-md">
                    {post.author.bio}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex flex-col sm:items-end gap-3 text-sm">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarDays className="w-4 h-4" />
                  <span className="font-medium">{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">{post.readTime} min read</span>
                </div>
              </div>
              
              {/* Engagement Stats */}
              <div className="flex items-center gap-6">
                <button 
                  onClick={handleLike}
                  className="flex items-center gap-2 hover:text-red-500 transition-colors font-medium"
                >
                  <Heart className="w-4 h-4" />
                  <span>{post.likes}</span>
                </button>
                <div className="flex items-center gap-2 text-muted-foreground font-medium">
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.comments}</span>
                </div>
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-2 hover:text-primary transition-colors font-medium"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content - Full Width */}
        <Card className="border-0 shadow-sm bg-card/50 mb-8">
          <CardContent className="p-6 sm:p-8 md:p-12 lg:p-16">
            <article 
              className="prose prose-lg sm:prose-xl max-w-none
                prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground prose-headings:scroll-mt-20
                prose-h1:text-3xl sm:prose-h1:text-4xl prose-h1:mb-6 sm:prose-h1:mb-8 prose-h1:mt-0 prose-h1:leading-tight
                prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-12 sm:prose-h2:mt-16 prose-h2:mb-6 sm:prose-h2:mb-8 prose-h2:border-b prose-h2:border-border/30 prose-h2:pb-3 sm:prose-h2:pb-4 prose-h2:leading-tight
                prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-8 sm:prose-h3:mt-12 prose-h3:mb-4 sm:prose-h3:mb-6 prose-h3:leading-tight
                prose-h4:text-lg sm:prose-h4:text-xl prose-h4:mt-6 sm:prose-h4:mt-8 prose-h4:mb-3 sm:prose-h4:mb-4 prose-h4:font-semibold
                prose-p:text-base sm:prose-p:text-lg prose-p:leading-7 sm:prose-p:leading-8 prose-p:mb-6 sm:prose-p:mb-8 prose-p:text-foreground/90 prose-p:text-justify
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 sm:prose-blockquote:pl-8 prose-blockquote:py-4 sm:prose-blockquote:py-6 prose-blockquote:italic prose-blockquote:text-lg sm:prose-blockquote:text-xl prose-blockquote:my-8 sm:prose-blockquote:my-12 prose-blockquote:bg-muted/20 prose-blockquote:rounded-r-lg prose-blockquote:shadow-sm
                prose-ul:my-6 sm:prose-ul:my-8 prose-ul:space-y-2 sm:prose-ul:space-y-3 prose-ul:pl-6
                prose-ol:my-6 sm:prose-ol:my-8 prose-ol:space-y-2 sm:prose-ol:space-y-3 prose-ol:pl-6
                prose-li:text-base sm:prose-li:text-lg prose-li:leading-7 sm:prose-li:leading-8 prose-li:mb-2 sm:prose-li:mb-3 prose-li:pl-2
                prose-strong:font-semibold prose-strong:text-foreground
                prose-em:italic prose-em:text-foreground/80
                prose-code:bg-muted/80 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:border
                prose-pre:bg-muted/50 prose-pre:border prose-pre:rounded-lg prose-pre:p-4
                prose-a:text-primary prose-a:underline-offset-4 prose-a:decoration-2 prose-a:transition-colors hover:prose-a:text-primary/80
                prose-img:rounded-lg prose-img:shadow-md prose-img:my-8
                prose-table:border-collapse prose-table:border prose-table:border-border
                prose-th:border prose-th:border-border prose-th:bg-muted/50 prose-th:p-3 prose-th:text-left prose-th:font-semibold
                prose-td:border prose-td:border-border prose-td:p-3
                dark:prose-invert dark:prose-blockquote:bg-muted/10"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </CardContent>
        </Card>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-sm">
              #{tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;