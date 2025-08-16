import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Users, 
  TrendingUp, 
  Activity, 
  Heart, 
  AlertTriangle,
  Shield,
  BarChart3,
  PieChart,
  Calendar,
  UserCheck
} from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";

const SoulScanInsights = () => {
  const communityEmotions = [
    { emotion: "Happiness", percentage: 65, change: "+5%", trend: "up" },
    { emotion: "Stress", percentage: 28, change: "-3%", trend: "down" },
    { emotion: "Hope", percentage: 72, change: "+8%", trend: "up" },
    { emotion: "Concern", percentage: 35, change: "-2%", trend: "down" }
  ];

  const mentalHealthAlerts = [
    { severity: "low", count: 3, description: "Users showing mild stress patterns" },
    { severity: "medium", count: 1, description: "Users requiring attention" },
    { severity: "high", count: 0, description: "Critical cases" }
  ];

  const behaviorInsights = [
    { pattern: "Increased Help-Seeking", users: 45, trend: "up" },
    { pattern: "Community Engagement", users: 78, trend: "up" },
    { pattern: "Positive Communication", users: 92, trend: "stable" },
    { pattern: "Isolation Indicators", users: 12, trend: "down" }
  ];

  const emotionTrendData = [
    { month: "Jan", happiness: 60, stress: 40, engagement: 65 },
    { month: "Feb", happiness: 65, stress: 35, engagement: 70 },
    { month: "Mar", happiness: 70, stress: 30, engagement: 75 },
    { month: "Apr", happiness: 68, stress: 32, engagement: 78 },
    { month: "May", happiness: 72, stress: 28, engagement: 82 },
    { month: "Jun", happiness: 75, stress: 25, engagement: 85 }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <Brain className="h-8 w-8 text-primary" />
            <span>SoulScan Insights</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Community emotional intelligence and mental health monitoring dashboard
          </p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          <Shield className="h-4 w-4 mr-2" />
          Privacy Protected
        </Badge>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Users"
          value={234}
          subtitle="Participated in SoulScan"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Avg Wellbeing Score"
          value="7.2/10"
          subtitle="Community mental health"
          icon={Heart}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Emotional Stability"
          value="78%"
          subtitle="Users with stable patterns"
          icon={Activity}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Support Connections"
          value={156}
          subtitle="Successful matches made"
          icon={UserCheck}
          trend={{ value: 23, isPositive: true }}
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="emotions">Emotions</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Community Emotion Distribution */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="h-5 w-5" />
                  <span>Community Emotions</span>
                </CardTitle>
                <CardDescription>Current emotional state distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {communityEmotions.map((emotion, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/20 rounded-lg">
                      <span className="font-medium">{emotion.emotion}</span>
                      <div className="flex items-center space-x-3">
                        <Progress value={emotion.percentage} className="w-24" />
                        <span className="font-bold min-w-12">{emotion.percentage}%</span>
                        <Badge variant={emotion.trend === "up" ? "default" : "secondary"}>
                          {emotion.change}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Mental Health Overview */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5" />
                  <span>Mental Health Overview</span>
                </CardTitle>
                <CardDescription>Community wellbeing indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">92%</div>
                    <div className="text-sm text-green-700">Users in Good Mental Health</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-xl font-bold text-blue-600">156</div>
                      <div className="text-xs text-blue-700">Support Connections</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-xl font-bold text-purple-600">23</div>
                      <div className="text-xs text-purple-700">Intervention Cases</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="emotions" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Emotional Trends Over Time</span>
              </CardTitle>
              <CardDescription>Monthly emotional state progression</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {emotionTrendData.map((data, index) => (
                  <div key={index} className="space-y-3">
                    <h4 className="font-medium text-sm">{data.month} 2024</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Happiness</span>
                          <span className="font-medium">{data.happiness}%</span>
                        </div>
                        <Progress value={data.happiness} className="h-2 bg-green-100" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Stress</span>
                          <span className="font-medium">{data.stress}%</span>
                        </div>
                        <Progress value={data.stress} className="h-2 bg-red-100" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Engagement</span>
                          <span className="font-medium">{data.engagement}%</span>
                        </div>
                        <Progress value={data.engagement} className="h-2 bg-blue-100" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Behavioral Pattern Analysis</span>
              </CardTitle>
              <CardDescription>Community behavior insights and patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {behaviorInsights.map((insight, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Activity className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">{insight.pattern}</div>
                        <div className="text-sm text-muted-foreground">{insight.users} users affected</div>
                      </div>
                    </div>
                    <Badge variant={
                      insight.trend === "up" ? "default" : 
                      insight.trend === "down" ? "destructive" : "secondary"
                    }>
                      {insight.trend}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>Mental Health Alerts</span>
              </CardTitle>
              <CardDescription>Privacy-protected early intervention system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mentalHealthAlerts.map((alert, index) => (
                  <div key={index} className={`p-4 rounded-lg border-l-4 ${
                    alert.severity === "high" ? "bg-red-50 border-red-500" :
                    alert.severity === "medium" ? "bg-yellow-50 border-yellow-500" :
                    "bg-green-50 border-green-500"
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium capitalize">{alert.severity} Priority</div>
                        <div className="text-sm text-muted-foreground">{alert.description}</div>
                      </div>
                      <div className="text-2xl font-bold">{alert.count}</div>
                    </div>
                  </div>
                ))}
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-800">Privacy Notice</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    All alerts are generated from anonymized data patterns. Individual user identities 
                    are protected and intervention suggestions are made at community level.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Long-term Trends</span>
              </CardTitle>
              <CardDescription>Community mental health progression analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                    <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-700">+15%</div>
                    <div className="text-sm text-green-600">Overall Wellbeing</div>
                    <div className="text-xs text-green-500">vs last quarter</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                    <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-700">+28%</div>
                    <div className="text-sm text-blue-600">Community Engagement</div>
                    <div className="text-xs text-blue-500">vs last quarter</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                    <Heart className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-700">-12%</div>
                    <div className="text-sm text-purple-600">Stress Levels</div>
                    <div className="text-xs text-purple-500">vs last quarter</div>
                  </div>
                </div>

                <div className="p-4 bg-white/30 rounded-lg">
                  <h4 className="font-medium mb-3">Key Insights</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span>Community support systems have significantly improved mental health outcomes</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <span>Increased engagement in educational and development programs</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <span>Early intervention strategies are effectively reducing stress indicators</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SoulScanInsights;