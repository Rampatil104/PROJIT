import { useState } from 'react';
import { TRANSPORT_ROUTES } from '@/constants/events';
import { Button } from '@/components/ui/button';
import { Bus, Phone, MapPin, Clock } from 'lucide-react';

export const Transport = () => {
  const [selectedRoute, setSelectedRoute] = useState(TRANSPORT_ROUTES[0]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Transport Routes</h1>
        <p className="text-gray-600 mb-6">
          Free bus service available from multiple locations. All buses reach JIT College by 9:00 AM.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Route Selection */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Select Route</h2>
          <div className="space-y-3">
            {TRANSPORT_ROUTES.map(route => (
              <button
                key={route.id}
                onClick={() => setSelectedRoute(route)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedRoute.id === route.id
                    ? 'border-red-600 bg-red-50'
                    : 'border-gray-200 hover:border-red-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Bus className={`w-5 h-5 ${selectedRoute.id === route.id ? 'text-red-600' : 'text-gray-400'}`} />
                  <div>
                    <h3 className="font-semibold text-gray-900">{route.name}</h3>
                    <p className="text-sm text-gray-600">{route.stops.length} stops</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Route Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bus className="w-8 h-8 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-900">{selectedRoute.name}</h2>
            </div>

            {/* Driver Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Phone className="w-5 h-5 text-red-600" />
                <h3 className="font-semibold text-gray-900">Driver Contact</h3>
              </div>
              <p className="text-gray-700">{selectedRoute.driver.name}</p>
              <a
                href={`tel:${selectedRoute.driver.phone}`}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                {selectedRoute.driver.phone}
              </a>
            </div>

            {/* Arrival Time */}
            <div className="bg-green-50 rounded-lg p-4 mb-6 flex items-center gap-3">
              <Clock className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Arrival Time at JIT</p>
                <p className="text-xl font-bold text-gray-900">{selectedRoute.arrivalTime}</p>
              </div>
            </div>

            {/* Stops */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-600" />
                Bus Stops
              </h3>
              <div className="space-y-3">
                {selectedRoute.stops.map((stop, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index === selectedRoute.stops.length - 1
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {index + 1}
                      </div>
                      {index < selectedRoute.stops.length - 1 && (
                        <div className="w-0.5 h-8 bg-gray-300" />
                      )}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className={`font-medium ${
                        index === selectedRoute.stops.length - 1
                          ? 'text-red-600'
                          : 'text-gray-900'
                      }`}>
                        {stop}
                      </p>
                      {index === selectedRoute.stops.length - 1 && (
                        <p className="text-sm text-gray-500">Final Destination</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Important Info */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6 rounded-r-lg">
            <h4 className="font-semibold text-yellow-900 mb-2">Important Information</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Please arrive at your pickup point 15 minutes early</li>
              <li>• Carry your registration confirmation and college ID</li>
              <li>• For any queries, contact the bus driver directly</li>
              <li>• All buses will depart on time at 8:00 AM sharp</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
