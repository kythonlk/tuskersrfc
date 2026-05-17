import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';
import { Search, Plus, Trash2, Edit, Tag, ShoppingBag } from 'lucide-react';

export default function ProductsList() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching products:', error);
        } else {
            setProducts(data || []);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this product? This action is permanent.')) return;
        
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product: ' + error.message);
        } else {
            alert('Product deleted successfully');
            fetchProducts();
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tag?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[#1a1f4e] flex items-center gap-2">
                        <ShoppingBag className="w-8 h-8 text-[#f5a623]" /> Store / Product Catalog
                    </h1>
                    <p className="text-gray-500">Manage products available in the mobile app shop</p>
                </div>
                <Link
                    to="/admin/products/new"
                    className="flex items-center justify-center gap-2 bg-[#1a1f4e] text-white px-4 py-2.5 rounded-xl hover:bg-[#2a2f5e] transition-colors shadow-sm font-bold"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Product</span>
                </Link>
            </div>

            {/* Filter / Search */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#f5a623] focus:border-[#f5a623] outline-none transition-all"
                        placeholder="Search products by name or tag..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Grid display */}
            {loading ? (
                <div className="text-center py-12 text-gray-500">Loading products...</div>
            ) : filteredProducts.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-xl border border-gray-100 text-gray-500">
                    No products found. Click "Add Product" to create your first store product!
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group">
                            <div className="relative aspect-square w-full bg-gray-100 overflow-hidden">
                                {product.image_url ? (
                                    <img
                                        src={product.image_url}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                                        No Image
                                    </div>
                                )}
                                {product.tag && (
                                    <span className="absolute top-3 left-3 bg-[#f5a623] text-[#1a1f4e] font-bold text-xs px-2.5 py-1 rounded-full uppercase shadow flex items-center gap-1">
                                        <Tag className="w-3 h-3" /> {product.tag}
                                    </span>
                                )}
                            </div>
                            <div className="p-5 flex flex-col flex-grow justify-between gap-4">
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg leading-snug line-clamp-1">{product.name}</h3>
                                    <p className="text-[#1a1f4e] font-extrabold text-xl mt-1">AED {Number(product.price).toFixed(2)}</p>
                                </div>

                                <div className="flex gap-2 border-t border-gray-50 pt-4">
                                    <Link
                                        to={`/admin/products/${product.id}`}
                                        className="flex-grow flex items-center justify-center gap-1.5 bg-gray-50 text-[#1a1f4e] hover:bg-[#1a1f4e] hover:text-white border border-[#1a1f4e] py-2 rounded-xl transition-colors font-bold text-sm"
                                    >
                                        <Edit className="w-4 h-4" /> Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="px-3.5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-200 rounded-xl transition-colors font-bold text-sm flex items-center justify-center"
                                    >
                                        <Trash2 className="w-4.5 h-4.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
