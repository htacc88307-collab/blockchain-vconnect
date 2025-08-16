import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, Send, Mic } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your V-Connect assistant. I can help you report issues, get information about village services, or answer questions. How can I help you today?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputText),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const generateBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('report') || lowerInput.includes('issue') || lowerInput.includes('problem')) {
      return 'I can help you report an issue! You can describe the problem here, or use our dedicated Report Issue form for a more detailed submission. What type of issue would you like to report?';
    }
    
    if (lowerInput.includes('water') || lowerInput.includes('supply')) {
      return 'Water supply issues are a priority. I can help you report water-related problems or check the status of existing water supply requests. Would you like to submit a new report or check existing ones?';
    }
    
    if (lowerInput.includes('road') || lowerInput.includes('transport')) {
      return 'For road and transportation issues, I can guide you through the reporting process. Please provide details about the location and nature of the problem.';
    }
    
    if (lowerInput.includes('education') || lowerInput.includes('school')) {
      return 'Educational concerns are important for community development. You can report issues with schools, request new facilities, or explore our EduPath feature for career guidance.';
    }
    
    if (lowerInput.includes('crop') || lowerInput.includes('farming') || lowerInput.includes('agriculture')) {
      return 'For agricultural guidance, I recommend using our Crop Advisor feature which provides AI-powered recommendations based on your soil type, weather conditions, and farming preferences.';
    }
    
    return 'Thank you for your message. I\'m here to help with village-related issues, status updates, and connecting you with the right services. Could you please provide more details about what you need assistance with?';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="glass-card max-w-4xl mx-auto h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="w-6 h-6 text-primary" />
            <span>V-Connect Assistant</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Ask questions, report issues, or get help with village services
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
                      {message.isBot && <Bot className="w-4 h-4 mt-1 flex-shrink-0" />}
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
                      <Bot className="w-4 h-4" />
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
              placeholder="Type your message or ask a question..."
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
            <Button
              variant="outline"
              className="glass-button px-3"
              title="Voice input (coming soon)"
            >
              <Mic className="w-4 h-4" />
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground text-center">
            Pro tip: You can ask about water supply, roads, education, agriculture, or report any village issues
          </p>
        </CardContent>
      </Card>
    </div>
  );
}