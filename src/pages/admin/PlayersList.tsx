import { useEffect, useState } from 'react';
import { supabase, type Player } from '../../lib/supabase';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, User, Search } from 'lucide-react';

export default function PlayersList() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchPlayers();
    }, []);

    const fetchPlayers = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('players')
            .select('*')
            .order('name');

        if (error) console.error('Error fetching players:', error);
        else setPlayers(data || []);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this player?')) return;

        const { error } = await supabase.from('players').delete().eq('id', id);
        if (error) {
            alert('Failed to delete player');
            console.error(error);
        } else {
            fetchPlayers();
        }
    };

    const filteredPlayers = players.filter(player =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.team.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[#1a1f4e]">Players Management</h1>
                    <p className="text-gray-500">Manage team players and squads</p>
                </div>
                <Link
                    to="/admin/players/new"
                    className="flex items-center justify-center gap-2 bg-[#f5a623] text-[#1a1f4e] px-4 py-2 rounded-xl hover:bg-[#e09612] transition-colors font-bold shadow-sm"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Player</span>
                </Link>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#f5a623] focus:border-[#f5a623] outline-none transition-all"
                        placeholder="Search players..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full text-center py-10 text-gray-500">Loading players...</div>
                ) : filteredPlayers.length === 0 ? (
                    <div className="col-span-full text-center py-10 text-gray-500">No players found.</div>
                ) : (
                    filteredPlayers.map(player => (
                        <div key={player.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-5 flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
                                    {player.photo_url ? (
                                        <img src={player.photo_url} alt={player.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-8 h-8 text-gray-400" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-[#1a1f4e]">{player.name}</h3>
                                    <p className="text-sm text-[#f5a623] font-semibold">{player.position}</p>
                                    <p className="text-xs text-gray-500 capitalize">{player.team} Team</p>
                                </div>
                            </div>

                            <div className="px-5 pb-5 pt-0">
                                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                                    <Link
                                        to={`/admin/players/${player.id}`}
                                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors text-sm font-medium"
                                    >
                                        <Edit className="w-4 h-4" /> Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(player.id)}
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
