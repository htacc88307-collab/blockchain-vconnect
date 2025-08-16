import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Lock, User, Shield, Users, Eye, EyeOff } from 'lucide-react';

interface LoginPageProps {
  onLogin: (userType: 'admin' | 'user') => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (username === 'admin' && password === 'admin123') {
      toast({
        title: "Welcome Admin!",
        description: "Redirecting to admin dashboard...",
      });
      onLogin('admin');
    } else if (username === 'user' && password === 'user123') {
      toast({
        title: "Welcome User!",
        description: "Redirecting to user dashboard...",
      });
      onLogin('user');
    } else {
      toast({
        title: "Invalid Credentials",
        description: "Please check your username and password.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  const handleDemoLogin = (type: 'admin' | 'user') => {
    if (type === 'admin') {
      setUsername('admin');
      setPassword('admin123');
    } else {
      setUsername('user');
      setPassword('user123');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[url('/src/assets/login-bg.jpg')] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="w-full max-w-md relative z-10">
        <Card className="glass-card border-white/20 shadow-2xl backdrop-blur-2xl animate-fade-in">
          <CardHeader className="text-center space-y-4 pb-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                V-Connect
              </CardTitle>
              <p className="text-muted-foreground text-sm mt-1">Village Integration Platform</p>
              <Badge variant="secondary" className="mt-2 bg-primary/10 text-primary border-primary/20">
                Secure Portal
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center gap-2 text-sm font-medium">
                  <User className="w-4 h-4" />
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="glass-input bg-white/5 border-white/20 focus:border-primary/50 transition-all duration-300"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2 text-sm font-medium">
                  <Lock className="w-4 h-4" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="glass-input bg-white/5 border-white/20 focus:border-primary/50 transition-all duration-300 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-accent text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
            
            <Separator className="bg-white/20" />
            
            {/* Demo Credentials Section */}
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground mb-3">Demo Access</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleDemoLogin('admin')}
                  className="flex flex-col items-center p-4 h-auto bg-white/5 border-white/20 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
                >
                  <Shield className="w-5 h-5 text-primary mb-2" />
                  <span className="font-medium text-sm">Admin Portal</span>
                  <span className="text-xs text-muted-foreground mt-1">admin / admin123</span>
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleDemoLogin('user')}
                  className="flex flex-col items-center p-4 h-auto bg-white/5 border-white/20 hover:bg-accent/10 hover:border-accent/30 transition-all duration-300"
                >
                  <Users className="w-5 h-5 text-accent mb-2" />
                  <span className="font-medium text-sm">User Portal</span>
                  <span className="text-xs text-muted-foreground mt-1">user / user123</span>
                </Button>
              </div>
              
              <div className="text-center text-xs text-muted-foreground">
                Click above to auto-fill demo credentials
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center mt-6 text-xs text-muted-foreground">
          © 2024 V-Connect Platform. Secure Government Portal.
        </div>
      </div>
    </div>
  );
}