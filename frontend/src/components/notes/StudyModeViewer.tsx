import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Eye, 
  EyeOff, 
  RotateCcw, 
  CheckCircle, 
  Circle, 
  BookOpen, 
  Clock, 
  Brain,
  Lightbulb,
  Target
} from "lucide-react";

interface StudyModeViewerProps {
  notes: any[];
  onBack: () => void;
}

export const StudyModeViewer = ({ notes, onBack }: StudyModeViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [studiedNotes, setStudiedNotes] = useState<Set<number>>(new Set());
  const [startTime, setStartTime] = useState(Date.now());
  const [sessionStats, setSessionStats] = useState({
    totalTime: 0,
    notesReviewed: 0,
    flashcardsFlipped: 0
  });

  const currentNote = notes[currentIndex];
  const progress = ((currentIndex + 1) / notes.length) * 100;

  useEffect(() => {
    const interval = setInterval(() => {
      setSessionStats(prev => ({
        ...prev,
        totalTime: Math.floor((Date.now() - startTime) / 1000)
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const nextNote = () => {
    if (currentIndex < notes.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
      setSessionStats(prev => ({
        ...prev,
        notesReviewed: prev.notesReviewed + 1
      }));
    }
  };

  const prevNote = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
    if (!showAnswer) {
      setSessionStats(prev => ({
        ...prev,
        flashcardsFlipped: prev.flashcardsFlipped + 1
      }));
    }
  };

  const markAsStudied = () => {
    setStudiedNotes(prev => new Set([...prev, currentNote.id]));
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getKeyPoints = (content: string) => {
    return content
      .split(/[.!?]+/)
      .filter(sentence => sentence.trim().length > 10)
      .slice(0, 3)
      .map(point => point.trim());
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="h-6 w-6" />
            Study Mode
          </h2>
          <p className="text-muted-foreground">Focus mode for effective learning</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          Exit Study Mode
        </Button>
      </div>

      {/* Progress and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Target className="h-4 w-4" />
              Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(progress)}%</div>
            <Progress value={progress} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {currentIndex + 1} of {notes.length} notes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Study Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatTime(sessionStats.totalTime)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Reviewed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sessionStats.notesReviewed}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Cards Flipped
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sessionStats.flashcardsFlipped}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Note Card */}
      <Card className="relative overflow-hidden bg-card text-card-foreground">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-secondary-foreground">{currentNote?.category}</Badge>
              {studiedNotes.has(currentNote?.id) && (
                <Badge variant="outline" className="text-green-600 border-green-600 dark:text-green-400 dark:border-green-400">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Studied
                </Badge>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleAnswer}
                className="flex items-center gap-2"
              >
                {showAnswer ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showAnswer ? "Hide Details" : "Show Details"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={markAsStudied}
                disabled={studiedNotes.has(currentNote?.id)}
              >
                {studiedNotes.has(currentNote?.id) ? <CheckCircle className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <CardTitle className="text-xl text-card-foreground">{currentNote?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {!showAnswer ? (
            <div className="space-y-4">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Key Points to Remember:
                </h4>
                <ul className="space-y-2">
                  {getKeyPoints(currentNote?.content || "").map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{point}...</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  Review the key points above, then click "Show Details" to see the full content
                </p>
                <Button onClick={toggleAnswer} size="lg">
                  <Eye className="h-4 w-4 mr-2" />
                  Show Full Content
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="prose prose-sm max-w-none text-foreground">
                <p className="whitespace-pre-wrap text-foreground">{currentNote?.content}</p>
              </div>
              {currentNote?.tags && currentNote.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-4 border-t">
                  {currentNote.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs bg-muted text-muted-foreground border-border">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={prevNote}
          disabled={currentIndex === 0}
        >
          Previous
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAnswer(false)}
            className="flex items-center gap-1"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </Button>
          <span className="text-sm text-muted-foreground px-3">
            {currentIndex + 1} / {notes.length}
          </span>
        </div>

        <Button
          onClick={nextNote}
          disabled={currentIndex === notes.length - 1}
        >
          Next
        </Button>
      </div>

      {/* Study Tips */}
      <Card className="bg-muted/50 border-border">
        <CardContent className="pt-6">
          <h4 className="font-semibold mb-2 flex items-center gap-2 text-foreground">
            <Lightbulb className="h-4 w-4" />
            Study Tips
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Read the key points first, then try to recall the full content</li>
            <li>• Mark notes as "studied" only when you truly understand them</li>
            <li>• Take breaks every 25-30 minutes to maintain focus</li>
            <li>• Review difficult concepts multiple times</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};