import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  GitCompare, 
  RefreshCw, 
  BarChart3, 
  Leaf, 
  Calculator,
  Brain,
  Shield,
  LogOut,
  Menu,
  X,
  Bell
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface AdminNavbarProps {
  onLogout: () => void;
}

const navItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: GitCompare, label: "Compare Villages", path: "/compare" },
  { icon: RefreshCw, label: "Update Status", path: "/update-status" },
  { icon: BarChart3, label: "AI Analytics", path: "/analytics" },
  { icon: Leaf, label: "Crop Advisor", path: "/crop-advisor" },
  { icon: Calculator, label: "Cost Estimator", path: "/cost-estimator" },
  { icon: Brain, label: "SoulScan Insights", path: "/soulscan-insights" },
  { icon: Shield, label: "Web3 Dashboard", path: "/web3-dashboard" },
];

export default function AdminNavbar({ onLogout }: AdminNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="glass-nav sticky top-0 z-50 px-4 py-3 backdrop-blur-xl bg-white/5 border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Logo - Top Section */}
        <div className="flex justify-center items-center py-3 border-b border-white/5">
          <div className="flex items-center space-x-3">
            <div className="glass-card p-2 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-white/20">
              <Home className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">V-Connect Admin</h1>
              <p className="text-xs text-muted-foreground">Village Integration Platform</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between py-2">

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center space-x-2 flex-1 justify-center max-w-6xl">
          <div className="flex items-center space-x-1 bg-white/5 rounded-full p-1 border border-white/10">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={isActive(item.path) ? "default" : "ghost"}
                size="sm"
                onClick={() => navigate(item.path)}
                className={`relative px-3 py-2 rounded-full transition-all duration-300 whitespace-nowrap ${
                  isActive(item.path) 
                    ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg" 
                    : "hover:bg-white/10 text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Tablet Navigation - Compact */}
        <div className="hidden lg:flex xl:hidden items-center space-x-1 flex-1 justify-center max-w-4xl">
          <div className="flex items-center space-x-1 bg-white/5 rounded-full p-1 border border-white/10">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={isActive(item.path) ? "default" : "ghost"}
                size="sm"
                onClick={() => navigate(item.path)}
                className={`relative p-2 rounded-full transition-all duration-300 ${
                  isActive(item.path) 
                    ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg" 
                    : "hover:bg-white/10 text-foreground"
                }`}
                title={item.label}
              >
                <item.icon className="h-4 w-4" />
              </Button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {/* Notifications - Desktop */}
          <div className="hidden lg:block">
            <Button
              variant="ghost"
              size="sm"
              className="relative hover:bg-white/10 transition-all duration-300"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Button>
          </div>

          {/* Logout Button - Desktop */}
          <div className="hidden lg:block">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                toast({
                  title: "Logged out successfully",
                  description: "You have been logged out of the admin panel.",
                });
                onLogout();
              }}
              className="hover:bg-white/10 text-foreground transition-all duration-300"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden hover:bg-white/10"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden mt-4 glass-card rounded-lg p-4 space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant={isActive(item.path) ? "default" : "ghost"}
              size="sm"
              onClick={() => {
                navigate(item.path);
                setIsOpen(false);
              }}
              className={`w-full justify-start space-x-3 transition-all duration-300 ${
                isActive(item.path) 
                  ? "bg-gradient-to-r from-primary to-accent text-white" 
                  : "hover:bg-white/10"
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Button>
          ))}
          
          {/* Mobile Actions */}
          <div className="pt-2 space-y-2 border-t border-white/10">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start space-x-3 hover:bg-white/10"
            >
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
              <span className="ml-auto bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                toast({
                  title: "Logged out successfully",
                  description: "You have been logged out of the admin panel.",
                });
                onLogout();
              }}
              className="w-full justify-start space-x-3 text-red-400 hover:text-red-300 hover:bg-red-500/10"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      )}
        </div>
      </div>
    </nav>
  );
}