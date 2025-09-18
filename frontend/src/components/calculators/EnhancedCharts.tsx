import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, Line, LineChart, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, RadialBarChart, RadialBar } from "recharts";
import { TrendingUp, Award, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Enhanced GPA Trend Chart
export const GPATrendChart = ({ data }: { data: Array<{ semester: string; gpa: number }> }) => {
  const chartConfig = {
    gpa: {
      label: "GPA",
      color: "hsl(var(--primary))",
    },
  };

  const getGPAStatus = (gpa: number) => {
    if (gpa >= 3.8) return { status: "Excellent", color: "hsl(var(--success))" };
    if (gpa >= 3.5) return { status: "Very Good", color: "hsl(var(--primary))" };
    if (gpa >= 3.0) return { status: "Good", color: "hsl(var(--warning))" };
    return { status: "Needs Improvement", color: "hsl(var(--destructive))" };
  };

  const enhancedData = data.map(item => ({
    ...item,
    ...getGPAStatus(item.gpa)
  }));

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="h-5 w-5 text-primary" />
          Academic Progress
        </CardTitle>
        <CardDescription>Your GPA journey across semesters</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] sm:h-[250px] md:h-[300px] w-full">
          <AreaChart data={enhancedData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="gpaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
              </linearGradient>
              <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="hsl(var(--primary))" floodOpacity="0.3"/>
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.2} />
            <XAxis 
              dataKey="semester" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              className="text-xs"
            />
            <YAxis 
              domain={[0, 4.0]} 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              tickFormatter={(value) => value.toFixed(1)}
              className="text-xs"
              width={25}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent 
                  formatter={(value, name) => [
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span className="font-medium">{(value as number).toFixed(2)}</span>
                    </div>,
                    "GPA"
                  ]}
                  className="bg-background/95 backdrop-blur border shadow-lg rounded-lg"
                />
              }
            />
            <Area
              type="monotone"
              dataKey="gpa"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              fill="url(#gpaGradient)"
              filter="url(#dropShadow)"
              dot={{ 
                fill: "hsl(var(--primary))", 
                strokeWidth: 3, 
                r: 5,
                stroke: "hsl(var(--background))",
                filter: "url(#dropShadow)"
              }}
              activeDot={{ 
                r: 7, 
                fill: "hsl(var(--primary))",
                stroke: "hsl(var(--background))",
                strokeWidth: 3,
                filter: "url(#dropShadow)"
              }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

// Enhanced Grade Distribution Chart
export const GradeDistributionChart = ({ data }: { data: Array<{ grade: string; count: number }> }) => {
  const gradeColors = {
    "A+": "hsl(142, 76%, 36%)", "A": "hsl(142, 76%, 36%)", "A-": "hsl(142, 70%, 45%)",
    "B+": "hsl(45, 93%, 47%)", "B": "hsl(45, 93%, 47%)", "B-": "hsl(45, 85%, 55%)",
    "C+": "hsl(25, 95%, 53%)", "C": "hsl(25, 95%, 53%)", "C-": "hsl(25, 85%, 60%)",
    "D+": "hsl(0, 84%, 60%)", "D": "hsl(0, 84%, 60%)", "F": "hsl(0, 84%, 60%)"
  };

  const enhancedData = data.map((item, index) => ({
    ...item,
    fill: gradeColors[item.grade as keyof typeof gradeColors] || "hsl(var(--muted))",
    percentage: (item.count / data.reduce((sum, d) => sum + d.count, 0)) * 100
  }));

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Award className="h-5 w-5 text-primary" />
          Grade Distribution
        </CardTitle>
        <CardDescription>Your performance breakdown by grade</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Pie Chart */}
          <div className="flex justify-center md:justify-start">
            <ChartContainer config={{}} className="h-[180px] sm:h-[200px] md:h-[250px] w-full max-w-[250px]">
              <PieChart>
                <Pie
                  data={enhancedData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="count"
                >
                  {enhancedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip
                  content={
                    <ChartTooltipContent 
                      formatter={(value, name, props) => [
                        `${value} courses (${props.payload?.percentage?.toFixed(1)}%)`,
                        props.payload?.grade
                      ]}
                      className="bg-background/95 backdrop-blur border shadow-lg rounded-lg"
                    />
                  }
                />
              </PieChart>
            </ChartContainer>
          </div>

          {/* Grade Legend */}
          <div className="space-y-3">
            {enhancedData.map((item) => (
              <div key={item.grade} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full shadow-sm"
                    style={{ backgroundColor: item.fill }}
                  />
                  <span className="font-medium text-sm">{item.grade}</span>
                </div>
                <div className="text-right">
                  <div className="font-medium text-sm">{item.count}</div>
                  <div className="text-xs text-muted-foreground">{item.percentage.toFixed(1)}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Enhanced Assignment Performance Chart
export const AssignmentPerformanceChart = ({ data }: { data: Array<{ name: string; percentage: number; weight: number }> }) => {
  const chartConfig = {
    percentage: {
      label: "Score",
      color: "hsl(var(--primary))",
    },
  };

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 90) return "hsl(142, 76%, 36%)";
    if (percentage >= 80) return "hsl(45, 93%, 47%)";
    if (percentage >= 70) return "hsl(25, 95%, 53%)";
    return "hsl(0, 84%, 60%)";
  };

  const enhancedData = data.map(item => ({
    ...item,
    fill: getPerformanceColor(item.percentage),
    displayName: item.name.length > 10 ? item.name.substring(0, 10) + "..." : item.name
  }));

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Target className="h-5 w-5 text-primary" />
          Assignment Performance
        </CardTitle>
        <CardDescription>Individual assignment scores and weights</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[220px] sm:h-[250px] md:h-[300px] w-full">
          <BarChart data={enhancedData} margin={{ top: 5, right: 5, left: 0, bottom: 40 }}>
            <defs>
            <filter id="barShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="hsl(var(--foreground))" floodOpacity="0.1"/>
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.2} />
            <XAxis 
              dataKey="displayName"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              tickFormatter={(value) => `${value}%`}
              width={30}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent 
                  formatter={(value, name, props) => [
                    `${(value as number).toFixed(1)}%`,
                    `${props.payload?.name} (Weight: ${props.payload?.weight}%)`
                  ]}
                  className="bg-background/95 backdrop-blur border shadow-lg rounded-lg"
                />
              }
            />
            <Bar 
              dataKey="percentage"
              radius={[6, 6, 0, 0]}
              filter="url(#barShadow)"
            >
              {enhancedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

// Enhanced Performance Trend Chart
export const PerformanceTrendChart = ({ data }: { data: Array<{ assignment: number; percentage: number }> }) => {
  const chartConfig = {
    percentage: {
      label: "Performance",
      color: "hsl(var(--primary))",
    },
  };

  const enhancedData = data.map((item, index) => ({
    ...item,
    assignmentName: `Assignment ${item.assignment}`,
    trend: index > 0 ? item.percentage - data[index - 1].percentage : 0
  }));

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="h-5 w-5 text-primary" />
          Performance Trend
        </CardTitle>
        <CardDescription>Your grade improvement over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] sm:h-[250px] md:h-[300px] w-full">
          <LineChart data={enhancedData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.6}/>
                <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05}/>
              </linearGradient>
              <filter id="lineShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="1" floodColor="hsl(var(--primary))" floodOpacity="0.3"/>
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.2} />
            <XAxis 
              dataKey="assignmentName"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis 
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              tickFormatter={(value) => `${value}%`}
              width={30}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent 
                  formatter={(value, name, props) => [
                    `${(value as number).toFixed(1)}%`,
                    props.payload?.trend !== undefined && props.payload.trend !== 0 
                      ? `Trend: ${props.payload.trend > 0 ? '+' : ''}${props.payload.trend.toFixed(1)}%`
                      : "Performance"
                  ]}
                  className="bg-background/95 backdrop-blur border shadow-lg rounded-lg"
                />
              }
            />
            <Area
              type="monotone"
              dataKey="percentage"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              fill="url(#trendGradient)"
              filter="url(#lineShadow)"
              dot={{ 
                fill: "hsl(var(--primary))", 
                strokeWidth: 2, 
                r: 5,
                stroke: "hsl(var(--background))"
              }}
              activeDot={{ 
                r: 7, 
                fill: "hsl(var(--primary))",
                stroke: "hsl(var(--background))",
                strokeWidth: 3,
                filter: "url(#lineShadow)"
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

// Performance Overview Radial Chart
export const PerformanceOverview = ({ currentGrade, targetGrade = 90 }: { currentGrade: number; targetGrade?: number }) => {
  const data = [
    {
      name: "Current",
      value: currentGrade,
      fill: currentGrade >= 90 ? "hsl(142, 76%, 36%)" : 
            currentGrade >= 80 ? "hsl(45, 93%, 47%)" : 
            currentGrade >= 70 ? "hsl(25, 95%, 53%)" : "hsl(0, 84%, 60%)"
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-center text-lg">Current Performance</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative">
          <ChartContainer config={{}} className="h-[200px] w-[200px]">
            <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={data}>
              <RadialBar
                dataKey="value"
                cornerRadius={10}
                fill={data[0].fill}
              />
            </RadialBarChart>
          </ChartContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold">{currentGrade.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Current Grade</div>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <div className="text-sm text-muted-foreground">
            Target: {targetGrade}% | 
            Gap: {Math.max(0, targetGrade - currentGrade).toFixed(1)}%
          </div>
        </div>
      </CardContent>
    </Card>
  );
};