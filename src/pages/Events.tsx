import { useEffect, useState } from 'react';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { supabase, type Event } from '../lib/supabase';
import { Link } from 'react-router-dom';

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
      <section className="bg-gradient-to-br from-[#1a1f4e] to-[#2a2f5e] text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#f5a623] opacity-5 rounded-full -ml-20 -mb-20 blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-6 tracking-tight">
            Events & Activities
          </h1>
          <div className="w-24 h-1.5 bg-[#f5a623] mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-center text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Join the Tuskers community for exciting matches, social gatherings, and club activities.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#1a1f4e]"></div>
              <p className="mt-6 text-gray-600 font-medium">Loading upcoming events...</p>
            </div>
          ) : events.length > 0 ? (
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <div
                  key={event.id}
                  className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden border border-gray-100 ${!isUpcoming(event.event_date) ? 'opacity-70 grayscale-[0.5] hover:grayscale-0 hover:opacity-100' : ''
                    }`}
                >
                  <div className="relative h-56 overflow-hidden">
                    {event.image_url ? (
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <Calendar className="w-16 h-16 text-gray-300" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${isUpcoming(event.event_date)
                        ? 'bg-[#f5a623] text-white'
                        : 'bg-gray-600 text-white'
                        }`}>
                        {isUpcoming(event.event_date) ? 'Upcoming' : 'Past'}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-[#f5a623]" />
                        <span>{formatDate(event.event_date)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-[#f5a623]" />
                        <span>{formatTime(event.event_date)}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-[#1a1f4e] mb-3 group-hover:text-[#f5a623] transition-colors line-clamp-2">
                      {event.title}
                    </h3>

                    <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">
                      {event.short_description || event.description?.substring(0, 100) + '...'}
                    </p>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="w-4 h-4 text-[#f5a623]" />
                        <span className="truncate max-w-[120px]">{event.location}</span>
                      </div>
                      <Link to={`/event/${event.slug}`} className="text-[#1a1f4e] font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        View Details <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
              <Calendar className="h-20 w-20 text-gray-200 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Events Scheduled</h3>
              <p className="text-gray-500">
                Check back soon or follow us on social media for updates!
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#1a1f4e] py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Never Miss a Moment</h2>
          <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
            Join our vibrant WhatsApp community to get instant updates on matches, events, and club news directly to your phone.
          </p>
          <a
            href="https://wa.me/971521329719"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#20BA5A] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <span>Join WhatsApp Group</span>
          </a>
        </div>
      </section>
    </div>
  );
}
