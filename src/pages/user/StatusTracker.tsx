import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, CheckCircle, AlertCircle, Eye, Shield, Link, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateStatusUpdateWeb3Data } from '@/lib/web3-demo';

interface IssueReport {
  id: string;
  title: string;
  type: string;
  status: 'pending' | 'in-progress' | 'completed';
  progress: number;
  submittedDate: string;
  lastUpdate: string;
  description: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  web3Data?: {
    ipfsHash: string;
    transactionHash: string;
    sbtBadge?: string;
  };
}

export default function StatusTracker() {
  const reports: IssueReport[] = [
    {
      id: 'VCT-2024-001',
      title: 'Water Supply Interruption in Main Street',
      type: 'Water Supply',
      status: 'completed',
      progress: 100,
      submittedDate: '2024-03-15',
      lastUpdate: '2024-03-22',
      description: 'Water supply has been disrupted for 3 days',
      urgency: 'high',
      web3Data: generateStatusUpdateWeb3Data()
    },
    {
      id: 'VCT-2024-002',
      title: 'Road Repair Needed on Village Road',
      type: 'Road & Transportation',
      status: 'in-progress',
      progress: 65,
      submittedDate: '2024-03-18',
      lastUpdate: '2024-03-23',
      description: 'Large potholes making road dangerous',
      urgency: 'medium',
      web3Data: generateStatusUpdateWeb3Data()
    },
    {
      id: 'VCT-2024-003',
      title: 'School Building Maintenance Required',
      type: 'Education',
      status: 'pending',
      progress: 15,
      submittedDate: '2024-03-20',
      lastUpdate: '2024-03-21',
      description: 'Roof leaking in classroom 3 and 4',
      urgency: 'medium',
      web3Data: generateStatusUpdateWeb3Data()
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-600 border-green-500/30';
      case 'in-progress': return 'bg-blue-500/20 text-blue-600 border-blue-500/30';
      case 'pending': return 'bg-orange-500/20 text-orange-600 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-600 border-gray-500/30';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-500/20 text-red-600 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-600 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-600 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-600 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    return 'bg-orange-500';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Issue Status Tracker</h1>
          <p className="text-muted-foreground">
            Track the progress of your submitted reports and issues
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">1</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">1</div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">1</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </CardContent>
          </Card>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {reports.map((report, index) => (
            <Card key={report.id} className="glass-card hover-scale animate-fade-in" 
                  style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-lg">{report.title}</h3>
                      <Badge className={`border ${getStatusColor(report.status)}`}>
                        {getStatusIcon(report.status)}
                        <span className="ml-1 capitalize">{report.status.replace('-', ' ')}</span>
                      </Badge>
                      <Badge variant="outline" className={`border ${getUrgencyColor(report.urgency)}`}>
                        {report.urgency.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span>ID: {report.id}</span>
                      <span>Type: {report.type}</span>
                      <span>Submitted: {new Date(report.submittedDate).toLocaleDateString()}</span>
                      <span>Updated: {new Date(report.lastUpdate).toLocaleDateString()}</span>
                    </div>

                    {/* Web3 Demo Data */}
                    {report.web3Data && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                        <div className="glass-card p-3 bg-blue-500/5 border-blue-500/10">
                          <div className="flex items-center space-x-2 mb-1">
                            <Link className="w-3 h-3 text-blue-500" />
                            <span className="text-xs font-medium text-blue-600">IPFS Hash</span>
                          </div>
                          <p className="text-xs font-mono text-muted-foreground break-all">
                            {report.web3Data.ipfsHash.slice(0, 20)}...
                          </p>
                        </div>

                        <div className="glass-card p-3 bg-green-500/5 border-green-500/10">
                          <div className="flex items-center space-x-2 mb-1">
                            <Shield className="w-3 h-3 text-green-500" />
                            <span className="text-xs font-medium text-green-600">Transaction</span>
                          </div>
                          <p className="text-xs font-mono text-muted-foreground break-all">
                            {report.web3Data.transactionHash.slice(0, 20)}...
                          </p>
                        </div>

                        {report.web3Data.sbtBadge && (
                          <div className="glass-card p-3 bg-purple-500/5 border-purple-500/10">
                            <div className="flex items-center space-x-2 mb-1">
                              <Shield className="w-3 h-3 text-purple-500" />
                              <span className="text-xs font-medium text-purple-600">Officer SBT</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {report.web3Data.sbtBadge}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="min-w-[200px] space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{report.progress}%</span>
                      </div>
                      <Progress 
                        value={report.progress} 
                        className="h-2"
                      />
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full glass-button-sm"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State (if no reports) */}
        {reports.length === 0 && (
          <Card className="glass-card">
            <CardContent className="py-12 text-center">
              <AlertCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No Reports Yet</h3>
              <p className="text-muted-foreground mb-4">
                You haven't submitted any issues yet. Start by reporting a problem in your village.
              </p>
              <Button className="glass-button">
                Report Your First Issue
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}