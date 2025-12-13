import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Save, ArrowLeft, Loader2 } from 'lucide-react';

export default function FixtureEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = !id;

    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);

    // Form States
    const [homeTeam, setHomeTeam] = useState('');
    const [awayTeam, setAwayTeam] = useState('');
    const [matchDate, setMatchDate] = useState('');
    const [venue, setVenue] = useState('');
    const [competition, setCompetition] = useState('');
    const [homeScore, setHomeScore] = useState<string>('');
    const [awayScore, setAwayScore] = useState<string>('');
    const [homeTeamLogo, setHomeTeamLogo] = useState('');
    const [awayTeamLogo, setAwayTeamLogo] = useState('');
    const [status, setStatus] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');

    useEffect(() => {
        if (!isNew) {
            fetchFixture();
        }
    }, [id]);

    const fetchFixture = async () => {
        const { data } = await supabase
            .from('fixtures')
            .select('*')
            .eq('id', id)
            .single();

        if (data) {
            setHomeTeam(data.home_team);
            setAwayTeam(data.away_team);

            const d = new Date(data.match_date);
            d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
            setMatchDate(d.toISOString().slice(0, 16));

            setVenue(data.venue);
            setCompetition(data.competition);
            setHomeScore(data.home_score !== null ? data.home_score.toString() : '');
            setAwayScore(data.away_score !== null ? data.away_score.toString() : '');
            setHomeTeamLogo(data.home_team_logo);
            setAwayTeamLogo(data.away_team_logo);
            setStatus(data.status);
        }
        setLoading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const payload = {
                home_team: homeTeam,
                away_team: awayTeam,
                match_date: new Date(matchDate).toISOString(),
                venue,
                competition,
                home_score: homeScore === '' ? null : parseInt(homeScore),
                away_score: awayScore === '' ? null : parseInt(awayScore),
                home_team_logo: homeTeamLogo,
                away_team_logo: awayTeamLogo,
                status
            };

            let error;
            if (isNew) {
                const { error: insertError } = await supabase.from('fixtures').insert([payload]);
                error = insertError;
            } else {
                const { error: updateError } = await supabase.from('fixtures').update(payload).eq('id', id);
                error = updateError;
            }

            if (error) throw error;
            navigate('/admin/fixtures');

        } catch (err: any) {
            console.error(err);
            alert('Error saving fixture: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate('/admin/fixtures')}
                    className="p-2 rounded-full hover:bg-white transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-3xl font-bold text-[#1a1f4e]">
                    {isNew ? 'New Fixture' : 'Edit Fixture'}
                </h1>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
                    <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">Match Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Home Team</label>
                            <input
                                required
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none"
                                value={homeTeam}
                                onChange={e => setHomeTeam(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Away Team</label>
                            <input
                                required
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none"
                                value={awayTeam}
                                onChange={e => setAwayTeam(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Date & Time</label>
                            <input
                                required
                                type="datetime-local"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none"
                                value={matchDate}
                                onChange={e => setMatchDate(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                            <select
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none"
                                value={status}
                                onChange={e => setStatus(e.target.value as any)}
                            >
                                <option value="upcoming">Upcoming</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Competition</label>
                            <input
                                required
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none"
                                value={competition}
                                onChange={e => setCompetition(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Venue</label>
                            <input
                                required
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none"
                                value={venue}
                                onChange={e => setVenue(e.target.value)}
                            />
                        </div>

                        <div className="md:col-span-2 grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Home Score</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none"
                                    value={homeScore}
                                    onChange={e => setHomeScore(e.target.value)}
                                    placeholder="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Away Score</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none"
                                    value={awayScore}
                                    onChange={e => setAwayScore(e.target.value)}
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Home Team Logo URL</label>
                            <input
                                type="url"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none"
                                value={homeTeamLogo}
                                onChange={e => setHomeTeamLogo(e.target.value)}
                                placeholder="https://..."
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Away Team Logo URL</label>
                            <input
                                type="url"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none"
                                value={awayTeamLogo}
                                onChange={e => setAwayTeamLogo(e.target.value)}
                                placeholder="https://..."
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/fixtures')}
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
                        {isNew ? 'Create Fixture' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}
