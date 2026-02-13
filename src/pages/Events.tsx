import { useState } from 'react';
import { EventCard } from '@/components/features/EventCard';
import { EVENTS } from '@/constants/events';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = EVENTS.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">All Events</h1>
        <p className="text-gray-600 mb-6">
          Explore all technical events at PROJIT 2026. Choose your category and register now!
        </p>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No events found matching your search.</p>
        </div>
      )}
    </div>
  );
};
