import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';
import { Search, Mail, Phone, MapPin, User, Download } from 'lucide-react';

export default function MembersList() {
    const [members, setMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('memberships')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching members:', error);
        else setMembers(data || []);
        setLoading(false);
    };

    const filteredMembers = members.filter(member => {
        const matchesSearch =
            (member.first_name + ' ' + member.last_name).toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.emirates_id?.includes(searchTerm);

        const matchesFilter = filterType === 'all' || member.membership_type === filterType;

        return matchesSearch && matchesFilter;
    });

    const exportCSV = () => {
        const headers = ['First Name', 'Last Name', 'Email', 'Phone', 'Type', 'DOB', 'Emirates ID', 'Role'];
        const csvContent = [
            headers.join(','),
            ...filteredMembers.map(m => [
                m.first_name,
                m.last_name,
                m.email,
                m.phone,
                m.membership_type,
                m.dob,
                m.emirates_id,
                m.playing_position
            ].map(f => `"${f || ''}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'members_export.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[#1a1f4e]">Member Directory</h1>
                    <p className="text-gray-500">Manage all registered club members</p>
                </div>
                <button
                    onClick={exportCSV}
                    className="flex items-center justify-center gap-2 bg-[#1a1f4e] text-white px-4 py-2 rounded-xl hover:bg-[#2a2f5e] transition-colors shadow-sm"
                >
                    <Download className="w-4 h-4" />
                    <span className="font-medium">Export CSV</span>
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#f5a623] focus:border-[#f5a623] outline-none transition-all"
                        placeholder="Search by name, email, or Emirates ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select
                    className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none bg-gray-50 font-medium text-gray-700 min-w-[200px]"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    <option value="all">All Membership Types</option>
                    <option value="men">Men's Rugby</option>
                    <option value="women">Women's Rugby</option>
                    <option value="touch">Touch Rugby</option>
                </select>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Member</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Registered</th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-gray-500">Loading members...</td>
                                </tr>
                            ) : filteredMembers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-gray-500">No members found matching your criteria.</td>
                                </tr>
                            ) : (
                                filteredMembers.map((member) => (
                                    <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full bg-[#1a1f4e] text-[#f5a623] flex items-center justify-center font-bold text-xl uppercase">
                                                    {member.first_name[0]}{member.last_name[0]}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-bold text-gray-900">{member.first_name} {member.last_name}</div>
                                                    <div className="text-xs text-gray-500">{member.playing_position || 'N/A'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 flex items-center gap-1"><Mail className="w-3 h-3 text-gray-400" /> {member.email}</div>
                                            <div className="text-sm text-gray-500 flex items-center gap-1"><Phone className="w-3 h-3 text-gray-400" /> {member.phone}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                            ${member.membership_type === 'men' ? 'bg-blue-100 text-blue-800' : ''}
                            ${member.membership_type === 'women' ? 'bg-pink-100 text-pink-800' : ''}
                            ${member.membership_type === 'touch' ? 'bg-orange-100 text-orange-800' : ''}
                        `}>
                                                {member.membership_type.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(member.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link to={`/admin/members/${member.id}`} className="text-[#1a1f4e] hover:text-[#f5a623] font-bold">
                                                View / Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden grid grid-cols-1 gap-4">
                {loading ? (
                    <div className="text-center py-10 text-gray-500">Loading members...</div>
                ) : filteredMembers.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">No members found.</div>
                ) : (
                    filteredMembers.map(member => (
                        <div key={member.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 rounded-full bg-[#1a1f4e] text-[#f5a623] flex items-center justify-center font-bold text-md uppercase">
                                        {member.first_name[0]}{member.last_name[0]}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{member.first_name} {member.last_name}</h3>
                                        <p className="text-xs text-gray-500">{member.playing_position || 'N/A'}</p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase
                            ${member.membership_type === 'men' ? 'bg-blue-100 text-blue-800' : ''}
                            ${member.membership_type === 'women' ? 'bg-pink-100 text-pink-800' : ''}
                            ${member.membership_type === 'touch' ? 'bg-orange-100 text-orange-800' : ''}
                        `}>
                                    {member.membership_type}
                                </span>
                            </div>

                            <div className="space-y-2 text-sm text-gray-600 border-t border-gray-100 pt-3">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-[#f5a623]" />
                                    <span className="truncate">{member.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-[#f5a623]" />
                                    <span>{member.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-[#f5a623]" />
                                    <span className="truncate">{member.address || 'No address provided'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-[#f5a623]" />
                                    <span>Emirates ID: {member.emirates_id || 'N/A'}</span>
                                </div>
                                <div className="pt-2">
                                    <Link
                                        to={`/admin/members/${member.id}`}
                                        className="block w-full text-center bg-gray-50 text-[#1a1f4e] hover:bg-[#1a1f4e] hover:text-white border border-[#1a1f4e] py-2 rounded-lg transition-colors font-bold text-sm"
                                    >
                                        View / Edit Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
