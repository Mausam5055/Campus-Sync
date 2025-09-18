import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

interface CreateGroupDialogProps {
  onCreateGroup: (groupData: {
    name: string;
    description: string;
    semester: string;
    targetAudience: string;
  }) => void;
  userRole: string;
}

export function CreateGroupDialog({ onCreateGroup, userRole }: CreateGroupDialogProps) {
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupSemester, setGroupSemester] = useState("");
  const [targetAudience, setTargetAudience] = useState("");

  const semesters = [
    "Semester 1", "Semester 2", "Semester 3", "Semester 4", 
    "Semester 5", "Semester 6", "Semester 7", "Semester 8"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (groupName && groupDescription && groupSemester && targetAudience) {
      onCreateGroup({
        name: groupName,
        description: groupDescription,
        semester: groupSemester,
        targetAudience: targetAudience
      });
      setGroupName("");
      setGroupDescription("");
      setGroupSemester("");
      setTargetAudience("");
      setOpen(false);
    }
  };

  // Define available target audiences based on user role
  const getTargetAudienceOptions = () => {
    if (userRole === 'admin') {
      return [
        { value: 'student', label: 'Students' },
        { value: 'teacher', label: 'Teachers' },
        { value: 'admin', label: 'Administrators' },
        { value: 'admin-teacher', label: 'Administrators & Teachers' },
        { value: 'teacher-student', label: 'Teachers & Students' }
      ];
    } else if (userRole === 'teacher') {
      return [
        { value: 'student', label: 'Students' }
      ];
    }
    return [];
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Group
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Study Group</DialogTitle>
          <DialogDescription>
            Create a new study group to collaborate with your classmates and share learning resources.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="groupName">Group Name</Label>
            <Input
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="e.g., Computer Science - Sem 3"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="groupDescription">Description</Label>
            <Textarea
              id="groupDescription"
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              placeholder="Brief description of the group purpose"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="groupSemester">Semester</Label>
            <Select value={groupSemester} onValueChange={setGroupSemester} required>
              <SelectTrigger>
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>
              <SelectContent>
                {semesters.map((semester) => (
                  <SelectItem key={semester} value={semester}>
                    {semester}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="targetAudience">Target Audience</Label>
            <Select value={targetAudience} onValueChange={setTargetAudience} required>
              <SelectTrigger>
                <SelectValue placeholder="Select target audience" />
              </SelectTrigger>
              <SelectContent>
                {getTargetAudienceOptions().map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Group</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}