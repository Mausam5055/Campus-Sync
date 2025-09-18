import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { StudyMaterials, StudyMaterial } from "./StudyMaterials";
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Quote, 
  Code, 
  Highlighter,
  Type,
  Save,
  X,
  FileImage,
  Link,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Palette
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NotesEditorProps {
  note?: any;
  onSave: (note: any) => void;
  onCancel: () => void;
  categories: string[];
}

export const NotesEditor = ({ note, onSave, onCancel, categories }: NotesEditorProps) => {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [category, setCategory] = useState(note?.category || "");
  const [customCategory, setCustomCategory] = useState("");
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [tags, setTags] = useState(note?.tags?.join(", ") || "");
  const [priority, setPriority] = useState(note?.priority || "medium");
  const [color, setColor] = useState(note?.color || "#ffffff");
  const [fontSize, setFontSize] = useState("16");
  const [wordCount, setWordCount] = useState(0);
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>(note?.studyMaterials || []);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [content]);

  useEffect(() => {
    // Check if current category is not in predefined categories
    if (category && !categories.includes(category)) {
      setIsCustomCategory(true);
      setCustomCategory(category);
    }
  }, [category, categories]);

  const handleAddStudyMaterial = (material: Omit<StudyMaterial, 'id' | 'createdAt'>) => {
    const newMaterial: StudyMaterial = {
      ...material,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    setStudyMaterials([...studyMaterials, newMaterial]);
  };

  const handleRemoveStudyMaterial = (id: number) => {
    setStudyMaterials(studyMaterials.filter(material => material.id !== id));
  };

  const handleCategoryChange = (value: string) => {
    if (value === "custom") {
      setIsCustomCategory(true);
      setCategory("");
    } else {
      setIsCustomCategory(false);
      setCategory(value);
      setCustomCategory("");
    }
  };

  const insertFormatting = (before: string, after: string = "", placeholder: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let newText;
    if (selectedText) {
      newText = content.substring(0, start) + before + selectedText + after + content.substring(end);
    } else {
      newText = content.substring(0, start) + before + placeholder + after + content.substring(end);
    }
    
    setContent(newText);
    
    // Set cursor position
    setTimeout(() => {
      const newPosition = start + before.length + (selectedText || placeholder).length;
      textarea.focus();
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const formatButtons = [
    { icon: Bold, action: () => insertFormatting("**", "**", "bold text"), tooltip: "Bold" },
    { icon: Italic, action: () => insertFormatting("*", "*", "italic text"), tooltip: "Italic" },
    { icon: Underline, action: () => insertFormatting("<u>", "</u>", "underlined text"), tooltip: "Underline" },
    { icon: Code, action: () => insertFormatting("`", "`", "code"), tooltip: "Inline Code" },
    { icon: Highlighter, action: () => insertFormatting("==", "==", "highlighted text"), tooltip: "Highlight" },
    { icon: Quote, action: () => insertFormatting("> ", "", "Quote text"), tooltip: "Quote" },
    { icon: List, action: () => insertFormatting("- ", "", "List item"), tooltip: "Bullet List" },
    { icon: ListOrdered, action: () => insertFormatting("1. ", "", "List item"), tooltip: "Numbered List" },
    { icon: Link, action: () => insertFormatting("[", "](url)", "link text"), tooltip: "Link" },
  ];

  const priorityColors = {
    low: "bg-green-100 text-green-800 border-green-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    high: "bg-red-100 text-red-800 border-red-200",
    urgent: "bg-purple-100 text-purple-800 border-purple-200"
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;

    const finalCategory = isCustomCategory ? customCategory.trim() : category;

    const noteData = {
      id: note?.id || Date.now(),
      title: title.trim(),
      content: content.trim(),
      category: finalCategory || "Other",
      tags: tags.split(",").map(tag => tag.trim()).filter(tag => tag),
      priority,
      color,
      fontSize: parseInt(fontSize),
      wordCount,
      studyMaterials,
      favorite: note?.favorite || false,
      createdAt: note?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastAccessed: new Date().toISOString()
    };

    onSave(noteData);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{note ? "Edit Note" : "Create New Note"}</h2>
        <div className="flex gap-2">
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Note
          </Button>
          <Button variant="outline" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Note Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <Label htmlFor="category">Subject/Category</Label>
          {isCustomCategory ? (
            <div className="space-y-2">
              <Input
                placeholder="Enter custom subject..."
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCustomCategory(false)}
                className="w-full"
              >
                Choose from predefined subjects
              </Button>
            </div>
          ) : (
            <Select value={category} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
                <SelectItem value="custom">+ Add Custom Subject</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        <div>
          <Label htmlFor="priority">Priority</Label>
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="color">Note Color</Label>
          <div className="flex gap-2 mt-1">
            {["#ffffff", "#fef3c7", "#dcfce7", "#dbeafe", "#fce7f3", "#f3e8ff"].map(colorOption => (
              <button
                key={colorOption}
                className={cn(
                  "w-8 h-8 rounded border-2 transition-all",
                  color === colorOption ? "border-primary ring-2 ring-primary/20" : "border-border"
                )}
                style={{ backgroundColor: colorOption }}
                onClick={() => setColor(colorOption)}
              />
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="fontSize">Font Size</Label>
          <Select value={fontSize} onValueChange={setFontSize}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="14">Small (14px)</SelectItem>
              <SelectItem value="16">Medium (16px)</SelectItem>
              <SelectItem value="18">Large (18px)</SelectItem>
              <SelectItem value="20">Extra Large (20px)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Title Input */}
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg font-medium"
        />
      </div>

      {/* Formatting Toolbar */}
      <div className="border rounded-lg p-3" style={{ backgroundColor: color }}>
        <div className="flex flex-wrap gap-1 mb-3">
          {formatButtons.map((button, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={button.action}
              className="h-8 w-8 p-0 text-gray-700 hover:text-gray-900 dark:text-gray-800 dark:hover:text-gray-600"
              title={button.tooltip}
            >
              <button.icon className="h-4 w-4" />
            </Button>
          ))}
          <Separator orientation="vertical" className="mx-2 h-8" />
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Type className="h-4 w-4" />
            <span>{wordCount} words</span>
          </div>
        </div>

        {/* Content Textarea */}
        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea
            ref={textareaRef}
            id="content"
            placeholder="Start writing your note... Use the formatting buttons above or markdown syntax."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={15}
            className="font-mono resize-none"
            style={{ fontSize: `${fontSize}px` }}
          />
        </div>
      </div>

      {/* Tags Input */}
      <div>
        <Label htmlFor="tags">Tags</Label>
        <Input
          id="tags"
          placeholder="Enter tags separated by commas (e.g., chemistry, organic, reactions)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <div className="flex flex-wrap gap-1 mt-2">
          {tags.split(",").map(tag => tag.trim()).filter(tag => tag).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Study Materials Section */}
      <div className="border rounded-lg p-4 space-y-4">
        <StudyMaterials 
          materials={studyMaterials}
          onAddMaterial={handleAddStudyMaterial}
          onRemoveMaterial={handleRemoveStudyMaterial}
        />
      </div>

      {/* Priority Badge */}
      {priority !== "medium" && (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Priority:</span>
          <Badge className={priorityColors[priority as keyof typeof priorityColors]}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </Badge>
        </div>
      )}
    </div>
  );
};