import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Save, ArrowLeft, Loader2, User } from 'lucide-react';

export default function PlayerEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = !id;

    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);

    // Form States
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [jerseyNumber, setJerseyNumber] = useState<string>('');
    const [team, setTeam] = useState('senior');
    const [bio, setBio] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');

    useEffect(() => {
        if (!isNew) {
            fetchPlayer();
        }
    }, [id]);

    const fetchPlayer = async () => {
        const { data } = await supabase
            .from('players')
            .select('*')
            .eq('id', id)
            .single();

        if (data) {
            setName(data.name);
            setPosition(data.position);
            setJerseyNumber(data.jersey_number !== null ? data.jersey_number.toString() : '');
            setTeam(data.team);
            setBio(data.bio || '');
            setPhotoUrl(data.photo_url || '');
        }
        setLoading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const payload = {
                name,
                position,
                jersey_number: jerseyNumber === '' ? null : parseInt(jerseyNumber),
                team,
                bio,
                photo_url: photoUrl
            };

            let error;
            if (isNew) {
                const { error: insertError } = await supabase.from('players').insert([payload]);
                error = insertError;
            } else {
                const { error: updateError } = await supabase.from('players').update(payload).eq('id', id);
                error = updateError;
            }

            if (error) throw error;
            navigate('/admin/players');

        } catch (err: any) {
            console.error(err);
            alert('Error saving player: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate('/admin/players')}
                    className="p-2 rounded-full hover:bg-white transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-3xl font-bold text-[#1a1f4e]">
                    {isNew ? 'New Player' : 'Edit Player'}
                </h1>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
                    <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">Player Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                            <input
                                required
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Position</label>
                            <input
                                required
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none"
                                value={position}
                                onChange={e => setPosition(e.target.value)}
                                placeholder="e.g. Fly Half"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Squad / Team</label>
                            <select
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none"
                                value={team}
                                onChange={e => setTeam(e.target.value)}
                            >
                                <option value="senior">Dubai 7s Team (Senior)</option>
                                <option value="development">Senior Mens Team (Development)</option>
                                <option value="touch">Touch Rugby</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Jersey Number</label>
                            <input
                                type="number"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none"
                                value={jerseyNumber}
                                onChange={e => setJerseyNumber(e.target.value)}
                                placeholder="Optional"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Photo URL</label>
                            <div className="flex gap-2">
                                <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg shrink-0">
                                    <User className="w-5 h-5 text-gray-500" />
                                </span>
                                <input
                                    type="url"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none"
                                    value={photoUrl}
                                    onChange={e => setPhotoUrl(e.target.value)}
                                    placeholder="https://..."
                                />
                            </div>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Bio (Optional)</label>
                            <textarea
                                rows={4}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none"
                                value={bio}
                                onChange={e => setBio(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/players')}
                        className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-8 py-3 rounded-xl bg-[#1a1f4e] text-white font-bold hover:bg-[#2a2f5e] transition-colors shadow-lg flex items-center gap-2"
                    >
                        {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        {isNew ? 'Save Player' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}
