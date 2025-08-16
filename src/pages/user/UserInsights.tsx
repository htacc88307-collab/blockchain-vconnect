import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Building, Lightbulb, BarChart3, PieChart, Activity } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function UserInsights() {
  const villageStats = {
    population: 2847,
    households: 524,
    literacyRate: 78,
    employmentRate: 65,
    infrastructureScore: 72
  };

  const developmentAreas = [
    { area: 'Water Supply', score: 85, color: 'bg-blue-500' },
    { area: 'Education', score: 78, color: 'bg-green-500' },
    { area: 'Healthcare', score: 65, color: 'bg-orange-500' },
    { area: 'Transportation', score: 45, color: 'bg-red-500' },
    { area: 'Electricity', score: 92, color: 'bg-emerald-500' },
    { area: 'Digital Access', score: 38, color: 'bg-purple-500' }
  ];

  const recentImprovements = [
    { title: 'New Water Pipeline', impact: '+15% water access', date: '2024-02' },
    { title: 'School Computer Lab', impact: '+12% digital literacy', date: '2024-01' },
    { title: 'Road Repair Project', impact: '+8% connectivity', date: '2023-12' }
  ];

  const aiRecommendations = [
    {
      priority: 'High',
      title: 'Digital Infrastructure Development',
      description: 'Installing fiber optic cables and WiFi hotspots could improve education and business opportunities',
      impact: 'Expected +25% in digital literacy and +15% in youth employment'
    },
    {
      priority: 'Medium',
      title: 'Healthcare Center Upgrade',
      description: 'Adding telemedicine facilities and specialist consultation services',
      impact: 'Reduce medical emergency travel by 40%'
    },
    {
      priority: 'Medium',
      title: 'Skill Development Programs',
      description: 'Vocational training centers for agriculture and technology skills',
      impact: 'Increase local employment by 20%'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Village Development Insights</h1>
        <p className="text-muted-foreground">
          AI-powered analytics for your community's growth and development
        </p>
      </div>

      {/* Village Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="glass-card hover-scale">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">{villageStats.population.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Population</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card hover-scale">
          <CardContent className="p-4 text-center">
            <Building className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">{villageStats.households}</div>
            <div className="text-sm text-muted-foreground">Households</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card hover-scale">
          <CardContent className="p-4 text-center">
            <BarChart3 className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">{villageStats.literacyRate}%</div>
            <div className="text-sm text-muted-foreground">Literacy Rate</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card hover-scale">
          <CardContent className="p-4 text-center">
            <Activity className="w-8 h-8 mx-auto mb-2 text-orange-500" />
            <div className="text-2xl font-bold">{villageStats.employmentRate}%</div>
            <div className="text-sm text-muted-foreground">Employment</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card hover-scale">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-emerald-500" />
            <div className="text-2xl font-bold">{villageStats.infrastructureScore}</div>
            <div className="text-sm text-muted-foreground">Infra Score</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Development Areas Chart */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="w-5 h-5" />
              <span>Development Areas</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {developmentAreas.map((area, index) => (
              <div key={area.area} className="space-y-2 animate-fade-in" 
                   style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex justify-between text-sm">
                  <span>{area.area}</span>
                  <span className="font-semibold">{area.score}%</span>
                </div>
                <Progress value={area.score} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Improvements */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Recent Improvements</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentImprovements.map((improvement, index) => (
              <div key={improvement.title} className="p-3 bg-green-500/10 rounded-lg animate-fade-in"
                   style={{ animationDelay: `${index * 150}ms` }}>
                <h4 className="font-semibold text-sm">{improvement.title}</h4>
                <p className="text-sm text-green-600 font-medium">{improvement.impact}</p>
                <p className="text-xs text-muted-foreground">{improvement.date}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5" />
            <span>AI Development Recommendations</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Data-driven suggestions for improving village infrastructure and services
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {aiRecommendations.map((rec, index) => (
              <div key={rec.title} className="p-4 border border-white/10 rounded-lg space-y-3 animate-fade-in"
                   style={{ animationDelay: `${index * 200}ms` }}>
                <div className="flex items-start justify-between">
                  <h4 className="font-semibold">{rec.title}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    rec.priority === 'High' 
                      ? 'bg-red-500/20 text-red-600' 
                      : 'bg-orange-500/20 text-orange-600'
                  }`}>
                    {rec.priority} Priority
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{rec.description}</p>
                <div className="p-2 bg-blue-500/10 rounded text-sm">
                  <span className="font-medium">Expected Impact:</span> {rec.impact}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Village Ranking */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Village Development Ranking</CardTitle>
          <p className="text-sm text-muted-foreground">
            Compared to similar villages in the district
          </p>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-6xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
              #7
            </div>
            <p className="text-lg">Out of 45 villages</p>
            <p className="text-sm text-muted-foreground">
              Your village ranks in the <span className="text-green-600 font-semibold">top 20%</span> for overall development
            </p>
            <div className="p-4 bg-green-500/10 rounded-lg">
              <p className="text-sm">
                <span className="font-semibold">Strengths:</span> Water supply, Education, Electricity
              </p>
              <p className="text-sm mt-1">
                <span className="font-semibold">Areas for Improvement:</span> Digital infrastructure, Transportation
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}