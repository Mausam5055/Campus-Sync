import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Search, ExternalLink, BookOpen, Clock, Star, TrendingUp, Sparkles, Globe, ArrowRight } from "lucide-react";

interface WikipediaPage {
  pageid: number;
  title: string;
  extract: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
  pageimage?: string;
}

interface WikipediaSearchResult {
  title: string;
  pageid: number;
  snippet: string;
}

const Wikipedia = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<WikipediaSearchResult[]>([]);
  const [featuredArticles, setFeaturedArticles] = useState<WikipediaPage[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<WikipediaPage | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [activeTab, setActiveTab] = useState("search");
  const { toast } = useToast();

  // Student-focused topics for featured content
  const studentTopics = [
    "Computer Science", "Mathematics", "Physics", "Chemistry", "Biology",
    "Psychology", "History", "Literature", "Economics", "Philosophy"
  ];

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem("wikipedia-recent-searches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
    
    // Load featured articles on component mount
    loadFeaturedArticles();
  }, []);

  const loadFeaturedArticles = async () => {
    try {
      setLoadingFeatured(true);
      const randomTopics = studentTopics.sort(() => 0.5 - Math.random()).slice(0, 6);
      
      // Create mock featured articles since Wikipedia API has CORS restrictions
      const mockArticles = randomTopics.map((topic, index) => ({
        pageid: index + 1,
        title: topic,
        extract: getTopicDescription(topic),
        thumbnail: {
          source: `https://picsum.photos/200/150?random=${index}`,
          width: 200,
          height: 150
        }
      }));
      
      setFeaturedArticles(mockArticles);
    } catch (error) {
      console.error("Error loading featured articles:", error);
      toast({
        title: "Error",
        description: "Failed to load featured articles",
        variant: "destructive",
      });
    } finally {
      setLoadingFeatured(false);
    }
  };

  const getTopicDescription = (topic: string): string => {
    const descriptions: { [key: string]: string } = {
      "Computer Science": "The study of algorithmic processes, computational systems and the design of computer systems and their applications.",
      "Mathematics": "The abstract study of topics such as quantity, structure, space, and change using patterns, counting, and reasoning.",
      "Physics": "The natural science that studies matter, motion, energy, and the fundamental forces that govern the universe.",
      "Chemistry": "The scientific study of the properties and behavior of matter, including atomic and molecular composition.",
      "Biology": "The natural science concerned with the study of life and living organisms and their interactions.",
      "Psychology": "The scientific study of mind and behavior, including conscious and unconscious phenomena.",
      "History": "The study of past events, particularly in human affairs, through written records and evidence.",
      "Literature": "Written works, especially those considered of superior or lasting artistic merit and cultural significance.",
      "Economics": "The social science that studies the production, distribution, and consumption of goods and services.",
      "Philosophy": "The study of general and fundamental questions concerning existence, knowledge, values, and reason."
    };
    return descriptions[topic] || "An important academic subject for students to explore and understand.";
  };

  const searchWikipedia = async (query: string) => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      
      // Clear selected article when performing new search
      setSelectedArticle(null);
      
      // Since Wikipedia API has CORS restrictions, we'll create mock search results
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
      
      const mockResults = generateMockSearchResults(query);
      setSearchResults(mockResults);
      
      // Save to recent searches
      const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("wikipedia-recent-searches", JSON.stringify(updated));
      
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search Error",
        description: "Failed to search Wikipedia. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateMockSearchResults = (query: string): WikipediaSearchResult[] => {
    const baseResults = [
      {
        title: `${query}`,
        pageid: Math.floor(Math.random() * 100000),
        snippet: `A comprehensive overview of <span class="searchmatch">${query}</span> covering its fundamental concepts, historical background, and modern applications. This article provides essential information for students and researchers studying this topic.`
      },
      {
        title: `History of ${query}`,
        pageid: Math.floor(Math.random() * 100000),
        snippet: `The historical development and evolution of <span class="searchmatch">${query}</span> from its earliest origins through to contemporary understanding. Includes key milestones, influential figures, and significant discoveries.`
      },
      {
        title: `${query} in Education`,
        pageid: Math.floor(Math.random() * 100000),
        snippet: `How <span class="searchmatch">${query}</span> is taught and studied in academic institutions worldwide. Covers curriculum design, learning objectives, assessment methods, and educational resources.`
      },
      {
        title: `Types of ${query}`,
        pageid: Math.floor(Math.random() * 100000),
        snippet: `Different categories and classifications of <span class="searchmatch">${query}</span>, including their characteristics, applications, and distinguishing features used in academic and professional contexts.`
      },
      {
        title: `${query} Research Methods`,
        pageid: Math.floor(Math.random() * 100000),
        snippet: `Current research methodologies and approaches used in studying <span class="searchmatch">${query}</span>. Includes data collection techniques, analysis methods, and best practices for academic research.`
      },
      {
        title: `Applications of ${query}`,
        pageid: Math.floor(Math.random() * 100000),
        snippet: `Real-world applications and practical implementations of <span class="searchmatch">${query}</span> across various industries and fields. Examples include case studies and current usage scenarios.`
      }
    ];
    
    // Return 3-5 random results
    const shuffled = baseResults.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.max(3, Math.floor(Math.random() * 3) + 3));
  };

  const loadArticle = async (title: string) => {
    try {
      setLoading(true);
      
      // Create mock article content since Wikipedia API has CORS restrictions
      await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 700));
      
      const mockArticle: WikipediaPage = {
        pageid: Math.floor(Math.random() * 100000),
        title: title,
        extract: `This is a comprehensive article about ${title}. It covers the fundamental concepts, historical background, and modern applications relevant to students and researchers. The content includes detailed explanations of key principles, methodologies, and practical examples that demonstrate the importance of this topic in academic and professional contexts. Students will find this information valuable for their studies and research projects.`,
        thumbnail: {
          source: `https://picsum.photos/300/200?random=${Math.floor(Math.random() * 1000)}`,
          width: 300,
          height: 200
        }
      };
      
      setSelectedArticle(mockArticle);
      setActiveTab("results");
    } catch (error) {
      console.error("Error loading article:", error);
      toast({
        title: "Error",
        description: "Failed to load article",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchWikipedia(searchTerm);
    setActiveTab("results");
  };

  const ArticleCard = ({ article, onClick }: { article: WikipediaPage; onClick: () => void }) => (
    <Card 
      className="group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-0 bg-gradient-to-br from-background via-background to-background/50 backdrop-blur-sm overflow-hidden relative w-full h-full"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      
      <CardHeader className="pb-4 relative z-10">
        <div className="flex items-start gap-4">
          <div className="relative overflow-hidden rounded-xl flex-shrink-0">
            {article.thumbnail && (
              <img
                src={article.thumbnail.source}
                alt={article.title}
                className="w-20 h-20 object-cover transition-transform duration-500 group-hover:scale-110"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2 mb-3 break-words">
              {article.title}
            </CardTitle>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="text-xs font-medium bg-primary/10 text-primary border-primary/20">
                <BookOpen className="w-3 h-3 mr-1" />
                Featured Article
              </Badge>
              <Badge variant="outline" className="text-xs group-hover:bg-primary/10 group-hover:border-primary/30 group-hover:text-primary transition-all duration-300">
                <Sparkles className="w-3 h-3 mr-1" />
                Educational
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10 flex flex-col justify-between h-full">
        <CardDescription className="text-sm leading-relaxed line-clamp-3 mb-4 text-muted-foreground italic group-hover:text-foreground/80 transition-colors duration-300">
          {article.extract || "Discover comprehensive information about this fascinating topic..."}
        </CardDescription>
        <Button
          variant="ghost"
          size="sm"
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 border border-transparent group-hover:border-primary mt-auto"
        >
          <ArrowRight className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:translate-x-1" />
          Click to Explore
        </Button>
      </CardContent>
    </Card>
  );

  const SearchResultCard = ({ result }: { result: WikipediaSearchResult }) => (
    <Card 
      className="group cursor-pointer transition-all duration-500 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 bg-gradient-to-br from-background to-background/80 backdrop-blur-sm overflow-hidden relative w-full h-full"
      onClick={() => loadArticle(result.title)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardHeader className="pb-3 relative z-10">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold hover:text-primary transition-colors group-hover:text-primary line-clamp-2 flex-1 pr-4 break-words">
            {result.title}
          </CardTitle>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge variant="outline" className="text-xs bg-background/50 backdrop-blur-sm">
              <Globe className="w-3 h-3 mr-1" />
              Wiki
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 relative z-10 flex flex-col justify-between h-full">
        <div>
          <CardDescription 
            className="text-sm leading-relaxed line-clamp-4 mb-4 italic break-words"
            dangerouslySetInnerHTML={{ __html: result.snippet }}
          />
        </div>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
            Article #{result.pageid}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary/10 hover:text-primary"
            onClick={(e) => {
              e.stopPropagation();
              loadArticle(result.title);
            }}
          >
            <Search className="w-4 h-4 mr-1" />
            Read More
            <ArrowRight className="w-3 h-3 ml-1 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background">
      {/* Enhanced grid background pattern */}
      <div 
        className="fixed inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
          animation: 'float 20s ease-in-out infinite'
        }}
      />

      {/* Floating orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-3/4 w-24 h-24 bg-secondary/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 overflow-x-hidden">

        {/* Enhanced Search Section */}
        <Card className="mb-8 lg:mb-12 bg-gradient-to-br from-background/80 via-background to-background/80 backdrop-blur-md border border-border/50 shadow-2xl w-full max-w-none">
          <CardContent className="p-4 md:p-6 lg:p-8">
            <form onSubmit={handleSearch} className="space-y-4 md:space-y-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex flex-col sm:flex-row gap-3 w-full">
                  <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 md:w-5 md:h-5" />
                    <Input
                      placeholder="Search for topics, concepts, or subjects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 text-base md:text-lg bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300 rounded-lg"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={loading}
                    size="lg"
                    className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {loading ? (
                      <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    ) : (
                      <>
                        <Search className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                        <span className="hidden sm:inline">Search</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>

            {recentSearches.length > 0 && (
              <div className="mt-6 md:mt-8">
                <div className="flex items-center gap-2 mb-3 md:mb-4">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm font-medium text-muted-foreground">Recent Searches</p>
                </div>
                <div className="flex flex-wrap gap-2 w-full overflow-hidden">
                  {recentSearches.map((search, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all duration-300 px-3 py-2 text-xs md:text-sm flex-shrink-0"
                      onClick={() => {
                        setSearchTerm(search);
                        searchWikipedia(search);
                      }}
                    >
                      {search}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Featured Topics Section - Now below search */}
        {!selectedArticle && searchResults.length === 0 && (
          <div className="space-y-6 md:space-y-8 w-full">
            <div className="text-center space-y-3 md:space-y-4">
              <div className="flex items-center justify-center gap-2 text-primary mb-2">
                <Star className="w-5 h-5 md:w-6 md:h-6" />
                <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Featured Topics for Students
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
                Essential subjects every student should explore, curated for academic excellence
              </p>
            </div>

            {loadingFeatured ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 w-full">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm w-full">
                    <CardHeader className="space-y-4 p-4 md:p-6">
                      <div className="flex items-start gap-3 md:gap-4">
                        <Skeleton className="h-16 w-16 md:h-20 md:w-20 rounded-xl flex-shrink-0" />
                        <div className="space-y-2 flex-1 min-w-0">
                          <Skeleton className="h-5 md:h-6 w-3/4" />
                          <Skeleton className="h-3 md:h-4 w-1/2" />
                          <div className="flex gap-2">
                            <Skeleton className="h-5 md:h-6 w-12 md:w-16" />
                            <Skeleton className="h-5 md:h-6 w-16 md:w-20" />
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6 pt-0">
                      <Skeleton className="h-16 md:h-20 w-full mb-3 md:mb-4" />
                      <Skeleton className="h-8 md:h-10 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 w-full">
                {featuredArticles.map((article, index) => (
                  <div key={article.pageid} className="animate-fade-in w-full" style={{ animationDelay: `${index * 0.1}s` }}>
                    <ArticleCard
                      article={article}
                      onClick={() => loadArticle(article.title)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Search Results Section */}
        {selectedArticle && (
          <Card className="bg-gradient-to-br from-background/80 via-background to-background/80 backdrop-blur-md border border-border/50 shadow-2xl overflow-hidden w-full max-w-none">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            <CardHeader className="relative z-10 p-4 md:p-6 lg:p-8">
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6 w-full">
                {selectedArticle.thumbnail && (
                  <div className="relative overflow-hidden rounded-2xl mx-auto md:mx-0 flex-shrink-0">
                    <img
                      src={selectedArticle.thumbnail.source}
                      alt={selectedArticle.title}
                      className="w-24 h-24 md:w-32 md:h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                  </div>
                )}
                <div className="flex-1 space-y-3 md:space-y-4 text-center md:text-left min-w-0">
                  <CardTitle className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text break-words">
                    {selectedArticle.title}
                  </CardTitle>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs md:text-sm">
                      <BookOpen className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                      Wikipedia Article
                    </Badge>
                    <Badge variant="outline" className="bg-background/50 backdrop-blur-sm text-xs md:text-sm">
                      <Sparkles className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                      Educational
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-background/50 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/30 text-xs md:text-sm"
                      onClick={() => window.open(`https://en.wikipedia.org/wiki/${encodeURIComponent(selectedArticle.title)}`, '_blank')}
                    >
                      <ExternalLink className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                      View on Wikipedia
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6 lg:p-8 pt-0 relative z-10 w-full">
              <div className="prose prose-sm md:prose-lg max-w-none w-full">
                <p className="text-foreground/90 leading-relaxed text-sm md:text-base lg:text-lg italic break-words">
                  {selectedArticle.extract}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {searchResults.length > 0 && !selectedArticle && (
          <div className="space-y-4 md:space-y-6 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text break-words">
                  Search Results
                </h3>
                <p className="text-muted-foreground text-sm md:text-base lg:text-lg mt-1 md:mt-2">
                  Found {searchResults.length} article{searchResults.length !== 1 ? 's' : ''} related to your search
                </p>
              </div>
              <Badge variant="secondary" className="text-xs md:text-sm bg-primary/10 text-primary border-primary/20 w-fit flex-shrink-0">
                <TrendingUp className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                {searchResults.length} Results
              </Badge>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 w-full">
              {searchResults.map((result, index) => (
                <div key={result.pageid} className="animate-fade-in w-full" style={{ animationDelay: `${index * 0.1}s` }}>
                  <SearchResultCard result={result} />
                </div>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <Card className="bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-md border border-border/50 w-full max-w-none">
            <CardContent className="flex flex-col items-center justify-center py-8 md:py-12">
              <div className="relative">
                <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-10 h-10 md:w-12 md:h-12 border-4 border-transparent border-l-accent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
              </div>
              <span className="text-muted-foreground mt-3 md:mt-4 text-base md:text-lg font-medium">
                Searching knowledge base...
              </span>
              <div className="flex items-center gap-1 mt-2">
                <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-accent/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
        `
      }} />
    </div>
  );
};

export default Wikipedia;