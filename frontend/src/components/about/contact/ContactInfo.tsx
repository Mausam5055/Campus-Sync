import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";

export const ContactInfo = () => {
  return (
    <Card className="bg-gradient-to-br from-card via-card/95 to-muted/20 border border-border/50 overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold mb-4">Other Ways to Reach Us</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-sm sm:text-base">Email</p>
              <a href="mailto:support@campussync.com" className="text-xs sm:text-sm text-primary hover:underline break-all">support@campussync.com</a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <p className="font-medium text-sm sm:text-base">Phone</p>
              <a href="tel:+15551234567" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground">+1 (555) 123-4567</a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
