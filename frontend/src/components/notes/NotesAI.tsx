import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Brain, 
  Lightbulb, 
  BookOpen, 
  FileText, 
  Search,
  Target,
  Zap,
  CheckCircle,
  Copy,
  RefreshCw
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface NotesAIProps {
  notes: any[];
  selectedNote?: any;
}

export const NotesAI = ({ notes, selectedNote }: NotesAIProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [aiMode, setAiMode] = useState<"summary" | "quiz" | "flashcards" | "concepts" | "questions">("summary");

  const aiModes = [
    { id: "summary", label: "Summary", icon: FileText, description: "Generate key points summary" },
    { id: "quiz", label: "Quiz", icon: Target, description: "Create practice questions" },
    { id: "flashcards", label: "Flashcards", icon: Brain, description: "Make flashcard pairs" },
    { id: "concepts", label: "Concepts", icon: Lightbulb, description: "Extract key concepts" },
    { id: "questions", label: "Questions", icon: Search, description: "Generate study questions" }
  ];

  const generateContent = async () => {
    if (!selectedNote) {
      toast({
        title: "No Note Selected",
        description: "Please select a note to generate AI content for.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      let content = "";
      
      switch (aiMode) {
        case "summary":
          content = generateSummary(selectedNote);
          break;
        case "quiz":
          content = generateQuiz(selectedNote);
          break;
        case "flashcards":
          content = generateFlashcards(selectedNote);
          break;
        case "concepts":
          content = generateConcepts(selectedNote);
          break;
        case "questions":
          content = generateQuestions(selectedNote);
          break;
      }
      
      setGeneratedContent(content);
      setIsGenerating(false);
      
      toast({
        title: "AI Content Generated!",
        description: `${aiModes.find(m => m.id === aiMode)?.label} created successfully.`
      });
    }, 2000);
  };

  const generateSummary = (note: any) => {
    return `📝 **Summary of "${note.title}"**

🔑 **Key Points:**
• First main concept derived from the note content
• Important details and supporting information
• Critical insights and takeaways

💡 **Main Ideas:**
• Core theme and subject matter
• Essential information for understanding
• Practical applications and examples

🎯 **Study Focus:**
• Areas requiring additional attention
• Important concepts to remember
• Connections to other topics`;
  };

  const generateQuiz = (note: any) => {
    return `📋 **Quiz: ${note.title}**

**Question 1:** What is the main concept discussed in this note?
a) Option A
b) Option B (Correct)
c) Option C
d) Option D

**Question 2:** Which of the following statements is true?
a) Statement A
b) Statement B
c) Statement C (Correct)
d) Statement D

**Question 3:** How would you apply this concept?
a) Application A (Correct)
b) Application B
c) Application C
d) Application D

**Answer Key:** 1-B, 2-C, 3-A

💡 **Study Tip:** Review the note again for concepts you found challenging!`;
  };

  const generateFlashcards = (note: any) => {
    return `🧠 **Flashcards: ${note.title}**

**Card 1:**
Front: What is the primary topic of this note?
Back: [Main concept from the note content]

**Card 2:**
Front: List the key components discussed
Back: • Component 1 • Component 2 • Component 3

**Card 3:**
Front: Why is this concept important?
Back: [Significance and applications]

**Card 4:**
Front: How does this relate to other topics?
Back: [Connections and relationships]

💡 **Usage:** Study by covering the "Back" and testing your recall!`;
  };

  const generateConcepts = (note: any) => {
    return `🎯 **Key Concepts: ${note.title}**

🔸 **Primary Concept:** Main topic or theme
   - Definition and explanation
   - Context and background

🔸 **Supporting Concepts:**
   - Related idea 1: Brief explanation
   - Related idea 2: Brief explanation  
   - Related idea 3: Brief explanation

🔸 **Important Terms:**
   - Term 1: Definition
   - Term 2: Definition
   - Term 3: Definition

🔸 **Practical Applications:**
   - Real-world usage
   - Problem-solving applications
   - Future study connections`;
  };

  const generateQuestions = (note: any) => {
    return `❓ **Study Questions: ${note.title}**

**Understanding Questions:**
1. What is the main purpose of this topic?
2. How would you explain this to someone else?
3. What are the most important details to remember?

**Analysis Questions:**
4. How does this concept relate to what you already know?
5. What patterns or connections do you notice?
6. What questions does this raise for further study?

**Application Questions:**
7. How could you use this information practically?
8. What examples demonstrate this concept?
9. How might you test your understanding?

**Review Questions:**
10. What aspects need more study?
11. Which parts are you most confident about?
12. How does this fit into the bigger picture?`;
  };

  const copyToClipboard = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent);
      toast({
        title: "Copied!",
        description: "AI content copied to clipboard."
      });
    }
  };

  const getStudyStats = () => {
    const totalNotes = notes.length;
    const categoriesCount = new Set(notes.map(n => n.category)).size;
    const avgWordCount = notes.reduce((sum, note) => sum + (note.wordCount || 0), 0) / totalNotes || 0;
    
    return { totalNotes, categoriesCount, avgWordCount: Math.round(avgWordCount) };
  };

  const stats = getStudyStats();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI Study Assistant
        </h3>
      </div>

      {/* Study Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalNotes}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.categoriesCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Avg Words</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgWordCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* AI Mode Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            AI Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {aiModes.map((mode) => (
              <Button
                key={mode.id}
                variant={aiMode === mode.id ? "default" : "outline"}
                onClick={() => setAiMode(mode.id as any)}
                className="h-auto p-4 flex flex-col items-start gap-2"
              >
                <div className="flex items-center gap-2">
                  <mode.icon className="h-4 w-4" />
                  <span className="font-medium">{mode.label}</span>
                </div>
                <span className="text-xs text-left opacity-80">{mode.description}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Note Info */}
      {selectedNote && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Selected Note
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <h4 className="font-medium">{selectedNote.title}</h4>
              <div className="flex gap-2">
                <Badge variant="secondary">{selectedNote.category}</Badge>
                {selectedNote.tags?.map((tag: string, index: number) => (
                  <Badge key={index} variant="outline">#{tag}</Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                {selectedNote.wordCount || 0} words • Created {new Date(selectedNote.createdAt).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Generate Button */}
      <div className="flex justify-center">
        <Button 
          onClick={generateContent} 
          disabled={!selectedNote || isGenerating}
          size="lg"
          className="flex items-center gap-2"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Brain className="h-4 w-4" />
              Generate {aiModes.find(m => m.id === aiMode)?.label}
            </>
          )}
        </Button>
      </div>

      {/* Generated Content */}
      {generatedContent && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Generated {aiModes.find(m => m.id === aiMode)?.label}
              </CardTitle>
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={generatedContent}
              readOnly
              rows={15}
              className="font-mono text-sm"
            />
          </CardContent>
        </Card>
      )}

      {/* AI Tips */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="pt-6">
          <h4 className="font-semibold mb-2 flex items-center gap-2 text-purple-800">
            <Lightbulb className="h-4 w-4" />
            AI Study Tips
          </h4>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>• Use summaries for quick review before exams</li>
            <li>• Generate quizzes to test your understanding</li>
            <li>• Create flashcards for memorization tasks</li>
            <li>• Extract concepts to understand big picture connections</li>
            <li>• Use questions to guide deeper study sessions</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};