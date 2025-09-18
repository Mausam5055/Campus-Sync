import { Badge } from "@/components/ui/badge";
import { MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/about/contact/ContactForm";
import { ContactInfo } from "@/components/about/contact/ContactInfo";
import { FAQPreview } from "@/components/about/contact/FAQPreview";
interface ContactSectionProps {
  onSubmit: (formData: { name: string; email: string; subject: string; message: string }) => void;
}

export const ContactSection = ({ onSubmit }: ContactSectionProps) => {
  // Form state handled in ContactForm
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-background to-muted/20 px-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-8 sm:mb-12">
          <div className="flex justify-center">
            <Badge variant="outline" className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30 backdrop-blur-sm text-xs sm:text-sm px-3 py-1" aria-label="Contact us badge">
              <MessageCircle className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Contact Us
            </Badge>
          </div>
          
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-black tracking-tighter px-4 sm:px-0 text-center">
                Get in{" "}
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent drop-shadow-sm">
                  Touch
                </span>
              </h2>
              
              {/* Contact-themed decorative separator */}
              <div className="flex items-center justify-center gap-3">
                <MessageCircle className="h-3 w-3 text-primary/40" />
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
                <div className="w-2 h-2 rounded-full bg-primary/50"></div>
                <div className="h-px w-16 bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30"></div>
                <div className="w-2 h-2 rounded-full bg-primary/50"></div>
                <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
                <MessageCircle className="h-3 w-3 text-primary/40" />
              </div>
            </div>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground/90 max-w-3xl lg:max-w-5xl mx-auto leading-relaxed md:leading-9 lg:leading-10 px-4 sm:px-0 font-normal tracking-normal text-center">
              Have questions or need support? We're here to help you make the most of your <em className="text-primary/90 not-italic font-semibold">academic journey</em>.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          <ContactForm onSubmit={onSubmit} />

          <div className="space-y-4 sm:space-y-6 mt-6 lg:mt-0">
            <ContactInfo />
            <FAQPreview />
          </div>
        </div>
      </div>
    </section>
  );
};