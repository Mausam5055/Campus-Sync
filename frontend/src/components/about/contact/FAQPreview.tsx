import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, ChevronDown } from "lucide-react";

export const FAQPreview = () => {
  return (
    <Card className="bg-gradient-to-br from-card via-card/95 to-muted/20 border border-border/50">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" aria-hidden="true" />
          <h3 className="text-base sm:text-lg font-semibold">Frequently Asked Questions</h3>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground mb-4">Quick answers to common questions about CampusSync.</p>

        <div className="space-y-3">
          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer text-xs sm:text-sm font-medium py-2 hover:text-primary transition-colors">
              <span className="flex-1 pr-2">What is CampusSync?</span>
              <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 group-open:rotate-180 transition-transform flex-shrink-0" aria-hidden="true" />
            </summary>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 pl-4 border-l-2 border-border leading-relaxed">
              CampusSync is a comprehensive student management platform designed to streamline academic life.
            </p>
          </details>

          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer text-xs sm:text-sm font-medium py-2 hover:text-primary transition-colors">
              <span className="flex-1 pr-2">Is CampusSync free to use?</span>
              <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 group-open:rotate-180 transition-transform flex-shrink-0" aria-hidden="true" />
            </summary>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 pl-4 border-l-2 border-border leading-relaxed">
              We offer a free tier with essential features. Premium plans are available for advanced features.
            </p>
          </details>

          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer text-xs sm:text-sm font-medium py-2 hover:text-primary transition-colors">
              <span className="flex-1 pr-2">How secure is my data?</span>
              <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 group-open:rotate-180 transition-transform flex-shrink-0" aria-hidden="true" />
            </summary>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 pl-4 border-l-2 border-border leading-relaxed">
              We use enterprise-grade security measures including end-to-end encryption.
            </p>
          </details>
        </div>

        <div className="mt-6 pt-4 border-t border-border/50">
          <p className="text-xs sm:text-sm text-muted-foreground text-center mb-3">Can't find what you're looking for?</p>
          <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm">Contact Support</Button>
        </div>
      </CardContent>
    </Card>
  );
};
