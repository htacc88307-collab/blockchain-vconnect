import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GraduationCap, User, Send, BookOpen, Briefcase, Star, ExternalLink } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface EducationPath {
  title: string;
  description: string;
  duration: string;
  cost: string;
  requirements: string[];
  opportunities: string[];
  rating: number;
}

export default function EduPath() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Welcome to EduPath! I\'m your education and career guidance counselor. I can help you explore education opportunities, career paths, skill development programs, and more. Tell me about your interests, current education level, or what you\'d like to learn!',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const educationPaths: EducationPath[] = [
    {
      title: 'Digital Marketing Certificate',
      description: 'Learn modern marketing techniques including social media, SEO, and content marketing',
      duration: '6 months',
      cost: 'Free - ₹15,000',
      requirements: ['10th Pass', 'Basic computer knowledge', 'Internet access'],
      opportunities: ['Freelancer', 'Small business marketing', 'E-commerce', 'Content creator'],
      rating: 4.8
    },
    {
      title: 'Computer Basics & MS Office',
      description: 'Fundamental computer skills and office software training',
      duration: '3 months',
      cost: 'Free - ₹8,000',
      requirements: ['8th Pass', 'Access to computer/laptop'],
      opportunities: ['Data entry', 'Office assistant', 'Government jobs', 'Small business'],
      rating: 4.5
    },
    {
      title: 'Mobile Repair Course',
      description: 'Practical training in smartphone and tablet repair',
      duration: '4 months',
      cost: '₹12,000 - ₹25,000',
      requirements: ['10th Pass', 'Interest in electronics'],
      opportunities: ['Mobile repair shop', 'Freelance repair', 'Service center job'],
      rating: 4.6
    }
  ];

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate bot response
    setTimeout(() => {
      const response = generateBotResponse(inputText);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);

      // Show recommendations for certain queries
      if (inputText.toLowerCase().includes('recommend') || 
          inputText.toLowerCase().includes('suggest') ||
          inputText.toLowerCase().includes('course') ||
          inputText.toLowerCase().includes('learn')) {
        setTimeout(() => setShowRecommendations(true), 1000);
      }
    }, 1500);
  };

  const generateBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('computer') || lowerInput.includes('it') || lowerInput.includes('technology')) {
      return 'Great choice! Technology skills are in high demand. I can recommend courses in computer basics, programming, digital marketing, or mobile repair. What specific area interests you most?';
    }
    
    if (lowerInput.includes('business') || lowerInput.includes('entrepreneur')) {
      return 'Entrepreneurship is an excellent path! I can suggest courses in business management, digital marketing, accounting, or specific trades. Do you have a particular business idea in mind?';
    }
    
    if (lowerInput.includes('skill') || lowerInput.includes('training')) {
      return 'Skill development is key to better opportunities! Popular options include computer training, mobile repair, tailoring, beauty courses, and digital marketing. What\'s your current education level and interests?';
    }
    
    if (lowerInput.includes('job') || lowerInput.includes('employment')) {
      return 'I can help you find job-oriented courses! Government job preparation, computer skills, trade certifications, and freelancing skills are popular choices. What type of work environment do you prefer?';
    }
    
    if (lowerInput.includes('free') || lowerInput.includes('scholarship')) {
      return 'There are many free and subsidized learning opportunities! Government schemes, online courses, and NGO programs offer free training. I can recommend specific programs based on your interests.';
    }
    
    return 'Thank you for sharing! To give you the best recommendations, could you tell me more about: your current education level, interests, preferred learning style (online/offline), and any specific career goals you have in mind?';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Section */}
        <div className="lg:col-span-2">
          <Card className="glass-card h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <GraduationCap className="w-6 h-6 text-primary" />
                <span>EduPath Counselor</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Get personalized education and career guidance
              </p>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col space-y-4">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.isBot
                            ? 'bg-secondary/50 text-foreground'
                            : 'bg-primary text-primary-foreground'
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {message.isBot && <GraduationCap className="w-4 h-4 mt-1 flex-shrink-0" />}
                          {!message.isBot && <User className="w-4 h-4 mt-1 flex-shrink-0" />}
                          <div>
                            <p className="text-sm">{message.text}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start animate-fade-in">
                      <div className="bg-secondary/50 p-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <GraduationCap className="w-4 h-4" />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="flex space-x-2">
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about courses, careers, skills..."
                  className="flex-1 glass-input"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputText.trim()}
                  className="glass-button px-3"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations Section */}
        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <BookOpen className="w-5 h-5" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start glass-button-sm"
                onClick={() => setInputText('I want to learn computer skills')}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Computer Training
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start glass-button-sm"
                onClick={() => setInputText('Show me business courses')}
              >
                <Briefcase className="w-4 h-4 mr-2" />
                Business Courses
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start glass-button-sm"
                onClick={() => setInputText('I need free skill training')}
              >
                <Star className="w-4 h-4 mr-2" />
                Free Programs
              </Button>
            </CardContent>
          </Card>

          {showRecommendations && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Recommended for You</h3>
              {educationPaths.map((path, index) => (
                <Card key={path.title} className="glass-card hover-scale animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h4 className="font-semibold text-sm">{path.title}</h4>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{path.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground">{path.description}</p>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="font-medium">Duration:</span>
                          <p className="text-muted-foreground">{path.duration}</p>
                        </div>
                        <div>
                          <span className="font-medium">Cost:</span>
                          <p className="text-muted-foreground">{path.cost}</p>
                        </div>
                      </div>
                      
                      <Button size="sm" className="w-full glass-button-sm text-xs">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}