import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Check, CheckCheck } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ReadReceipt {
  userId: string;
  userName: string;
  avatar: string;
  readAt: string;
}

interface MessageReadReceiptsProps {
  isOpen: boolean;
  onClose: () => void;
  messageId: string;
  readReceipts: ReadReceipt[];
  totalMembers: number;
}

export function MessageReadReceipts({ 
  isOpen, 
  onClose, 
  messageId, 
  readReceipts, 
  totalMembers 
}: MessageReadReceiptsProps) {
  const readCount = readReceipts.length;
  const unreadCount = totalMembers - readCount;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCheck className="h-5 w-5 text-blue-500" />
            Message Status
          </DialogTitle>
          <DialogDescription>
            See who has read this message and when.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Read Status Summary */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Read by</span>
            <span className="font-medium">{readCount} of {totalMembers}</span>
          </div>

          {/* Read Receipts List */}
          {readCount > 0 && (
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2 text-sm">
                <CheckCheck className="h-4 w-4 text-blue-500" />
                Read ({readCount})
              </h4>
              <ScrollArea className="max-h-48">
                <div className="space-y-2">
                  {readReceipts.map((receipt) => (
                    <div key={receipt.userId} className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">
                          {receipt.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{receipt.userName}</p>
                        <p className="text-xs text-muted-foreground">
                          Read at {new Date(receipt.readAt).toLocaleTimeString()}
                        </p>
                      </div>
                      <CheckCheck className="h-4 w-4 text-blue-500" />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {/* Unread Count */}
          {unreadCount > 0 && (
            <div className="pt-2 border-t">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Check className="h-4 w-4" />
                {unreadCount} member{unreadCount !== 1 ? 's' : ''} haven't read yet
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}