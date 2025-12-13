import { useEffect, useState } from 'react';
import { supabase, type News } from '../../lib/supabase';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Calendar, User, Search, Image } from 'lucide-react';

export default function NewsList() {
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('news')
            .select('*')
            .order('published_date', { ascending: false });

        if (error) console.error('Error fetching news:', error);
        else setNews(data || []);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this article?')) return;

        const { error } = await supabase.from('news').delete().eq('id', id);
        if (error) {
            alert('Failed to delete article');
            console.error(error);
        } else {
            fetchNews();
        }
    };

    const filteredNews = news.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[#1a1f4e]">News Management</h1>
                    <p className="text-gray-500">Create and publish news articles</p>
                </div>
                <Link
                    to="/admin/news/new"
                    className="flex items-center justify-center gap-2 bg-[#f5a623] text-[#1a1f4e] px-4 py-2 rounded-xl hover:bg-[#e09612] transition-colors font-bold shadow-sm"
                >
                    <Plus className="w-5 h-5" />
                    <span>Post News</span>
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
                        placeholder="Search news..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full text-center py-10 text-gray-500">Loading news...</div>
                ) : filteredNews.length === 0 ? (
                    <div className="col-span-full text-center py-10 text-gray-500">No news found.</div>
                ) : (
                    filteredNews.map(article => (
                        <div key={article.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="h-40 bg-gray-100 relative">
                                {article.image_url ? (
                                    <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">
                                        <Image className="w-12 h-12" />
                                    </div>
                                )}
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-bold text-[#1a1f4e] mb-2 line-clamp-1">{article.title}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                                    <User className="w-4 h-4 text-[#f5a623]" />
                                    <span>{article.author}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                    <Calendar className="w-4 h-4 text-[#f5a623]" />
                                    <span>{new Date(article.published_date).toLocaleDateString()}</span>
                                </div>

                                <p className="text-gray-600 text-sm line-clamp-2 mb-4">{article.excerpt}</p>

                                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                                    <Link
                                        to={`/admin/news/${article.id}`}
                                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors text-sm font-medium"
                                    >
                                        <Edit className="w-4 h-4" /> Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(article.id)}
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
