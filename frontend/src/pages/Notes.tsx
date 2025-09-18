import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Search, FileText, Star, Trash2, Edit, BookOpen, Brain, BarChart3, Play, Download, Upload, Eye } from "lucide-react";
import { StudyMaterial } from "@/components/notes/StudyMaterials";
import { usePageLoading } from "@/hooks/use-page-loading";
import { GenericPageSkeleton } from "@/components/ui/page-skeleton";
import { NotesEditor } from "@/components/notes/NotesEditor";
import { StudyModeViewer } from "@/components/notes/StudyModeViewer";
import { NotesAnalytics } from "@/components/notes/NotesAnalytics";
import { NotesAI } from "@/components/notes/NotesAI";
import { NoteDetailModal } from "@/components/notes/NoteDetailModal";
import { toast } from "@/hooks/use-toast";

interface Note {
  id: number;
  title: string;
  content: string;
  category: string;
  tags: string[];
  favorite: boolean;
  priority: string;
  color: string;
  fontSize: number;
  wordCount: number;
  studyMaterials: StudyMaterial[];
  createdAt: string;
  updatedAt: string;
  lastAccessed: string;
}

const Notes = () => {
  const isLoading = usePageLoading();

  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "Computer Science Lecture 1",
      content: "Introduction to algorithms and data structures. Big O notation explains time complexity and helps us analyze algorithm efficiency. Arrays provide constant-time access but insertion can be costly. Linked lists offer efficient insertion but slower access times.",
      category: "Computer Science",
      tags: ["algorithms", "data-structures", "big-o"],
      favorite: true,
      priority: "high",
      color: "#dbeafe",
      fontSize: 16,
      wordCount: 45,
      studyMaterials: [
        {
          id: 1,
          type: 'link',
          title: 'Big O Cheat Sheet',
          content: 'https://www.bigocheatsheet.com/',
          description: 'Comprehensive reference for algorithm complexities',
          createdAt: '2024-01-20'
        }
      ],
      createdAt: "2024-01-20",
      updatedAt: "2024-01-20",
      lastAccessed: "2024-01-22"
    },
    {
      id: 2,
      title: "Mathematics - Calculus Notes",
      content: "Derivatives and integrals form the foundation of calculus. The fundamental theorem of calculus connects these two concepts. Derivatives measure rates of change, while integrals calculate areas under curves. Chain rule is essential for composite functions.",
      category: "Mathematics",
      tags: ["calculus", "derivatives", "integrals"],
      favorite: false,
      priority: "medium",
      color: "#dcfce7",
      fontSize: 16,
      wordCount: 42,
      studyMaterials: [],
      createdAt: "2024-01-19",
      updatedAt: "2024-01-19",
      lastAccessed: "2024-01-21"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentView, setCurrentView] = useState("notes");
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [customCategory, setCustomCategory] = useState("");

  const baseCategories = ["Computer Science", "Mathematics", "Physics", "Chemistry", "Biology", "History", "Literature"];
  
  // Get all unique categories from existing notes
  const allCategories = Array.from(new Set([
    ...baseCategories,
    ...notes.map(note => note.category).filter(cat => !baseCategories.includes(cat))
  ]));

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || note.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleSaveNote = (noteData: any) => {
    if (editingNote) {
      setNotes(notes.map(note => note.id === editingNote.id ? noteData : note));
      toast({ title: "Note Updated!", description: "Your note has been successfully updated." });
    } else {
      setNotes([noteData, ...notes]);
      toast({ title: "Note Created!", description: "Your new note has been successfully created." });
    }
    setEditingNote(null);
    setIsEditorOpen(false);
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
    toast({ title: "Note Deleted", description: "Note has been successfully deleted." });
  };

  const toggleFavorite = (id: number) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, favorite: !note.favorite } : note
    ));
  };

  const startEditing = (note: Note) => {
    setEditingNote(note);
    setIsEditorOpen(true);
  };

  const handleViewNote = (note: Note) => {
    setSelectedNote(note);
    setIsDetailModalOpen(true);
    // Update last accessed time
    const updatedNote = { ...note, lastAccessed: new Date().toISOString().split('T')[0] };
    setNotes(notes.map(n => n.id === note.id ? updatedNote : n));
  };

  const handleUpdateNote = (updatedNote: Note) => {
    setNotes(notes.map(note => note.id === updatedNote.id ? updatedNote : note));
    setSelectedNote(updatedNote);
    toast({ title: "Note Updated!", description: "Study materials have been updated." });
  };

  const NoteCard = ({ note }: { note: Note }) => (
    <Card 
      className="hover:shadow-md transition-all cursor-pointer group"
      style={{ backgroundColor: note.color }}
      onClick={() => handleViewNote(note)}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg mb-1 text-gray-900 dark:text-gray-900">{note.title}</CardTitle>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-700">{new Date(note.createdAt).toLocaleDateString()}</CardDescription>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => { e.stopPropagation(); toggleFavorite(note.id); }}
              className={note.favorite ? "text-yellow-500 hover:text-yellow-600" : "text-gray-700 dark:text-gray-700 hover:text-gray-900 dark:hover:text-gray-900"}
            >
              <Star className={`h-4 w-4 ${note.favorite ? "fill-current" : ""}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => { e.stopPropagation(); startEditing(note); }}
              className="text-gray-700 dark:text-gray-700 hover:text-gray-900 dark:hover:text-gray-900"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }}
              className="text-red-600 hover:text-red-700 dark:text-red-600 dark:hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700 dark:text-gray-700 mb-3 line-clamp-3">
          {note.content.substring(0, 150)}...
        </p>
        <div className="flex flex-wrap gap-1 mb-2">
          <Badge variant="secondary" className="text-secondary-foreground">{note.category}</Badge>
          {note.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs bg-muted text-muted-foreground border-border">#{tag}</Badge>
          ))}
        </div>
        <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-700">
          <div className="flex items-center gap-2">
            <span>{note.wordCount} words</span>
            {note.studyMaterials.length > 0 && (
              <Badge variant="outline" className="text-xs border-blue-500 text-blue-700 dark:text-blue-700">
                {note.studyMaterials.length} materials
              </Badge>
            )}
          </div>
          <Badge variant="outline" className={
            note.priority === "urgent" ? "border-red-500 text-red-700 dark:text-red-700" :
            note.priority === "high" ? "border-orange-500 text-orange-700 dark:text-orange-700" :
            note.priority === "low" ? "border-green-500 text-green-700 dark:text-green-700" : ""
          }>
            {note.priority}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return <GenericPageSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="mobile-heading font-bold">Enhanced Notes</h1>
          <p className="text-muted-foreground mobile-hide-description">Professional note-taking with AI-powered study features</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsEditorOpen(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Note
          </Button>
          <Button variant="outline" onClick={() => setCurrentView("study")} className="flex items-center gap-2">
            <Play className="h-4 w-4" />
            Study Mode
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notes, tags, content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                onClick={() => setSelectedCategory("all")}
                size="sm"
              >
                All
              </Button>
              {allCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      {currentView === "study" ? (
        <StudyModeViewer notes={filteredNotes} onBack={() => setCurrentView("notes")} />
      ) : (
        <Tabs defaultValue="notes" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="notes" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Notes
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Favorites
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI Assistant
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notes" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNotes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
              {filteredNotes.length === 0 && (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No notes found</h3>
                  <p>Create your first note or adjust your search filters</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNotes.filter(note => note.favorite).map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <NotesAnalytics notes={notes} />
          </TabsContent>

          <TabsContent value="ai">
            <NotesAI notes={notes} selectedNote={selectedNote} />
          </TabsContent>
        </Tabs>
      )}

      {/* Editor Dialog */}
      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="max-w-6xl h-[90vh] overflow-y-auto">
          <NotesEditor
            note={editingNote}
            onSave={handleSaveNote}
            onCancel={() => {
              setIsEditorOpen(false);
              setEditingNote(null);
            }}
            categories={allCategories}
          />
        </DialogContent>
      </Dialog>

      {/* Note Detail Modal */}
      <NoteDetailModal
        note={selectedNote}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onUpdateNote={handleUpdateNote}
      />
    </div>
  );
};

export default Notes;