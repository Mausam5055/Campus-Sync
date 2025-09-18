import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Send, User, Mail, MessageSquareText, Clock } from "lucide-react";
import { useState } from "react";

interface ContactFormProps {
  onSubmit: (formData: { name: string; email: string; subject: string; message: string }) => void;
}

export const ContactForm = ({ onSubmit }: ContactFormProps) => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-card via-card/95 to-muted/20 border border-border/50">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 blur-3xl" />

      <CardHeader className="pb-4 sm:pb-6 px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle className="text-base sm:text-lg lg:text-xl">Send us a Message</CardTitle>
            <CardDescription className="text-xs sm:text-sm lg:text-base">We’ll get back to you within 24 hours.</CardDescription>
          </div>
          <Badge variant="secondary" className="hidden sm:inline-flex items-center gap-1 text-xs">
            <Clock className="h-3 w-3" aria-hidden="true" />
            <span>Avg. response &lt; 24h</span>
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="px-4 sm:px-6">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs sm:text-sm font-medium">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="h-10 sm:h-11 text-sm pl-9"
                  required
                  aria-label="Full Name"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs sm:text-sm font-medium">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="h-10 sm:h-11 text-sm pl-9"
                  required
                  aria-label="Email Address"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-xs sm:text-sm font-medium">Subject</Label>
            <div className="relative">
              <MessageSquareText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="What’s this about?"
                className="h-10 sm:h-11 text-sm pl-9"
                required
                aria-label="Subject"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-xs sm:text-sm font-medium">Message</Label>
            <div className="relative">
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us how we can help you..."
                className="min-h-[100px] lg:min-h-[120px] resize-none text-sm pr-10"
                required
                aria-label="Message"
              />
              <Send className="absolute right-3 bottom-3 h-4 w-4 text-primary/60" aria-hidden="true" />
            </div>
          </div>

          <Button type="submit" className="w-full h-10 sm:h-11 text-xs sm:text-sm lg:text-base bg-gradient-to-r from-primary to-primary/70 text-primary-foreground hover:from-primary/90 hover:to-primary/60 transition-colors" size="lg" aria-label="Send Message">
            <Send className="mr-2 h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
