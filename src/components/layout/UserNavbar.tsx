import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Bot, 
  AlertCircle, 
  BarChart3, 
  Sprout, 
  GraduationCap, 
  TrendingUp,
  Brain,
  Vote,
  LogOut,
  Menu,
  X
} from 'lucide-react';

interface UserNavbarProps {
  onLogout: () => void;
}

export default function UserNavbar({ onLogout }: UserNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/user', icon: Home, label: 'Home' },
    { path: '/user/chatbot', icon: Bot, label: 'Chatbot' },
    { path: '/user/report', icon: AlertCircle, label: 'Report Issue' },
    { path: '/user/status', icon: BarChart3, label: 'Status' },
    { path: '/user/crop-advisor', icon: Sprout, label: 'Crop Advisor' },
    { path: '/user/edupath', icon: GraduationCap, label: 'EduPath' },
    { path: '/user/insights', icon: TrendingUp, label: 'AI Insights' },
    { path: '/user/soulscan', icon: Brain, label: 'SoulScan' },
    { path: '/user/dao-voting', icon: Vote, label: 'DAO Voting' },
  ];

  return (
    <nav className="glass-card sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo - Top Section */}
        <div className="flex justify-center items-center py-3 border-b border-white/5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                V-Connect User
              </h1>
              <p className="text-xs text-muted-foreground">Village Integration Platform</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center h-12">

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-2 flex-1 justify-center max-w-5xl">
            <div className="flex items-center space-x-1 bg-white/5 rounded-full p-1 border border-white/10">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link key={item.path} to={item.path}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className={`relative px-3 py-2 rounded-full transition-all duration-300 whitespace-nowrap ${
                        isActive 
                          ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg' 
                          : 'hover:bg-white/10 text-foreground'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Tablet Navigation - Compact */}
          <div className="hidden lg:flex xl:hidden items-center space-x-1 flex-1 justify-center max-w-3xl">
            <div className="flex items-center space-x-1 bg-white/5 rounded-full p-1 border border-white/10">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link key={item.path} to={item.path}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className={`relative p-2 rounded-full transition-all duration-300 ${
                        isActive 
                          ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg' 
                          : 'hover:bg-white/10 text-foreground'
                      }`}
                      title={item.label}
                    >
                      <Icon className="w-4 h-4" />
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Desktop Logout */}
            <div className="hidden lg:block">
              <Button
                onClick={onLogout}
                variant="ghost"
                size="sm"
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="glass-button-sm"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass-card border-t border-white/10 animate-fade-in">
          <div className="px-4 py-3 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={`w-full justify-start transition-all duration-300 ${
                      isActive 
                        ? 'bg-gradient-to-r from-primary to-accent text-white' 
                        : 'hover:bg-white/10'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
            
            <Button
              onClick={onLogout}
              variant="ghost"
              size="sm"
              className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}