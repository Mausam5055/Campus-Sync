import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Clock, User, ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewsArticle {
  article_id: string;
  title: string;
  description: string;
  content: string;
  pubDate: string;
  source_name: string;
  source_url: string;
  image_url?: string;
  category: string[];
  creator?: string[];
}

interface NewsResponse {
  status: string;
  totalResults: number;
  results: NewsArticle[];
  nextPage?: string;
}

const NEWS_API_KEY = "pub_61c22b0388d74854b0e06ac54cbe8826";
const BASE_URL = "https://newsdata.io/api/1/news";

const newsCategories = [
  { id: "education", label: "Education", keywords: "education,university,student,college,learning" },
  { id: "technology", label: "Technology", keywords: "technology,tech,innovation,startup,AI,software" },
  { id: "science", label: "Science", keywords: "science,research,discovery,medicine,health" },
  { id: "business", label: "Business", keywords: "business,career,job,employment,internship" },
  { id: "world", label: "World News", keywords: "world,international,politics,global" },
  { id: "sports", label: "Sports", keywords: "sports,athletics,olympics,fitness" }
];

export default function News() {
  const [newsData, setNewsData] = useState<Record<string, NewsArticle[]>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [imageLoading, setImageLoading] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState("education");
  const { toast } = useToast();

  const fetchNews = async (category: typeof newsCategories[0]) => {
    setLoading(prev => ({ ...prev, [category.id]: true }));
    
    try {
      const params = new URLSearchParams({
        apikey: NEWS_API_KEY,
        q: category.keywords,
        language: "en",
        size: "10",
        category: category.id === "world" ? "top" : category.id,
        image: "1"
      });

      const response = await fetch(`${BASE_URL}?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: NewsResponse = await response.json();
      
      if (data.status === "success") {
        setNewsData(prev => ({
          ...prev,
          [category.id]: data.results || []
        }));
      } else {
        throw new Error("API returned error status");
      }
    } catch (error) {
      console.error(`Error fetching ${category.label} news:`, error);
      toast({
        title: "Error",
        description: `Failed to load ${category.label} news. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setLoading(prev => ({ ...prev, [category.id]: false }));
    }
  };

  useEffect(() => {
    // Load education news by default
    const educationCategory = newsCategories.find(cat => cat.id === "education");
    if (educationCategory) {
      fetchNews(educationCategory);
    }
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const category = newsCategories.find(cat => cat.id === value);
    if (category && !newsData[value]) {
      fetchNews(category);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return "Recent";
    }
  };

  const handleImageLoad = (articleId: string) => {
    setImageLoading(prev => ({ ...prev, [articleId]: false }));
  };

  const handleImageLoadStart = (articleId: string) => {
    setImageLoading(prev => ({ ...prev, [articleId]: true }));
  };

  const ArticleCard = ({ article }: { article: NewsArticle }) => (
    <Card className="group h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 border-border/50 hover:border-primary/20">
      <CardHeader className="pb-4 space-y-3">
        <div className="flex flex-wrap gap-2 mb-2">
          {article.category?.slice(0, 2).map((cat, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Badge>
          ))}
        </div>
        <CardTitle className="text-xl font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {article.title}
        </CardTitle>
        <CardDescription className="line-clamp-3 text-sm italic text-muted-foreground/80 leading-relaxed">
          "{article.description}"
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-4">
        {article.image_url && (
          <div className="relative mb-4 overflow-hidden rounded-lg bg-muted/30">
            {imageLoading[article.article_id] && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10">
                <div className="flex flex-col items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <span className="text-xs text-muted-foreground">Loading image...</span>
                </div>
              </div>
            )}
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-48 object-cover transition-all duration-300 group-hover:scale-105"
              loading="lazy"
              onLoadStart={() => handleImageLoadStart(article.article_id)}
              onLoad={() => handleImageLoad(article.article_id)}
              onError={() => handleImageLoad(article.article_id)}
            />
            {!article.image_url && (
              <div className="w-full h-48 bg-muted/30 flex items-center justify-center">
                <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
              </div>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between text-xs text-muted-foreground/70 border-t border-border/50 pt-3">
          <div className="flex items-center gap-2">
            <User className="h-3.5 w-3.5" />
            <span className="font-medium truncate max-w-[140px]">{article.source_name}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <time className="font-mono text-xs">{formatDate(article.pubDate)}</time>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200"
          onClick={() => window.open(article.source_url, '_blank')}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          <span className="font-medium">Read Full Article</span>
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen relative bg-background">
      <div className="space-y-6 p-4 sm:p-6">

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 w-full h-auto p-1 gap-1">
          {newsCategories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="text-[10px] xs:text-xs sm:text-sm py-2 px-1 h-auto whitespace-nowrap overflow-hidden"
            >
              <span className="truncate">{category.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {newsCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-6">
            <div className="flex justify-between items-center gap-4">
              <h2 className="text-xl sm:text-2xl font-semibold truncate">{category.label}</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchNews(category)}
                disabled={loading[category.id]}
                className="shrink-0"
              >
                <span className="text-xs sm:text-sm">
                  {loading[category.id] ? "Loading..." : "Refresh"}
                </span>
              </Button>
            </div>

            {loading[category.id] ? (
              <div className="grid gap-4 grid-cols-1 sm:gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="h-80">
                    <CardHeader>
                      <div className="animate-pulse space-y-3">
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                        <div className="h-4 bg-muted rounded w-1/2"></div>
                        <div className="h-20 bg-muted rounded"></div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            ) : newsData[category.id]?.length > 0 ? (
              <div className="grid gap-4 grid-cols-1 sm:gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {newsData[category.id].map((article) => (
                  <ArticleCard key={article.article_id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No articles found in this category. Try refreshing or check back later.
                </p>
              </div>
            )}
          </TabsContent>
        ))}
        </Tabs>
      </div>
    </div>
  );
}