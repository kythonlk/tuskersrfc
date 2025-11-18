import { useEffect, useState } from 'react';
import { Calendar, MapPin, Trophy } from 'lucide-react';
import { supabase, type Fixture } from '../lib/supabase';

export default function Fixtures() {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all');

  useEffect(() => {
    const fetchFixtures = async () => {
      setLoading(true);
      let query = supabase.from('fixtures').select('*').order('match_date', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data } = await query;
      console.log(data);

      if (data) {
        setFixtures(data);
      }
      setLoading(false);
    };

    fetchFixtures();
  }, [filter]);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-[#1a1f4e] to-[#2a2f5e] text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Fixtures & Results
          </h1>
          <div className="w-24 h-1 bg-[#f5a623] mx-auto mb-8"></div>
          <p className="text-xl text-center text-gray-300 max-w-3xl mx-auto">
            Stay updated with our match schedule and latest results
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">

          {/* Filter Tabs */}
          <div className="mb-8 flex justify-center">
            <div className="bg-white rounded-lg shadow-md p-1 inline-flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-2 rounded-md font-semibold transition-all ${filter === 'all'
                  ? 'bg-[#1a1f4e] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                All Matches
              </button>
              <button
                onClick={() => setFilter('upcoming')}
                className={`px-6 py-2 rounded-md font-semibold transition-all ${filter === 'upcoming'
                  ? 'bg-[#1a1f4e] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-6 py-2 rounded-md font-semibold transition-all ${filter === 'completed'
                  ? 'bg-[#1a1f4e] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                Results
              </button>
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1a1f4e]"></div>
              <p className="mt-4 text-gray-600">Loading fixtures...</p>
            </div>
          ) : fixtures.length > 0 ? (
            <div className="max-w-4xl mx-auto space-y-10">

              {fixtures.map((fixture) => (
                <div
                  key={fixture.id}
                  className="
              p-8 
              rounded-2xl 
              border border-white/20 
              bg-white 
              shadow-xl 
              hover:shadow-2xl 
              transition-all 
              duration-300
            "
                >

                  {/* Top section: logos + score */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex flex-col items-center gap-3">
                      <img
                        src={fixture.logo_home}
                        alt={fixture.home_team}
                        className="w-20 h-20 object-contain"
                      />
                      <span className="text-lg text-[#1a1f4e] font-semibold tracking-wide uppercase">
                        {fixture.home_team}
                      </span>
                    </div>

                    <span className="text-4xl font-extrabold text-[#f5a623]">
                      {fixture.status === "completed"
                        ? `${fixture.home_score} - ${fixture.away_score}`
                        : "VS"}
                    </span>

                    <div className="flex flex-col items-center gap-3">
                      <img
                        src={fixture.logo_away}
                        alt={fixture.away_team}
                        className="w-20 h-20 object-contain"
                      />
                      <span className="text-lg text-[#1a1f4e] font-semibold tracking-wide uppercase">
                        {fixture.away_team}
                      </span>
                    </div>
                  </div>

                  {/* Competition + status */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-[#1a1f4e] text-white px-4 py-1 rounded-full text-sm font-semibold">
                      {fixture.competition}
                    </span>

                    <span
                      className={`px-4 py-1 rounded-full text-sm font-semibold ${fixture.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : fixture.status === "upcoming"
                          ? "bg-[#f5a623]/20 text-[#1a1f4e]"
                          : "bg-gray-100 text-gray-800"
                        }`}
                    >
                      {fixture.status.charAt(0).toUpperCase() + fixture.status.slice(1)}
                    </span>
                  </div>

                  {/* Date + Venue */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 text-sm text-gray-700 bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-[#f5a623]" />
                      <span>
                        {formatDate(fixture.match_date)} at {formatTime(fixture.match_date)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#f5a623]" />
                      <span>{fixture.venue}</span>
                    </div>
                  </div>

                  {/* Match Details Button */}
                  <button
                    className="
                w-full 
                py-3 
                border border-[#f5a623] 
                text-[#1a1f4e]
                font-semibold 
                tracking-wide 
                uppercase 
                hover:bg-[#f5a623]
                hover:text-white
                transition-all 
                duration-300
                rounded-lg
              "
                  >
                    Match Details
                  </button>

                </div>
              ))}

            </div>
          ) : (
            <div className="text-center py-12">
              <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No fixtures found for this category</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
