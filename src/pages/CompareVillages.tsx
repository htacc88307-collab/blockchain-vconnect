import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { GitCompare, Users, Zap, GraduationCap, Building, Star } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const villages = [
  {
    id: "1",
    name: "Krishnanagar",
    population: 2400,
    score: 94,
    facilities: {
      water: 95,
      electricity: 90,
      healthcare: 85,
      education: 92,
      roads: 88
    },
    issues: 2,
    avgResolutionTime: 4.2,
    completedIssues: 23
  },
  {
    id: "2", 
    name: "Rampur",
    population: 1800,
    score: 87,
    facilities: {
      water: 80,
      electricity: 85,
      healthcare: 75,
      education: 90,
      roads: 82
    },
    issues: 5,
    avgResolutionTime: 6.1,
    completedIssues: 18
  },
  {
    id: "3",
    name: "Sundarpur", 
    population: 3200,
    score: 82,
    facilities: {
      water: 70,
      electricity: 78,
      healthcare: 88,
      education: 75,
      roads: 85
    },
    issues: 8,
    avgResolutionTime: 5.8,
    completedIssues: 31
  },
  {
    id: "4",
    name: "Greenfield",
    population: 1200,
    score: 76,
    facilities: {
      water: 65,
      electricity: 70,
      healthcare: 80,
      education: 85,
      roads: 72
    },
    issues: 12,
    avgResolutionTime: 7.3,
    completedIssues: 14
  }
];

export default function CompareVillages() {
  const [selectedVillages, setSelectedVillages] = useState<string[]>([]);

  const handleVillageSelect = (villageId: string) => {
    if (selectedVillages.includes(villageId)) {
      setSelectedVillages(selectedVillages.filter(id => id !== villageId));
    } else if (selectedVillages.length < 3) {
      setSelectedVillages([...selectedVillages, villageId]);
    }
  };

  const comparedVillages = villages.filter(v => selectedVillages.includes(v.id));

  const getRadarData = () => {
    const subjects = ['water', 'electricity', 'healthcare', 'education', 'roads'];
    
    return subjects.map(subject => {
      const dataPoint: Record<string, string | number> = { subject: subject.charAt(0).toUpperCase() + subject.slice(1) };
      comparedVillages.forEach(village => {
        dataPoint[village.name] = village.facilities[subject as keyof typeof village.facilities];
      });
      return dataPoint;
    });
  };

  const getComparisonData = () => {
    return comparedVillages.map(village => ({
      name: village.name,
      score: village.score,
      issues: village.issues,
      population: Math.round(village.population / 100) / 10 // Convert to thousands
    }));
  };

  const colors = ['#3B82F6', '#8B5CF6', '#10B981'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <GitCompare className="h-8 w-8 text-primary" />
            <span>Compare Villages</span>
          </h1>
          <p className="text-muted-foreground">
            Select up to 3 villages to compare their metrics and performance
          </p>
        </div>

        {/* Village Selection */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Select Villages to Compare</CardTitle>
            <CardDescription>Choose 2-3 villages for side-by-side comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {villages.map((village) => (
                <Card
                  key={village.id}
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    selectedVillages.includes(village.id)
                      ? 'ring-2 ring-primary bg-primary/5'
                      : 'hover:shadow-card'
                  }`}
                  onClick={() => handleVillageSelect(village.id)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">{village.name}</h3>
                        <Badge variant={selectedVillages.includes(village.id) ? "default" : "secondary"}>
                          Score: {village.score}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-1" />
                        {village.population.toLocaleString()}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="h-4 w-4 mr-1" />
                        {village.issues} pending issues
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {selectedVillages.length > 0 && (
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {selectedVillages.length} village{selectedVillages.length > 1 ? 's' : ''} selected
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSelectedVillages([])}
                  className="text-sm"
                >
                  Clear Selection
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {comparedVillages.length >= 2 && (
          <>
            {/* Comparison Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {comparedVillages.map((village, index) => (
                <Card key={village.id} className="glass-card">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-foreground">{village.name}</h3>
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: colors[index] }}
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">AI Score</span>
                          <span className="font-bold text-2xl text-primary">{village.score}</span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Population</span>
                          <span className="font-medium">{village.population.toLocaleString()}</span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Pending Issues</span>
                          <Badge variant={village.issues > 5 ? "destructive" : "secondary"}>
                            {village.issues}
                          </Badge>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Avg. Resolution</span>
                          <span className="font-medium">{village.avgResolutionTime} days</span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Completed Issues</span>
                          <span className="font-medium text-green-600">{village.completedIssues}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Facilities Radar Chart */}
            <Card className="chart-container">
              <CardHeader>
                <CardTitle>Facilities Comparison</CardTitle>
                <CardDescription>Infrastructure and services availability across villages</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={getRadarData()}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    {comparedVillages.map((village, index) => (
                      <Radar
                        key={village.name}
                        name={village.name}
                        dataKey={village.name}
                        stroke={colors[index]}
                        fill={colors[index]}
                        fillOpacity={0.1}
                        strokeWidth={2}
                      />
                    ))}
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="chart-container">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Overall scores and issue statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={getComparisonData()}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar dataKey="score" fill="#3B82F6" name="AI Score" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Detailed Facility Scores */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Detailed Facility Scores</CardTitle>
                <CardDescription>Individual facility ratings out of 100</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.keys(comparedVillages[0].facilities).map((facility) => (
                    <div key={facility} className="space-y-2">
                      <h4 className="font-medium text-foreground flex items-center space-x-2">
                        {facility === 'water' && <Zap className="h-4 w-4" />}
                        {facility === 'electricity' && <Zap className="h-4 w-4" />}
                        {facility === 'healthcare' && <Building className="h-4 w-4" />}
                        {facility === 'education' && <GraduationCap className="h-4 w-4" />}
                        {facility === 'roads' && <Building className="h-4 w-4" />}
                        <span>{facility.charAt(0).toUpperCase() + facility.slice(1)}</span>
                      </h4>
                      <div className="space-y-2">
                        {comparedVillages.map((village, index) => (
                          <div key={village.id} className="flex items-center space-x-3">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: colors[index] }}
                            />
                            <span className="w-24 text-sm font-medium">{village.name}</span>
                            <Progress 
                              value={village.facilities[facility as keyof typeof village.facilities]} 
                              className="flex-1" 
                            />
                            <span className="w-12 text-sm font-bold">
                              {village.facilities[facility as keyof typeof village.facilities]}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {comparedVillages.length < 2 && selectedVillages.length > 0 && (
          <Card className="glass-card">
            <CardContent className="p-12 text-center">
              <GitCompare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Select Another Village
              </h3>
              <p className="text-muted-foreground">
                Choose at least one more village to start comparing
              </p>
            </CardContent>
          </Card>
        )}

        {selectedVillages.length === 0 && (
          <Card className="glass-card">
            <CardContent className="p-12 text-center">
              <GitCompare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                No Villages Selected
              </h3>
              <p className="text-muted-foreground">
                Select villages from the grid above to begin comparison
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}