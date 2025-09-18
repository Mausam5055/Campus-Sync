import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  CheckCheck, 
  Users, 
  UserPlus, 
  UserMinus,
  Image,
  FileText,
  MapPin,
  Download
} from "lucide-react";
import { useState } from "react";
import { MessageReadReceipts } from "./MessageReadReceipts";

interface MessageProps {
  id: string;
  type: "text" | "system" | "media" | "location" | "file";
  sender: string;
  avatar: string;
  message: string;
  time: string;
  isOwn: boolean;
  readCount?: number;
  totalMembers?: number;
  mediaData?: {
    type: "image" | "video" | "document";
    url: string;
    filename?: string;
    size?: string;
  }[];
  locationData?: {
    text: string;
    coordinates?: { lat: number; lng: number };
  };
}

export function EnhancedChatMessage({ 
  id,
  type,
  sender, 
  avatar, 
  message, 
  time, 
  isOwn,
  readCount = 0,
  totalMembers = 0,
  mediaData,
  locationData
}: MessageProps) {
  const [showReadReceipts, setShowReadReceipts] = useState(false);

  // Mock read receipts data
  const mockReadReceipts = [
    { userId: "1", userName: "John Doe", avatar: "JD", readAt: "2024-01-25T10:35:00Z" },
    { userId: "2", userName: "Jane Smith", avatar: "JS", readAt: "2024-01-25T10:36:00Z" },
    { userId: "3", userName: "Mike Johnson", avatar: "MJ", readAt: "2024-01-25T10:37:00Z" },
  ];

  if (type === "system") {
    return (
      <div className="flex justify-center my-4">
        <div className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground flex items-center gap-2">
          {message.includes("joined") ? (
            <UserPlus className="h-3 w-3" />
          ) : message.includes("left") ? (
            <UserMinus className="h-3 w-3" />
          ) : (
            <Users className="h-3 w-3" />
          )}
          {message}
        </div>
      </div>
    );
  }

  const renderMediaContent = () => {
    if (!mediaData) return null;

    return (
      <div className="space-y-2 mt-2">
        {mediaData.map((media, index) => (
          <div key={index} className="rounded-lg overflow-hidden">
            {media.type === "image" && (
              <img 
                src={media.url} 
                alt="Shared image"
                className="max-w-full h-auto rounded-lg cursor-pointer hover:opacity-90"
                onClick={() => window.open(media.url, '_blank')}
              />
            )}
            {media.type === "video" && (
              <video 
                controls 
                className="max-w-full h-auto rounded-lg"
                src={media.url}
              />
            )}
            {media.type === "document" && (
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <FileText className="h-8 w-8 text-primary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{media.filename}</p>
                  {media.size && (
                    <p className="text-xs text-muted-foreground">{media.size}</p>
                  )}
                </div>
                <Button size="sm" variant="ghost">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderLocationContent = () => {
    if (!locationData) return null;

    return (
      <div className="mt-2">
        <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
          <MapPin className="h-5 w-5 text-primary" />
          <div className="flex-1">
            <p className="text-sm font-medium">{locationData.text}</p>
            {locationData.coordinates && (
              <Button 
                variant="link" 
                size="sm" 
                className="p-0 h-auto text-xs"
                onClick={() => {
                  const url = `https://maps.google.com/?q=${locationData.coordinates!.lat},${locationData.coordinates!.lng}`;
                  window.open(url, '_blank');
                }}
              >
                View on Maps
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4 w-full`}>
        <div className={`flex gap-2 max-w-[85%] sm:max-w-[70%] ${isOwn ? 'flex-row-reverse' : ''}`}>
          {!isOwn && (
            <Avatar className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0">
              <AvatarFallback className="text-xs">
                {avatar}
              </AvatarFallback>
            </Avatar>
          )}
          
          <div className={`rounded-lg p-2 sm:p-3 min-w-0 max-w-fit ${
            isOwn 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted'
          }`}>
            {!isOwn && (
              <p className="text-xs font-medium mb-1 truncate">{sender}</p>
            )}
            
            <p className="text-sm whitespace-pre-wrap word-wrap break-words">{message}</p>
            
            {renderMediaContent()}
            {renderLocationContent()}
            
            <div className={`flex items-center gap-2 mt-2 ${isOwn ? 'justify-end' : 'justify-start'} flex-wrap`}>
              <p className="text-xs opacity-70 flex-shrink-0">{time}</p>
              
              {isOwn && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 hover:bg-transparent flex-shrink-0"
                  onClick={() => setShowReadReceipts(true)}
                >
                  <div className="flex items-center gap-1">
                    {readCount === totalMembers ? (
                      <CheckCheck className="h-3 w-3 text-blue-400" />
                    ) : readCount > 0 ? (
                      <CheckCheck className="h-3 w-3" />
                    ) : (
                      <Check className="h-3 w-3" />
                    )}
                    <span className="text-xs opacity-70">{readCount}</span>
                  </div>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <MessageReadReceipts
        isOpen={showReadReceipts}
        onClose={() => setShowReadReceipts(false)}
        messageId={id}
        readReceipts={mockReadReceipts}
        totalMembers={totalMembers}
      />
    </>
  );
}