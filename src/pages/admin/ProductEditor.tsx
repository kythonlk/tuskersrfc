import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Save, ArrowLeft, Loader2, Image, ShoppingBag } from 'lucide-react';

export default function ProductEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        tag: '',
        image_url: '',
    });

    const fileToBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });

    useEffect(() => {
        if (id && id !== 'new') {
            fetchProduct();
        }
    }, [id]);

    const fetchProduct = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching product:', error);
            alert('Error fetching product details');
            navigate('/admin/products');
        } else if (data) {
            setFormData({
                name: data.name || '',
                price: data.price ? data.price.toString() : '',
                tag: data.tag || '',
                image_url: data.image_url || '',
            });
        }
        setLoading(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files[0]) {
            try {
                const base64 = await fileToBase64(files[0]);
                setFormData(prev => ({ ...prev, image_url: base64 }));
            } catch (err) {
                console.error("Error converting product image", err);
                alert("Error processing image file");
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.name.trim()) return alert('Product name is required');
        if (!formData.price.trim() || isNaN(Number(formData.price))) return alert('A valid numeric price is required');

        setSubmitting(true);

        const payload = {
            name: formData.name,
            price: Number(formData.price),
            tag: formData.tag || null,
            image_url: formData.image_url || null,
        };

        let error;
        if (id && id !== 'new') {
            const { error: err } = await supabase
                .from('products')
                .update(payload)
                .eq('id', id);
            error = err;
        } else {
            const { error: err } = await supabase
                .from('products')
                .insert([payload]);
            error = err;
        }

        setSubmitting(false);

        if (error) {
            console.error('Submit error:', error);
            alert('Failed to save product: ' + error.message);
        } else {
            alert('Product saved successfully');
            navigate('/admin/products');
        }
    };

    if (loading) return <div className="p-10 text-center text-gray-500">Loading product details...</div>;

    return (
        <div className="max-w-2xl mx-auto pb-20">
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate('/admin/products')}
                    className="p-2 rounded-full hover:bg-white transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-3xl font-bold text-[#1a1f4e] flex items-center gap-2">
                    <ShoppingBag className="w-8 h-8 text-[#f5a623]" />
                    {id && id !== 'new' ? 'Edit Product' : 'Add New Product'}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Product Name *</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. 2026 Home Jersey"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none bg-white"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Price (AED) *</label>
                            <input
                                type="text"
                                name="price"
                                required
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="e.g. 250"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none bg-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Promo Tag (Optional)</label>
                            <select
                                name="tag"
                                value={formData.tag}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none bg-white"
                            >
                                <option value="">No Tag</option>
                                <option value="NEW">NEW</option>
                                <option value="HOT">HOT</option>
                                <option value="SALE">SALE</option>
                                <option value="LIMITED">LIMITED</option>
                            </select>
                        </div>
                    </div>

                    {/* Image uploads */}
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <h4 className="font-bold text-[#1a1f4e] flex items-center gap-2 mb-3">
                            <Image className="w-5 h-5" /> Product Image
                        </h4>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Custom Image URL</label>
                            <input
                                type="text"
                                name="image_url"
                                value={formData.image_url.startsWith('data:') ? '' : formData.image_url}
                                onChange={handleChange}
                                placeholder="https://example.com/jersey.jpg"
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none bg-white text-sm"
                            />
                            <p className="text-[11px] text-gray-400 mt-1">Provide a direct link to an online image OR upload a file below.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Local Image</label>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="text-sm w-full"
                                accept="image/*"
                            />
                        </div>

                        {formData.image_url && (
                            <div className="mt-4">
                                <p className="text-xs font-semibold text-gray-500 mb-1">Image Preview:</p>
                                <div className="relative w-36 h-36 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                    <img src={formData.image_url} alt="Product Preview" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-100">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-8 py-3 rounded-xl bg-[#1a1f4e] text-white font-bold hover:bg-[#2a2f5e] transition-colors shadow-lg flex items-center gap-2"
                    >
                        {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        Save Product
                    </button>
                </div>
            </form>
        </div>
    );
}
