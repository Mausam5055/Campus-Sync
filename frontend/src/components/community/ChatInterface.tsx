import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, Send, ArrowLeft, Share2, Paperclip } from "lucide-react";
import { EnhancedChatMessage } from "./EnhancedChatMessage";
import { useIsMobile } from "@/hooks/use-mobile";

interface Message {
  id: string;
  groupId: string;
  type: "text" | "system";
  sender: string;
  message: string;
  time: string;
  avatar: string;
  readCount?: number;
  totalMembers?: number;
}

interface Group {
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
}

interface ChatInterfaceProps {
  groups: Group[];
  messages: Message[];
  activeChat: string | null;
  newMessage: string;
  joinedGroups: Set<string>;
  onSetActiveChat: (chatId: string) => void;
  onSendMessage: () => void;
  onNewMessageChange: (message: string) => void;
  onBackToMain: () => void;
  onLeaveGroup: (groupId: string) => void;
  onCopyGroupLink: (link: string) => void;
  onShowGroupDetails: () => void;
  onShowMediaShare: () => void;
  keyboardHeight: number;
}

export function ChatInterface({
  groups,
  messages,
  activeChat,
  newMessage,
  joinedGroups,
  onSetActiveChat,
  onSendMessage,
  onNewMessageChange,
  onBackToMain,
  onLeaveGroup,
  onCopyGroupLink,
  onShowGroupDetails,
  onShowMediaShare,
  keyboardHeight
}: ChatInterfaceProps) {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeGroup = groups.find(g => g.id === activeChat);
  const chatMessages = messages.filter(m => m.groupId === activeChat);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className={`${isMobile ? 'fixed inset-0 h-screen' : 'h-[calc(100vh-8rem)]'} flex flex-col md:flex-row overflow-hidden`}>
      {/* Left Panel - Groups List */}
      <div className={`${isMobile ? 'w-full' : 'w-1/3'} border-r bg-background flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBackToMain}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-lg font-semibold">Study Groups</h2>
          </div>
        </div>
        
        {/* Search */}
        <div className="p-4 border-b">
          <Input
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Groups List */}
        <ScrollArea className="flex-1">
          <div className="space-y-1">
            {filteredGroups.filter(group => joinedGroups.has(group.id)).map((group) => (
              <div
                key={group.id}
                className={`p-4 cursor-pointer hover:bg-muted/50 border-b ${
                  activeChat === group.id ? 'bg-muted' : ''
                }`}
                onClick={() => onSetActiveChat(group.id)}
              >
                <div className="flex items-start gap-3">
                  {group.icon ? (
                    <img 
                      src={group.icon} 
                      alt={`${group.name} icon`}
                      className="w-12 h-12 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        onShowGroupDetails();
                      }}
                    />
                  ) : (
                    <div 
                      className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        onShowGroupDetails();
                      }}
                    >
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium truncate">{group.name}</h3>
                      <span className="text-xs text-muted-foreground">{group.lastMessageTime}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate mt-1">
                      {group.lastMessage}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{group.members} members</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right Panel - Chat Area */}
      {!isMobile && (
        <div className="flex-1 flex flex-col min-w-0">
          {activeChat && activeGroup ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b bg-background">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {activeGroup.icon ? (
                      <img 
                        src={activeGroup.icon} 
                        alt={`${activeGroup.name} icon`}
                        className="w-10 h-10 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={onShowGroupDetails}
                      />
                    ) : (
                      <div 
                        className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors"
                        onClick={onShowGroupDetails}
                      >
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-medium">{activeGroup.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {activeGroup.members} members • {activeGroup.semester}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onCopyGroupLink(activeGroup.link)}
                    >
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onLeaveGroup(activeChat)}
                    >
                      Leave Group
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {chatMessages.map((msg) => (
                    <EnhancedChatMessage
                      key={msg.id}
                      id={msg.id}
                      message={msg.message}
                      sender={msg.sender}
                      time={msg.time}
                      avatar={msg.avatar}
                      type={msg.type}
                      readCount={msg.readCount}
                      totalMembers={msg.totalMembers}
                      isOwn={msg.sender === "You"}
                    />
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div 
                className="border-t p-4 bg-background"
                style={{ marginBottom: keyboardHeight }}
              >
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={onShowMediaShare}
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => onNewMessageChange(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1"
                    />
                    <Button onClick={onSendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Select a group to start chatting</h3>
                <p>Choose a study group from the sidebar to view messages</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}