import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';
import { Save, ArrowLeft, Loader2, Image, FileText, Settings, UserPlus } from 'lucide-react';
import { updateMemberInCache } from '../../lib/membersCache';

export default function MemberEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Form State (mirroring MembershipReg.tsx structure + admin fields)
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
        // Administrative fields
        member_id: '',
        status: 'pending',
        expiry_date: '',
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
            setFormData({
                ...formData,
                ...data,
                // Ensure null/undefined values are handled gracefully
                member_id: data.member_id || '',
                status: data.status || 'pending',
                expiry_date: data.expiry_date || '',
            });
        }
        setLoading(false);
    };

    const handleSendSignUp = async () => {
        if (!formData.email) {
            alert('This member does not have a registered email address.');
            return;
        }

        const confirmSignUp = window.confirm(
            `Send a sign-up invitation to ${formData.first_name} ${formData.last_name} (${formData.email})?\n\nThis will send a confirmation email to register their account.`
        );
        if (!confirmSignUp) return;

        // Create a temporary client to avoid modifying the admin's logged-in session
        const tempSupabase = createClient(
            import.meta.env.VITE_SUPABASE_URL,
            import.meta.env.VITE_SUPABASE_ANON_KEY,
            {
                auth: {
                    persistSession: false,
                    autoRefreshToken: false,
                    detectSessionInUrl: false
                }
            }
        );

        // Generate a random temporary password
        const tempPassword = Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10) + 'A1!';

        const { error } = await tempSupabase.auth.signUp({
            email: formData.email,
            password: tempPassword,
            options: {
                data: {
                    full_name: `${formData.first_name} ${formData.last_name}`.trim(),
                    mobile_primary: formData.phone
                }
            }
        });

        if (error) {
            console.error('Sign up error:', error);
            alert('Failed to send sign-up invitation: ' + error.message);
        } else {
            alert(`Sign-up invitation sent successfully to ${formData.email}!`);
        }
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

        // Convert empty string dates to null so Postgres doesn't throw type validation errors
        const submitData = {
            ...formData,
            expiry_date: formData.expiry_date || null,
            dob: formData.dob || null
        };

        const { error } = await supabase
            .from('memberships')
            .update(submitData)
            .eq('id', id);

        setSubmitting(false);

        // Update in-memory cache after successful edit (no localStorage, no size limit)
        updateMemberInCache(id!, submitData);
        alert('Member updated successfully');
        navigate('/admin/members');
    };

    // Helper to render image (assuming jpeg/png)
    const renderImage = (base64String: string | null) => {
        if (!base64String) return <div className="text-gray-400 text-sm">No image uploaded</div>;

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
                {/* Administrative / Membership Settings */}
                <div className="bg-[#fcf8f2] p-6 rounded-2xl border border-[#faebcc] space-y-4">
                    <h3 className="text-lg font-bold text-[#1a1f4e] flex items-center gap-2">
                        <Settings className="w-5 h-5 text-[#f5a623]" /> Administrative & Membership Status
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Membership ID (Numeric)</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    name="member_id"
                                    value={formData.member_id}
                                    onChange={handleChange}
                                    placeholder="e.g. 100293021"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none bg-white font-mono"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        const randomId = Math.floor(100000000 + Math.random() * 900000000).toString();
                                        setFormData(prev => ({ ...prev, member_id: randomId }));
                                    }}
                                    className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-lg text-xs transition-colors whitespace-nowrap"
                                >
                                    Generate
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Membership Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none bg-white font-semibold"
                            >
                                <option value="pending">Pending Approval</option>
                                <option value="active">Active</option>
                                <option value="expired">Expired</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Expiry Date</label>
                            <input
                                type="date"
                                name="expiry_date"
                                disabled={!formData.expiry_date}
                                value={formData.expiry_date ? new Date(formData.expiry_date).toISOString().split('T')[0] : ''}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none ${!formData.expiry_date ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white'}`}
                            />
                            <div className="flex items-center gap-2 mt-2">
                                <input
                                    type="checkbox"
                                    id="is-lifetime"
                                    checked={!formData.expiry_date}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setFormData(prev => ({ ...prev, expiry_date: '' }));
                                        } else {
                                            const nextYear = new Date();
                                            nextYear.setFullYear(nextYear.getFullYear() + 1);
                                            setFormData(prev => ({ ...prev, expiry_date: nextYear.toISOString().split('T')[0] }));
                                        }
                                    }}
                                    className="rounded text-[#f5a623] focus:ring-[#f5a623] h-4 w-4 cursor-pointer"
                                />
                                <label htmlFor="is-lifetime" className="text-xs font-semibold text-gray-600 cursor-pointer select-none">
                                    Lifetime Member (No Expiration)
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-[#faebcc] mt-2">
                        <button
                            type="button"
                            onClick={handleSendSignUp}
                            className="px-4 py-2 bg-[#1a1f4e] hover:bg-[#2a2f5e] text-white font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5 shadow"
                        >
                            <UserPlus className="w-4 h-4 text-[#f5a623]" /> Send Sign Up Link
                        </button>
                    </div>
                </div>

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
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Membership Type (Scheme)</label>
                            <select
                                name="membership_type"
                                value={formData.membership_type}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none bg-white"
                            >
                                <option value="men">Men's Rugby</option>
                                <option value="women">Women's Rugby</option>
                                <option value="touch">Touch Rugby</option>
                                <option value="supporter">Supporter</option>
                                <option value="academy">Academy Program</option>
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
