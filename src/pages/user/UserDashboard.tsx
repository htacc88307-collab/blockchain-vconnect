import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  AlertCircle, 
  BarChart3, 
  Sprout, 
  GraduationCap, 
  TrendingUp,
  Vote,
  Users,
  CheckCircle,
  Clock
} from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';

export default function UserDashboard() {
  const quickActions = [
    {
      title: 'Report Issue',
      description: 'Submit problems or requests for your village',
      icon: AlertCircle,
      link: '/user/report',
      color: 'from-red-500/20 to-orange-500/20'
    },
    {
      title: 'Ask the Bot',
      description: 'Chat with AI assistant for help and guidance',
      icon: Bot,
      link: '/user/chatbot',
      color: 'from-blue-500/20 to-purple-500/20'
    },
    {
      title: 'Check Status',
      description: 'Track progress of your submitted issues',
      icon: BarChart3,
      link: '/user/status',
      color: 'from-green-500/20 to-emerald-500/20'
    },
    {
      title: 'Crop Advisor',
      description: 'Get AI-powered crop recommendations',
      icon: Sprout,
      link: '/user/crop-advisor',
      color: 'from-emerald-500/20 to-green-500/20'
    },
    {
      title: 'EduPath',
      description: 'Explore education and career opportunities',
      icon: GraduationCap,
      link: '/user/edupath',
      color: 'from-purple-500/20 to-pink-500/20'
    },
    {
      title: 'AI Insights',
      description: 'View development analytics for your area',
      icon: TrendingUp,
      link: '/user/insights',
      color: 'from-cyan-500/20 to-blue-500/20'
    },
    {
      title: 'DAO Voting',
      description: 'Participate in democratic decision-making',
      icon: Vote,
      link: '/user/dao-voting',
      color: 'from-purple-500/20 to-pink-500/20'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-fade-in">
          Welcome to V-Connect
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Empowering Villages with Technology - Your gateway to better governance and community development
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Reports"
          value="24"
          subtitle="This month"
          icon={AlertCircle}
          trend={{ value: 12, isPositive: true }}
          className="hover-scale"
        />
        <StatCard
          title="Active Issues"
          value="8"
          subtitle="In progress"
          icon={Clock}
          className="hover-scale"
        />
        <StatCard
          title="Resolved"
          value="16"
          subtitle="Completed"
          icon={CheckCircle}
          trend={{ value: 25, isPositive: true }}
          className="hover-scale"
        />
      </div>

      {/* Quick Actions Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-center">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link key={action.title} to={action.link}>
                <Card className={`glass-card hover-scale cursor-pointer transition-all duration-300 hover:shadow-xl animate-fade-in bg-gradient-to-br ${action.color}`} 
                      style={{ animationDelay: `${index * 100}ms` }}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Recent Community Updates</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-green-500/10 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <div>
              <p className="font-medium">Water supply issue resolved</p>
              <p className="text-sm text-muted-foreground">Reported on March 15, 2024</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-blue-500/10 rounded-lg">
            <Clock className="w-5 h-5 text-blue-500" />
            <div>
              <p className="font-medium">Road repair in progress</p>
              <p className="text-sm text-muted-foreground">Reported on March 18, 2024</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-orange-500/10 rounded-lg">
            <AlertCircle className="w-5 h-5 text-orange-500" />
            <div>
              <p className="font-medium">School facility upgrade pending</p>
              <p className="text-sm text-muted-foreground">Reported on March 20, 2024</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}