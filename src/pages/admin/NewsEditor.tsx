import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Save, ArrowLeft, Loader2, Image } from 'lucide-react';

export default function NewsEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = !id;

    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);

    // Form States
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [author, setAuthor] = useState('');
    const [publishedDate, setPublishedDate] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            const file = e.target.files?.[0];
            if (!file) return;

            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
            const filePath = `news/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('posts')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage
                .from('posts')
                .getPublicUrl(filePath);

            setImageUrl(data.publicUrl);

        } catch (error: any) {
            alert('Error uploading image: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    useEffect(() => {
        if (!isNew) {
            fetchArticle();
        } else {
            setPublishedDate(new Date().toISOString().slice(0, 10));
        }
    }, [id]);

    const fetchArticle = async () => {
        const { data } = await supabase
            .from('news')
            .select('*')
            .eq('id', id)
            .single();

        if (data) {
            setTitle(data.title);
            setContent(data.content);
            setExcerpt(data.excerpt);
            setAuthor(data.author);
            setPublishedDate(data.published_date.slice(0, 10));
            setImageUrl(data.image_url);
        }
        setLoading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const payload = {
                title,
                content,
                excerpt,
                author,
                published_date: publishedDate,
                image_url: imageUrl
            };

            let error;
            if (isNew) {
                const { error: insertError } = await supabase.from('news').insert([payload]);
                error = insertError;
            } else {
                const { error: updateError } = await supabase.from('news').update(payload).eq('id', id);
                error = updateError;
            }

            if (error) throw error;
            navigate('/admin/news');

        } catch (err: any) {
            console.error(err);
            alert('Error saving article: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate('/admin/news')}
                    className="p-2 rounded-full hover:bg-white transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-3xl font-bold text-[#1a1f4e]">
                    {isNew ? 'New Article' : 'Edit Article'}
                </h1>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                            <input
                                required
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Author</label>
                            <input
                                required
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none"
                                value={author}
                                onChange={e => setAuthor(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Published Date</label>
                            <input
                                required
                                type="date"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none"
                                value={publishedDate}
                                onChange={e => setPublishedDate(e.target.value)}
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Article Image</label>

                            <div className="flex items-start gap-4">
                                <div className="w-48 h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group">
                                    {imageUrl ? (
                                        <>
                                            <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => setImageUrl('')}
                                                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                                            >
                                                Remove
                                            </button>
                                        </>
                                    ) : (
                                        <Image className="w-12 h-12 text-gray-400" />
                                    )}
                                </div>

                                <div className="flex-1 space-y-2">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="block w-full text-sm text-gray-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-full file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-[#1a1f4e] file:text-white
                                            hover:file:bg-[#2a2f5e]
                                            cursor-pointer"
                                        disabled={uploading}
                                    />
                                    <p className="text-xs text-gray-500">
                                        {uploading ? 'Uploading...' : 'Upload an article image (JPG, PNG). Max 2MB.'}
                                    </p>
                                    {imageUrl && (
                                        <input
                                            type="text"
                                            className="w-full px-3 py-1 bg-gray-50 border rounded text-xs text-gray-500"
                                            value={imageUrl}
                                            readOnly
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Excerpt (Short Summary)</label>
                            <textarea
                                required
                                rows={2}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none"
                                value={excerpt}
                                onChange={e => setExcerpt(e.target.value)}
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Content</label>
                            <textarea
                                required
                                rows={10}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none"
                                value={content}
                                onChange={e => setContent(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/news')}
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
                        {isNew ? 'Publish Article' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}
