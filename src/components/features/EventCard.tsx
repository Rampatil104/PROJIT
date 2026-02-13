import { Event } from '@/types';
import { Button } from '@/components/ui/button';
import { Users, IndianRupee, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
  const navigate = useNavigate();
  const spotsLeft = (event.maxParticipants || 100) - event.registeredCount;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{event.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <IndianRupee className="w-4 h-4 text-red-600" />
            <span className="font-semibold">Entry Fee: ₹{event.entryFee}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Users className="w-4 h-4 text-red-600" />
            <span>Team Size: {event.minTeamSize === event.maxTeamSize ? event.maxTeamSize : `${event.minTeamSize || 1}-${event.maxTeamSize}`}</span>
          </div>
          {event.location && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <MapPin className="w-4 h-4 text-red-600" />
              <span>{event.location}</span>
            </div>
          )}
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-600">Spots Available</span>
            <span className="font-semibold text-gray-900">{spotsLeft}/{event.maxParticipants}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-red-600 h-2 rounded-full transition-all"
              style={{ width: `${(event.registeredCount / (event.maxParticipants || 100)) * 100}%` }}
            />
          </div>
        </div>

        <Button
          onClick={() => navigate(`/events/${event.id}`)}
          className="w-full bg-red-600 hover:bg-red-700"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};
