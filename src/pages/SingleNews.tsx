
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase, type News } from "../lib/supabase";

function SingleNews() {
  const { id } = useParams();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) setNews(data);
      setLoading(false);
    }
    loadNews();
  }, [id]);

  if (loading) {
    return (
      <section className="bg-[#0f1229] min-h-screen flex items-center justify-center">
        <div className="text-white flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-[#f5a623] border-t-transparent animate-spin"></div>
          <p className="mt-4 tracking-wide">Loading article...</p>
        </div>
      </section>
    );
  }

  if (!news) {
    return (
      <section className="bg-[#0f1229] min-h-screen flex items-center justify-center">
        <p className="text-white text-xl">News post not found.</p>
      </section>
    );
  }

  return (
    <section className="bg-[#0f1229] min-h-screen text-white py-20">
      <div className="max-w-7xl mx-auto px-4">

        <div className="bg-white text-black shadow-2xl border border-black/10 p-0 rounded-none">

          <img
            src={news.image_url}
            alt={news.title}
            className="w-full h-[40em] object-cover rounded-none"
          />

          <div className="p-10 rounded-none">

            <h1 className="text-4xl font-bold tracking-wide mb-6 text-[#0f1229]">
              {news.title}
            </h1>

            <p className="text-gray-600 text-sm mb-10 tracking-wide">
              Published: {new Date(news.created_at).toLocaleDateString()}
            </p>

            <div className="text-lg leading-relaxed tracking-wide whitespace-pre-line">
              {news.content}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleNews;
