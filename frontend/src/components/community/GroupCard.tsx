import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, MessageSquare, Calendar, Share2 } from "lucide-react";

interface GroupCardProps {
  group: {
    id: string;
    name: string;
    members: number;
    active: boolean;
    semester: string;
    description: string;
    link: string;
    lastMessage: string;
    lastMessageTime: string;
    createdAt: string;
    icon?: string;
  };
  isJoined: boolean;
  onJoinChat: (groupId: string) => void;
  onShareLink: (link: string) => void;
}

export function GroupCard({ group, isJoined, onJoinChat, onShareLink }: GroupCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {group.icon ? (
              <img 
                src={group.icon} 
                alt={`${group.name} icon`}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            )}
            <div>
              <CardTitle className="text-lg">{group.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{group.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={group.active ? "default" : "secondary"}>
              {group.active ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {group.members} members
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {group.semester}
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onShareLink(group.link)}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Latest:</span>
          </div>
          <p className="text-sm line-clamp-2">{group.lastMessage}</p>
          <p className="text-xs text-muted-foreground">{group.lastMessageTime}</p>
        </div>
        
        <div className="flex gap-2">
          {isJoined ? (
            <Button 
              className="flex-1" 
              onClick={() => onJoinChat(group.id)}
            >
              Open Chat
            </Button>
          ) : (
            <Button 
              className="flex-1" 
              variant="outline"
              onClick={() => onJoinChat(group.id)}
            >
              Join Group
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}