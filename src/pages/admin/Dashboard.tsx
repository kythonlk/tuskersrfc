import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Users, Calendar, TrendingUp, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalMembers: 0,
        recentMembers: 0,
        totalEvents: 0,
        upcomingEvents: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        setLoading(true);

        const { count: totalMembers } = await supabase.from('memberships').select('*', { count: 'exact', head: true });
        const { count: totalEvents } = await supabase.from('events').select('*', { count: 'exact', head: true });

        // Basic approximation for "recent" (last 30 days) if needed, but for now just counts
        // To do real date math would require more complex queries or JS filtering.
        // Let's just grab the data for now.

        const { data: events } = await supabase.from('events').select('event_date');
        const upcoming = events?.filter(e => new Date(e.event_date) > new Date()).length || 0;

        setStats({
            totalMembers: totalMembers || 0,
            recentMembers: 0, // Placeholder
            totalEvents: totalEvents || 0,
            upcomingEvents: upcoming
        });
        setLoading(false);
    };

    if (loading) return <div>Loading dashboard...</div>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-[#1a1f4e]">Dashboard Overview</h1>
                <p className="text-gray-500">Welcome back, Administrator.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-4 bg-blue-50 rounded-xl">
                        <Users className="w-8 h-8 text-[#1a1f4e]" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Members</p>
                        <h3 className="text-2xl font-bold text-[#1a1f4e]">{stats.totalMembers}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-4 bg-orange-50 rounded-xl">
                        <Calendar className="w-8 h-8 text-[#f5a623]" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Upcoming Events</p>
                        <h3 className="text-2xl font-bold text-[#1a1f4e]">{stats.upcomingEvents}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-4 bg-green-50 rounded-xl">
                        <TrendingUp className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Active Season</p>
                        <h3 className="text-lg font-bold text-[#1a1f4e]">2024/2025</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-4 bg-purple-50 rounded-xl">
                        <Clock className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">System Status</p>
                        <h3 className="text-lg font-bold text-green-500">Online</h3>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-[#1a1f4e] rounded-3xl p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-4">Quick Actions</h3>
                        <div className="space-y-4">
                            <Link to="/admin/events/new" className="block w-full bg-[#f5a623] text-[#1a1f4e] font-bold py-3 px-6 rounded-xl text-center hover:bg-white transition-colors">
                                Create New Event
                            </Link>
                            <Link to="/admin/members" className="block w-full bg-white/10 text-white font-bold py-3 px-6 rounded-xl text-center hover:bg-white/20 transition-colors">
                                View All Members
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col justify-center items-center text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Users className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Need Help?</h3>
                    <p className="text-gray-500 mb-6">If you need assistance with the admin panel, contact the technical team.</p>
                </div>
            </div>
        </div>
    );
}
