import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, MessageCircle, Calendar, ArrowLeft, Search, Share2, MoreVertical, Plus, Paperclip, Send } from "lucide-react";
import { usePageLoading } from "@/hooks/use-page-loading";
import { GenericPageSkeleton } from "@/components/ui/page-skeleton";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { GroupCard } from "@/components/community/GroupCard";
import { ChatInterface } from "@/components/community/ChatInterface";
import { CreateGroupDialog } from "@/components/community/CreateGroupDialog";
import { GroupDetailsDialog } from "@/components/community/GroupDetailsDialog";
import { MediaShareDialog } from "@/components/community/MediaShareDialog";
import { GroupSettingsDialog } from "@/components/community/GroupSettingsDialog";
import { EnhancedChatMessage } from "@/components/community/EnhancedChatMessage";
import { useAuth } from "@/contexts/AuthContext";

const Community = () => {
  const isLoading = usePageLoading();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");
  const [newGroupSemester, setNewGroupSemester] = useState("");
  const [chatMode, setChatMode] = useState(false);
  const [showGroupDetails, setShowGroupDetails] = useState(false);
  const [showMediaShare, setShowMediaShare] = useState(false);
  const [showGroupSettings, setShowGroupSettings] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [joinedGroups, setJoinedGroups] = useState<Set<string>>(new Set(['1'])); // User starts joined to group 1

  useEffect(() => {
    const handleViewportChange = () => {
      if (!window.visualViewport) return;
      const vv = window.visualViewport;
      const overlap = Math.max(0, window.innerHeight - (vv.height + vv.offsetTop));
      setKeyboardHeight(overlap > 80 ? overlap : 0);
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportChange);
      window.visualViewport.addEventListener('scroll', handleViewportChange);
      handleViewportChange();
      return () => {
        window.visualViewport?.removeEventListener('resize', handleViewportChange);
        window.visualViewport?.removeEventListener('scroll', handleViewportChange);
      };
    }
  }, []);

  const semesters = [
    "Semester 1", "Semester 2", "Semester 3", "Semester 4", 
    "Semester 5", "Semester 6", "Semester 7", "Semester 8"
  ];

  const groups = [
    { 
      id: "1",
      name: "Computer Science - Sem 3", 
      members: 24, 
      active: true, 
      semester: "Semester 3",
      description: "Discussion group for CS third semester students",
      link: "https://community.com/cs-sem3",
      lastMessage: "Hey everyone! Anyone solved the algorithm assignment?",
      lastMessageTime: "10:40 AM",
      createdAt: "2024-01-15",
      icon: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=400&fit=crop&crop=face",
      targetAudience: "student",
      createdBy: "admin"
    },
    { 
      id: "2",
      name: "Mathematics - Sem 2", 
      members: 18, 
      active: false, 
      semester: "Semester 2",
      description: "Math study group for second semester",
      link: "https://community.com/math-sem2",
      lastMessage: "Thanks for the calculus notes!",
      lastMessageTime: "Yesterday",
      createdAt: "2024-01-10",
      icon: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face",
      targetAudience: "student",
      createdBy: "teacher"
    },
    { 
      id: "3",
      name: "Physics Lab - Sem 4", 
      members: 31, 
      active: true, 
      semester: "Semester 4",
      description: "Physics lab discussion and help",
      link: "https://community.com/physics-sem4",
      lastMessage: "Lab report submission deadline is tomorrow",
      lastMessageTime: "2:15 PM",
      createdAt: "2024-01-20",
      icon: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop&crop=face",
      targetAudience: "student",
      createdBy: "admin"
    },
    { 
      id: "4",
      name: "Engineering Drawing - Sem 1", 
      members: 45, 
      active: true, 
      semester: "Semester 1",
      description: "Help with technical drawing assignments",
      link: "https://community.com/ed-sem1",
      lastMessage: "Can someone explain projection methods?",
      lastMessageTime: "9:30 AM",
      createdAt: "2024-01-05",
      icon: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=400&fit=crop&crop=face",
      targetAudience: "student",
      createdBy: "teacher"
    },
    { 
      id: "5",
      name: "Faculty Meeting - Q1", 
      members: 8, 
      active: true, 
      semester: "All",
      description: "Quarterly faculty coordination meeting",
      link: "https://community.com/faculty-q1",
      lastMessage: "Next meeting agenda uploaded",
      lastMessageTime: "11:30 AM",
      createdAt: "2024-01-25",
      icon: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=400&fit=crop&crop=face",
      targetAudience: "admin-teacher",
      createdBy: "admin"
    },
    { 
      id: "6",
      name: "Department Heads Discussion", 
      members: 5, 
      active: true, 
      semester: "All",
      description: "Department coordination and planning",
      link: "https://community.com/dept-heads",
      lastMessage: "Budget planning for next semester",
      lastMessageTime: "Yesterday",
      createdAt: "2024-01-20",
      icon: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=400&fit=crop&crop=face",
      targetAudience: "admin-teacher",
      createdBy: "admin"
    },
    { 
      id: "7",
      name: "Administrative Team", 
      members: 3, 
      active: true, 
      semester: "All",
      description: "Internal admin coordination and policy discussions",
      link: "https://community.com/admin-team",
      lastMessage: "New policy draft ready for review",
      lastMessageTime: "2 hours ago",
      createdAt: "2024-01-15",
      icon: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      targetAudience: "admin",
      createdBy: "admin"
    },
    { 
      id: "8",
      name: "Academic Excellence Program", 
      members: 42, 
      active: true, 
      semester: "All",
      description: "Collaborative space for teachers and top-performing students",
      link: "https://community.com/academic-excellence",
      lastMessage: "Research project proposals due next week",
      lastMessageTime: "1 hour ago",
      createdAt: "2024-01-18",
      icon: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop&crop=face",
      targetAudience: "teacher-student",
      createdBy: "admin"
    }
  ];

  const [messages, setMessages] = useState([
    { 
      id: "1", 
      groupId: "1", 
      type: "text" as const,
      sender: "John Doe", 
      message: "Hey everyone! Anyone solved the algorithm assignment?", 
      time: "10:30 AM", 
      avatar: "JD",
      readCount: 15,
      totalMembers: 24
    },
    { 
      id: "2", 
      groupId: "1", 
      type: "text" as const,
      sender: "Jane Smith", 
      message: "Yes! I can help with that. Which part are you stuck on?", 
      time: "10:35 AM", 
      avatar: "JS",
      readCount: 12,
      totalMembers: 24
    },
    { 
      id: "3", 
      groupId: "1", 
      type: "text" as const,
      sender: "You", 
      message: "Thanks Jane! I'm having trouble with the sorting algorithm.", 
      time: "10:40 AM", 
      avatar: "YU",
      readCount: 8,
      totalMembers: 24
    },
    { 
      id: "system-1", 
      groupId: "1", 
      type: "system" as const,
      sender: "System", 
      message: "Alex Chen joined the group", 
      time: "10:45 AM", 
      avatar: "SY"
    },
    { 
      id: "4", 
      groupId: "2", 
      type: "text" as const,
      sender: "Mike Johnson", 
      message: "Thanks for the calculus notes!", 
      time: "Yesterday", 
      avatar: "MJ",
      readCount: 18,
      totalMembers: 18
    },
    { 
      id: "5", 
      groupId: "3", 
      type: "text" as const,
      sender: "Sarah Wilson", 
      message: "Lab report submission deadline is tomorrow", 
      time: "2:15 PM", 
      avatar: "SW",
      readCount: 25,
      totalMembers: 31
    },
    { 
      id: "6", 
      groupId: "4", 
      type: "text" as const,
      sender: "Alex Chen", 
      message: "Can someone explain projection methods?", 
      time: "9:30 AM", 
      avatar: "AC",
      readCount: 30,
      totalMembers: 45
    }
  ]);

  const filteredGroups = groups.filter(group => {
    const matchesSemester = selectedSemester === "all" || group.semester === selectedSemester;
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         group.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Role-based filtering
    const userRole = user?.role || 'student';
    if (userRole === 'student') {
      // Students can see student groups and teacher-student combined groups
      return matchesSemester && matchesSearch && 
             (group.targetAudience === 'student' || 
              group.targetAudience === 'teacher-student');
    } else if (userRole === 'teacher') {
      // Teachers can see student groups, teacher-only groups, admin-teacher groups, and teacher-student groups
      return matchesSemester && matchesSearch && 
             (group.targetAudience === 'student' || 
              group.targetAudience === 'teacher' || 
              group.targetAudience === 'admin-teacher' ||
              group.targetAudience === 'teacher-student');
    } else if (userRole === 'admin') {
      // Admins can see all groups
      return matchesSemester && matchesSearch;
    }
    
    return matchesSemester && matchesSearch;
  });

  const handleCreateGroup = (groupData: {
    name: string;
    description: string;
    semester: string;
    targetAudience: string;
  }) => {
    // In a real app, this would create the group via API
    console.log("Creating group:", groupData);
    toast({
      title: "Group created!",
      description: `Successfully created ${groupData.name} for ${groupData.targetAudience}s.`,
    });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && activeChat) {
      const currentTime = new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      
      const newMessageObj = {
        id: `user-${Date.now()}`,
        groupId: activeChat,
        type: "text" as const,
        sender: "You",
        message: newMessage.trim(),
        time: currentTime,
        avatar: "YU",
        readCount: 0,
        totalMembers: groups.find(g => g.id === activeChat)?.members || 0
      };
      
      setMessages(prev => [...prev, newMessageObj]);
      setNewMessage("");
      
      console.log("Message sent:", newMessageObj);
    }
  };

  const handleMediaShare = (type: string, content: any) => {
    // In a real app, this would upload and send the media
    console.log("Sharing media:", type, content);
    
    // Add system message for media sharing
    if (type === 'files') {
      console.log(`Shared ${content.length} file(s)`);
    } else if (type === 'location') {
      console.log("Shared location:", content.text);
    }
  };

  const copyGroupLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast({
      title: "Link copied!",
      description: "Group invite link has been copied to clipboard.",
    });
  };

  const handleUpdateGroup = (groupId: string, updates: any) => {
    // In a real app, this would update the group via API
    console.log("Updating group:", groupId, updates);
    toast({
      title: "Group updated!",
      description: "Group settings have been saved successfully.",
    });
  };

  const handleDeleteGroup = (groupId: string) => {
    // In a real app, this would delete the group via API
    console.log("Deleting group:", groupId);
    toast({
      title: "Group deleted",
      description: "The group has been permanently deleted.",
    });
  };

  const handlePromoteToAdmin = (groupId: string, memberId: string) => {
    // In a real app, this would promote the member via API
    console.log("Promoting member to admin:", { groupId, memberId });
  };

  const handleDemoteFromAdmin = (groupId: string, memberId: string) => {
    // In a real app, this would demote the admin via API
    console.log("Demoting admin to member:", { groupId, memberId });
  };

  const handleJoinChat = (groupId: string) => {
    if (!joinedGroups.has(groupId)) {
      setJoinedGroups(prev => new Set([...prev, groupId]));
      toast({
        title: "Joined group!",
        description: "You have successfully joined the study group.",
      });
    }
    setActiveChat(groupId);
    setChatMode(true);
    // Reset dialog states when entering chat mode
    setShowGroupDetails(false);
    setShowMediaShare(false);
    setShowGroupSettings(false);
  };

  const handleLeaveGroup = (groupId: string) => {
    setJoinedGroups(prev => {
      const newSet = new Set(prev);
      newSet.delete(groupId);
      return newSet;
    });
    setActiveChat(null);
    setChatMode(false);
    toast({
      title: "Left group",
      description: "You have left the study group.",
    });
  };

  const handleBackToMain = () => {
    setChatMode(false);
    setActiveChat(null);
    // Reset dialog states when going back to main view
    setShowGroupDetails(false);
    setShowMediaShare(false);
    setShowGroupSettings(false);
  };

  if (isLoading) {
    return <GenericPageSkeleton />
  }

  if (chatMode) {
    // WhatsApp-style chat interface
    return (
      <div className={`${isMobile ? 'fixed inset-0 h-screen' : 'h-[calc(100vh-8rem)]'} flex flex-col md:flex-row overflow-hidden`}>
        {/* Left Panel - Groups List */}
        <div className={`${isMobile ? 'w-full' : 'w-1/3'} border-r bg-background flex flex-col`}>
          {/* Header */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={handleBackToMain}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-lg font-semibold">Study Groups</h2>
            </div>
          </div>
          
          {/* Search */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search groups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
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
                  onClick={() => setActiveChat(group.id)}
                >
                 <div className="flex items-start gap-3">
                     {group.icon ? (
                       <img 
                         src={group.icon} 
                         alt={`${group.name} icon`}
                         className="w-12 h-12 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                         onClick={(e) => {
                           e.stopPropagation();
                           setShowGroupDetails(true);
                         }}
                       />
                     ) : (
                       <div 
                         className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors"
                         onClick={(e) => {
                           e.stopPropagation();
                           setShowGroupDetails(true);
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
                        <Badge variant={group.active ? "default" : "secondary"} className="text-xs">
                          {group.active ? "Active" : "Inactive"}
                        </Badge>
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
            {activeChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b bg-background">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       {groups.find(g => g.id === activeChat)?.icon ? (
                         <img 
                           src={groups.find(g => g.id === activeChat)?.icon} 
                           alt={`${groups.find(g => g.id === activeChat)?.name} icon`}
                           className="w-10 h-10 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                           onClick={(e) => {
                             e.stopPropagation();
                             setShowGroupDetails(true);
                           }}
                         />
                       ) : (
                         <div 
                           className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors"
                           onClick={(e) => {
                             e.stopPropagation();
                             setShowGroupDetails(true);
                           }}
                         >
                           <Users className="h-5 w-5 text-primary" />
                         </div>
                       )}
                       <div>
                         <h3 className="font-medium">{groups.find(g => g.id === activeChat)?.name}</h3>
                         <p className="text-sm text-muted-foreground">
                           {groups.find(g => g.id === activeChat)?.members} members • {groups.find(g => g.id === activeChat)?.semester}
                         </p>
                       </div>
                     </div>
                     <div className="flex gap-2">
                       <Button 
                         variant="outline" 
                         size="sm"
                         onClick={() => copyGroupLink(groups.find(g => g.id === activeChat)?.link || "")}
                       >
                         <Share2 className="h-4 w-4 mr-1" />
                         Share
                       </Button>
                       <Button 
                         variant="outline" 
                         size="sm"
                         onClick={() => handleLeaveGroup(activeChat)}
                       >
                         Leave Group
                       </Button>
                       <Button 
                         variant="ghost" 
                         size="sm"
                         onClick={() => setShowGroupSettings(true)}
                       >
                         <MoreVertical className="h-4 w-4" />
                       </Button>
                     </div>
                  </div>
                </div>

                {/* Messages Area */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-2">
                    {messages.filter(m => m.groupId === activeChat).map((message) => (
                      <EnhancedChatMessage
                        key={message.id}
                        id={message.id}
                        type={message.type}
                        sender={message.sender}
                        avatar={message.avatar}
                        message={message.message}
                        time={message.time}
                        isOwn={message.sender === 'You'}
                        readCount={message.readCount}
                        totalMembers={message.totalMembers}
                      />
                    ))}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t bg-background">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowMediaShare(true)}
                    >
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-medium mb-2">Select a Group</h3>
                  <p className="text-muted-foreground">Choose a study group to start chatting</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Mobile Chat View - Fixed layout with consistent heights */}
        {isMobile && activeChat && (
          <div className="fixed inset-0 bg-background z-50 flex flex-col h-screen">
            {/* Chat Header - Fixed height */}
            <div className="flex-shrink-0 border-b bg-background">
              <div className="flex items-center gap-2 p-3 h-16">
                <Button variant="ghost" size="sm" onClick={() => setActiveChat(null)} className="flex-shrink-0">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                 {groups.find(g => g.id === activeChat)?.icon ? (
                   <img 
                     src={groups.find(g => g.id === activeChat)?.icon} 
                     alt={`${groups.find(g => g.id === activeChat)?.name} icon`}
                     className="w-8 h-8 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
                     onClick={(e) => {
                       e.stopPropagation();
                       setShowGroupDetails(true);
                     }}
                   />
                 ) : (
                   <div 
                     className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors flex-shrink-0"
                     onClick={(e) => {
                       e.stopPropagation();
                       setShowGroupDetails(true);
                     }}
                   >
                     <Users className="h-4 w-4 text-primary" />
                   </div>
                 )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate text-sm">{groups.find(g => g.id === activeChat)?.name}</h3>
                  <p className="text-xs text-muted-foreground truncate">
                    {groups.find(g => g.id === activeChat)?.members} members
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyGroupLink(groups.find(g => g.id === activeChat)?.link || "")}
                    className="flex-shrink-0 px-2"
                  >
                    <Share2 className="h-3 w-3" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleLeaveGroup(activeChat)}
                    className="flex-shrink-0 px-2 text-xs"
                  >
                    Leave
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages Area - Takes remaining space above input */}
            <div className="flex-1 overflow-hidden pb-20">
              <ScrollArea className="h-full">
                <div className="p-3 space-y-2 pb-4">
                  {messages.filter(m => m.groupId === activeChat).map((message) => (
                    <EnhancedChatMessage
                      key={message.id}
                      id={message.id}
                      type={message.type}
                      sender={message.sender}
                      avatar={message.avatar}
                      message={message.message}
                      time={message.time}
                      isOwn={message.sender === 'You'}
                      readCount={message.readCount}
                      totalMembers={message.totalMembers}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Message Input - Fixed at bottom like Ask AI */}
            <div 
              className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur-sm p-4 z-50"
              style={{ 
                bottom: keyboardHeight > 0 ? `${keyboardHeight}px` : '0px',
                transition: 'bottom 0.2s ease-out'
              }}
            >
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMediaShare(true)}
                  className="flex-shrink-0"
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 text-base md:text-sm"
                  style={{ fontSize: '16px' }}
                />
                <Button onClick={handleSendMessage} className="flex-shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Chat Dialogs - Available in chat mode */}
        <GroupDetailsDialog
          isOpen={showGroupDetails}
          onClose={() => setShowGroupDetails(false)}
          group={groups.find(g => g.id === activeChat) || groups[0]}
          onPromoteToAdmin={handlePromoteToAdmin}
          onDemoteFromAdmin={handleDemoteFromAdmin}
          currentUserRole="admin"
        />
        
        <MediaShareDialog
          isOpen={showMediaShare}
          onClose={() => setShowMediaShare(false)}
          onShare={handleMediaShare}
        />

        <GroupSettingsDialog
          isOpen={showGroupSettings}
          onClose={() => setShowGroupSettings(false)}
          group={groups.find(g => g.id === activeChat) || groups[0]}
          onUpdateGroup={handleUpdateGroup}
          onDeleteGroup={handleDeleteGroup}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="mobile-heading font-bold">Community</h1>
          <p className="text-muted-foreground mobile-hide-description">Connect and collaborate with students, teachers, and administrators</p>
        </div>
        <div className="flex gap-2">
          {(user?.role === 'admin' || user?.role === 'teacher') && (
            <CreateGroupDialog 
              onCreateGroup={handleCreateGroup}
              userRole={user?.role || 'student'}
            />
          )}
          {user?.role === 'student' && (
            <p className="text-sm text-muted-foreground mt-2">
              Only teachers and admins can create groups. You can join existing groups below.
            </p>
          )}
        </div>
      </div>

      {/* Stats Cards - Mobile optimized */}
      <div className={`grid gap-4 ${isMobile ? 'grid-cols-3' : 'grid-cols-1 md:grid-cols-3'}`}>
        <Card className={isMobile ? 'p-3' : ''}>
          <CardHeader className={`pb-3 ${isMobile ? 'pb-2' : ''}`}>
            <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-sm flex-col gap-1' : 'text-lg'}`}>
              <Users className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
              {!isMobile && "My Groups"}
            </CardTitle>
          </CardHeader>
          <CardContent className={isMobile ? 'p-0 pt-2' : ''}>
            <div className={`font-bold ${isMobile ? 'text-xl text-center' : 'text-3xl'}`}>5</div>
            {!isMobile && <p className="text-sm text-muted-foreground">joined</p>}
          </CardContent>
        </Card>
        
        <Card className={isMobile ? 'p-3' : ''}>
          <CardHeader className={`pb-3 ${isMobile ? 'pb-2' : ''}`}>
            <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-sm flex-col gap-1' : 'text-lg'}`}>
              <MessageCircle className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
              {!isMobile && "Messages"}
            </CardTitle>
          </CardHeader>
          <CardContent className={isMobile ? 'p-0 pt-2' : ''}>
            <div className={`font-bold ${isMobile ? 'text-xl text-center' : 'text-3xl'}`}>12</div>
            {!isMobile && <p className="text-sm text-muted-foreground">unread</p>}
          </CardContent>
        </Card>

        <Card className={isMobile ? 'p-3' : ''}>
          <CardHeader className={`pb-3 ${isMobile ? 'pb-2' : ''}`}>
            <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-sm flex-col gap-1' : 'text-lg'}`}>
              <Calendar className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
              {!isMobile && "Events"}
            </CardTitle>
          </CardHeader>
          <CardContent className={isMobile ? 'p-0 pt-2' : ''}>
            <div className={`font-bold ${isMobile ? 'text-xl text-center' : 'text-3xl'}`}>3</div>
            {!isMobile && <p className="text-sm text-muted-foreground">upcoming</p>}
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="groups" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="groups">Study Groups</TabsTrigger>
          <TabsTrigger value="chat" onClick={() => setChatMode(true)}>Group Chat</TabsTrigger>
        </TabsList>

        <TabsContent value="groups" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search groups..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Semesters</SelectItem>
                {semesters.map((semester) => (
                  <SelectItem key={semester} value={semester}>
                    {semester}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Groups List */}
          <div className="space-y-3">
            {filteredGroups.map((group) => (
              <Card key={group.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">{group.name}</h3>
                        <Badge variant={group.active ? "default" : "secondary"}>
                          {group.active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{group.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{group.members} members</span>
                        <span>{group.semester}</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => copyGroupLink(group.link)}
                      >
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                      {joinedGroups.has(group.id) ? (
                        <Button 
                          size="sm"
                          variant="secondary"
                          onClick={() => handleJoinChat(group.id)}
                        >
                          Open Chat
                        </Button>
                      ) : (
                        <Button 
                          size="sm"
                          onClick={() => handleJoinChat(group.id)}
                        >
                          Join & Chat
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Enhanced Chat Dialogs */}
      <GroupDetailsDialog
        isOpen={showGroupDetails}
        onClose={() => setShowGroupDetails(false)}
        group={groups.find(g => g.id === activeChat) || groups[0]}
        onPromoteToAdmin={handlePromoteToAdmin}
        onDemoteFromAdmin={handleDemoteFromAdmin}
        currentUserRole="admin"
      />
      
      <MediaShareDialog
        isOpen={showMediaShare}
        onClose={() => setShowMediaShare(false)}
        onShare={handleMediaShare}
      />
    </div>
  );
};

export default Community;
