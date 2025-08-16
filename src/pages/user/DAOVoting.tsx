import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Vote, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Minus,
  Shield,
  TrendingUp
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { daoProposals, submitDAOVote, getUserTokenBalance } from '@/lib/web3-demo';

export default function DAOVoting() {
  const [votedProposals, setVotedProposals] = useState<Set<number>>(new Set());
  const [userBalance] = useState(getUserTokenBalance());
  const { toast } = useToast();

  const handleVote = async (proposalId: number, vote: 'yes' | 'no' | 'abstain') => {
    const result = submitDAOVote(proposalId, vote);
    
    toast({
      title: "Vote Submitted Successfully!",
      description: `Your vote has been recorded on the blockchain. TX: ${result.transactionHash.slice(0, 10)}...`,
    });

    setVotedProposals(prev => new Set(prev).add(proposalId));
  };

  const getVoteIcon = (vote: string) => {
    switch (vote) {
      case 'yes': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'no': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getVoteColor = (vote: string) => {
    switch (vote) {
      case 'yes': return 'text-green-600 bg-green-500/10 border-green-500/20';
      case 'no': return 'text-red-600 bg-red-500/10 border-red-500/20';
      default: return 'text-gray-600 bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          DAO Voting Platform
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Participate in democratic decision-making for village development. Your voice matters!
        </p>
        
        {/* Web3 Demo Badge */}
        <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 border-blue-500/20">
          🔗 Web3 Demo - Transparent & Immutable Voting
        </Badge>
      </div>

      {/* User Token Balance */}
      <Card className="glass-card max-w-md mx-auto">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="font-medium">Your Voting Power</span>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">{userBalance}</p>
              <p className="text-sm text-muted-foreground">$VCON Tokens</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Proposals */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Active Proposals</h2>
        
        {daoProposals.map((proposal) => {
          const totalVotes = Object.values(proposal.results).reduce((a, b) => a + b, 0);
          const hasVoted = votedProposals.has(proposal.id);
          
          return (
            <Card key={proposal.id} className="glass-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{proposal.title}</CardTitle>
                    <p className="text-muted-foreground">{proposal.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Ends: {proposal.deadline}
                    </span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Voting Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {proposal.options.map((option) => {
                    const votes = proposal.results[option] || 0;
                    const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
                    
                    return (
                      <div key={option} className="glass-card p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{option}</h3>
                          <span className="text-sm font-bold text-primary">{votes} votes</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                        <p className="text-sm text-muted-foreground">
                          {percentage.toFixed(1)}% of total votes
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Voting Actions */}
                {!hasVoted ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Vote className="w-4 h-4 text-primary" />
                      <span className="font-medium">Cast Your Vote</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {proposal.options.map((option) => (
                        <Button
                          key={option}
                          variant="outline"
                          onClick={() => handleVote(proposal.id, option.toLowerCase() as 'yes' | 'no' | 'abstain')}
                          className="glass-button-sm"
                        >
                          Vote for {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="glass-card p-4 bg-green-500/10 border-green-500/20">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-600">Vote Submitted</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your vote has been recorded on the blockchain
                    </p>
                  </div>
                )}

                {/* Web3 Demo Info */}
                <div className="glass-card p-4 bg-blue-500/5 border-blue-500/10">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-blue-600">Web3 Demo Features</span>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>• Votes are recorded on blockchain for transparency</p>
                    <p>• Smart contracts ensure vote integrity</p>
                    <p>• Voting power based on $VCON token balance</p>
                    <p>• Immutable voting history</p>
                  </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="glass-card p-4">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="font-medium">Total Voters</span>
                    </div>
                    <p className="text-2xl font-bold text-primary">{totalVotes}</p>
                  </div>
                  <div className="glass-card p-4">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-accent" />
                      <span className="font-medium">Participation</span>
                    </div>
                    <p className="text-2xl font-bold text-accent">
                      {((totalVotes / 1500) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* How DAO Voting Works */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Vote className="w-5 h-5 text-primary" />
            <span>How DAO Voting Works</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">1</span>
              </div>
              <h3 className="font-medium">Submit Proposal</h3>
              <p className="text-sm text-muted-foreground">
                Community members can submit proposals for village development
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">2</span>
              </div>
              <h3 className="font-medium">Vote with Tokens</h3>
              <p className="text-sm text-muted-foreground">
                Cast your vote using $VCON tokens as voting power
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">3</span>
              </div>
              <h3 className="font-medium">Execute Decision</h3>
              <p className="text-sm text-muted-foreground">
                Winning proposals are automatically executed through smart contracts
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
