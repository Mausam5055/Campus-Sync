import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, UserPlus, Settings, ExternalLink, Crown, UserMinus, MoreHorizontal } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  role: "admin" | "member";
  status: "online" | "offline" | "away";
  joinedAt: string;
}

interface GroupDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  group: {
    id: string;
    name: string;
    description: string;
    members: number;
    semester: string;
    createdAt: string;
    link: string;
  };
  onPromoteToAdmin?: (groupId: string, memberId: string) => void;
  onDemoteFromAdmin?: (groupId: string, memberId: string) => void;
  currentUserRole?: "admin" | "member";
}

export function GroupDetailsDialog({ 
  isOpen, 
  onClose, 
  group, 
  onPromoteToAdmin, 
  onDemoteFromAdmin, 
  currentUserRole = "member" 
}: GroupDetailsDialogProps) {
  const { toast } = useToast();

  // Mock data for group members
  const groupMembers: GroupMember[] = [
    { id: "1", name: "John Doe", avatar: "JD", role: "admin", status: "online", joinedAt: "2024-01-15" },
    { id: "2", name: "Jane Smith", avatar: "JS", role: "member", status: "online", joinedAt: "2024-01-16" },
    { id: "3", name: "Mike Johnson", avatar: "MJ", role: "member", status: "away", joinedAt: "2024-01-18" },
    { id: "4", name: "Sarah Wilson", avatar: "SW", role: "member", status: "offline", joinedAt: "2024-01-20" },
    { id: "5", name: "Alex Chen", avatar: "AC", role: "member", status: "online", joinedAt: "2024-01-22" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "away": return "bg-yellow-500";
      case "offline": return "bg-gray-400";
      default: return "bg-gray-400";
    }
  };

  const copyGroupLink = () => {
    navigator.clipboard.writeText(group.link);
    toast({
      title: "Link copied!",
      description: "Group invite link has been copied to clipboard.",
    });
  };

  const shareViaWhatsApp = () => {
    const text = `Join our study group: ${group.name}\n${group.description}\n${group.link}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareViaEmail = () => {
    const subject = `Join ${group.name} Study Group`;
    const body = `Hi!\n\nYou're invited to join our study group: ${group.name}\n\n${group.description}\n\nClick here to join: ${group.link}\n\nSee you there!`;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
  };

  const handlePromoteToAdmin = (memberId: string, memberName: string) => {
    if (onPromoteToAdmin) {
      onPromoteToAdmin(group.id, memberId);
      toast({
        title: "Admin promoted",
        description: `${memberName} has been promoted to admin.`,
      });
    }
  };

  const handleDemoteFromAdmin = (memberId: string, memberName: string) => {
    if (onDemoteFromAdmin) {
      onDemoteFromAdmin(group.id, memberId);
      toast({
        title: "Admin demoted",
        description: `${memberName} has been demoted to member.`,
      });
    }
  };

  const canManageMembers = currentUserRole === "admin";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{group.name}</h3>
              <p className="text-sm text-muted-foreground font-normal">
                {group.members} members • {group.semester}
              </p>
            </div>
          </DialogTitle>
          <DialogDescription>
            View group information, members, and manage group settings.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Group Description */}
          <div>
            <h4 className="font-medium mb-2">Description</h4>
            <p className="text-sm text-muted-foreground">{group.description}</p>
          </div>

          {/* Group Actions */}
          <div className="flex gap-2 flex-wrap">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={copyGroupLink}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Copy Link
                </DropdownMenuItem>
                <DropdownMenuItem onClick={shareViaWhatsApp}>
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  WhatsApp
                </DropdownMenuItem>
                <DropdownMenuItem onClick={shareViaEmail}>
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              Invite
            </Button>
          </div>

          {/* Members List */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Members ({groupMembers.length})
            </h4>
            <ScrollArea className="max-h-64">
              <div className="space-y-3">
                {groupMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="text-sm">
                          {member.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div 
                        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(member.status)}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium truncate">{member.name}</p>
                        {member.role === "admin" && (
                          <Badge variant="secondary" className="text-xs flex items-center gap-1">
                            <Crown className="h-3 w-3" />
                            Admin
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Joined {new Date(member.joinedAt).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-muted-foreground capitalize">
                        {member.status}
                      </div>
                      
                      {canManageMembers && member.id !== "1" && ( // Assuming user "1" is the current user/owner
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {member.role === "member" ? (
                              <DropdownMenuItem 
                                onClick={() => handlePromoteToAdmin(member.id, member.name)}
                              >
                                <Crown className="h-4 w-4 mr-2" />
                                Promote to Admin
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem 
                                onClick={() => handleDemoteFromAdmin(member.id, member.name)}
                              >
                                <UserMinus className="h-4 w-4 mr-2" />
                                Remove Admin
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="text-destructive">
                              <UserMinus className="h-4 w-4 mr-2" />
                              Remove Member
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}