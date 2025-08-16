import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/dashboard/StatCard";
import { 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  MapPin,
  Clock,
  Star
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const issueData = [
  { name: "Water Supply", count: 45, color: "#3B82F6" },
  { name: "Electricity", count: 32, color: "#8B5CF6" },
  { name: "Healthcare", count: 28, color: "#10B981" },
  { name: "Education", count: 23, color: "#F59E0B" },
  { name: "Roads", count: 19, color: "#EF4444" },
];

const villageRankings = [
  { name: "Krishnanagar", score: 94, population: 2400, issues: 2 },
  { name: "Rampur", score: 87, population: 1800, issues: 5 },
  { name: "Sundarpur", score: 82, population: 3200, issues: 8 },
];

const recentActivities = [
  { action: "Status Updated", village: "Krishnanagar", issue: "Water Supply", time: "2 hours ago", status: "completed" },
  { action: "New Report", village: "Rampur", issue: "Road Repair", time: "4 hours ago", status: "pending" },
  { action: "Issue Resolved", village: "Sundarpur", issue: "Electricity", time: "6 hours ago", status: "completed" },
];

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("month");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Welcome back, Admin</h1>
          <p className="text-muted-foreground">
            Here's what's happening in the villages today
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Villages"
            value="127"
            subtitle="Registered villages"
            icon={MapPin}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Pending Issues"
            value="34"
            subtitle="Require attention"
            icon={AlertTriangle}
            trend={{ value: 12, isPositive: false }}
          />
          <StatCard
            title="Completed Solutions"
            value="189"
            subtitle="This month"
            icon={CheckCircle}
            trend={{ value: 23, isPositive: true }}
          />
          <StatCard
            title="Avg. Resolution Time"
            value="5.2"
            subtitle="Days"
            icon={Clock}
            trend={{ value: 15, isPositive: true }}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Issue Categories Chart */}
          <Card className="chart-container">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart className="h-5 w-5 text-primary" />
                <span>Issues by Category</span>
              </CardTitle>
              <CardDescription>Most reported issues across villages</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={issueData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Issue Distribution Pie Chart */}
          <Card className="chart-container">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="h-5 w-5 text-primary" />
                <span>Issue Distribution</span>
              </CardTitle>
              <CardDescription>Percentage breakdown of issues</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={issueData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {issueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Village Rankings & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Villages */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-primary" />
                <span>Top Performing Villages</span>
              </CardTitle>
              <CardDescription>AI-ranked by development score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {villageRankings.map((village, index) => (
                  <div key={village.name} className="flex items-center justify-between p-4 bg-gradient-glass rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{village.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Population: {village.population.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{village.score}</p>
                      <p className="text-xs text-muted-foreground">{village.issues} issues</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription>Latest updates and actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gradient-glass rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === 'completed' ? 'bg-green-500' : 'bg-orange-500'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-foreground">{activity.action}</p>
                        <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                          {activity.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {activity.village} • {activity.issue}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="btn-glass justify-start space-x-3 h-auto py-4">
                <AlertTriangle className="h-5 w-5" />
                <div className="text-left">
                  <p className="font-medium">Review Urgent Issues</p>
                  <p className="text-xs opacity-80">5 critical issues pending</p>
                </div>
              </Button>
              
              <Button className="btn-glass justify-start space-x-3 h-auto py-4">
                <TrendingUp className="h-5 w-5" />
                <div className="text-left">
                  <p className="font-medium">Generate Report</p>
                  <p className="text-xs opacity-80">Monthly progress summary</p>
                </div>
              </Button>
              
              <Button className="btn-glass justify-start space-x-3 h-auto py-4">
                <Users className="h-5 w-5" />
                <div className="text-left">
                  <p className="font-medium">Add New Village</p>
                  <p className="text-xs opacity-80">Register villages</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}