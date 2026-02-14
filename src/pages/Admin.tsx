import { useState, useMemo, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { getRegistrations } from '@/lib/storage';
import { EVENTS } from '@/constants/events';
import { useToast } from '@/hooks/use-toast';

export const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  interface Registration {
    id: string;
    fullName?: string;
    email?: string;
    eventId: string;
    eventName?: string;
    gender?: string;
    year?: string;
    department?: string;
  }

  const [selectedEvent, setSelectedEvent] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [allRegistrations, setAllRegistrations] = useState<Registration[]>([]);

  /** 🔐 Auth Guard */
  useEffect(() => {
    if (user === undefined) return; // wait for auth to load

    if (!user || user.role !== 'admin') {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  /** 📦 Load registrations once */
  useEffect(() => {
    const data = getRegistrations() || [];
    setAllRegistrations(data);
  }, []);

  /** 🔍 Filters */
  const filteredRegistrations = useMemo(() => {
    let filtered = [...allRegistrations];

    if (selectedEvent !== 'all') {
      filtered = filtered.filter(reg => reg.eventId === selectedEvent);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        reg =>
          reg.fullName?.toLowerCase().includes(term) ||
          reg.email?.toLowerCase().includes(term) ||
          reg.id?.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [allRegistrations, selectedEvent, searchTerm]);

  /** 📊 Analytics */
  const analytics = useMemo(() => {
    const genderDist = { male: 0, female: 0, other: 0 };
    const yearDist: Record<string, number> = {};
    const deptDist: Record<string, number> = {};
    const eventDist: Record<string, number> = {};
    let totalRevenue = 0;

    allRegistrations.forEach(reg => {
      if (reg.gender) {
        const key = reg.gender.toLowerCase();
        if (genderDist[key as keyof typeof genderDist] !== undefined) {
          genderDist[key as keyof typeof genderDist]++;
        }
      }

      if (reg.year) {
        yearDist[reg.year] = (yearDist[reg.year] || 0) + 1;
      }

      if (reg.department) {
        deptDist[reg.department] = (deptDist[reg.department] || 0) + 1;
      }

      if (reg.eventName) {
        eventDist[reg.eventName] = (eventDist[reg.eventName] || 0) + 1;
      }

      const event = EVENTS.find(e => e.id === reg.eventId);
      if (event) totalRevenue += event.entryFee;
    });

    const mostPopularEvent =
      Object.entries(eventDist).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    return {
      totalParticipants: allRegistrations.length,
      genderDistribution: genderDist,
      yearDistribution: yearDist,
      departmentDistribution: deptDist,
      eventDistribution: eventDist,
      totalRevenue,
      mostPopularEvent
    };
  }, [allRegistrations]);

  /** 📈 Chart data */
  const yearChartData = Object.entries(analytics.yearDistribution).map(
    ([year, count]) => ({ year, count })
  );

  const genderChartData = [
    { name: 'Male', value: analytics.genderDistribution.male },
    { name: 'Female', value: analytics.genderDistribution.female },
    { name: 'Other', value: analytics.genderDistribution.other }
  ];

  const eventChartData = Object.entries(analytics.eventDistribution).map(
    ([event, count]) => ({
      event: event.length > 15 ? event.substring(0, 15) + '...' : event,
      count
    })
  );

  const COLORS = [
    '#DC2626',
    '#2563EB',
    '#10B981',
    '#F59E0B',
    '#8B5CF6',
    '#EC4899',
    '#14B8A6'
  ];

  const handleExport = () => {
    toast({
      title: 'Export Initiated',
      description: 'Registration data export will be downloaded shortly.'
    });
  };

  /** ⏳ Prevent render flash while auth loads */
  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Rest of your JSX remains EXACTLY the same */}
    </div>
  );
};
