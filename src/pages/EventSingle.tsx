import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowLeft } from 'lucide-react';
import { supabase, type Event } from '../lib/supabase';

export default function EventSingle() {
  // Verified single event render
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;

      setLoading(true);
      const { data } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();

      if (data) {
        setEvent(data);
      }
      setLoading(false);
    };

    fetchEvent();
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      weekday: 'long',
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1a1f4e] mb-4"></div>
          <p className="text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Event Not Found</h2>
        <p className="text-gray-600 mb-8">The event you are looking for does not exist or has been removed.</p>
        <Link to="/events" className="bg-[#1a1f4e] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#2a2f5e] transition-colors">
          Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Header */}
      <div className="relative h-[50vh] min-h-[400px] bg-gray-900 overflow-hidden">
        {event.image_url ? (
          <>
            <div className="absolute inset-0 bg-black/60 z-10"></div>
            <img
              src={event.image_url}
              alt={event.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f4e] to-[#2a2f5e]"></div>
        )}

        <div className="absolute inset-0 flex items-center z-20">
          <div className="container mx-auto px-4 pt-20">
            <Link to="/events" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors group">
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to all events
            </Link>
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${isUpcoming(event.event_date)
                  ? 'bg-[#f5a623] text-[#1a1f4e]'
                  : 'bg-gray-600/80 text-white backdrop-blur-sm'
                  }`}>
                  {isUpcoming(event.event_date) ? 'Upcoming' : 'Past Event'}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {event.title}
              </h1>
              <div className="flex flex-wrap gap-6 text-white/90 text-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#f5a623]" />
                  <span>{formatDate(event.event_date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#f5a623]" />
                  <span>{formatTime(event.event_date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#f5a623]" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 prose prose-lg max-w-none prose-headings:text-[#1a1f4e] prose-a:text-[#f5a623] hover:prose-a:text-amber-600 prose-img:rounded-xl">
              <div dangerouslySetInnerHTML={{ __html: event.description }} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Registration Card */}
            {isUpcoming(event.event_date) ? (
              <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#f5a623] sticky top-24">
                <h3 className="text-2xl font-bold text-[#1a1f4e] mb-2">Join Us!</h3>
                <p className="text-gray-600 mb-6">
                  Ready to participate? Secure your spot now by registering online.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3 text-gray-700">
                    <Calendar className="w-5 h-5 text-[#f5a623] mt-0.5 shrink-0" />
                    <div>
                      <span className="block font-semibold text-[#1a1f4e] text-sm uppercase tracking-wide">Date</span>
                      {formatDate(event.event_date)}
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-gray-700">
                    <Clock className="w-5 h-5 text-[#f5a623] mt-0.5 shrink-0" />
                    <div>
                      <span className="block font-semibold text-[#1a1f4e] text-sm uppercase tracking-wide">Time</span>
                      {formatTime(event.event_date)}
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-gray-700">
                    <MapPin className="w-5 h-5 text-[#f5a623] mt-0.5 shrink-0" />
                    <div>
                      <span className="block font-semibold text-[#1a1f4e] text-sm uppercase tracking-wide">Location</span>
                      {event.location}
                    </div>
                  </div>
                </div>

                <Link
                  to={`/event/${event.id}/register`}
                  className="block w-full bg-[#f5a623] text-[#1a1f4e] text-center font-bold text-lg py-4 rounded-xl hover:bg-[#e09c1a] hover:-translate-y-1 transition-all shadow-lg hover:shadow-xl"
                >
                  Register Now
                </Link>
                <p className="text-xs text-center text-gray-500 mt-4">
                  Registration closes 24 hours before the event.
                </p>
              </div>
            ) : (
              <div className="bg-gray-100 rounded-2xl p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-500 mb-2">Event Ended</h3>
                <p className="text-gray-500">
                  This event has already taken place. Check out our upcoming events!
                </p>
                <Link
                  to="/events"
                  className="inline-block mt-4 text-[#1a1f4e] font-semibold hover:underline"
                >
                  View Upcoming Events
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
