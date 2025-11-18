import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Calendar, MapPin, Trophy } from "lucide-react";
import { supabase, type Fixture } from "../lib/supabase";

function SingleMatch() {
  const { id } = useParams();
  const [match, setMatch] = useState<Fixture | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMatch() {
      const { data, error } = await supabase
        .from("fixtures")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) setMatch(data);
      setLoading(false);
    }

    loadMatch();
  }, [id]);

  if (loading) {
    return (
      <section className="py-20 bg-[#0f1229] min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin h-12 w-12 border-4 border-[#f5a623] border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-lg tracking-wide">Loading match...</p>
        </div>
      </section>
    );
  }

  if (!match) {
    return (
      <section className="py-20 bg-[#0f1229] min-h-screen flex items-center justify-center">
        <p className="text-white text-xl">Match not found.</p>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[#0f1229] min-h-screen text-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="border border-white/20 bg-white/5 backdrop-blur-sm p-10 shadow-2xl">

          <h1 className="text-3xl font-bold text-center mb-10 tracking-wide text-[#f5a623] uppercase">
            {match.competition}
          </h1>

          <div className="flex items-center justify-between mb-12">
            <div className="flex flex-col items-center gap-4">
              <img
                src={match.home_team_logo}
                alt={match.home_team}
                className="w-28 h-28 object-contain"
              />
              <span className="text-xl tracking-wide uppercase font-semibold">
                {match.home_team}
              </span>
            </div>

            <span className="hidden md:block text-5xl font-extrabold text-[#f5a623]">
              {match.status === "completed"
                ? `${match.home_score} - ${match.away_score}`
                : "VS"}
            </span>

            <div className="flex flex-col items-center gap-4">
              <img
                src={match.away_team_logo}
                alt={match.away_team}
                className="w-28 h-28 object-contain"
              />
              <span className="text-xl tracking-wide uppercase font-semibold">
                {match.away_team}
              </span>
            </div>
          </div>

          <span className="md:hidden text-4xl font-extrabold text-[#f5a623] flex items-center justify-center py-4">
            {match.status === "completed"
              ? `${match.home_score} - ${match.away_score}`
              : "VS"}
          </span>
          <div className="space-y-4 text-center text-[#f5a623] text-lg tracking-wide">
            <div className="flex justify-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>
                {new Date(match.match_date).toLocaleDateString()} at{" "}
                {new Date(match.match_date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </span>
            </div>

            <div className="flex justify-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{match.venue}</span>
            </div>

            <div className="flex justify-center gap-2">
              <Trophy className="w-5 h-5" />
              <span>{match.competition}</span>
            </div>
          </div>

          <div className="mt-10 text-center text-gray-400 text-sm tracking-wide">
            Status: {match.status.toUpperCase()}
          </div>

          <div className="mt-2 text-center text-gray-500 text-xs">
            Added: {new Date(match.created_at).toLocaleString()}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleMatch;
