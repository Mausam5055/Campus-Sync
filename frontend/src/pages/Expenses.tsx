import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChartTooltip } from "@/components/ui/chart";
import { ModernCalendar } from "@/components/ui/modern-calendar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, TrendingDown, TrendingUp, Calendar as CalendarIcon, Search, Download, Plus, Utensils, Bus, GraduationCap, Film, Book, Lightbulb, Target, TrendingUp as Growth, Filter, SortAsc, SortDesc } from "lucide-react";
import { usePageLoading } from "@/hooks/use-page-loading";
import { GenericPageSkeleton } from "@/components/ui/page-skeleton";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer, AreaChart, Area, ComposedChart } from "recharts";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, parseISO, subMonths, addDays, startOfYear, endOfYear, getMonth, getYear, eachMonthOfInterval } from "date-fns";
import { useState, useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AddExpenseDialog } from "@/components/expenses/AddExpenseDialog";
import { EditExpenseDialog } from "@/components/expenses/EditExpenseDialog";
import { TransactionItem } from "@/components/expenses/TransactionItem";
import { toast } from "sonner";

interface Transaction {
  id: number;
  category: string;
  amount: number;
  type: "expense" | "income";
  date: string;
  description: string;
}

const Expenses = () => {
  const isLoading = usePageLoading();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [dateRange, setDateRange] = useState<string>("month");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'category'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'overview' | 'calendar' | 'analytics'>('overview');
  const [quickFilterOpen, setQuickFilterOpen] = useState(false);

  // State for transactions (using local state for dummy functionality)
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, category: "Food", amount: 240, type: "expense", date: "2025-01-15", description: "Canteen lunch & snacks" },
    { id: 2, category: "Transport", amount: 85, type: "expense", date: "2025-01-15", description: "Auto to college" },
    { id: 3, category: "Books", amount: 1200, type: "expense", date: "2025-01-14", description: "Engineering textbooks" },
    { id: 4, category: "Food", amount: 180, type: "expense", date: "2025-01-14", description: "Tea & samosas" },
    { id: 5, category: "Entertainment", amount: 350, type: "expense", date: "2025-01-13", description: "Movie with friends" },
    { id: 6, category: "Pocket Money", amount: 5000, type: "income", date: "2025-01-12", description: "Monthly allowance from home" },
    { id: 7, category: "Food", amount: 450, type: "expense", date: "2025-01-12", description: "Hostel mess fee" },
    { id: 8, category: "Transport", amount: 120, type: "expense", date: "2025-01-11", description: "Ola ride to mall" },
    { id: 9, category: "Stationery", amount: 280, type: "expense", date: "2025-01-10", description: "Notebooks & pens" },
    { id: 10, category: "Entertainment", amount: 199, type: "expense", date: "2025-01-09", description: "Netflix subscription" },
    { id: 11, category: "Tuition", amount: 1500, type: "expense", date: "2025-01-08", description: "Extra classes fee" },
    { id: 12, category: "Food", amount: 320, type: "expense", date: "2025-01-07", description: "Pizza night with roommates" },
    { id: 13, category: "Food", amount: 180, type: "expense", date: "2024-12-28", description: "Coffee with friends" },
    { id: 14, category: "Transport", amount: 95, type: "expense", date: "2024-12-27", description: "Bus fare" },
    { id: 15, category: "Entertainment", amount: 299, type: "expense", date: "2024-12-25", description: "Christmas celebration" },
    { id: 16, category: "Pocket Money", amount: 4500, type: "income", date: "2024-12-15", description: "Monthly allowance" },
    { id: 17, category: "Books", amount: 800, type: "expense", date: "2024-11-20", description: "Reference books" },
    { id: 18, category: "Food", amount: 320, type: "expense", date: "2024-11-18", description: "Restaurant dinner" },
    { id: 19, category: "Transport", amount: 150, type: "expense", date: "2024-11-15", description: "Monthly bus pass" },
    { id: 20, category: "Pocket Money", amount: 4500, type: "income", date: "2024-11-10", description: "Monthly allowance" },
  ]);

  // Generate monthly data from transactions
  const monthlyData = useMemo(() => {
    const months = eachMonthOfInterval({
      start: subMonths(new Date(), 11),
      end: new Date()
    });

    const data = months.map(month => {
      const monthTransactions = transactions.filter(t => {
        const transactionDate = parseISO(t.date);
        return getMonth(transactionDate) === getMonth(month) && 
               getYear(transactionDate) === getYear(month);
      });

      const income = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const expenses = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        month: format(month, 'MMM'),
        income,
        expenses,
        savings: income - expenses
      };
    });

    // Add some debug info
    console.log('Monthly data:', data);
    return data;
  }, [transactions]);

  // College-relevant category breakdown
  const categoryData = [
    { name: "Food", value: 1190, percentage: 24, icon: Utensils },
    { name: "Books", value: 1200, percentage: 25, icon: GraduationCap },
    { name: "Transport", value: 205, percentage: 4, icon: Bus },
    { name: "Entertainment", value: 549, percentage: 11, icon: Film },
    { name: "Tuition", value: 1500, percentage: 31, icon: Book },
    { name: "Stationery", value: 280, percentage: 6, icon: Lightbulb },
  ];

  // Generate daily trend data from actual transactions
  const dailyTrendData = useMemo(() => {
    const currentMonth = selectedDate || new Date();
    const days = eachDayOfInterval({
      start: startOfMonth(currentMonth),
      end: endOfMonth(currentMonth)
    });

    const data = days.map(day => {
      const dayTransactions = transactions.filter(t => 
        isSameDay(parseISO(t.date), day) && t.type === 'expense'
      );
      
      const totalAmount = dayTransactions.reduce((sum, t) => sum + t.amount, 0);
      
      return {
        day: format(day, 'd'),
        date: format(day, 'yyyy-MM-dd'),
        amount: totalAmount,
        transactionCount: dayTransactions.length,
        transactions: dayTransactions
      };
    });

    // Add debug info
    console.log('Daily trend data:', data);
    return data;
  }, [transactions, selectedDate]);

  // Chart colors with proper HSL values
  const chartConfig = {
    income: { label: "Income", color: "hsl(var(--color-income))" },
    expenses: { label: "Expenses", color: "hsl(var(--color-expenses))" },
    savings: { label: "Savings", color: "hsl(var(--color-savings))" },
    amount: { label: "Amount", color: "hsl(var(--color-amount))" },
  };

  const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];

  // Smart insights calculations
  const totalExpenses = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  const totalIncome = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const averageDailyExpense = Math.round(totalExpenses / 31);
  const mostExpensiveDay = "Jan 14";
  const mostCommonCategory = "Food & Tuition";
  const daysWithZeroSpending = 8;
  const savingsRate = Math.round(((totalIncome - totalExpenses) / totalIncome) * 100);

  // CRUD Functions
  const handleAddTransaction = (newTransaction: Omit<Transaction, "id">) => {
    const id = Math.max(...transactions.map(t => t.id), 0) + 1;
    const transaction: Transaction = { ...newTransaction, id };
    setTransactions(prev => [transaction, ...prev]);
    toast.success("Transaction added successfully!");
  };

  const handleUpdateTransaction = (updatedTransaction: Transaction) => {
    setTransactions(prev => 
      prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t)
    );
    toast.success("Transaction updated successfully!");
  };

  const handleDeleteTransaction = (id: number) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    toast.success("Transaction deleted successfully!");
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setEditDialogOpen(true);
  };

  // Filtered and searched transactions
  const filteredTransactions = useMemo(() => {
    let filtered = transactions.filter(transaction => {
      // Category filter
      if (selectedCategory !== "all") {
        const categoryMatch = transaction.category.toLowerCase().includes(selectedCategory.toLowerCase());
        if (!categoryMatch) return false;
      }
      
      // Search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        return (
          transaction.description.toLowerCase().includes(searchLower) ||
          transaction.category.toLowerCase().includes(searchLower) ||
          transaction.amount.toString().includes(searchQuery)
        );
      }
      
      return true;
    });

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'amount':
          aValue = a.amount;
          bValue = b.amount;
          break;
        case 'category':
          aValue = a.category;
          bValue = b.category;
          break;
        case 'date':
        default:
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [transactions, selectedCategory, searchQuery, sortBy, sortOrder]);

  // Filter transactions by selected date
  const selectedDayTransactions = selectedDate 
    ? filteredTransactions.filter(t => isSameDay(new Date(t.date), selectedDate))
    : [];

  // Export function
  const handleExportData = () => {
    const csvContent = [
      ["Date", "Category", "Type", "Amount", "Description"],
      ...transactions.map(t => [
        t.date,
        t.category,
        t.type,
        t.amount.toString(),
        t.description
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `expenses_${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Data exported successfully!");
  };

  if (isLoading) {
    return <GenericPageSkeleton />
  }

  return (
    <div className="space-y-6 w-full max-w-full overflow-x-hidden">
      {/* Header with filters and view modes */}
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
          <div>
            <h1 className="mobile-heading font-bold tracking-tight">Smart Expense Tracker</h1>
          </div>
          <div className="flex items-center gap-2">
            <AddExpenseDialog onAddTransaction={handleAddTransaction} />
            <Button variant="outline" onClick={handleExportData}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* View Mode Tabs */}
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as typeof viewMode)} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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
            <Popover open={quickFilterOpen} onOpenChange={setQuickFilterOpen}>
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
                    <Select value={sortBy} onValueChange={(value: 'date' | 'amount' | 'category') => setSortBy(value)}>
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
                    <Select value={sortOrder} onValueChange={(value: 'asc' | 'desc') => setSortOrder(value)}>
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
          </div>

          <TabsContent value="overview" className="mt-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card className="bg-gradient-to-br from-green-500/20 via-green-500/10 to-transparent border-green-200/30">
                <CardHeader className="pb-2 space-y-0">
                  <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                    <span className="hidden sm:inline">Monthly Income</span>
                    <span className="sm:hidden">Income</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl sm:text-3xl font-bold text-green-600">₹{totalIncome.toLocaleString()}</div>
                  <p className="text-xs sm:text-sm text-muted-foreground">pocket money</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-red-500/20 via-red-500/10 to-transparent border-red-200/30">
                <CardHeader className="pb-2 space-y-0">
                  <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                    <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                    <span className="hidden sm:inline">Total Spent</span>
                    <span className="sm:hidden">Spent</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl sm:text-3xl font-bold text-red-600">₹{totalExpenses.toLocaleString()}</div>
                  <p className="text-xs sm:text-sm text-muted-foreground">this month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-transparent border-blue-200/30">
                <CardHeader className="pb-2 space-y-0">
                  <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                    <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                    <span className="hidden sm:inline">Remaining</span>
                    <span className="sm:hidden">Left</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl sm:text-3xl font-bold text-blue-600">₹{(totalIncome - totalExpenses).toLocaleString()}</div>
                  <p className="text-xs sm:text-sm text-muted-foreground">to spend</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-transparent border-purple-200/30">
                <CardHeader className="pb-2 space-y-0">
                  <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                    <Target className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
                    <span className="hidden sm:inline">Savings Rate</span>
                    <span className="sm:hidden">Savings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl sm:text-3xl font-bold text-purple-600">{savingsRate}%</div>
                  <p className="text-xs sm:text-sm text-muted-foreground">of income</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {filteredTransactions.slice(0, 3).map((transaction) => (
                      <div key={transaction.id} className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium truncate">{transaction.description}</p>
                          <p className="text-xs text-muted-foreground">{transaction.category}</p>
                        </div>
                        <div className={`text-sm font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Top Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categoryData.slice(0, 3).map((category) => (
                      <div key={category.name} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <category.icon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{category.name}</span>
                        </div>
                        <div className="text-sm font-medium">₹{category.value}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Smart Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      {savingsRate > 20 ? 'Great savings rate!' : 'Consider saving more'}
                    </p>
                    <p className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-blue-500" />
                      Daily avg: ₹{averageDailyExpense}
                    </p>
                    <p className="flex items-center gap-2">
                      <Growth className="h-4 w-4 text-purple-500" />
                      {mostCommonCategory} spending
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
               {/* Monthly Trends */}
                <Card>
                 <CardHeader>
                   <CardTitle>📈 Monthly Trends</CardTitle>
                 </CardHeader>
                 <CardContent>
                    <div className="h-[250px] sm:h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={monthlyData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                         <XAxis 
                           dataKey="month" 
                           fontSize={12}
                           axisLine={false}
                           tickLine={false}
                           tick={{ fill: 'currentColor' }}
                         />
                          <YAxis 
                            fontSize={9} 
                            width={35}
                            tickFormatter={(value) => `₹${value > 1000 ? (value/1000).toFixed(0) + 'k' : value}`}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'currentColor' }}
                          />
                         <ChartTooltip 
                           content={({ active, payload, label }) => {
                             if (active && payload && payload.length) {
                               return (
                                 <div className="bg-background border rounded-lg p-3 shadow-md">
                                   <p className="font-medium">{label}</p>
                                   {payload.map((entry, index) => (
                                     <p key={index} style={{ color: entry.color }}>
                                       {entry.name}: ₹{entry.value}
                                     </p>
                                   ))}
                                 </div>
                               );
                             }
                             return null;
                           }}
                         />
                         <Bar dataKey="expenses" fill="#ef4444" name="Expenses" radius={[4, 4, 0, 0]} />
                         <Line type="monotone" dataKey="savings" stroke="#3b82f6" name="Savings" strokeWidth={3} dot={{ r: 4, fill: "#3b82f6" }} />
                       </ComposedChart>
                     </ResponsiveContainer>
                   </div>
                 </CardContent>
               </Card>

              {/* Category Breakdown */}
               <Card>
                <CardHeader>
                  <CardTitle>🎯 Category Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                   <div className="h-[250px] sm:h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, percentage }) => `${name}: ${percentage}%`}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <ChartTooltip 
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-background border rounded-lg p-3 shadow-md">
                                  <p className="font-medium">{data.name}</p>
                                  <p style={{ color: payload[0].color }}>
                                    Amount: ₹{data.value}
                                  </p>
                                  <p>Percentage: {data.percentage}%</p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Enhanced Calendar */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Interactive Expense Calendar
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Click on dates to view daily expenses. Darker dates indicate higher spending.
                  </p>
                </CardHeader>
                <CardContent>
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal mb-4"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "MMMM yyyy") : "Select month"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <ModernCalendar
                        selected={selectedDate}
                        onDateSelect={(date) => {
                          setSelectedDate(date);
                          setCalendarOpen(false);
                        }}
                        highlightedDates={dailyTrendData
                          .filter(day => day.amount > 0)
                          .map(day => parseISO(day.date))
                        }
                        className="w-full"
                      />
                    </PopoverContent>
                  </Popover>

                  {/* Daily spending visualization */}
                  <div className="grid grid-cols-7 gap-1 text-center text-xs mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="font-medium p-2">{day}</div>
                    ))}
                     {dailyTrendData.map((day, index) => (
                       <div
                         key={index}
                         className={`
                           p-2 rounded cursor-pointer transition-colors text-foreground
                           ${day.amount === 0 ? 'bg-muted/30 text-muted-foreground' : 
                             day.amount <= averageDailyExpense ? 'bg-green-100 dark:bg-green-800/30 hover:bg-green-200 dark:hover:bg-green-700/40 text-green-900 dark:text-green-100' :
                             day.amount <= averageDailyExpense * 1.5 ? 'bg-yellow-100 dark:bg-yellow-800/30 hover:bg-yellow-200 dark:hover:bg-yellow-700/40 text-yellow-900 dark:text-yellow-100' :
                             'bg-red-100 dark:bg-red-800/30 hover:bg-red-200 dark:hover:bg-red-700/40 text-red-900 dark:text-red-100'
                           }
                           ${selectedDate && isSameDay(parseISO(day.date), selectedDate) ? 'ring-2 ring-primary' : ''}
                         `}
                         onClick={() => setSelectedDate(parseISO(day.date))}
                       >
                         <div className="font-medium">{day.day}</div>
                         <div className="text-xs">₹{day.amount}</div>
                       </div>
                     ))}
                  </div>

                  {/* Legend */}
                  <div className="flex justify-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-muted/30 rounded"></div>
                      <span>No expenses</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-100 rounded"></div>
                      <span>Low spending</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-yellow-100 rounded"></div>
                      <span>Moderate</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-red-100 rounded"></div>
                      <span>High spending</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Daily Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {selectedDate ? format(selectedDate, "MMM dd, yyyy") : "Select a Date"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedDayTransactions.length > 0 ? (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm font-medium">Total Spent</span>
                        <span className="font-bold text-red-600">
                          ₹{selectedDayTransactions.reduce((sum, t) => sum + (t.type === 'expense' ? t.amount : 0), 0)}
                        </span>
                      </div>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {selectedDayTransactions.map((transaction) => (
                          <TransactionItem
                            key={transaction.id}
                            transaction={transaction}
                            onEdit={handleEditTransaction}
                            onDelete={handleDeleteTransaction}
                            showDate={false}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">No expenses on this date</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Click on a date with expenses to view details
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            {/* Advanced Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Daily Trend Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>📈 Daily Spending Pattern</CardTitle>
                </CardHeader>
                <CardContent>
                   <div className="h-[250px] sm:h-[300px] w-full">
                     <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={dailyTrendData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                        <XAxis 
                          dataKey="day" 
                          fontSize={10}
                          tickLine={false}
                          axisLine={false}
                          tick={{ fill: 'currentColor' }}
                        />
                         <YAxis 
                           fontSize={9}
                           width={35}
                           tickLine={false}
                           axisLine={false}
                           tickFormatter={(value) => `₹${value > 1000 ? (value/1000).toFixed(0) + 'k' : value}`}
                           tick={{ fill: 'currentColor' }}
                         />
                        <ChartTooltip 
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-background border rounded-lg p-3 shadow-md">
                                  <p className="font-medium">Day {label}</p>
                                  <p style={{ color: payload[0].color }}>
                                    Amount: ₹{payload[0].value}
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="amount" 
                          stroke="#8b5cf6" 
                          fill="#8b5cf6" 
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Yearly Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>📊 Yearly Financial Overview</CardTitle>
                </CardHeader>
                <CardContent>
                   <div className="h-[250px] sm:h-[300px] w-full">
                     <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={monthlyData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                        <XAxis 
                          dataKey="month" 
                          fontSize={10}
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: 'currentColor' }}
                        />
                         <YAxis 
                           fontSize={9}
                           width={35}
                           tickFormatter={(value) => `₹${value > 1000 ? (value/1000).toFixed(0) + 'k' : value}`}
                           axisLine={false}
                           tickLine={false}
                           tick={{ fill: 'currentColor' }}
                         />
                        <ChartTooltip 
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-background border rounded-lg p-3 shadow-md">
                                  <p className="font-medium">{label}</p>
                                  {payload.map((entry, index) => (
                                    <p key={index} style={{ color: entry.color }}>
                                      {entry.name}: ₹{entry.value}
                                    </p>
                                  ))}
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Bar dataKey="income" fill="#10b981" name="Income" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="expenses" fill="#ef4444" name="Expenses" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Spending Insights */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>🔍 Smart Spending Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">₹{averageDailyExpense}</div>
                      <div className="text-sm text-muted-foreground">Daily Average</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{savingsRate}%</div>
                      <div className="text-sm text-muted-foreground">Savings Rate</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{mostCommonCategory}</div>
                      <div className="text-sm text-muted-foreground">Top Category</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Transactions List - Always Visible */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>💳 Recent Transactions</span>
              <Badge variant="secondary">
                {filteredTransactions.length} total
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredTransactions.slice(0, 15).map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                  onEdit={handleEditTransaction}
                  onDelete={handleDeleteTransaction}
                />
              ))}
              {filteredTransactions.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No transactions found</p>
                  <p className="text-sm">Try adjusting your filters or add a new transaction</p>
                </div>
              )}
              {filteredTransactions.length > 15 && (
                <div className="text-center pt-4">
                  <Button variant="outline" size="sm">
                    Load More ({filteredTransactions.length - 15} remaining)
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Transaction Dialog */}
      <EditExpenseDialog
        transaction={editingTransaction}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onUpdateTransaction={handleUpdateTransaction}
      />
    </div>
  );
};

export default Expenses;