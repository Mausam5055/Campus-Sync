import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ModernCalendar } from "@/components/ui/modern-calendar";
import { cn } from "@/lib/utils";

interface Transaction {
  id: number;
  category: string;
  amount: number;
  type: "expense" | "income";
  date: string;
  description: string;
}

interface AddExpenseDialogProps {
  onAddTransaction: (transaction: Omit<Transaction, "id">) => void;
}

const expenseCategories = [
  "🍕 Food & Dining",
  "🚌 Transportation", 
  "📚 Books & Study Materials",
  "🎬 Entertainment",
  "🎓 Tuition & Fees",
  "✏️ Stationery",
  "🏠 Hostel & Accommodation",
  "👕 Clothing",
  "🏥 Health & Medical",
  "📱 Mobile & Internet",
  "🎯 Sports & Recreation",
  "🍕 Snacks & Beverages",
  "💻 Tech & Gadgets",
  "🎨 Hobbies",
  "🚨 Emergency",
  "📋 Other"
];

const incomeCategories = [
  "💰 Pocket Money",
  "💼 Part-time Job",
  "🎓 Scholarship",
  "🏆 Competition Prize",
  "💵 Freelancing",
  "🎁 Birthday/Festival Money",
  "📈 Investment Returns",
  "🤝 Loan from Friends/Family",
  "💻 Online Work",
  "📚 Tutoring",
  "📋 Other Income"
];

export function AddExpenseDialog({ onAddTransaction }: AddExpenseDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    type: "expense" as "expense" | "income",
    description: "",
    date: new Date(),
    recurringType: "none" as "none" | "daily" | "weekly" | "monthly",
    tags: [] as string[]
  });
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [customTag, setCustomTag] = useState("");

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }
    if (!formData.category) {
      newErrors.category = "Please select a category";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Please enter a description";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const transaction: Omit<Transaction, "id"> = {
      amount: parseFloat(formData.amount),
      category: formData.category,
      type: formData.type,
      description: formData.description.trim(),
      date: format(formData.date, "yyyy-MM-dd")
    };

    onAddTransaction(transaction);
    
    // Reset form
    setFormData({
      amount: "",
      category: "",
      type: "expense",
      description: "",
      date: new Date(),
      recurringType: "none",
      tags: []
    });
    setErrors({});
    setCustomTag("");
    setOpen(false);
  };

  const resetForm = () => {
    setFormData({
      amount: "",
      category: "",
      type: "expense",
      description: "",
      date: new Date(),
      recurringType: "none",
      tags: []
    });
    setErrors({});
    setCustomTag("");
  };

  const addTag = () => {
    if (customTag.trim() && !formData.tags.includes(customTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, customTag.trim()]
      }));
      setCustomTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const currentCategories = formData.type === "expense" ? expenseCategories : incomeCategories;

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      setOpen(newOpen);
      if (!newOpen) resetForm();
    }}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {formData.type === "expense" ? "💸" : "💰"} Add New {formData.type === "expense" ? "Expense" : "Income"}
          </DialogTitle>
          <DialogDescription>
            Track your {formData.type === "expense" ? "spending" : "earnings"} and manage your student budget effectively.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Transaction Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select 
              value={formData.type} 
              onValueChange={(value: "expense" | "income") => 
                setFormData(prev => ({ ...prev, type: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="expense">💸 Expense</SelectItem>
                <SelectItem value="income">💰 Income</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              className={errors.amount ? "border-red-500" : ""}
            />
            {errors.amount && <p className="text-sm text-red-500">{errors.amount}</p>}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {currentCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label>Date</Label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <ModernCalendar
                  selected={formData.date}
                  onDateSelect={(date) => {
                    if (date) {
                      setFormData(prev => ({ ...prev, date }));
                      setCalendarOpen(false);
                    }
                  }}
                  className="w-full"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="What did you spend on?"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className={errors.description ? "border-red-500" : ""}
              rows={3}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
          </div>

          {/* Recurring Transaction */}
          <div className="space-y-2">
            <Label htmlFor="recurring">Recurring</Label>
            <Select 
              value={formData.recurringType} 
              onValueChange={(value: "none" | "daily" | "weekly" | "monthly") => 
                setFormData(prev => ({ ...prev, recurringType: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">🚫 One-time</SelectItem>
                <SelectItem value="daily">📅 Daily</SelectItem>
                <SelectItem value="weekly">📆 Weekly</SelectItem>
                <SelectItem value="monthly">🗓️ Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (Optional)</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add custom tag"
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} variant="outline" size="sm">
                Add
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {formData.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs flex items-center gap-1"
                  >
                    {tag}
                    <button 
                      type="button" 
                      onClick={() => removeTag(tag)}
                      className="text-primary/70 hover:text-primary"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {formData.type === "expense" ? "💸 Add Expense" : "💰 Add Income"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}