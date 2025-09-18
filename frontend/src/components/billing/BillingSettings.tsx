import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Settings, Bell, CreditCard, FileText, Users, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function BillingSettings() {
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Billing settings have been updated successfully."
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Billing Settings</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              General Settings
            </CardTitle>
            <CardDescription>Basic billing configuration options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Default Currency</Label>
              <Select defaultValue="inr">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inr">Indian Rupee (₹)</SelectItem>
                  <SelectItem value="usd">US Dollar ($)</SelectItem>
                  <SelectItem value="eur">Euro (€)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="financial-year">Financial Year Start</Label>
              <Select defaultValue="april">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="april">April</SelectItem>
                  <SelectItem value="january">January</SelectItem>
                  <SelectItem value="july">July</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="due-days">Default Due Days</Label>
              <Input id="due-days" type="number" defaultValue="30" placeholder="Days" />
              <p className="text-xs text-muted-foreground">Number of days after creation for payment due date</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="late-fee">Late Fee Percentage</Label>
              <Input id="late-fee" type="number" defaultValue="2" placeholder="%" />
              <p className="text-xs text-muted-foreground">Monthly late fee percentage for overdue bills</p>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>Configure automated billing notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Payment Reminders</Label>
                <p className="text-xs text-muted-foreground">Send reminders before due dates</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Overdue Notifications</Label>
                <p className="text-xs text-muted-foreground">Alert for overdue payments</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Payment Confirmations</Label>
                <p className="text-xs text-muted-foreground">Confirm successful payments</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reminder-days">Reminder Days</Label>
              <Input id="reminder-days" defaultValue="7,3,1" placeholder="Days before due date" />
              <p className="text-xs text-muted-foreground">Comma-separated days to send reminders</p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Settings
            </CardTitle>
            <CardDescription>Configure payment methods and gateways</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Online Payments</Label>
                <p className="text-xs text-muted-foreground">Enable online payment gateway</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Bank Transfer</Label>
                <p className="text-xs text-muted-foreground">Accept bank transfers</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Cash Payments</Label>
                <p className="text-xs text-muted-foreground">Allow cash payments at office</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gateway">Primary Payment Gateway</Label>
              <Select defaultValue="razorpay">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="razorpay">Razorpay</SelectItem>
                  <SelectItem value="payu">PayU</SelectItem>
                  <SelectItem value="stripe">Stripe</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Report Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Reports & Exports
            </CardTitle>
            <CardDescription>Configure report generation and export options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Reports</Label>
                <p className="text-xs text-muted-foreground">Generate monthly reports automatically</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="space-y-2">
              <Label htmlFor="report-format">Default Export Format</Label>
              <Select defaultValue="excel">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="report-email">Report Email Recipients</Label>
              <Input id="report-email" placeholder="admin@college.edu, finance@college.edu" />
              <p className="text-xs text-muted-foreground">Comma-separated email addresses</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* User Permissions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            User Permissions
          </CardTitle>
          <CardDescription>Control access levels for different user roles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="font-medium">Admin Access</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Create Bills</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span>Edit Bills</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span>Delete Bills</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span>Process Payments</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Teacher Access</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>View Own Payroll</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span>Download Payslips</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span>View Student Bills</span>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <span>Create Student Bills</span>
                  <Switch />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Student Access</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>View Own Bills</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span>Make Payments</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span>Download Receipts</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span>Payment History</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="w-full sm:w-auto">
          <Settings className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}