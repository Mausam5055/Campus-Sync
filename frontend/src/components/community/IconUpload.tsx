import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Camera, Upload, X, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface IconUploadProps {
  currentIcon?: string;
  groupName: string;
  onIconUpdate: (iconUrl: string | null) => void;
}

export function IconUpload({ currentIcon, groupName, onIconUpdate }: IconUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentIcon || null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPG, PNG, GIF, etc.)",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // In a real app, you would upload to your backend/cloud storage here
      // For now, we'll simulate an upload and use the preview URL
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onIconUpdate(url);
      toast({
        title: "Icon updated!",
        description: "Group icon has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload the icon. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveIcon = () => {
    setPreviewUrl(null);
    onIconUpdate(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast({
      title: "Icon removed",
      description: "Group icon has been removed.",
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium">Group Icon</Label>
      
      <div className="flex items-center gap-4">
        {/* Current Icon Display */}
        <div className="relative">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt={`${groupName} icon`}
              className="w-16 h-16 rounded-full object-cover border-2 border-muted"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-muted border-2 border-muted-foreground/20 flex items-center justify-center">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
          
          {previewUrl && (
            <Button
              variant="destructive"
              size="sm"
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
              onClick={handleRemoveIcon}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>

        {/* Upload Controls */}
        <div className="flex-1 space-y-2">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={triggerFileInput}
              disabled={isUploading}
              className="flex items-center gap-2"
            >
              {isUploading ? (
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary" />
              ) : (
                <Camera className="h-3 w-3" />
              )}
              {isUploading ? "Uploading..." : "Choose Photo"}
            </Button>
            
            {previewUrl && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveIcon}
                className="text-destructive hover:text-destructive"
              >
                Remove
              </Button>
            )}
          </div>
          
          <p className="text-xs text-muted-foreground">
            Recommended: Square image, at least 200x200px, max 5MB
          </p>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}