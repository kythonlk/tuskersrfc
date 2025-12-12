import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Save, ArrowLeft, Loader2, Image, FileText } from 'lucide-react';

export default function MemberEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Form State (mirroring MembershipReg.tsx structure)
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        whatsapp: '',
        dob: '',
        membership_type: 'men',
        playing_position: '',
        secondary_position: '',
        other_position: '',
        address: '', // Combined address
        height: '',
        weight: '',
        emirates_id: '',
        passport_number: '',
        nationality: '',
        // Files (stored as base64 string in DB)
        emirates_id_file: '',
        passport_photo: '',
    });

    // Helper for file upload
    const fileToBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve((reader.result as string).split(',')[1]); // remove "data:...base64,"
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });

    useEffect(() => {
        if (id) {
            fetchMember();
        }
    }, [id]);

    const fetchMember = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('memberships')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error(error);
            alert('Error fetching member');
            navigate('/admin/members');
        } else if (data) {
            setFormData(data);
        }
        setLoading(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            try {
                const base64 = await fileToBase64(files[0]);
                setFormData(prev => ({ ...prev, [name]: base64 }));
            } catch (err) {
                console.error("Error converting file", err);
                alert("Error processing file");
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        const { error } = await supabase
            .from('memberships')
            .update(formData)
            .eq('id', id);

        setSubmitting(false);

        if (error) {
            console.error(error);
            alert('Failed to update member');
        } else {
            alert('Member updated successfully');
            navigate('/admin/members');
        }
    };

    // Helper to render image (assuming jpeg/png)
    // Providing a fallback prefix if it's missing, though we know the DB likely has it stripped.
    const renderImage = (base64String: string | null) => {
        if (!base64String) return <div className="text-gray-400 text-sm">No image uploaded</div>;

        // Check if it already has a prefix (unlikely given the saving logic, but safe to check)
        const src = base64String.startsWith('data:')
            ? base64String
            : `data:image/jpeg;base64,${base64String}`;

        return (
            <div className="mt-2 relative group w-48 h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                <img src={src} alt="Document" className="w-full h-full object-cover" />
                <a
                    href={src}
                    download="document.jpg"
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                    target="_blank"
                    rel="noreferrer"
                >
                    <span className="text-xs font-bold bg-black/50 px-2 py-1 rounded">Download/View</span>
                </a>
            </div>
        );
    };

    if (loading) return <div className="p-10 text-center">Loading member details...</div>;

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate('/admin/members')}
                    className="p-2 rounded-full hover:bg-white transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-3xl font-bold text-[#1a1f4e]">
                    Edit Member
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
                {/* Personal Info */}
                <div className="border-b pb-4 mb-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">First Name</label>
                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name</label>
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Membership Type</label>
                            <select
                                name="membership_type"
                                value={formData.membership_type}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none bg-white"
                            >
                                <option value="men">Men's Rugby</option>
                                <option value="women">Women's Rugby</option>
                                <option value="touch">Touch Rugby</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Rugby Details */}
                <div className="border-b pb-4 mb-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Rugby Profile</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Playing Position</label>
                            <input
                                type="text"
                                name="playing_position"
                                value={formData.playing_position}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Height (cm)</label>
                            <input
                                type="number"
                                name="height"
                                value={formData.height}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Weight (kg)</label>
                            <input
                                type="number"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Documents */}
                <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Documents & ID</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Passport */}
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                            <h4 className="font-bold text-[#1a1f4e] flex items-center gap-2 mb-3">
                                <Image className="w-5 h-5" /> Passport Photo
                            </h4>
                            <div className="mb-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Passport Number</label>
                                <input
                                    type="text"
                                    name="passport_number"
                                    value={formData.passport_number}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none"
                                />
                            </div>

                            <div className="mb-2">
                                <p className="text-xs font-semibold text-gray-500 mb-1">Current Photo:</p>
                                {renderImage(formData.passport_photo)}
                            </div>

                            <div className="mt-4">
                                <label className="block text-xs font-semibold text-gray-500 mb-1">Replace Photo</label>
                                <input
                                    type="file"
                                    name="passport_photo"
                                    onChange={handleFileChange}
                                    className="text-sm w-full"
                                    accept="image/*"
                                />
                            </div>
                        </div>

                        {/* Emirates ID */}
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                            <h4 className="font-bold text-[#1a1f4e] flex items-center gap-2 mb-3">
                                <FileText className="w-5 h-5" /> Emirates ID
                            </h4>
                            <div className="mb-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">EID Number</label>
                                <input
                                    type="text"
                                    name="emirates_id"
                                    value={formData.emirates_id}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none"
                                />
                            </div>

                            <div className="mb-2">
                                <p className="text-xs font-semibold text-gray-500 mb-1">Current ID Copy:</p>
                                {renderImage(formData.emirates_id_file)}
                            </div>

                            <div className="mt-4">
                                <label className="block text-xs font-semibold text-gray-500 mb-1">Replace ID Copy</label>
                                <input
                                    type="file"
                                    name="emirates_id_file"
                                    onChange={handleFileChange}
                                    className="text-sm w-full"
                                    accept="image/*"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-100">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-8 py-3 rounded-xl bg-[#1a1f4e] text-white font-bold hover:bg-[#2a2f5e] transition-colors shadow-lg flex items-center gap-2"
                    >
                        {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
