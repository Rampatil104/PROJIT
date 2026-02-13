import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { getRegistrationsByUser } from '@/lib/storage';
import { EVENTS } from '@/constants/events';
import { Button } from '@/components/ui/button';
import { Calendar, Users, CheckCircle, ArrowRight } from 'lucide-react';

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const myRegistrations = getRegistrationsByUser(user.email);
  const availableEvents = EVENTS.filter(
    event => !myRegistrations.some(reg => reg.eventId === event.id)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome, {user.name}!</h1>
        <p className="text-gray-600">Manage your event registrations and explore new opportunities</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Registered Events</p>
              <p className="text-2xl font-bold text-gray-900">{myRegistrations.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Available Events</p>
              <p className="text-2xl font-bold text-gray-900">{availableEvents.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Events</p>
              <p className="text-2xl font-bold text-gray-900">{EVENTS.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* My Registrations */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">My Registrations</h2>
        {myRegistrations.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {myRegistrations.map(registration => (
              <div key={registration.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{registration.eventName}</h3>
                    <p className="text-sm text-gray-600">Registration ID: {registration.id}</p>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                    Confirmed
                  </span>
                </div>
                {registration.teamName && (
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Team:</strong> {registration.teamName}
                  </p>
                )}
                <p className="text-sm text-gray-600">
                  Registered on {new Date(registration.registeredAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-600 mb-4">You haven't registered for any events yet.</p>
            <Button
              onClick={() => navigate('/events')}
              className="bg-red-600 hover:bg-red-700"
            >
              Browse Events
            </Button>
          </div>
        )}
      </div>

      {/* Available Events */}
      {availableEvents.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Events</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {availableEvents.slice(0, 4).map(event => (
              <div key={event.id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{event.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{event.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-red-600 font-semibold">₹{event.entryFee}</span>
                  <Button
                    onClick={() => navigate(`/events/${event.id}`)}
                    variant="outline"
                    size="sm"
                    className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
