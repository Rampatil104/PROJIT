import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EVENTS, TRANSPORT_ROUTES } from '@/constants/events';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I can help you with event information, fees, coordinators, transport, and more. Ask me anything!',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');

  const getBotResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();

    // Entry fee queries
    if (msg.includes('fee') || msg.includes('cost') || msg.includes('price')) {
      const event = EVENTS.find(e => 
        msg.includes(e.name.toLowerCase()) || 
        msg.includes(e.id)
      );
      if (event) {
        return `The entry fee for ${event.name} is ₹${event.entryFee}.`;
      }
      return 'Entry fees vary by event:\n' + 
        EVENTS.map(e => `• ${e.name}: ₹${e.entryFee}`).join('\n');
    }

    // Team size queries
    if (msg.includes('team size') || msg.includes('how many members')) {
      const event = EVENTS.find(e => 
        msg.includes(e.name.toLowerCase()) || 
        msg.includes(e.id)
      );
      if (event) {
        return `${event.name} allows a maximum of ${event.maxTeamSize} members per team.`;
      }
      return 'Team sizes vary by event. Which event are you interested in?';
    }

    // Coordinator queries
    if (msg.includes('coordinator') || msg.includes('contact') || msg.includes('phone')) {
      const event = EVENTS.find(e => 
        msg.includes(e.name.toLowerCase()) || 
        msg.includes(e.id)
      );
      if (event) {
        return `Coordinators for ${event.name}:\n` +
          event.coordinators.map(c => `• ${c.name}: ${c.phone}`).join('\n');
      }
      return 'Please specify which event you need coordinator information for.';
    }

    // Location queries
    if (msg.includes('location') || msg.includes('where') || msg.includes('venue')) {
      const event = EVENTS.find(e => 
        msg.includes(e.name.toLowerCase()) && e.location
      );
      if (event && event.location) {
        return `${event.name} will be held at ${event.location}.`;
      }
      return 'All events will be held at JIT College Campus, Nashik. Some events have specific rooms mentioned in their details.';
    }

    // Transport queries
    if (msg.includes('transport') || msg.includes('bus') || msg.includes('route')) {
      return 'We have 4 bus routes:\n' +
        TRANSPORT_ROUTES.map(r => 
          `• ${r.name} - Driver: ${r.driver.name} (${r.driver.phone})`
        ).join('\n') +
        '\nAll buses arrive at JIT by 9:00 AM.';
    }

    // Time queries
    if (msg.includes('time') || msg.includes('when') || msg.includes('date')) {
      return 'PROJIT 2026 will be held on 14 February 2026 (Friday). Events start at 9:00 AM.';
    }

    // Document queries
    if (msg.includes('document') || msg.includes('bring') || msg.includes('required')) {
      return 'Required documents:\n• College ID Card\n• Registration confirmation\n• Payment receipt\n\nSome events require additional items like laptops or project abstracts. Check your event details.';
    }

    // Registration queries
    if (msg.includes('register') || msg.includes('signup')) {
      return 'To register for an event:\n1. Login to your account\n2. Browse events\n3. Click "Register Now"\n4. Fill the form and submit payment reference\n5. Get your confirmation!';
    }

    // Event list
    if (msg.includes('events') || msg.includes('list') || msg.includes('what events')) {
      return 'PROJIT 2026 Events:\n' +
        EVENTS.map(e => `• ${e.name}`).join('\n') +
        '\n\nAsk me about any specific event for more details!';
    }

    // Default response
    return 'I can help you with:\n• Entry fees\n• Team sizes\n• Coordinator contacts\n• Event locations\n• Transport routes\n• Event timings\n• Required documents\n\nWhat would you like to know?';
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Get bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(input),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);

    setInput('');
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-all z-50 animate-bounce"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col z-50 border border-gray-200">
          {/* Header */}
          <div className="bg-red-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <span className="font-semibold">PROJIT Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-red-700 p-1 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon" className="bg-red-600 hover:bg-red-700">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
