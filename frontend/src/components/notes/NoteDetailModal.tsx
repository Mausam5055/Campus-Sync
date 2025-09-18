import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { StudyMaterials, StudyMaterial } from "./StudyMaterials";
import { Calendar, Clock, FileText, Star, Tag, BookOpen, Eye } from "lucide-react";
import { format } from "date-fns";

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

interface NoteDetailModalProps {
  note: Note | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateNote: (updatedNote: Note) => void;
}

export const NoteDetailModal = ({ note, isOpen, onClose, onUpdateNote }: NoteDetailModalProps) => {
  if (!note) return null;

  const handleAddMaterial = (materialData: Omit<StudyMaterial, 'id' | 'createdAt'>) => {
    const newMaterial: StudyMaterial = {
      ...materialData,
      id: Date.now(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    const updatedNote = {
      ...note,
      studyMaterials: [...note.studyMaterials, newMaterial]
    };
    
    onUpdateNote(updatedNote);
  };

  const handleRemoveMaterial = (materialId: number) => {
    const updatedNote = {
      ...note,
      studyMaterials: note.studyMaterials.filter(m => m.id !== materialId)
    };
    
    onUpdateNote(updatedNote);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-4xl w-[95vw] h-[90vh] overflow-y-auto scrollbar-hide p-0" 
        aria-describedby="note-detail-description"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <style dangerouslySetInnerHTML={{
          __html: `
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `
        }} />
        
        {/* Header */}
        <div className="sticky top-0 z-10 px-4 md:px-6 py-4 border-b bg-background/95 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 leading-tight">
                {note.title}
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                  <span>Created {format(new Date(note.createdAt), 'MMM dd, yyyy')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 md:h-4 md:w-4" />
                  <span>Updated {format(new Date(note.updatedAt), 'MMM dd, yyyy')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3 md:h-4 md:w-4" />
                  <span>Viewed {format(new Date(note.lastAccessed), 'MMM dd, yyyy')}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="text-secondary-foreground text-xs">
                {note.category}
              </Badge>
              <Badge className={getPriorityColor(note.priority)} variant="outline">
                {note.priority}
              </Badge>
              {note.favorite && (
                <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  Favorite
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div id="note-detail-description" className="px-4 md:px-6 py-4">
          <div className="space-y-6">
            {/* Tags */}
            {note.tags.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Tag className="h-4 w-4" />
                  Tags
                </div>
                <div className="flex flex-wrap gap-2">
                  {note.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs bg-muted text-muted-foreground border-border">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Note Content */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <FileText className="h-4 w-4" />
                Content ({note.wordCount} words)
              </div>
              <div 
                className="prose prose-sm max-w-none p-4 rounded-lg border bg-muted/30"
                style={{ fontSize: `${note.fontSize}px` }}
              >
                <div className="whitespace-pre-wrap leading-relaxed text-foreground">
                  {note.content}
                </div>
              </div>
            </div>

            <Separator />

            {/* Study Materials */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <BookOpen className="h-4 w-4" />
                Study Materials ({note.studyMaterials.length})
              </div>
              <StudyMaterials
                materials={note.studyMaterials}
                onAddMaterial={handleAddMaterial}
                onRemoveMaterial={handleRemoveMaterial}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 z-10 px-4 md:px-6 py-4 border-t bg-background/95 backdrop-blur-sm">
          <div className="flex justify-between items-center">
            <div className="text-xs text-muted-foreground">
              Font size: {note.fontSize}px
            </div>
            <Button onClick={onClose} variant="outline" size="sm">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};