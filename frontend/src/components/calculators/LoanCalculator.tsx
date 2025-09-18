import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");

  const calculateLoanDetails = () => {
    const principal = parseFloat(loanAmount) || 0;
    const rate = (parseFloat(interestRate) || 0) / 100 / 12;
    const payments = (parseFloat(loanTerm) || 0) * 12;

    if (principal <= 0 || rate <= 0 || payments <= 0) {
      return {
        monthlyPayment: 0,
        totalPayment: 0,
        totalInterest: 0,
        paymentSchedule: []
      };
    }

    const monthlyPayment = (principal * rate * Math.pow(1 + rate, payments)) / 
                          (Math.pow(1 + rate, payments) - 1);
    
    const totalPayment = monthlyPayment * payments;
    const totalInterest = totalPayment - principal;

    // Generate payment schedule for first 12 months
    const paymentSchedule = [];
    let remainingBalance = principal;
    
    for (let month = 1; month <= Math.min(12, payments); month++) {
      const interestPayment = remainingBalance * rate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;
      
      paymentSchedule.push({
        month: `Month ${month}`,
        principal: principalPayment,
        interest: interestPayment,
        balance: remainingBalance
      });
    }

    return {
      monthlyPayment,
      totalPayment,
      totalInterest,
      paymentSchedule
    };
  };

  const loanDetails = calculateLoanDetails();
  const principal = parseFloat(loanAmount) || 0;

  const pieData = [
    { name: 'Principal', value: principal, fill: 'hsl(var(--primary))' },
    { name: 'Interest', value: loanDetails.totalInterest, fill: 'hsl(var(--destructive))' }
  ];

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--destructive))'];

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle>Loan Details</CardTitle>
          <CardDescription>Enter your loan information to calculate payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="loan-amount">Loan Amount ($)</Label>
              <Input
                id="loan-amount"
                type="number"
                placeholder="50000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <div>
              <Label htmlFor="interest-rate">Annual Interest Rate (%)</Label>
              <Input
                id="interest-rate"
                type="number"
                step="0.1"
                placeholder="5.5"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <div>
              <Label htmlFor="loan-term">Loan Term (years)</Label>
              <Input
                id="loan-term"
                type="number"
                placeholder="10"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                ${loanDetails.monthlyPayment.toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">Monthly Payment</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                ${loanDetails.totalPayment.toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">Total Payment</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">
                ${loanDetails.totalInterest.toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">Total Interest</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visual Representation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        {principal > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Loan Breakdown</CardTitle>
              <CardDescription>Principal vs. Interest over the life of the loan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                   <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                      outerRadius={100}
                      innerRadius={40}
                      paddingAngle={2}
                       dataKey="value"
                     >
                      {pieData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]}
                          stroke="hsl(var(--background))"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                      }}
                      formatter={(value: any) => [`$${Number(value).toLocaleString()}`, ""]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment Schedule Chart */}
        {loanDetails.paymentSchedule.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Payment Schedule (First Year)</CardTitle>
              <CardDescription>Monthly breakdown of principal and interest</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={loanDetails.paymentSchedule} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.3} />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                      }}
                      formatter={(value: any) => [`$${Number(value).toFixed(2)}`, ""]}
                    />
                    <Legend 
                      wrapperStyle={{ paddingTop: "20px" }}
                    />
                    <Bar 
                      dataKey="principal" 
                      stackId="a" 
                      fill="hsl(var(--primary))" 
                      name="Principal"
                      radius={[0, 0, 0, 0]}
                    />
                    <Bar 
                      dataKey="interest" 
                      stackId="a" 
                      fill="hsl(var(--destructive))" 
                      name="Interest"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Detailed Payment Schedule */}
      {loanDetails.paymentSchedule.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Payment Schedule Details</CardTitle>
            <CardDescription>First 12 months payment breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Month</th>
                    <th className="text-right p-2">Principal</th>
                    <th className="text-right p-2">Interest</th>
                    <th className="text-right p-2">Remaining Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {loanDetails.paymentSchedule.map((payment, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{payment.month}</td>
                      <td className="text-right p-2">${payment.principal.toFixed(2)}</td>
                      <td className="text-right p-2">${payment.interest.toFixed(2)}</td>
                      <td className="text-right p-2">${payment.balance.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Loan Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Loan Tips</CardTitle>
          <CardDescription>Ways to save money on your student loan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Make Extra Payments</h4>
              <p className="text-sm text-muted-foreground">
                Pay extra toward the principal to reduce interest and pay off the loan faster.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Consider Refinancing</h4>
              <p className="text-sm text-muted-foreground">
                If you have good credit, refinancing could lower your interest rate.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Auto-Pay Discounts</h4>
              <p className="text-sm text-muted-foreground">
                Many lenders offer rate reductions for automatic payments.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Tax Benefits</h4>
              <p className="text-sm text-muted-foreground">
                Student loan interest may be tax-deductible up to certain limits.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};