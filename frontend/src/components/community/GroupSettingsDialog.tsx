import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  Users, 
  Shield, 
  Bell, 
  Lock,
  Trash2,
  Save
} from "lucide-react";
import { useState } from "react";
import { IconUpload } from "./IconUpload";

interface GroupSettingsDialogProps {
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
    icon?: string;
  };
  onUpdateGroup: (groupId: string, updates: any) => void;
  onDeleteGroup: (groupId: string) => void;
}

export function GroupSettingsDialog({ 
  isOpen, 
  onClose, 
  group, 
  onUpdateGroup, 
  onDeleteGroup 
}: GroupSettingsDialogProps) {
  const [groupName, setGroupName] = useState(group.name);
  const [groupDescription, setGroupDescription] = useState(group.description);
  const [groupIcon, setGroupIcon] = useState(group.icon);
  const [allowInvites, setAllowInvites] = useState(true);
  const [requireApproval, setRequireApproval] = useState(false);
  const [allowMediaSharing, setAllowMediaSharing] = useState(true);
  const [muteNotifications, setMuteNotifications] = useState(false);

  const handleSaveSettings = () => {
    onUpdateGroup(group.id, {
      name: groupName,
      description: groupDescription,
      icon: groupIcon,
      settings: {
        allowInvites,
        requireApproval,
        allowMediaSharing,
        muteNotifications
      }
    });
    onClose();
  };

  const handleDeleteGroup = () => {
    if (window.confirm('Are you sure you want to delete this group? This action cannot be undone.')) {
      onDeleteGroup(group.id);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Settings className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Group Settings</h3>
              <p className="text-sm text-muted-foreground font-normal">
                Manage {group.name}
              </p>
            </div>
          </DialogTitle>
          <DialogDescription>
            Configure group settings, permissions, and preferences.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <IconUpload
              currentIcon={groupIcon}
              groupName={groupName}
              onIconUpdate={setGroupIcon}
            />
            
            <div>
              <Label htmlFor="groupName">Group Name</Label>
              <Input
                id="groupName"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter group name"
              />
            </div>
            
            <div>
              <Label htmlFor="groupDesc">Description</Label>
              <Textarea
                id="groupDesc"
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
                placeholder="Enter group description"
                rows={3}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm">Notifications</Label>
                <p className="text-xs text-muted-foreground">
                  Mute all notifications from this group
                </p>
              </div>
              <Switch
                checked={muteNotifications}
                onCheckedChange={setMuteNotifications}
              />
            </div>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Allow Member Invites
                </Label>
                <p className="text-xs text-muted-foreground">
                  Let members invite others to the group
                </p>
              </div>
              <Switch
                checked={allowInvites}
                onCheckedChange={setAllowInvites}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Require Approval
                </Label>
                <p className="text-xs text-muted-foreground">
                  New members need admin approval
                </p>
              </div>
              <Switch
                checked={requireApproval}
                onCheckedChange={setRequireApproval}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Media Sharing
                </Label>
                <p className="text-xs text-muted-foreground">
                  Allow members to share files and media
                </p>
              </div>
              <Switch
                checked={allowMediaSharing}
                onCheckedChange={setAllowMediaSharing}
              />
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="h-4 w-4" />
                <span>Group ID: {group.id}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Created: {new Date(group.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="pt-4 border-t border-destructive/20">
                <h4 className="text-sm font-medium text-destructive mb-2">Danger Zone</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  Permanently delete this group and all its messages. This action cannot be undone.
                </p>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={handleDeleteGroup}
                  className="w-full"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Group
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSaveSettings} className="flex-1">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}