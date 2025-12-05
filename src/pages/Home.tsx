import { Calendar, Trophy, Users, Target, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase, type News, type Fixture } from '../lib/supabase';
import Hero from '../components/Hero';
import About from '../components/About';
import { Link } from 'react-router-dom';

export default function Home() {
  const [latestNews, setLatestNews] = useState<News[]>([]);
  const [upcomingFixtures, setUpcomingFixtures] = useState<Fixture[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: newsData } = await supabase
        .from('news')
        .select('*')
        .order('published_date', { ascending: false })
        .limit(4);

      const { data: fixturesData } = await supabase
        .from('fixtures')
        .select('*')
        .eq('status', 'completed')
        .order('match_date', { ascending: true })
        .limit(6);

      if (newsData) setLatestNews(newsData);
      if (fixturesData) setUpcomingFixtures(fixturesData);
    };

    fetchData();
  }, []);


  return (
    <div className="min-h-screen">
      <Hero />
      <section className="bg-[#1a1f4e] p-4 sm:p-8 sm:pt-12">
        <div className="mx-auto text-white overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4">
            <h3 className="uppercase font-bold tracking-wide text-xl">
              Club News & Updates
            </h3>
            <a href="/news" className="flex items-center gap-1 text-xl font-semibold hover:text-amber-500 transition">
              View All <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:p-6">
            {latestNews.map((item) => (
              <Link to={`/news/${item.id}`} key={item.id} className="flex flex-col gap-4">
                <div className="relative w-full h-60 overflow-hidden group">
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 transform"
                    />)}
                  <div
                    className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                  ></div>
                </div>
                <p className="text-xs text-gray-500">{item.published_date.slice(0, 10)}</p>
                <h4 className="font-semibold text-base sm:text-xl leading-tight hover:underline">
                  {item.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <About upcomingFixtures={upcomingFixtures} />
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-[#1a1f4e] to-[#2a2f5e] text-white rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <Users className="h-12 w-12 mx-auto mb-4 text-[#f5a623]" />
              <h3 className="text-2xl font-bold mb-2">50+</h3>
              <p className="text-gray-300">Active Members</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-[#1a1f4e] to-[#2a2f5e] text-white rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <Trophy className="h-12 w-12 mx-auto mb-4 text-[#f5a623]" />
              <h3 className="text-2xl font-bold mb-2">Champions</h3>
              <p className="text-gray-300">Emirates Dubai 7s 2024</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-[#1a1f4e] to-[#2a2f5e] text-white rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <Target className="h-12 w-12 mx-auto mb-4 text-[#f5a623]" />
              <h3 className="text-2xl font-bold mb-2">4 Formats</h3>
              <p className="text-gray-300">15s, 7s, 10s, Touch</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-[#1a1f4e] to-[#2a2f5e] text-white rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-[#f5a623]" />
              <h3 className="text-2xl font-bold mb-2">Year Round</h3>
              <p className="text-gray-300">Training & Matches</p>
            </div>
          </div>
        </div>
      </section>



      <section className="py-16 bg-gradient-to-br from-[#1a1f4e] to-[#2a2f5e] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Join the Tuskers Family?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Whether you're an experienced player or new to rugby, we welcome
              everyone who shares our passion for the game.
            </p>
            <Link
              to="/membership"
              className="bg-[#f5a623] text-[#1a1f4e] px-10 py-4 rounded-lg font-bold text-lg hover:bg-[#ffc043] transition-all shadow-lg hover:shadow-xl"
            >
              Become a Member
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
