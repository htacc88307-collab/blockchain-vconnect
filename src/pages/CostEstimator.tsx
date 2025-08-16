import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Building, Truck, Users, PieChart } from "lucide-react";
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const facilityTypes = [
  { value: "school", label: "School Building", baseRate: 500000 },
  { value: "hospital", label: "Primary Health Center", baseRate: 800000 },
  { value: "water", label: "Water Supply System", baseRate: 300000 },
  { value: "electricity", label: "Electricity Infrastructure", baseRate: 400000 },
  { value: "road", label: "Road Construction", baseRate: 200000 },
  { value: "community", label: "Community Center", baseRate: 350000 },
];

const materialOptions = [
  { value: "basic", label: "Basic Materials", multiplier: 1.0 },
  { value: "standard", label: "Standard Materials", multiplier: 1.3 },
  { value: "premium", label: "Premium Materials", multiplier: 1.6 },
];

const laborOptions = [
  { value: "local", label: "Local Labor", multiplier: 1.0 },
  { value: "skilled", label: "Skilled Labor", multiplier: 1.4 },
  { value: "specialized", label: "Specialized Labor", multiplier: 1.8 },
];

const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];

export default function CostEstimator() {
  const [facilityType, setFacilityType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [material, setMaterial] = useState("");
  const [labor, setLabor] = useState("");
  const [transportDistance, setTransportDistance] = useState("");
  const [estimate, setEstimate] = useState<{
    facility: string;
    quantity: number;
    breakdown: Array<{ name: string; value: number; percentage: number }>;
    total: number;
    perUnit: number;
  } | null>(null);

  const calculateCost = () => {
    if (!facilityType || !quantity || !material || !labor || !transportDistance) {
      return;
    }

    const facility = facilityTypes.find(f => f.value === facilityType);
    const materialMultiplier = materialOptions.find(m => m.value === material)?.multiplier || 1;
    const laborMultiplier = laborOptions.find(l => l.value === labor)?.multiplier || 1;
    
    const baseCost = facility!.baseRate * parseInt(quantity);
    const materialCost = baseCost * 0.4 * materialMultiplier;
    const laborCost = baseCost * 0.35 * laborMultiplier;
    const transportCost = Math.min(baseCost * 0.15 * (parseInt(transportDistance) / 50), baseCost * 0.25);
    const overheadCost = baseCost * 0.1;
    
    const totalCost = materialCost + laborCost + transportCost + overheadCost;

    setEstimate({
      facility: facility!.label,
      quantity: parseInt(quantity),
      breakdown: [
        { name: "Materials", value: Math.round(materialCost), percentage: Math.round((materialCost / totalCost) * 100) },
        { name: "Labor", value: Math.round(laborCost), percentage: Math.round((laborCost / totalCost) * 100) },
        { name: "Transport", value: Math.round(transportCost), percentage: Math.round((transportCost / totalCost) * 100) },
        { name: "Overhead", value: Math.round(overheadCost), percentage: Math.round((overheadCost / totalCost) * 100) },
      ],
      total: Math.round(totalCost),
      perUnit: Math.round(totalCost / parseInt(quantity))
    });
  };

  const recentEstimates = [
    { facility: "School Building", village: "Krishnanagar", cost: 750000, date: "2 days ago" },
    { facility: "Water Supply", village: "Rampur", cost: 420000, date: "3 days ago" },
    { facility: "Health Center", village: "Sundarpur", cost: 950000, date: "1 week ago" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <Calculator className="h-8 w-8 text-primary" />
            <span>Infrastructure Cost Estimator</span>
          </h1>
          <p className="text-muted-foreground">
            Calculate development project costs with detailed breakdowns
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cost Calculator Form */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Project Cost Calculator</CardTitle>
              <CardDescription>Enter project details to get cost estimation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Facility Type */}
              <div className="space-y-2">
                <Label htmlFor="facility">Facility Type</Label>
                <Select value={facilityType} onValueChange={setFacilityType}>
                  <SelectTrigger className="glass-card border-white/20">
                    <SelectValue placeholder="Select facility type" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    {facilityTypes.map((facility) => (
                      <SelectItem key={facility.value} value={facility.value}>
                        <div className="flex items-center space-x-2">
                          <Building className="h-4 w-4" />
                          <span>{facility.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity/Units</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Enter number of units"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="glass-card border-white/20"
                />
              </div>

              {/* Material Quality */}
              <div className="space-y-2">
                <Label htmlFor="material">Material Quality</Label>
                <Select value={material} onValueChange={setMaterial}>
                  <SelectTrigger className="glass-card border-white/20">
                    <SelectValue placeholder="Select material quality" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    {materialOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <span>{option.label} (+{((option.multiplier - 1) * 100).toFixed(0)}%)</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Labor Type */}
              <div className="space-y-2">
                <Label htmlFor="labor">Labor Type</Label>
                <Select value={labor} onValueChange={setLabor}>
                  <SelectTrigger className="glass-card border-white/20">
                    <SelectValue placeholder="Select labor type" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    {laborOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span>{option.label} (+{((option.multiplier - 1) * 100).toFixed(0)}%)</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Transport Distance */}
              <div className="space-y-2">
                <Label htmlFor="transport">Transport Distance (km)</Label>
                <Input
                  id="transport"
                  type="number"
                  placeholder="Distance from nearest city"
                  value={transportDistance}
                  onChange={(e) => setTransportDistance(e.target.value)}
                  className="glass-card border-white/20"
                />
              </div>

              {/* Calculate Button */}
              <Button
                onClick={calculateCost}
                className="w-full gradient-primary text-white font-medium py-3 hover:scale-105 transition-transform"
                disabled={!facilityType || !quantity || !material || !labor || !transportDistance}
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculate Estimate
              </Button>
            </CardContent>
          </Card>

          {/* Results Panel */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Cost Breakdown</CardTitle>
              <CardDescription>
                {estimate ? "Detailed cost analysis" : "Enter project details to see estimation"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {estimate ? (
                <div className="space-y-6">
                  {/* Total Cost */}
                  <div className="text-center p-6 bg-gradient-glass rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Project Cost</h3>
                    <p className="text-4xl font-bold text-primary">₹{estimate.total.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      ₹{estimate.perUnit.toLocaleString()} per unit
                    </p>
                  </div>

                  {/* Pie Chart */}
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={estimate.breakdown}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percentage }) => `${name} (${percentage}%)`}
                        >
                          {estimate.breakdown.map((entry, index: number) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Breakdown Table */}
                  <div className="space-y-3">
                    {estimate.breakdown.map((item, index: number) => (
                      <div key={item.name} className="flex items-center justify-between p-3 bg-gradient-glass rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: COLORS[index] }}
                          />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">₹{item.value.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">{item.percentage}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calculator className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Ready to Calculate
                  </h3>
                  <p className="text-muted-foreground">
                    Fill in the project details to get a detailed cost breakdown
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Estimates */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Recent Cost Estimates</CardTitle>
            <CardDescription>Previously calculated project costs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentEstimates.map((estimate, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-glass rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Building className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">{estimate.facility}</p>
                      <p className="text-sm text-muted-foreground">{estimate.village}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">₹{estimate.cost.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{estimate.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="stat-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Estimates</p>
                  <p className="text-2xl font-bold text-foreground">156</p>
                </div>
                <Calculator className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Projects Approved</p>
                  <p className="text-2xl font-bold text-foreground">89</p>
                </div>
                <Building className="h-6 w-6 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Budget</p>
                  <p className="text-2xl font-bold text-foreground">₹2.3Cr</p>
                </div>
                <PieChart className="h-6 w-6 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Cost</p>
                  <p className="text-2xl font-bold text-foreground">₹5.8L</p>
                </div>
                <Truck className="h-6 w-6 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}