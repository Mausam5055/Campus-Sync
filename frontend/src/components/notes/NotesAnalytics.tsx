import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Calendar, 
  Clock, 
  BookOpen, 
  Target, 
  Brain,
  Star,
  Tag,
  BarChart3,
  PieChart
} from "lucide-react";

interface NotesAnalyticsProps {
  notes: any[];
}

export const NotesAnalytics = ({ notes }: NotesAnalyticsProps) => {
  const getAnalytics = () => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const notesThisWeek = notes.filter(note => 
      new Date(note.createdAt) >= oneWeekAgo
    ).length;

    const notesThisMonth = notes.filter(note => 
      new Date(note.createdAt) >= oneMonthAgo
    ).length;

    const categoryCounts = notes.reduce((acc, note) => {
      acc[note.category] = (acc[note.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topCategory = Object.entries(categoryCounts)
      .sort(([,a], [,b]) => (b as number) - (a as number))[0];

    const priorityCounts = notes.reduce((acc, note) => {
      acc[note.priority || 'medium'] = (acc[note.priority || 'medium'] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const totalWords = notes.reduce((sum, note) => sum + (note.wordCount || 0), 0);
    const avgWordsPerNote = notes.length > 0 ? Math.round(totalWords / notes.length) : 0;

    const favoriteNotes = notes.filter(note => note.favorite).length;
    const favoritePercentage = notes.length > 0 ? (favoriteNotes / notes.length) * 100 : 0;

    const allTags = notes.flatMap(note => note.tags || []);
    const tagCounts = allTags.reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topTags = Object.entries(tagCounts)
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 5);

    return {
      notesThisWeek,
      notesThisMonth,
      categoryCounts,
      topCategory,
      priorityCounts,
      totalWords,
      avgWordsPerNote,
      favoriteNotes,
      favoritePercentage,
      topTags
    };
  };

  const analytics = getAnalytics();

  const priorityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
    urgent: "bg-purple-100 text-purple-800"
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Notes Analytics
        </h3>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.notesThisWeek}</div>
            <p className="text-xs text-muted-foreground">notes created</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.notesThisMonth}</div>
            <p className="text-xs text-muted-foreground">notes created</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Total Words
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalWords.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">across all notes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Target className="h-4 w-4" />
              Avg Length
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.avgWordsPerNote}</div>
            <p className="text-xs text-muted-foreground">words per note</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(analytics.categoryCounts)
                .sort(([,a], [,b]) => (b as number) - (a as number))
                .map(([category, count]) => {
                  const percentage = ((count as number) / notes.length) * 100;
                  return (
                    <div key={category} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{category}</span>
                        <span className="text-muted-foreground">{count as number} notes</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>

        {/* Priority Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Priority Levels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(analytics.priorityCounts)
                .sort(([,a], [,b]) => (b as number) - (a as number))
                .map(([priority, count]) => {
                  const percentage = ((count as number) / notes.length) * 100;
                  return (
                    <div key={priority} className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                          <Badge className={priorityColors[priority as keyof typeof priorityColors]}>
                            {priority.charAt(0).toUpperCase() + priority.slice(1)}
                          </Badge>
                        </div>
                        <span className="text-muted-foreground">{count as number} notes</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Favorites and Top Tags */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Favorites
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Favorite Notes</span>
                <span className="text-2xl font-bold">{analytics.favoriteNotes}</span>
              </div>
              <Progress value={analytics.favoritePercentage} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {analytics.favoritePercentage.toFixed(1)}% of your notes are favorites
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Top Tags
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analytics.topTags.length > 0 ? (
                analytics.topTags.map(([tag, count], index) => (
                  <div key={tag} className="flex justify-between items-center">
                    <Badge variant="outline">#{tag}</Badge>
                    <span className="text-sm text-muted-foreground">{count as number} notes</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No tags used yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Study Insights */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Brain className="h-5 w-5" />
            Study Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Most Active Category:</h4>
              <p>{analytics.topCategory ? analytics.topCategory[0] : "No notes yet"}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Study Recommendation:</h4>
              <p>
                {analytics.favoritePercentage > 50 
                  ? "Great! You're actively marking important notes as favorites."
                  : "Consider marking key notes as favorites for quick review."
                }
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Writing Habit:</h4>
              <p>
                {analytics.avgWordsPerNote > 200 
                  ? "You write detailed notes - excellent for comprehensive learning!"
                  : "Consider adding more detail to your notes for better retention."
                }
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Organization:</h4>
              <p>
                {analytics.topTags.length > 3 
                  ? "Great use of tags for organization!"
                  : "Try using more tags to better organize your notes."
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};