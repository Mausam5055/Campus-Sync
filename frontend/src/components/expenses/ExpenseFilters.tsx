import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, Filter, SortAsc, SortDesc, Download } from "lucide-react";

interface ExpenseFiltersProps {
  searchQuery: string;
  selectedCategory: string;
  sortBy: 'date' | 'amount' | 'category';
  sortOrder: 'asc' | 'desc';
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onSortByChange: (sortBy: 'date' | 'amount' | 'category') => void;
  onSortOrderChange: (order: 'asc' | 'desc') => void;
  onExportData: () => void;
}

export function ExpenseFilters({
  searchQuery,
  selectedCategory,
  sortBy,
  sortOrder,
  onSearchChange,
  onCategoryChange,
  onSortByChange,
  onSortOrderChange,
  onExportData
}: ExpenseFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1 min-w-0">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      
      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="food">Food & Dining</SelectItem>
          <SelectItem value="transport">Transport</SelectItem>
          <SelectItem value="books">Books & Study</SelectItem>
          <SelectItem value="entertainment">Entertainment</SelectItem>
          <SelectItem value="tuition">Tuition</SelectItem>
          <SelectItem value="stationery">Stationery</SelectItem>
        </SelectContent>
      </Select>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full sm:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Sort & Filter
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Sort by</label>
              <Select value={sortBy} onValueChange={onSortByChange}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="amount">Amount</SelectItem>
                  <SelectItem value="category">Category</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Order</label>
              <Select value={sortOrder} onValueChange={onSortOrderChange}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">
                    <div className="flex items-center">
                      <SortDesc className="h-4 w-4 mr-2" />
                      Descending
                    </div>
                  </SelectItem>
                  <SelectItem value="asc">
                    <div className="flex items-center">
                      <SortAsc className="h-4 w-4 mr-2" />
                      Ascending
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      
      <Button variant="outline" onClick={onExportData}>
        <Download className="h-4 w-4 mr-2" />
        Export
      </Button>
    </div>
  );
}