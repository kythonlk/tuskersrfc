import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Search, FileText, Check, X, Eye } from 'lucide-react';

export default function MedicalClearanceList() {
    const [forms, setForms] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedForm, setSelectedForm] = useState<any | null>(null);

    useEffect(() => {
        fetchForms();
    }, []);

    const fetchForms = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('medical_clearance_forms')
            .select('*');
        console.log(data);

        if (error) console.error('Error fetching forms:', error);
        else setForms(data || []);
        setLoading(false);
    };

    const filteredForms = forms.filter(form =>
        form.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.passport_id?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[#1a1f4e]">Medical Clearance</h1>
                    <p className="text-gray-500">View submitted medical release forms</p>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#f5a623] focus:border-[#f5a623] outline-none transition-all"
                        placeholder="Search by name or passport ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-900 font-semibold border-b border-gray-100">
                            <tr>
                                <th className="p-4">Player Name</th>
                                <th className="p-4">Nationality</th>
                                <th className="p-4">DOB</th>
                                <th className="p-4">Insurance</th>
                                <th className="p-4">Submitted</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr><td colSpan={6} className="p-8 text-center">Loading...</td></tr>
                            ) : filteredForms.length === 0 ? (
                                <tr><td colSpan={6} className="p-8 text-center">No forms found.</td></tr>
                            ) : (
                                filteredForms.map(form => (
                                    <tr key={form.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 font-medium text-[#1a1f4e]">{form.full_name}</td>
                                        <td className="p-4">{form.nationality}</td>
                                        <td className="p-4">{form.dob}</td>
                                        <td className="p-4">
                                            {form.has_insurance ? (
                                                <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-bold">
                                                    <Check className="w-3 h-3" /> Yes
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-bold">
                                                    <X className="w-3 h-3" /> No
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4">{new Date(form.created_at || form.declaration_date).toLocaleDateString()}</td>
                                        <td className="p-4 text-center">
                                            <button
                                                onClick={() => setSelectedForm(form)}
                                                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                                            >
                                                <Eye className="w-4 h-4" /> View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Detail Modal */}
            {selectedForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
                            <h2 className="text-xl font-bold text-[#1a1f4e]">Medical Form Details</h2>
                            <button onClick={() => setSelectedForm(null)} className="p-2 hover:bg-gray-100 rounded-full">
                                <X className="w-6 h-6 text-gray-500" />
                            </button>
                        </div>
                        <div className="p-6 space-y-6">

                            <div className="grid grid-cols-2 gap-4">
                                <DetailItem label="Full Name" value={selectedForm.full_name} />
                                <DetailItem label="Date of Birth" value={selectedForm.dob} />
                                <DetailItem label="Nationality" value={selectedForm.nationality} />
                                <DetailItem label="Passport / ID" value={selectedForm.passport_id} />
                                <DetailItem label="Contact" value={selectedForm.contact_number} />
                                <DetailItem label="Emergency Contact" value={selectedForm.emergency_contact} />
                            </div>

                            <hr />

                            <h3 className="font-bold text-[#f5a623]">Insurance</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <DetailItem label="Has Insurance" value={selectedForm.has_insurance ? 'Yes' : 'No'} />
                                {selectedForm.has_insurance && (
                                    <>
                                        <DetailItem label="Provider" value={selectedForm.insurance_provider} />
                                        <DetailItem label="Policy No" value={selectedForm.policy_number} />
                                        <DetailItem label="Expiry" value={selectedForm.policy_expiry} />
                                        <div className="col-span-2">
                                            <DetailItem label="Coverage Details" value={selectedForm.coverage_details} />
                                        </div>
                                    </>
                                )}
                            </div>

                            <hr />

                            <h3 className="font-bold text-[#f5a623]">Medical History</h3>
                            <div className="grid grid-cols-3 gap-2 text-sm">
                                <HistoryItem label="Asthma" value={selectedForm.history_asthma} />
                                <HistoryItem label="Heart Conditions" value={selectedForm.history_heart_conditions} />
                                <HistoryItem label="Allergies" value={selectedForm.history_allergies} />
                                <HistoryItem label="Diabetes" value={selectedForm.history_diabetes} />
                                <HistoryItem label="Major Injuries" value={selectedForm.history_major_injuries} />
                                <HistoryItem label="Other" value={selectedForm.history_other} />
                            </div>
                            {selectedForm.history_other_specify && (
                                <DetailItem label="Other Specified" value={selectedForm.history_other_specify} />
                            )}
                            <div className="grid grid-cols-1 gap-4">
                                <DetailItem label="Injury Details" value={selectedForm.injury_details} />
                                <DetailItem label="Medication" value={selectedForm.medication} />
                            </div>

                            <hr />

                            <h3 className="font-bold text-[#f5a623]">Doctor Clearance (Optional)</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <DetailItem label="Doctor Name" value={selectedForm.doctor_name} />
                                <DetailItem label="Clinic" value={selectedForm.clinic_name} />
                                <DetailItem label="Signature / Stamp" value={selectedForm.doctor_signature} />
                                <DetailItem label="Date" value={selectedForm.doctor_date} />
                            </div>

                            <hr />
                            <h3 className="font-bold text-[#f5a623]">Signatures</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <DetailItem label="Player Signature" value={selectedForm.player_signature} />
                                <DetailItem label="Declaration Date" value={selectedForm.declaration_date} />
                                {!selectedForm.has_insurance && (
                                    <>
                                        <DetailItem label="Uninsured Waiver Sig" value={selectedForm.uninsured_signature} />
                                        <DetailItem label="Waiver Date" value={selectedForm.uninsured_date} />
                                    </>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const DetailItem = ({ label, value }: { label: string, value: any }) => (
    <div className="bg-gray-50 p-3 rounded-lg">
        <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">{label}</div>
        <div className="text-gray-900 font-medium break-words">{value || '-'}</div>
    </div>
);

const HistoryItem = ({ label, value }: { label: string, value: boolean }) => (
    <div className={`p-2 rounded border ${value ? 'bg-red-50 border-red-200 text-red-700' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
        <div className="flex items-center gap-2">
            {value ? <Check className="w-4 h-4" /> : <div className="w-4 h-4" />}
            <span className="font-medium">{label}</span>
        </div>
    </div>
);
