import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Link, 
  Coins, 
  Vote, 
  Users, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  Brain,
  BarChart3,
  FileText
} from 'lucide-react';
import { 
  generateIPFSHash, 
  generateTransactionHash, 
  generateSBTBadge, 
  officerSBTS,
  daoProposals,
  getUserTokenBalance
} from '@/lib/web3-demo';

interface Web3Complaint {
  id: string;
  title: string;
  issueType: string;
  urgency: string;
  ipfsHash: string;
  transactionHash: string;
  tokenReward: number;
  status: 'pending' | 'in-progress' | 'completed';
  timestamp: string;
  officerSBT?: string;
}

export default function Web3Dashboard() {
  const [complaints, setComplaints] = useState<Web3Complaint[]>([]);
  const [totalTokenRewards, setTotalTokenRewards] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    // Generate mock complaints with Web3 data
    const mockComplaints: Web3Complaint[] = [
      {
        id: 'VCT-2024-001',
        title: 'Water Supply Issue in Block A',
        issueType: 'Water Supply',
        urgency: 'high',
        ipfsHash: generateIPFSHash(),
        transactionHash: generateTransactionHash(),
        tokenReward: 22,
        status: 'completed',
        timestamp: '2024-01-15T10:30:00Z',
        officerSBT: generateSBTBadge('Infrastructure Officer')
      },
      {
        id: 'VCT-2024-002',
        title: 'Road Repair Needed',
        issueType: 'Road & Transportation',
        urgency: 'medium',
        ipfsHash: generateIPFSHash(),
        transactionHash: generateTransactionHash(),
        tokenReward: 12,
        status: 'in-progress',
        timestamp: '2024-01-16T14:20:00Z',
        officerSBT: generateSBTBadge('Infrastructure Officer')
      },
      {
        id: 'VCT-2024-003',
        title: 'Healthcare Center Equipment',
        issueType: 'Healthcare',
        urgency: 'critical',
        ipfsHash: generateIPFSHash(),
        transactionHash: generateTransactionHash(),
        tokenReward: 40,
        status: 'pending',
        timestamp: '2024-01-17T09:15:00Z',
        officerSBT: generateSBTBadge('Health Officer')
      },
      {
        id: 'VCT-2024-004',
        title: 'School Building Maintenance',
        issueType: 'Education',
        urgency: 'low',
        ipfsHash: generateIPFSHash(),
        transactionHash: generateTransactionHash(),
        tokenReward: 5,
        status: 'completed',
        timestamp: '2024-01-18T16:45:00Z',
        officerSBT: generateSBTBadge('Education Officer')
      }
    ];

    setComplaints(mockComplaints);
    setTotalTokenRewards(mockComplaints.reduce((sum, c) => sum + c.tokenReward, 0));
    setTotalVotes(daoProposals.reduce((sum, p) => sum + p.totalVotes, 0));
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-500/10 border-green-500/20';
      case 'in-progress': return 'text-yellow-600 bg-yellow-500/10 border-yellow-500/20';
      case 'pending': return 'text-red-600 bg-red-500/10 border-red-500/20';
      default: return 'text-gray-600 bg-gray-500/10 border-gray-500/20';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold text-foreground">Web3 Dashboard</h1>
            <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 border-blue-500/20">
              🔗 Demo Features
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Comprehensive view of all Web3 features including blockchain transactions, IPFS storage, SBT badges, and DAO voting
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Complaints</p>
                  <p className="text-3xl font-bold text-foreground">{complaints.length}</p>
                </div>
                <div className="glass-card p-3 rounded-lg">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Token Rewards</p>
                  <p className="text-3xl font-bold text-foreground">{totalTokenRewards}</p>
                  <p className="text-sm text-muted-foreground">$VCON Distributed</p>
                </div>
                <div className="glass-card p-3 rounded-lg">
                  <Coins className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">DAO Votes</p>
                  <p className="text-3xl font-bold text-foreground">{totalVotes}</p>
                  <p className="text-sm text-muted-foreground">Total Participation</p>
                </div>
                <div className="glass-card p-3 rounded-lg">
                  <Vote className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">SBT Officers</p>
                  <p className="text-3xl font-bold text-foreground">{officerSBTS.length}</p>
                  <p className="text-sm text-muted-foreground">Verified Badges</p>
                </div>
                <div className="glass-card p-3 rounded-lg">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Web3 Complaints Section */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Link className="w-5 h-5 text-primary" />
              <span>Web3 Complaints & Blockchain Data</span>
            </CardTitle>
            <p className="text-muted-foreground">
              All complaints are stored on IPFS and transactions are recorded on blockchain
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complaints.map((complaint) => (
                <div key={complaint.id} className="glass-card p-4 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold">{complaint.title}</h3>
                        <Badge className={getStatusColor(complaint.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(complaint.status)}
                            <span className="capitalize">{complaint.status}</span>
                          </div>
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {complaint.issueType} • {complaint.urgency} urgency • {complaint.id}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-yellow-600">+{complaint.tokenReward} $VCON</p>
                      <p className="text-xs text-muted-foreground">Token Reward</p>
                    </div>
                  </div>

                  {/* Web3 Data */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="glass-card p-3 bg-blue-500/5 border-blue-500/10">
                      <div className="flex items-center space-x-2 mb-2">
                        <Link className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium text-blue-600">IPFS Hash</span>
                      </div>
                      <p className="text-xs font-mono text-muted-foreground break-all">
                        {complaint.ipfsHash}
                      </p>
                    </div>

                    <div className="glass-card p-3 bg-green-500/5 border-green-500/10">
                      <div className="flex items-center space-x-2 mb-2">
                        <Shield className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-green-600">Transaction</span>
                      </div>
                      <p className="text-xs font-mono text-muted-foreground break-all">
                        {complaint.transactionHash}
                      </p>
                    </div>

                    {complaint.officerSBT && (
                      <div className="glass-card p-3 bg-purple-500/5 border-purple-500/10">
                        <div className="flex items-center space-x-2 mb-2">
                          <Shield className="w-4 h-4 text-purple-500" />
                          <span className="text-sm font-medium text-purple-600">Officer SBT</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {complaint.officerSBT}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* DAO Voting Results */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Vote className="w-5 h-5 text-accent" />
              <span>DAO Voting Results</span>
            </CardTitle>
            <p className="text-muted-foreground">
              Transparent voting results recorded on blockchain
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {daoProposals.map((proposal) => {
                const totalVotes = Object.values(proposal.results).reduce((a, b) => a + b, 0);
                
                return (
                  <div key={proposal.id} className="glass-card p-4 space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">{proposal.title}</h3>
                      <p className="text-sm text-muted-foreground">{proposal.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {proposal.options.map((option) => {
                        const votes = proposal.results[option] || 0;
                        const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
                        
                        return (
                          <div key={option} className="glass-card p-3 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{option}</span>
                              <span className="text-sm font-bold text-primary">{votes} votes</span>
                            </div>
                            <Progress value={percentage} className="h-2" />
                            <p className="text-xs text-muted-foreground">
                              {percentage.toFixed(1)}% of total votes
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Total Votes: {totalVotes}</span>
                      <span>Deadline: {proposal.deadline}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* SBT Officer Badges */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span>Soulbound Token (SBT) Officer Badges</span>
            </CardTitle>
            <p className="text-muted-foreground">
              Verified officer identities with immutable SBT badges
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {officerSBTS.map((officer, index) => (
                <div key={index} className="glass-card p-4 space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {officer.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{officer.name}</h3>
                      <p className="text-sm text-muted-foreground">{officer.role}</p>
                    </div>
                  </div>
                  
                  <div className="glass-card p-3 bg-green-500/5 border-green-500/10">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-600">{officer.badge}</span>
                    </div>
                    {officer.verified && (
                      <p className="text-xs text-muted-foreground mt-1">
                        ✓ Verified on blockchain
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Web3 Features Overview */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-primary" />
              <span>Web3 Features Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto">
                  <Link className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold">IPFS Storage</h3>
                <p className="text-sm text-muted-foreground">
                  All complaints and documents are stored immutably on IPFS
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold">Blockchain Transactions</h3>
                <p className="text-sm text-muted-foreground">
                  Every action is recorded as a transparent blockchain transaction
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto">
                  <Vote className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold">DAO Voting</h3>
                <p className="text-sm text-muted-foreground">
                  Democratic decision-making through transparent voting
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto">
                  <Coins className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="font-semibold">Token Rewards</h3>
                <p className="text-sm text-muted-foreground">
                  Incentivize participation with $VCON token rewards
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
