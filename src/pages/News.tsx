import { useEffect, useState } from 'react';
import { Calendar, User } from 'lucide-react';
import { supabase, type News as NewsType } from '../lib/supabase';

export default function News() {
  const [news, setNews] = useState<NewsType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('news')
        .select('*')
        .order('published_date', { ascending: false });

      if (data) {
        setNews(data);
      }
      setLoading(false);
    };

    fetchNews();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-[#1a1f4e] to-[#2a2f5e] text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Latest News
          </h1>
          <div className="w-24 h-1 bg-[#f5a623] mx-auto mb-8"></div>
          <p className="text-xl text-center text-gray-300 max-w-3xl mx-auto">
            Stay informed with the latest updates from Dubai Tuskers RFC
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1a1f4e]"></div>
              <p className="mt-4 text-gray-600">Loading news...</p>
            </div>
          ) : news.length > 0 ? (
            <div className="max-w-5xl mx-auto space-y-8">
              {news.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
                >
                  <div className="md:flex">
                    {article.image_url && (
                      <div className="md:w-1/3">
                        <img
                          src={article.image_url}
                          alt={article.title}
                          className="w-full h-64 md:h-full object-cover"
                        />
                      </div>
                    )}
                    <div className={article.image_url ? 'md:w-2/3 p-8' : 'p-8'}>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-[#f5a623]" />
                          <span>{formatDate(article.published_date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-[#f5a623]" />
                          <span>{article.author}</span>
                        </div>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-[#1a1f4e] mb-4">
                        {article.title}
                      </h2>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {article.excerpt}
                      </p>
                      <button className="text-[#1a1f4e] font-semibold hover:text-[#f5a623] transition-colors inline-flex items-center gap-2">
                        Read Full Article
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No news articles yet</p>
              <p className="text-gray-500 mt-2">Check back soon for updates!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}