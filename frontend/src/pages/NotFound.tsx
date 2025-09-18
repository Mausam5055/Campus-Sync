import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Search, BookOpen } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const quickLinks = [
    { title: "Dashboard", path: "/", icon: Home },
    { title: "Ask AI", path: "/ask-ai", icon: Search },
    { title: "My Courses", path: "/my-courses", icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* 404 Visual */}
        <div className="space-y-4">
          <div className="text-8xl font-bold text-primary/20 select-none">
            404
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              Page Not Found
            </h1>
            <p className="text-muted-foreground">
              Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={handleGoBack} variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          <Button onClick={handleGoHome} className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </div>

        {/* Quick Navigation Links */}
        <Card className="border-border/50">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">
              Quick Navigation
            </h3>
            <div className="grid gap-2">
              {quickLinks.map((link) => (
                <Button
                  key={link.path}
                  variant="ghost"
                  className="justify-start h-auto p-3 text-left"
                  onClick={() => navigate(link.path)}
                >
                  <link.icon className="h-4 w-4 mr-3 text-muted-foreground" />
                  <span>{link.title}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Path Info */}
        <div className="text-xs text-muted-foreground bg-muted/30 rounded-lg p-3">
          <span className="font-mono">
            Requested path: {location.pathname}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
