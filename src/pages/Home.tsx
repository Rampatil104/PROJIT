import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CountdownTimer } from '@/components/features/CountdownTimer';
import { EventCard } from '@/components/features/EventCard';
import { EVENTS } from '@/constants/events';
import { Calendar, Trophy, Users, Rocket } from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Trophy,
      title: '7 Technical Events',
      description: 'Competitions across robotics, coding, design, and engineering'
    },
    {
      icon: Users,
      title: 'Expert Coordinators',
      description: 'Experienced faculty and student mentors to guide you'
    },
    {
      icon: Calendar,
      title: 'One Day Event',
      description: 'Action-packed schedule on 14th February 2026'
    },
    {
      icon: Rocket,
      title: 'Exciting Prizes',
      description: 'Win certificates, trophies, and recognition'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">PROJIT 2026</h1>
            <p className="text-xl md:text-2xl mb-2 text-red-200">
              Jawahar Education Society's Institute of Technology
            </p>
            <p className="text-lg mb-8 text-gray-300">Management & Research, Nashik</p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
              <p className="text-2xl font-semibold mb-6">Event Begins In</p>
              <CountdownTimer />
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                onClick={() => navigate('/events')}
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-lg px-8"
              >
                Explore Events
              </Button>
              <Button
                onClick={() => navigate('/signup')}
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8"
              >
                Register Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Join PROJIT 2026?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Featured Events</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {EVENTS.slice(0, 3).map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <div className="text-center">
            <Button
              onClick={() => navigate('/events')}
              size="lg"
              className="bg-red-600 hover:bg-red-700"
            >
              View All Events
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-2xl font-bold mb-2 text-red-400">Date</h3>
              <p className="text-lg">14 February 2026</p>
              <p className="text-sm text-gray-400">Friday</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2 text-red-400">Venue</h3>
              <p className="text-lg">JIT College Campus</p>
              <p className="text-sm text-gray-400">Nashik, Maharashtra</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2 text-red-400">Transport</h3>
              <p className="text-lg">4 Bus Routes Available</p>
              <p className="text-sm text-gray-400">Arrival by 9:00 AM</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
