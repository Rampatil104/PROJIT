import { useParams, useNavigate } from 'react-router-dom';
import { EVENTS } from '@/constants/events';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Users, IndianRupee, MapPin, Phone, Award, Clock, AlertCircle } from 'lucide-react';

export const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const event = EVENTS.find(e => e.id === id);

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
        <Button onClick={() => navigate('/events')} className="bg-red-600 hover:bg-red-700">
          Back to Events
        </Button>
      </div>
    );
  }

  const handleRegister = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/register/${event.id}`);
  };

  const spotsLeft = (event.maxParticipants || 100) - event.registeredCount;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        onClick={() => navigate('/events')}
        variant="outline"
        className="mb-6"
      >
        ← Back to Events
      </Button>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.name}</h1>
            <p className="text-lg text-gray-600 mb-6">{event.description}</p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-3 bg-red-50 p-4 rounded-lg">
                <IndianRupee className="w-6 h-6 text-red-600" />
                <div>
                  <p className="text-sm text-gray-600">Entry Fee</p>
                  <p className="text-xl font-bold text-gray-900">₹{event.entryFee}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Team Size</p>
                  <p className="text-xl font-bold text-gray-900">{event.maxTeamSize}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-green-50 p-4 rounded-lg">
                <Clock className="w-6 h-6 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Spots Left</p>
                  <p className="text-xl font-bold text-gray-900">{spotsLeft}</p>
                </div>
              </div>
            </div>

            {event.location && (
              <div className="flex items-center gap-2 text-gray-700 mb-4 bg-gray-50 p-3 rounded-lg">
                <MapPin className="w-5 h-5 text-red-600" />
                <span className="font-medium">Venue: {event.location}</span>
              </div>
            )}
          </div>

          {/* Rules */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-red-600" />
              Rules & Guidelines
            </h2>
            <ul className="space-y-2">
              {event.rules.map((rule, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <span className="text-red-600 font-bold mt-1">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Judging Criteria */}
          {event.judging && event.judging.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-6 h-6 text-red-600" />
                Judging Criteria
              </h2>
              <div className="space-y-3">
                {event.judging.map((criteria, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-gray-900">{criteria.criterion}</span>
                      <span className="text-red-600 font-bold">{criteria.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-600 h-2 rounded-full"
                        style={{ width: `${criteria.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Special Requirements */}
          {event.specialRequirements && event.specialRequirements.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Special Requirements</h2>
              <ul className="space-y-2">
                {event.specialRequirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700">
                    <span className="text-red-600 font-bold mt-1">✓</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Registration Card */}
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Register Now</h3>
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Registrations</span>
                <span className="font-semibold text-gray-900">{event.registeredCount}/{event.maxParticipants}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-600 h-2 rounded-full"
                  style={{ width: `${(event.registeredCount / (event.maxParticipants || 100)) * 100}%` }}
                />
              </div>
            </div>
            <Button
              onClick={handleRegister}
              className="w-full bg-red-600 hover:bg-red-700 mb-3"
              disabled={spotsLeft <= 0}
            >
              {spotsLeft <= 0 ? 'Registration Full' : 'Register for Event'}
            </Button>
            {!user && (
              <p className="text-sm text-gray-500 text-center">
                Please login to register
              </p>
            )}
          </div>

          {/* Coordinators */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-red-600" />
              Coordinators
            </h3>
            <div className="space-y-3">
              {event.coordinators.map((coordinator, index) => (
                <div key={index} className="border-b border-gray-200 last:border-0 pb-3 last:pb-0">
                  <p className="font-semibold text-gray-900">{coordinator.name}</p>
                  {coordinator.designation && (
                    <p className="text-sm text-gray-500">{coordinator.designation}</p>
                  )}
                  <a
                    href={`tel:${coordinator.phone}`}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    {coordinator.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
