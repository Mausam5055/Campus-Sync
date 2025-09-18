import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { BookOpen } from "lucide-react"

interface BranchSelectorProps {
  selectedBranch: string
  onBranchChange: (branch: string) => void
  branches: string[]
  itemCounts?: Record<string, number>
}

export function BranchSelector({ selectedBranch, onBranchChange, branches, itemCounts }: BranchSelectorProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <div className="flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Filter by Branch:</span>
      </div>
      
      <Select value={selectedBranch} onValueChange={onBranchChange}>
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Select branch" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            <div className="flex items-center justify-between w-full gap-2">
              <span>All Branches</span>
              {itemCounts && (
                <Badge variant="secondary" className="text-xs">
                  {Object.values(itemCounts).reduce((a, b) => a + b, 0)}
                </Badge>
              )}
            </div>
          </SelectItem>
          {branches.map((branch) => (
            <SelectItem key={branch} value={branch}>
              <div className="flex items-center justify-between w-full gap-2">
                <span>{branch}</span>
                {itemCounts && itemCounts[branch] && (
                  <Badge variant="secondary" className="text-xs">
                    {itemCounts[branch]}
                  </Badge>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}