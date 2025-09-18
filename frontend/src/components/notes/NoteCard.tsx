import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Edit, Trash2 } from "lucide-react";

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
  studyMaterials: any[];
  createdAt: string;
  updatedAt: string;
  lastAccessed: string;
}

interface NoteCardProps {
  note: Note;
  onView: (note: Note) => void;
  onToggleFavorite: (id: number) => void;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
}

export function NoteCard({ note, onView, onToggleFavorite, onEdit, onDelete }: NoteCardProps) {
  return (
    <Card 
      className="hover:shadow-md transition-all cursor-pointer group"
      style={{ backgroundColor: note.color }}
      onClick={() => onView(note)}
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
              onClick={(e) => { e.stopPropagation(); onToggleFavorite(note.id); }}
              className={note.favorite ? "text-yellow-500 hover:text-yellow-600" : "text-gray-700 dark:text-gray-700 hover:text-gray-900 dark:hover:text-gray-900"}
            >
              <Star className={`h-4 w-4 ${note.favorite ? "fill-current" : ""}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => { e.stopPropagation(); onEdit(note); }}
              className="text-gray-700 dark:text-gray-700 hover:text-gray-900 dark:hover:text-gray-900"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => { e.stopPropagation(); onDelete(note.id); }}
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
}