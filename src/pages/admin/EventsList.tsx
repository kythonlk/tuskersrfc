import { useEffect, useState } from 'react';
import { supabase, type Event } from '../../lib/supabase'; // Assuming Event type exists
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Calendar, MapPin, Search } from 'lucide-react';

export default function EventsList() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .order('event_date', { ascending: false });

        if (error) console.error('Error fetching events:', error);
        else setEvents(data || []);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this event? This cannot be undone.')) return;

        const { error } = await supabase.from('events').delete().eq('id', id);
        if (error) {
            alert('Failed to delete event');
            console.error(error);
        } else {
            fetchEvents();
        }
    };

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[#1a1f4e]">Event Management</h1>
                    <p className="text-gray-500">Create and manage club events</p>
                </div>
                <Link
                    to="/admin/events/new"
                    className="flex items-center justify-center gap-2 bg-[#f5a623] text-[#1a1f4e] px-4 py-2 rounded-xl hover:bg-[#e09612] transition-colors font-bold shadow-sm"
                >
                    <Plus className="w-5 h-5" />
                    <span>Create Event</span>
                </Link>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#f5a623] focus:border-[#f5a623] outline-none transition-all"
                        placeholder="Search events..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Events List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full text-center py-10 text-gray-500">Loading events...</div>
                ) : filteredEvents.length === 0 ? (
                    <div className="col-span-full text-center py-10 text-gray-500">No events found.</div>
                ) : (
                    filteredEvents.map(event => (
                        <div key={event.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="h-40 bg-gray-100 relative">
                                {event.image_url ? (
                                    <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">
                                        <Calendar className="w-12 h-12" />
                                    </div>
                                )}
                                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold shadow-sm">
                                    {new Date(event.event_date).toLocaleDateString()}
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-bold text-[#1a1f4e] mb-2 line-clamp-1">{event.title}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                    <MapPin className="w-4 h-4 text-[#f5a623]" />
                                    <span className="truncate">{event.location}</span>
                                </div>

                                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                                    <Link
                                        to={`/admin/events/${event.id}`}
                                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors text-sm font-medium"
                                    >
                                        <Edit className="w-4 h-4" /> Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(event.id)}
                                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors text-sm font-medium"
                                    >
                                        <Trash2 className="w-4 h-4" /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
