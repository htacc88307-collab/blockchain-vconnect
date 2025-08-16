// Web3 Demo Utilities for V-Connect Platform
// This file contains simulation functions for Web3 features

export interface Web3DemoData {
  ipfsHash: string;
  transactionHash: string;
  sbtBadge?: string;
  tokenReward?: number;
  daoVote?: {
    proposal: string;
    vote: 'yes' | 'no' | 'abstain';
    weight: number;
  };
}

// Generate fake IPFS hash
export const generateIPFSHash = (): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let hash = 'Qm';
  for (let i = 0; i < 44; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
};

// Generate fake transaction hash
export const generateTransactionHash = (): string => {
  const chars = 'abcdef0123456789';
  let hash = '0x';
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
};

// Generate fake SBT badge
export const generateSBTBadge = (role: string): string => {
  const badges = {
    'Village Head': '🏛️ Village Head SBT',
    'Health Officer': '🏥 Health Officer SBT',
    'Education Officer': '📚 Education Officer SBT',
    'Agriculture Officer': '🌾 Agriculture Officer SBT',
    'Infrastructure Officer': '🏗️ Infrastructure Officer SBT',
    'Security Officer': '🛡️ Security Officer SBT'
  };
  return badges[role as keyof typeof badges] || '👤 Officer SBT';
};

// Calculate token rewards based on issue type and urgency
export const calculateTokenReward = (issueType: string, urgency: string): number => {
  const baseRewards = {
    'Water Supply': 15,
    'Road & Transportation': 12,
    'Education': 10,
    'Healthcare': 20,
    'Electricity': 15,
    'Sanitation': 12,
    'Agriculture Support': 8,
    'Employment': 10,
    'Other': 5
  };

  const urgencyMultipliers = {
    'low': 0.5,
    'medium': 1.0,
    'high': 1.5,
    'critical': 2.0
  };

  const baseReward = baseRewards[issueType as keyof typeof baseRewards] || 5;
  const multiplier = urgencyMultipliers[urgency as keyof typeof urgencyMultipliers] || 1.0;
  
  return Math.round(baseReward * multiplier);
};

// DAO voting proposals
export const daoProposals = [
  {
    id: 1,
    title: 'Road vs Water Project Priority',
    description: 'Which infrastructure project should be prioritized this quarter?',
    options: ['Road Development', 'Water Supply Enhancement'],
    deadline: '2024-12-31',
    totalVotes: 1247,
    results: { 'Road Development': 678, 'Water Supply Enhancement': 569 }
  },
  {
    id: 2,
    title: 'Digital Literacy Program Funding',
    description: 'Should we allocate 20% of the budget to digital literacy programs?',
    options: ['Yes', 'No'],
    deadline: '2024-11-30',
    totalVotes: 892,
    results: { 'Yes': 734, 'No': 158 }
  },
  {
    id: 3,
    title: 'Solar Energy Implementation',
    description: 'Proposal to install solar panels in community centers',
    options: ['Approve', 'Reject', 'Modify'],
    deadline: '2024-10-15',
    totalVotes: 567,
    results: { 'Approve': 423, 'Reject': 89, 'Modify': 55 }
  }
];

// Generate Web3 demo data for an issue report
export const generateWeb3DemoData = (issueType: string, urgency: string): Web3DemoData => {
  return {
    ipfsHash: generateIPFSHash(),
    transactionHash: generateTransactionHash(),
    tokenReward: calculateTokenReward(issueType, urgency)
  };
};

// Generate Web3 demo data for status update
export const generateStatusUpdateWeb3Data = (): Web3DemoData => {
  return {
    ipfsHash: generateIPFSHash(),
    transactionHash: generateTransactionHash(),
    sbtBadge: generateSBTBadge('Infrastructure Officer')
  };
};

// Mock DAO voting function
export const submitDAOVote = (proposalId: number, vote: 'yes' | 'no' | 'abstain', weight: number = 1) => {
  return {
    success: true,
    transactionHash: generateTransactionHash(),
    proposalId,
    vote,
    weight,
    timestamp: new Date().toISOString()
  };
};

// Mock token balance
export const getUserTokenBalance = (): number => {
  return Math.floor(Math.random() * 500) + 100; // Random balance between 100-600
};

// Mock SBT badges for officers
export const officerSBTS = [
  { name: 'Rajesh Kumar', role: 'Village Head', badge: generateSBTBadge('Village Head'), verified: true },
  { name: 'Dr. Priya Singh', role: 'Health Officer', badge: generateSBTBadge('Health Officer'), verified: true },
  { name: 'Amit Patel', role: 'Education Officer', badge: generateSBTBadge('Education Officer'), verified: true },
  { name: 'Suresh Yadav', role: 'Agriculture Officer', badge: generateSBTBadge('Agriculture Officer'), verified: true },
  { name: 'Meera Sharma', role: 'Infrastructure Officer', badge: generateSBTBadge('Infrastructure Officer'), verified: true }
];
