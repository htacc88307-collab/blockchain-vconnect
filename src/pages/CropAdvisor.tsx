import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Users, MapPin, BarChart3, Droplets, Sun } from "lucide-react";

export default function CropAdvisor() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <Leaf className="h-8 w-8 text-primary" />
            <span>Crop Advisor Analytics</span>
          </h1>
          <p className="text-muted-foreground">
            AI-powered crop recommendations and agricultural insights for villages
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="stat-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="glass-card p-3 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Farmers</p>
                  <p className="text-2xl font-bold text-foreground">1,247</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="glass-card p-3 rounded-lg">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Crop Recommendations</p>
                  <p className="text-2xl font-bold text-foreground">3,456</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="glass-card p-3 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold text-foreground">87%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="glass-card p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Villages Covered</p>
                  <p className="text-2xl font-bold text-foreground">89</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Crop Advisor Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Leaf className="h-5 w-5 text-primary" />
                <span>Soil Analysis Integration</span>
              </CardTitle>
              <CardDescription>AI-powered soil type recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gradient-glass rounded-lg">
                  <span className="font-medium">Clay Soil</span>
                  <span className="text-sm text-muted-foreground">32 villages</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-glass rounded-lg">
                  <span className="font-medium">Loamy Soil</span>
                  <span className="text-sm text-muted-foreground">45 villages</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-glass rounded-lg">
                  <span className="font-medium">Sandy Soil</span>
                  <span className="text-sm text-muted-foreground">28 villages</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-glass rounded-lg">
                  <span className="font-medium">Black Soil</span>
                  <span className="text-sm text-muted-foreground">22 villages</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Droplets className="h-5 w-5 text-primary" />
                <span>Irrigation Types</span>
              </CardTitle>
              <CardDescription>Water resource management insights</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gradient-glass rounded-lg">
                  <span className="font-medium">Drip Irrigation</span>
                  <span className="text-sm text-green-600">Recommended for 67 farms</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-glass rounded-lg">
                  <span className="font-medium">Sprinkler System</span>
                  <span className="text-sm text-blue-600">Active in 45 farms</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-glass rounded-lg">
                  <span className="font-medium">Traditional Flood</span>
                  <span className="text-sm text-orange-600">89 farms using</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-glass rounded-lg">
                  <span className="font-medium">Rain-fed</span>
                  <span className="text-sm text-gray-600">156 farms dependent</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Embedded Crop Advisor Tool */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Crop Advisor Analysis Tool</CardTitle>
            <CardDescription>
              View user submissions and AI-generated crop recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[500px] bg-gradient-glass rounded-lg flex items-center justify-center">
              <div className="text-center space-y-4">
                <Leaf className="h-16 w-16 text-primary mx-auto" />
                <h3 className="text-xl font-semibold text-foreground">Crop Advisor Interface</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  This section displays user-submitted crop advisor forms with AI analysis results, 
                  including soil type recommendations, irrigation suggestions, and optimal crop choices.
                </p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>🌱 Crop suitability analysis</p>
                  <p>💧 Irrigation recommendations</p>
                  <p>🌡️ Weather-based suggestions</p>
                  <p>📊 Yield prediction models</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Recommendations */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Recent AI Recommendations</CardTitle>
            <CardDescription>Latest crop advisory insights generated by the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  village: "Krishnanagar",
                  farmer: "Ramesh Kumar",
                  soil: "Clay Soil",
                  recommendation: "Rice, Wheat (Rabi season)",
                  confidence: "94%",
                  date: "2 hours ago"
                },
                {
                  village: "Sundarpur", 
                  farmer: "Priya Devi",
                  soil: "Loamy Soil",
                  recommendation: "Tomato, Onion, Maize",
                  confidence: "89%",
                  date: "5 hours ago"
                },
                {
                  village: "Rampur",
                  farmer: "Vijay Singh",
                  soil: "Sandy Soil", 
                  recommendation: "Millet, Groundnut",
                  confidence: "91%",
                  date: "1 day ago"
                }
              ].map((rec, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-glass rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-foreground">{rec.farmer}</span>
                      <span className="text-sm text-muted-foreground">• {rec.village}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{rec.soil}</span>
                      <span>•</span>
                      <span>{rec.recommendation}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-primary">{rec.confidence}</div>
                    <div className="text-xs text-muted-foreground">{rec.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}