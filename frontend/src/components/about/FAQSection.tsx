import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export const FAQSection = ({ faqs }: FAQSectionProps) => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="mx-auto max-w-4xl px-4">
        <div className="text-center space-y-4 md:space-y-6 mb-8 md:mb-12">
          <Badge variant="outline" className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30 backdrop-blur-sm">
            <HelpCircle className="mr-2 h-4 w-4" />
            Frequently Asked Questions
          </Badge>
          
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-serif font-black tracking-tighter text-center">
                Got{" "}
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent drop-shadow-sm">
                  Questions?
                </span>
              </h2>
              
              {/* FAQ-themed decorative separator */}
              <div className="flex items-center justify-center gap-2">
                <HelpCircle className="h-3 w-3 text-primary/40" />
                <div className="h-px w-6 bg-gradient-to-r from-transparent to-primary/30"></div>
                <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-primary/60"></div>
                  <div className="w-1 h-1 rounded-full bg-primary/40"></div>
                  <div className="w-1 h-1 rounded-full bg-primary/60"></div>
                </div>
                <div className="h-px w-12 bg-primary/30"></div>
                <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-primary/60"></div>
                  <div className="w-1 h-1 rounded-full bg-primary/40"></div>
                  <div className="w-1 h-1 rounded-full bg-primary/60"></div>
                </div>
                <div className="h-px w-6 bg-gradient-to-l from-transparent to-primary/30"></div>
                <HelpCircle className="h-3 w-3 text-primary/40" />
              </div>
            </div>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground/90 max-w-3xl lg:max-w-5xl mx-auto leading-relaxed md:leading-9 lg:leading-10 font-normal tracking-normal text-center">
              Find answers to <span className="font-semibold text-foreground/90">common questions</span> about CampusSync and how it can <em className="text-primary/90 not-italic font-semibold">enhance</em> your academic experience.
            </p>
          </div>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border rounded-lg px-6 py-2 bg-gradient-to-br from-card via-card/95 to-muted/20 hover:shadow-md transition-all duration-300"
            >
              <AccordionTrigger className="text-left hover:text-primary transition-colors duration-300">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};