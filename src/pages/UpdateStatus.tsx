import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { RefreshCw, MapPin, AlertTriangle, CheckCircle, Clock, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const villages = [
  { id: "1", name: "Krishnanagar", issues: 2 },
  { id: "2", name: "Rampur", issues: 5 },
  { id: "3", name: "Sundarpur", issues: 8 },
  { id: "4", name: "Greenfield", issues: 12 },
];

const issuesByVillage = {
  "1": [
    { id: "i1", title: "Water pump maintenance", category: "Water Supply", status: "pending", priority: "high", reportedDate: "2024-01-15" },
    { id: "i2", title: "Street lighting repair", category: "Electricity", status: "in-progress", priority: "medium", reportedDate: "2024-01-18" },
  ],
  "2": [
    { id: "i3", title: "Road pothole repair", category: "Infrastructure", status: "pending", priority: "high", reportedDate: "2024-01-10" },
    { id: "i4", title: "School building maintenance", category: "Education", status: "pending", priority: "medium", reportedDate: "2024-01-12" },
    { id: "i5", title: "Medical center supplies", category: "Healthcare", status: "in-progress", priority: "high", reportedDate: "2024-01-14" },
    { id: "i6", title: "Drainage system cleaning", category: "Sanitation", status: "pending", priority: "low", reportedDate: "2024-01-16" },
    { id: "i7", title: "Internet connectivity", category: "Technology", status: "pending", priority: "medium", reportedDate: "2024-01-19" },
  ],
  "3": [
    { id: "i8", title: "Water quality testing", category: "Water Supply", status: "pending", priority: "high", reportedDate: "2024-01-08" },
    { id: "i9", title: "Power outage fix", category: "Electricity", status: "in-progress", priority: "high", reportedDate: "2024-01-09" },
    { id: "i10", title: "Waste management", category: "Sanitation", status: "pending", priority: "medium", reportedDate: "2024-01-11" },
    { id: "i11", title: "Transport facility", category: "Transportation", status: "pending", priority: "low", reportedDate: "2024-01-13" },
    { id: "i12", title: "Agricultural support", category: "Agriculture", status: "pending", priority: "medium", reportedDate: "2024-01-17" },
    { id: "i13", title: "Community center repair", category: "Infrastructure", status: "pending", priority: "low", reportedDate: "2024-01-20" },
    { id: "i14", title: "Security lighting", category: "Safety", status: "in-progress", priority: "medium", reportedDate: "2024-01-21" },
    { id: "i15", title: "Library resources", category: "Education", status: "pending", priority: "low", reportedDate: "2024-01-22" },
  ],
  "4": [
    { id: "i16", title: "Well water pump", category: "Water Supply", status: "pending", priority: "high", reportedDate: "2024-01-05" },
    { id: "i17", title: "Electricity connection", category: "Electricity", status: "pending", priority: "high", reportedDate: "2024-01-07" },
    // ... more issues for Greenfield
  ],
};

const statusOptions = [
  { value: "pending", label: "Pending", color: "orange" },
  { value: "in-progress", label: "In Progress", color: "blue" },
  { value: "completed", label: "Completed", color: "green" },
];

const priorityOptions = [
  { value: "low", label: "Low", color: "gray" },
  { value: "medium", label: "Medium", color: "yellow" },
  { value: "high", label: "High", color: "red" },
];

export default function UpdateStatus() {
  const [selectedVillage, setSelectedVillage] = useState("");
  const [selectedIssue, setSelectedIssue] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const currentIssues = selectedVillage ? issuesByVillage[selectedVillage as keyof typeof issuesByVillage] || [] : [];
  const selectedIssueData = currentIssues.find(issue => issue.id === selectedIssue);

  const handleSubmit = async () => {
    if (!selectedVillage || !selectedIssue || !newStatus) {
      toast({
        title: "Missing Information",
        description: "Please select village, issue, and new status",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Status Updated Successfully",
        description: `Issue status changed to ${statusOptions.find(s => s.value === newStatus)?.label}`,
      });
      
      // Reset form
      setSelectedIssue("");
      setNewStatus("");
      setNotes("");
    }, 1500);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = statusOptions.find(s => s.value === status);
    const variant = status === 'completed' ? 'default' : status === 'in-progress' ? 'secondary' : 'outline';
    return <Badge variant={variant}>{statusConfig?.label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = priorityOptions.find(p => p.value === priority);
    const variant = priority === 'high' ? 'destructive' : priority === 'medium' ? 'secondary' : 'outline';
    return <Badge variant={variant}>{priorityConfig?.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <RefreshCw className="h-8 w-8 text-primary" />
            <span>Update Issue Status</span>
          </h1>
          <p className="text-muted-foreground">
            Manage and update the status of reported issues across villages
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Status Update Form */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Update Status</CardTitle>
              <CardDescription>Select village and issue to update status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Village Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Select Village</label>
                <Select value={selectedVillage} onValueChange={setSelectedVillage}>
                  <SelectTrigger className="glass-card border-white/20">
                    <SelectValue placeholder="Choose a village" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    {villages.map((village) => (
                      <SelectItem key={village.id} value={village.id}>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{village.name}</span>
                          <Badge variant="secondary">{village.issues} issues</Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Issue Selection */}
              {selectedVillage && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Select Issue</label>
                  <Select value={selectedIssue} onValueChange={setSelectedIssue}>
                    <SelectTrigger className="glass-card border-white/20">
                      <SelectValue placeholder="Choose an issue" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      {currentIssues.map((issue) => (
                        <SelectItem key={issue.id} value={issue.id}>
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="truncate">{issue.title}</span>
                            {getStatusBadge(issue.status)}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Current Issue Details */}
              {selectedIssueData && (
                <Card className="bg-gradient-glass border-white/20">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-foreground">{selectedIssueData.title}</h4>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Badge variant="outline">{selectedIssueData.category}</Badge>
                        {getStatusBadge(selectedIssueData.status)}
                        {getPriorityBadge(selectedIssueData.priority)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Reported: {new Date(selectedIssueData.reportedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* New Status Selection */}
              {selectedIssue && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">New Status</label>
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger className="glass-card border-white/20">
                      <SelectValue placeholder="Select new status" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      {statusOptions.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          <div className="flex items-center space-x-2">
                            {status.value === 'pending' && <Clock className="h-4 w-4" />}
                            {status.value === 'in-progress' && <RefreshCw className="h-4 w-4" />}
                            {status.value === 'completed' && <CheckCircle className="h-4 w-4" />}
                            <span>{status.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Notes */}
              {selectedIssue && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Update Notes (Optional)</label>
                  <Textarea
                    placeholder="Add any additional notes about this status update..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="glass-card border-white/20 min-h-20"
                  />
                </div>
              )}

              {/* Submit Button */}
              {selectedIssue && newStatus && (
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full gradient-primary text-white font-medium py-3 hover:scale-105 transition-transform"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Updating Status...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Update Status
                    </>
                  )}
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Issues Overview */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Issues Overview</CardTitle>
              <CardDescription>
                {selectedVillage 
                  ? `Issues in ${villages.find(v => v.id === selectedVillage)?.name}`
                  : "Select a village to view issues"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedVillage ? (
                <div className="space-y-3">
                  {currentIssues.map((issue) => (
                    <Card 
                      key={issue.id} 
                      className={`bg-gradient-glass border-white/20 cursor-pointer transition-all hover:shadow-card ${
                        selectedIssue === issue.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setSelectedIssue(issue.id)}
                    >
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium text-foreground text-sm">{issue.title}</h4>
                            {getPriorityBadge(issue.priority)}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">{issue.category}</Badge>
                              {getStatusBadge(issue.status)}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {new Date(issue.reportedDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    No Village Selected
                  </h3>
                  <p className="text-muted-foreground">
                    Select a village to view and manage issues
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="stat-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Issues</p>
                  <p className="text-2xl font-bold text-foreground">47</p>
                </div>
                <AlertTriangle className="h-6 w-6 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold text-foreground">13</p>
                </div>
                <RefreshCw className="h-6 w-6 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed Today</p>
                  <p className="text-2xl font-bold text-foreground">8</p>
                </div>
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Resolution</p>
                  <p className="text-2xl font-bold text-foreground">5.2d</p>
                </div>
                <Clock className="h-6 w-6 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}