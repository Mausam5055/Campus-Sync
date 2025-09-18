import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface ModernCalendarProps {
  highlightedDates?: Date[];
  onDateSelect?: (date: Date | undefined) => void;
  showMiniCalendar?: boolean;
  selected?: Date;
  className?: string;
}

function ModernCalendar({
  highlightedDates = [],
  onDateSelect,
  showMiniCalendar = true,
  selected,
  className
}: ModernCalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState<Date>(new Date());

  const handleDateClick = (date: Date) => {
    onDateSelect?.(date);
  };

  const previousMonth = () => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const nextMonth = () => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const isHighlighted = (date: Date) => {
    return highlightedDates.some(highlightedDate => 
      date.toDateString() === highlightedDate.toDateString()
    );
  };

  const isToday = (date: Date) => {
    return date.toDateString() === new Date().toDateString();
  };

  const isSelected = (date: Date) => {
    return selected && date.toDateString() === selected.toDateString();
  };

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const currentYear = currentMonth.getFullYear();
  const currentMonthIndex = currentMonth.getMonth();

  // Generate calendar days
  const generateCalendarDays = () => {
    const firstDay = new Date(currentYear, currentMonthIndex, 1);
    const lastDay = new Date(currentYear, currentMonthIndex + 1, 0);
    const startDate = new Date(firstDay);
    
    // Adjust to start from Monday (0 = Sunday, 1 = Monday)
    const firstDayOfWeek = firstDay.getDay();
    const daysToSubtract = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    startDate.setDate(firstDay.getDate() - daysToSubtract);

    const days: Date[] = [];
    const totalCells = 42; // 6 weeks × 7 days

    for (let i = 0; i < totalCells; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className={cn("bg-background border rounded-xl shadow-lg overflow-hidden w-full max-w-sm mx-auto", className)}>
      {/* Main Calendar */}
      <div className="p-3 sm:p-6">
        {/* Header with navigation */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="text-sm sm:text-lg font-semibold text-foreground">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={previousMonth}
              className="h-8 w-8 p-0 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={nextMonth}
              className="h-8 w-8 p-0 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Week days header */}
        <div className="grid grid-cols-7 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="text-muted-foreground font-medium text-xs sm:text-sm h-6 sm:h-9 flex items-center justify-center">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-0">
          {calendarDays.map((date, index) => {
            const isCurrentMonth = date.getMonth() === currentMonthIndex;
            const todayClass = isToday(date);
            const selectedClass = isSelected(date);
            const highlightedClass = isHighlighted(date);

            return (
              <button
                key={index}
                onClick={() => handleDateClick(date)}
                className={cn(
                  "h-8 sm:h-12 w-full p-0 font-normal text-foreground relative text-xs sm:text-sm",
                  "hover:bg-accent hover:text-accent-foreground rounded-md",
                  "focus:bg-accent focus:text-accent-foreground transition-colors duration-200",
                  !isCurrentMonth && "text-muted-foreground/50 opacity-50",
                  selectedClass && "bg-primary text-primary-foreground hover:bg-primary/90",
                  todayClass && !selectedClass && "bg-accent text-accent-foreground font-semibold",
                  highlightedClass && !selectedClass && "bg-primary/20 text-primary font-medium"
                )}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mini Calendar Navigation */}
      {showMiniCalendar && (
        <div className="border-t bg-muted/30 p-2 sm:p-4">
          <div className="flex items-center justify-between text-xs overflow-x-auto gap-1">
            {monthNames.map((month, index) => (
              <button
                key={month}
                onClick={() => {
                  const newDate = new Date(currentYear, index);
                  setCurrentMonth(newDate);
                }}
                className={cn(
                  "px-1 sm:px-2 py-1 rounded-md transition-colors duration-200 text-xs whitespace-nowrap flex-shrink-0",
                  "hover:bg-accent hover:text-accent-foreground",
                  index === currentMonthIndex && "bg-primary text-primary-foreground"
                )}
              >
                {month}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

ModernCalendar.displayName = "ModernCalendar";

export { ModernCalendar };