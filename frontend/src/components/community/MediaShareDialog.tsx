import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Image, 
  FileText, 
  MapPin, 
  Camera, 
  Upload,
  X
} from "lucide-react";
import { useState, useRef } from "react";

interface MediaShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: (type: string, content: any) => void;
}

export function MediaShareDialog({ isOpen, onClose, onShare }: MediaShareDialogProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [locationText, setLocationText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles(Array.from(files));
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(files => files.filter((_, i) => i !== index));
  };

  const handleShareFiles = () => {
    if (selectedFiles.length > 0) {
      onShare('files', selectedFiles);
      setSelectedFiles([]);
      onClose();
    }
  };

  const handleShareLocation = () => {
    if (locationText.trim()) {
      onShare('location', { text: locationText, coordinates: null });
      setLocationText("");
      onClose();
    }
  };

  const shareCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onShare('location', {
            text: `📍 Current Location`,
            coordinates: { lat: latitude, lng: longitude }
          });
          onClose();
        },
        (error) => {
          console.error('Error getting location:', error);
          onShare('location', { text: '📍 Location sharing failed', coordinates: null });
          onClose();
        }
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Share Media</DialogTitle>
          <DialogDescription>
            Share photos, documents, or your location with the group.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="files" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="files">Files & Photos</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
          </TabsList>

          <TabsContent value="files" className="space-y-4">
            <div>
              <Label>Select Files</Label>
              <div className="mt-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,video/*,.pdf,.doc,.docx,.txt"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Files
                </Button>
              </div>
            </div>

            {/* File Preview */}
            {selectedFiles.length > 0 && (
              <div className="space-y-2">
                <Label>Selected Files ({selectedFiles.length})</Label>
                <div className="max-h-32 overflow-y-auto space-y-2">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                      <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                        {file.type.startsWith('image/') ? (
                          <Image className="h-4 w-4 text-primary" />
                        ) : file.type.startsWith('video/') ? (
                          <Camera className="h-4 w-4 text-primary" />
                        ) : (
                          <FileText className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button 
              onClick={handleShareFiles} 
              disabled={selectedFiles.length === 0}
              className="w-full"
            >
              Share Files
            </Button>
          </TabsContent>

          <TabsContent value="location" className="space-y-4">
            <div>
              <Label htmlFor="location">Location Description</Label>
              <Input
                id="location"
                placeholder="e.g., Library Study Room 3"
                value={locationText}
                onChange={(e) => setLocationText(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Button onClick={handleShareLocation} className="w-full">
                <MapPin className="h-4 w-4 mr-2" />
                Share Custom Location
              </Button>
              
              <Button 
                variant="outline" 
                onClick={shareCurrentLocation}
                className="w-full"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Share Current Location
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}