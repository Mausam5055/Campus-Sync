import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Link, Upload, FileText, ExternalLink, Trash2 } from "lucide-react";
import { StudyMaterialsList } from "./StudyMaterialsList";
import { toast } from "@/hooks/use-toast";

export interface StudyMaterial {
  id: number;
  type: 'link' | 'file' | 'text';
  title: string;
  content: string; // URL for links, file path for files, text content for notes
  description?: string;
  createdAt: string;
}

interface StudyMaterialsProps {
  materials: StudyMaterial[];
  onAddMaterial: (material: Omit<StudyMaterial, 'id' | 'createdAt'>) => void;
  onRemoveMaterial: (id: number) => void;
  readonly?: boolean;
}

export const StudyMaterials = ({ materials, onAddMaterial, onRemoveMaterial, readonly = false }: StudyMaterialsProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [materialType, setMaterialType] = useState<'link' | 'file' | 'text'>('link');
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      // Create a simulated file path (in a real app, you'd upload to your storage service)
      const fileName = file.name;
      const filePath = `/uploads/study-materials/${Date.now()}-${fileName}`;
      
      // Set the title to the file name if empty
      if (!title.trim()) {
        setTitle(fileName);
      }
      
      // Set the content to the file path
      setContent(filePath);
      
      toast({
        title: "File Selected",
        description: `${fileName} is ready to be added as study material.`
      });
      
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      toast({
        title: "File Selection Failed",
        description: "Failed to select the file. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddMaterial = () => {
    if (!title.trim() || !content.trim()) return;
    
    onAddMaterial({
      type: materialType,
      title: title.trim(),
      content: content.trim(),
      description: description.trim() || undefined
    });
    
    // Reset form
    setTitle("");
    setContent("");
    setDescription("");
    setIsAddDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Study Materials</Label>
        {!readonly && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Material
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add Study Material</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm">Material Type</Label>
                  <div className="flex gap-2 mt-1">
                    <Button
                      variant={materialType === 'link' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setMaterialType('link')}
                      className="flex items-center gap-1"
                    >
                      <Link className="h-3 w-3" />
                      Link
                    </Button>
                    <Button
                      variant={materialType === 'file' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setMaterialType('file')}
                      className="flex items-center gap-1"
                    >
                      <Upload className="h-3 w-3" />
                      File
                    </Button>
                    <Button
                      variant={materialType === 'text' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setMaterialType('text')}
                      className="flex items-center gap-1"
                    >
                      <FileText className="h-3 w-3" />
                      Note
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="title" className="text-sm">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title..."
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="content" className="text-sm">
                    {materialType === 'link' ? 'URL' : materialType === 'file' ? 'File' : 'Content'}
                  </Label>
                  {materialType === 'file' ? (
                    <div className="space-y-2 mt-1">
                      <Input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileSelect}
                        accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.ppt,.pptx,.xls,.xlsx"
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="w-full flex items-center gap-2"
                      >
                        {isUploading ? (
                          <>
                            <div className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-gray-600 rounded-full" />
                            Selecting...
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4" />
                            Choose File from Device
                          </>
                        )}
                      </Button>
                      <Input
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Or enter file path manually..."
                        className=""
                      />
                      <p className="text-xs text-muted-foreground">
                        Supported: PDF, DOC, TXT, Images, PowerPoint, Excel
                      </p>
                    </div>
                  ) : materialType === 'text' ? (
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Enter your notes..."
                      rows={3}
                      className="mt-1"
                    />
                  ) : (
                    <Input
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="https://..."
                      className="mt-1"
                    />
                  )}
                </div>
                
                <div>
                  <Label htmlFor="description" className="text-sm">Description (Optional)</Label>
                  <Input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description..."
                    className="mt-1"
                  />
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button onClick={handleAddMaterial} disabled={!title.trim() || !content.trim()}>
                    Add Material
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
      
      <StudyMaterialsList 
        materials={materials} 
        onRemoveMaterial={onRemoveMaterial}
        readonly={readonly}
      />
    </div>
  );
};