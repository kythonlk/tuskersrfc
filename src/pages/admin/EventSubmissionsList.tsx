import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Search, FileText, Filter, Eye, X } from 'lucide-react';

export default function EventSubmissionsList() {
    const [submissions, setSubmissions] = useState<any[]>([]);
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedEventId, setSelectedEventId] = useState<string>('all');
    const [selectedSubmission, setSelectedSubmission] = useState<any | null>(null);

    useEffect(() => {
        fetchData();
    }, [selectedEventId]);

    const fetchData = async () => {
        setLoading(true);

        // Fetch Events for Dropdown & Lookup
        const { data: eventsData, error: eventsError } = await supabase
            .from('events')
            .select('id, title')
            .order('event_date', { ascending: false });

        if (eventsError) console.error("Error fetching events:", eventsError);
        if (eventsData) setEvents(eventsData);

        // Fetch Submissions (Removed join to avoid potential FK errors)
        let query = supabase
            .from('generic_registrations')
            .select(`
                id,
                created_at,
                submission_data,
                event_id
            `)
            .order('created_at', { ascending: false });

        if (selectedEventId !== 'all') {
            query = query.eq('event_id', selectedEventId);
        }

        const { data: subs, error: subsError } = await query;

        console.log("Submissions Data:", subs);
        console.log("Submissions Error:", subsError);

        if (subsError) console.error("Error fetching submissions:", subsError);
        else setSubmissions(subs || []);

        setLoading(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[#1a1f4e]">Event Submissions</h1>
                    <p className="text-gray-500">View registrations for events</p>
                </div>

                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-gray-200 shadow-sm">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <select
                        className="bg-transparent outline-none text-sm font-medium text-gray-700 min-w-[200px]"
                        value={selectedEventId}
                        onChange={e => setSelectedEventId(e.target.value)}
                    >
                        <option value="all">All Events</option>
                        {events.map(ev => (
                            <option key={ev.id} value={ev.id}>{ev.title}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-900 font-semibold border-b border-gray-100">
                            <tr>
                                <th className="p-4">Event</th>
                                <th className="p-4">Submitted At</th>
                                <th className="p-4">Submission Summary</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr><td colSpan={4} className="p-8 text-center">Loading...</td></tr>
                            ) : submissions.length === 0 ? (
                                <tr><td colSpan={4} className="p-8 text-center">No submissions found.</td></tr>
                            ) : (
                                submissions.map(sub => {
                                    // Try to find a "name" or "email" field in the JSON data for summary
                                    const data = sub.submission_data || {};
                                    const summary = Object.entries(data)
                                        .slice(0, 2)
                                        .map(([k, v]) => `${k}: ${v}`)
                                        .join(', ');

                                    return (
                                        <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4 font-medium text-[#1a1f4e]">
                                                {events.find(e => e.id === sub.event_id)?.title || 'Unknown Event'}
                                            </td>
                                            <td className="p-4">
                                                {new Date(sub.created_at).toLocaleString()}
                                            </td>
                                            <td className="p-4 max-w-xs truncate text-gray-500">
                                                {summary}
                                            </td>
                                            <td className="p-4 text-center">
                                                <button
                                                    onClick={() => setSelectedSubmission(sub)}
                                                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                                                >
                                                    <Eye className="w-4 h-4" /> View Data
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Detail Modal */}
            {selectedSubmission && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
                            <div>
                                <h2 className="text-xl font-bold text-[#1a1f4e]">Submission Details</h2>
                                <p className="text-xs text-gray-500">
                                    {events.find(e => e.id === selectedSubmission.event_id)?.title || 'Unknown Event'}
                                </p>
                            </div>
                            <button onClick={() => setSelectedSubmission(null)} className="p-2 hover:bg-gray-100 rounded-full">
                                <X className="w-6 h-6 text-gray-500" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            {Object.entries(selectedSubmission.submission_data || {}).map(([key, value]) => (
                                <div key={key} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <div className="text-xs text-[#f5a623] font-bold uppercase mb-1">{key.replace(/_/g, ' ')}</div>
                                    <div className="text-gray-900 whitespace-pre-wrap">{String(value)}</div>
                                </div>
                            ))}
                            <div className="mt-4 text-xs text-gray-400 text-center">
                                Submitted on {new Date(selectedSubmission.created_at).toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
