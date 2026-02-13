import { MapPin, Phone, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-red-400">About PROJIT 2026</h3>
            <p className="text-sm text-gray-300">
              Annual technical festival organized by Jawahar Education Society's Institute 
              of Technology, Management & Research, Nashik.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-red-400">Contact</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  JIT, Jawahar Education Society,<br />
                  Gayatri Hills, Hingna Road,<br />
                  Nashik, Maharashtra - 422213
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="text-gray-300">0253-2406600</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="text-gray-300">info@jit.ac.in</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-red-400">Event Date</h3>
            <p className="text-2xl font-bold text-white">14 February 2026</p>
            <p className="text-sm text-gray-300 mt-2">Friday</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; 2026 JIT Nashik. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
