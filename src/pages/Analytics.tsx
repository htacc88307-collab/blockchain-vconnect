import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, MapPin, Brain } from "lucide-react";

export default function Analytics() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <BarChart3 className="h-8 w-8 text-primary" />
            <span>AI Analytics Dashboard</span>
          </h1>
          <p className="text-muted-foreground">
            Machine learning insights and village performance analytics
          </p>
        </div>

        {/* Analytics Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Village Ranking</h3>
                  <p className="text-sm text-muted-foreground">AI-powered scoring</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Machine learning algorithms analyze multiple factors to rank villages by development potential and resource needs.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Predictive Analytics</h3>
                  <p className="text-sm text-muted-foreground">Future trends</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Predict facility requirements and resource allocation needs based on historical data and growth patterns.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <MapPin className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Geographic Insights</h3>
                  <p className="text-sm text-muted-foreground">Location-based analysis</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Spatial analysis of village clusters, resource distribution, and regional development patterns.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Embedded Streamlit App */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Interactive Analytics Dashboard</CardTitle>
            <CardDescription>
              Embedded Streamlit application with ML models and data visualization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[600px] bg-gradient-glass rounded-lg flex items-center justify-center">
              <div className="text-center space-y-4">
                <BarChart3 className="h-16 w-16 text-primary mx-auto" />
                <h3 className="text-xl font-semibold text-foreground">Streamlit Analytics App</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  This section will embed the Streamlit application with interactive charts, 
                  ML model predictions, and detailed analytics dashboards.
                </p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>🔍 Village performance analysis</p>
                  <p>📊 Resource allocation predictions</p>
                  <p>🎯 Development priority recommendations</p>
                  <p>📈 Trend analysis and forecasting</p>
                </div>
              </div>
            </div>
            {/* 
            Uncomment and replace with actual Streamlit app URL when available:
            <iframe 
              src="https://your-streamlit-app-url.com" 
              className="w-full h-[600px] rounded-lg border-0"
              title="V-Connect Analytics Dashboard"
            />
            */}
          </CardContent>
        </Card>

        {/* Quick Analytics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="stat-card">
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">ML Model Accuracy</p>
                <p className="text-3xl font-bold text-foreground">94.7%</p>
                <p className="text-sm text-green-600">Village ranking predictions</p>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Data Points Analyzed</p>
                <p className="text-3xl font-bold text-foreground">127K</p>
                <p className="text-sm text-muted-foreground">Across all villages</p>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Predictions Generated</p>
                <p className="text-3xl font-bold text-foreground">2,847</p>
                <p className="text-sm text-muted-foreground">This month</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}