import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { EVENTS } from '@/constants/events';
import { saveRegistration, generateRegistrationId } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Registration, TeamMember } from '@/types';
import { Plus, Trash2 } from 'lucide-react';

export const Register = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const event = EVENTS.find(e => e.id === id);

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    college: '',
    department: '',
    year: '',
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    teamName: '',
    paymentReference: ''
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

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

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const addTeamMember = () => {
    if (teamMembers.length < event.maxTeamSize - 1) {
      setTeamMembers(prev => [...prev, { name: '', email: '', phone: '' }]);
    }
  };

  const removeTeamMember = (index: number) => {
    setTeamMembers(prev => prev.filter((_, i) => i !== index));
  };

  const updateTeamMember = (index: number, field: keyof TeamMember, value: string) => {
    setTeamMembers(prev => prev.map((member, i) => 
      i === index ? { ...member, [field]: value } : member
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const registration: Registration = {
      id: generateRegistrationId(),
      eventId: event.id,
      eventName: event.name,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      college: formData.college,
      department: formData.department,
      year: formData.year,
      gender: formData.gender,
      teamName: event.maxTeamSize > 1 ? formData.teamName : undefined,
      teamMembers: teamMembers.length > 0 ? teamMembers : undefined,
      paymentReference: formData.paymentReference,
      registeredAt: new Date().toISOString(),
      status: 'confirmed'
    };

    saveRegistration(registration);

    toast({
      title: 'Registration Successful!',
      description: `Your registration ID is ${registration.id}. Check your email for confirmation.`
    });

    navigate('/dashboard');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Register for {event.name}</h1>
          <p className="text-gray-600 mb-8">Entry Fee: ₹{event.entryFee}</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Details */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Personal Details</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender *</Label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="college">College Name *</Label>
                  <Input
                    id="college"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="department">Department *</Label>
                  <Input
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="e.g., Computer Engineering"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="year">Year *</Label>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                >
                  <option value="">Select Year</option>
                  <option value="First Year">First Year</option>
                  <option value="Second Year">Second Year</option>
                  <option value="Third Year">Third Year</option>
                  <option value="Final Year">Final Year</option>
                </select>
              </div>
            </div>

            {/* Team Details */}
            {event.maxTeamSize > 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Team Details</h2>
                
                <div>
                  <Label htmlFor="teamName">Team Name *</Label>
                  <Input
                    id="teamName"
                    name="teamName"
                    value={formData.teamName}
                    onChange={handleChange}
                    required
                  />
                </div>

                {teamMembers.map((member, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">Team Member {index + 2}</h3>
                      <Button
                        type="button"
                        onClick={() => removeTeamMember(index)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid md:grid-cols-3 gap-3">
                      <Input
                        placeholder="Name"
                        value={member.name}
                        onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                        required
                      />
                      <Input
                        placeholder="Email"
                        type="email"
                        value={member.email}
                        onChange={(e) => updateTeamMember(index, 'email', e.target.value)}
                        required
                      />
                      <Input
                        placeholder="Phone"
                        type="tel"
                        value={member.phone}
                        onChange={(e) => updateTeamMember(index, 'phone', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                ))}

                {teamMembers.length < event.maxTeamSize - 1 && (
                  <Button
                    type="button"
                    onClick={addTeamMember}
                    variant="outline"
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Team Member ({teamMembers.length + 1}/{event.maxTeamSize - 1} added)
                  </Button>
                )}
              </div>
            )}

            {/* Payment */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Payment Details</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Entry Fee:</strong> ₹{event.entryFee}
                </p>
                <p className="text-sm text-gray-600">
                  Please complete the payment and enter the reference number below.
                </p>
              </div>
              <div>
                <Label htmlFor="paymentReference">Payment Reference Number *</Label>
                <Input
                  id="paymentReference"
                  name="paymentReference"
                  value={formData.paymentReference}
                  onChange={handleChange}
                  placeholder="e.g., TXN123456789"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                onClick={() => navigate(`/events/${event.id}`)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                Complete Registration
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
