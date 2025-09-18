import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, File } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface StudyMaterialsUploadProps {
  onFileUploaded: (filePath: string, fileName: string) => void;
}

export const StudyMaterialsUpload = ({ onFileUploaded }: StudyMaterialsUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      // In a real app, you'd upload to your file storage service
      // For now, we'll simulate the upload and store the file name
      const fileName = file.name;
      const filePath = `/uploads/study-materials/${Date.now()}-${fileName}`;
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onFileUploaded(filePath, fileName);
      toast({
        title: "File Uploaded",
        description: `${fileName} has been uploaded successfully.`
      });
      
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload the file. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="file-upload" className="text-sm">Upload Study Material</Label>
      <div className="flex items-center gap-2">
        <Input
          ref={fileInputRef}
          id="file-upload"
          type="file"
          onChange={handleFileSelect}
          accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.ppt,.pptx"
          className="hidden"
        />
        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="flex items-center gap-2"
        >
          {isUploading ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-gray-600 rounded-full" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Choose File
            </>
          )}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Supported formats: PDF, DOC, TXT, Images, PowerPoint
      </p>
    </div>
  );
};