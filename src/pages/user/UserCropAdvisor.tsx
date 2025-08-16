import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Sprout, MapPin, Droplets, Calendar, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function UserCropAdvisor() {
  const [formData, setFormData] = useState({
    location: '',
    landSize: '',
    soilType: '',
    waterSource: '',
    previousCrop: '',
    season: '',
    budget: '',
    experience: '',
    marketAccess: '',
    preferences: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const { toast } = useToast();

  const soilTypes = [
    'Black Soil (Cotton Soil)',
    'Red Soil',
    'Alluvial Soil',
    'Sandy Soil',
    'Clay Soil',
    'Loamy Soil',
    'Laterite Soil'
  ];

  const waterSources = [
    'Rain-fed (Monsoon only)',
    'Borewell/Tubewell',
    'Canal Irrigation',
    'River/Stream',
    'Pond/Tank',
    'Drip Irrigation',
    'Sprinkler System'
  ];

  const seasons = [
    'Kharif (Monsoon - June to October)',
    'Rabi (Winter - November to April)',
    'Zaid (Summer - April to June)',
    'Year-round cultivation'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    toast({
      title: "Analysis Complete!",
      description: "Your personalized crop recommendations are ready.",
    });

    setShowRecommendations(true);
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const recommendations = [
    {
      crop: 'Cotton',
      suitability: 95,
      reason: 'Perfect match for black soil and moderate water requirements',
      expectedYield: '15-20 quintals per acre',
      marketPrice: '₹5,500-6,000 per quintal',
      season: 'Kharif',
      tips: 'Use BT cotton varieties for better pest resistance'
    },
    {
      crop: 'Soybean',
      suitability: 88,
      reason: 'Good nitrogen-fixing crop, suitable for soil improvement',
      expectedYield: '12-15 quintals per acre',
      marketPrice: '₹4,200-4,800 per quintal',
      season: 'Kharif',
      tips: 'Excellent crop rotation option with cotton'
    },
    {
      crop: 'Wheat',
      suitability: 82,
      reason: 'Suitable for winter season with available irrigation',
      expectedYield: '25-30 quintals per acre',
      marketPrice: '₹2,100-2,300 per quintal',
      season: 'Rabi',
      tips: 'Ensure adequate irrigation during grain filling stage'
    }
  ];

  if (showRecommendations) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                <span>Your Personalized Crop Recommendations</span>
              </CardTitle>
              <p className="text-muted-foreground">
                Based on your farm conditions and requirements
              </p>
            </CardHeader>
          </Card>

          <div className="grid gap-6">
            {recommendations.map((rec, index) => (
              <Card key={rec.crop} className="glass-card hover-scale animate-fade-in"
                    style={{ animationDelay: `${index * 200}ms` }}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-xl font-bold">{rec.crop}</h3>
                        <div className="flex items-center space-x-2">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                            {rec.suitability}%
                          </div>
                          <span className="text-sm text-muted-foreground">Suitability</span>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground">{rec.reason}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Expected Yield:</span>
                          <span className="ml-2 text-green-600">{rec.expectedYield}</span>
                        </div>
                        <div>
                          <span className="font-medium">Market Price:</span>
                          <span className="ml-2 text-blue-600">{rec.marketPrice}</span>
                        </div>
                        <div>
                          <span className="font-medium">Best Season:</span>
                          <span className="ml-2">{rec.season}</span>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-blue-500/10 rounded-lg">
                        <p className="text-sm"><span className="font-medium">Pro Tip:</span> {rec.tips}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              onClick={() => {
                setShowRecommendations(false);
                setFormData({
                  location: '',
                  landSize: '',
                  soilType: '',
                  waterSource: '',
                  previousCrop: '',
                  season: '',
                  budget: '',
                  experience: '',
                  marketAccess: '',
                  preferences: ''
                });
              }}
              className="glass-button"
            >
              Get New Recommendations
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="glass-card max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sprout className="w-6 h-6 text-primary" />
            <span>AI Crop Advisor</span>
          </CardTitle>
          <p className="text-muted-foreground">
            Get personalized crop recommendations based on your farm conditions, climate, and market preferences
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>Location/District *</span>
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="e.g., Nashik, Maharashtra"
                  className="glass-input"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="landSize">Land Size (in acres) *</Label>
                <Input
                  id="landSize"
                  value={formData.landSize}
                  onChange={(e) => handleInputChange('landSize', e.target.value)}
                  placeholder="e.g., 5 acres"
                  className="glass-input"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Soil Type *</Label>
                <Select value={formData.soilType} onValueChange={(value) => handleInputChange('soilType', value)}>
                  <SelectTrigger className="glass-input">
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    {soilTypes.map((soil) => (
                      <SelectItem key={soil} value={soil}>{soil}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center space-x-1">
                  <Droplets className="w-4 h-4" />
                  <span>Water Source *</span>
                </Label>
                <Select value={formData.waterSource} onValueChange={(value) => handleInputChange('waterSource', value)}>
                  <SelectTrigger className="glass-input">
                    <SelectValue placeholder="Select water source" />
                  </SelectTrigger>
                  <SelectContent>
                    {waterSources.map((source) => (
                      <SelectItem key={source} value={source}>{source}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Previous Crop</Label>
                <Input
                  value={formData.previousCrop}
                  onChange={(e) => handleInputChange('previousCrop', e.target.value)}
                  placeholder="e.g., Cotton, Wheat, Fallow"
                  className="glass-input"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Preferred Season *</span>
                </Label>
                <Select value={formData.season} onValueChange={(value) => handleInputChange('season', value)}>
                  <SelectTrigger className="glass-input">
                    <SelectValue placeholder="Select farming season" />
                  </SelectTrigger>
                  <SelectContent>
                    {seasons.map((season) => (
                      <SelectItem key={season} value={season}>{season}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Budget Range (₹)</Label>
                <Input
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  placeholder="e.g., 50,000 - 1,00,000"
                  className="glass-input"
                />
              </div>

              <div className="space-y-2">
                <Label>Farming Experience</Label>
                <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                  <SelectTrigger className="glass-input">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (3-10 years)</SelectItem>
                    <SelectItem value="experienced">Experienced (10+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Market Access</Label>
              <Input
                value={formData.marketAccess}
                onChange={(e) => handleInputChange('marketAccess', e.target.value)}
                placeholder="e.g., Local market, APMC, Direct selling, Online platforms"
                className="glass-input"
              />
            </div>

            <div className="space-y-2">
              <Label>Additional Preferences</Label>
              <Textarea
                value={formData.preferences}
                onChange={(e) => handleInputChange('preferences', e.target.value)}
                placeholder="Any specific requirements, organic farming interest, cash crop preferences, etc."
                className="glass-input h-24"
              />
            </div>

            <Button
              type="submit"
              className="w-full glass-button"
              disabled={isSubmitting || !formData.location || !formData.landSize || !formData.soilType || !formData.waterSource || !formData.season}
            >
              {isSubmitting ? "Analyzing Your Farm Conditions..." : "Get AI Crop Recommendations"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}