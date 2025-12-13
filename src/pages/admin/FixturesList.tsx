import { useEffect, useState } from 'react';
import { supabase, type Fixture } from '../../lib/supabase';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Calendar, MapPin, Search } from 'lucide-react';

export default function FixturesList() {
    const [fixtures, setFixtures] = useState<Fixture[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchFixtures();
    }, []);

    const fetchFixtures = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('fixtures')
            .select('*')
            .order('match_date', { ascending: false });

        if (error) console.error('Error fetching fixtures:', error);
        else setFixtures(data || []);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this fixture? This cannot be undone.')) return;

        const { error } = await supabase.from('fixtures').delete().eq('id', id);
        if (error) {
            alert('Failed to delete fixture');
            console.error(error);
        } else {
            fetchFixtures();
        }
    };

    const filteredFixtures = fixtures.filter(fixture =>
        fixture.home_team.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fixture.away_team.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fixture.venue.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[#1a1f4e]">Fixtures Management</h1>
                    <p className="text-gray-500">Manage matches and results</p>
                </div>
                <Link
                    to="/admin/fixtures/new"
                    className="flex items-center justify-center gap-2 bg-[#f5a623] text-[#1a1f4e] px-4 py-2 rounded-xl hover:bg-[#e09612] transition-colors font-bold shadow-sm"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Fixture</span>
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
                        placeholder="Search fixtures..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Fixtures List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full text-center py-10 text-gray-500">Loading fixtures...</div>
                ) : filteredFixtures.length === 0 ? (
                    <div className="col-span-full text-center py-10 text-gray-500">No fixtures found.</div>
                ) : (
                    filteredFixtures.map(fixture => (
                        <div key={fixture.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-5 border-b border-gray-100 bg-gray-50">
                                <div className="flex justify-between items-center mb-2">
                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${fixture.status === 'completed' ? 'bg-green-100 text-green-700' :
                                            fixture.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                                'bg-blue-100 text-blue-700'
                                        }`}>
                                        {fixture.status}
                                    </span>
                                    <div className="text-sm font-semibold text-gray-500">
                                        {new Date(fixture.match_date).toLocaleDateString()}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-[#1a1f4e] text-center">
                                    {fixture.home_team} <span className="text-[#f5a623]">vs</span> {fixture.away_team}
                                </h3>
                                {(fixture.home_score !== null && fixture.away_score !== null) && (
                                    <div className="text-center font-bold text-lg mt-1">
                                        {fixture.home_score} - {fixture.away_score}
                                    </div>
                                )}
                            </div>

                            <div className="p-5">
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                    <MapPin className="w-4 h-4 text-[#f5a623]" />
                                    <span className="truncate">{fixture.venue}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                    <Calendar className="w-4 h-4 text-[#f5a623]" />
                                    <span className="truncate">{new Date(fixture.match_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>

                                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                                    <Link
                                        to={`/admin/fixtures/${fixture.id}`}
                                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors text-sm font-medium"
                                    >
                                        <Edit className="w-4 h-4" /> Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(fixture.id)}
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
