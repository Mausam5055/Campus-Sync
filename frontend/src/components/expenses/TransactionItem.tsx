import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, Edit, Trash2, Utensils, Bus, GraduationCap, Film, Book, Lightbulb } from "lucide-react";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Transaction {
  id: number;
  category: string;
  amount: number;
  type: "expense" | "income";
  date: string;
  description: string;
}

interface TransactionItemProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: number) => void;
  showDate?: boolean;
}

const categoryIcons: Record<string, any> = {
  food: Utensils,
  transport: Bus,
  books: GraduationCap,
  entertainment: Film,
  tuition: Book,
  stationery: Lightbulb,
  default: DollarSign
};

export function TransactionItem({ transaction, onEdit, onDelete, showDate = true }: TransactionItemProps) {
  const CategoryIcon = categoryIcons[transaction.category.toLowerCase()] || categoryIcons.default;
  
  // Format amount for mobile - abbreviate large numbers
  const formatAmountForMobile = (amount: number) => {
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)}k`;
    }
    return amount.toString();
  };

  return (
    <div className="flex justify-between items-center p-2 sm:p-3 border rounded-lg hover:bg-muted/50 transition-colors group w-full max-w-full overflow-hidden">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 pr-1 sm:pr-2">
        <CategoryIcon className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground flex-shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="font-medium text-sm sm:text-base truncate">{transaction.description}</div>
          {showDate && (
            <div className="text-xs sm:text-sm text-muted-foreground">
              {format(new Date(transaction.date), "MMM dd, yyyy")}
            </div>
          )}
          <Badge variant={transaction.type === "income" ? "default" : "secondary"} className="mt-1 text-xs">
            {transaction.category}
          </Badge>
        </div>
      </div>
      
      <div className="flex items-center gap-0.5 sm:gap-2 flex-shrink-0 max-w-[35%] sm:max-w-none">
        <div className={`font-bold text-xs sm:text-sm md:text-base text-right ${transaction.type === "income" ? "text-green-600" : "text-red-600"} min-w-0`}>
          {/* Mobile view - abbreviated amount */}
          <div className="truncate sm:hidden">
            {transaction.type === "income" ? "+" : "-"}₹{formatAmountForMobile(transaction.amount)}
          </div>
          {/* Desktop view - full amount */}
          <div className="hidden sm:block truncate">
            {transaction.type === "income" ? "+" : "-"}₹{transaction.amount.toLocaleString()}
          </div>
        </div>
        
        <div className="flex gap-0.5 sm:gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onEdit(transaction)}
            className="h-6 w-6 sm:h-8 sm:w-8 p-0"
          >
            <Edit className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 sm:h-8 sm:w-8 p-0 text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-[90vw] sm:max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Transaction</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this transaction? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(transaction.id)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}