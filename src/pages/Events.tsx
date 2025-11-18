import { useEffect, useState } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { supabase, type Event } from '../lib/supabase';

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true });

      if (data) {
        setEvents(data);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isUpcoming = (dateString: string) => {
    return new Date(dateString) >= new Date();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-[#1a1f4e] to-[#2a2f5e] text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Events & Activities
          </h1>
          <div className="w-24 h-1 bg-[#f5a623] mx-auto mb-8"></div>
          <p className="text-xl text-center text-gray-300 max-w-3xl mx-auto">
            Join us for exciting events and club activities
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1a1f4e]"></div>
              <p className="mt-4 text-gray-600">Loading events...</p>
            </div>
          ) : events.length > 0 ? (
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {events.map((event) => (
                <div
                  key={event.id}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2 ${
                    isUpcoming(event.event_date)
                      ? 'border-t-4 border-[#f5a623]'
                      : 'opacity-75'
                  }`}
                >
                  {event.image_url && (
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          isUpcoming(event.event_date)
                            ? 'bg-[#f5a623]/20 text-[#1a1f4e]'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {isUpcoming(event.event_date) ? 'Upcoming' : 'Past Event'}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#1a1f4e] mb-3">
                      {event.title}
                    </h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {event.description}
                    </p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-[#f5a623]" />
                        <span>{formatDate(event.event_date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-[#f5a623]" />
                        <span>{formatTime(event.event_date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#f5a623]" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No events scheduled yet</p>
              <p className="text-gray-500 mt-2">
                Follow us on social media to stay updated!
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#1a1f4e] mb-6">
              Stay Connected
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Don't miss out on our events! Join our WhatsApp group to receive
              instant notifications about upcoming activities, training sessions,
              and social gatherings.
            </p>
            <a
              href="https://wa.me/971521329719"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#25D366] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#20BA5A] transition-colors shadow-lg"
            >
              Join WhatsApp Group
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}