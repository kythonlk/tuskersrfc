import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, XCircle, ShieldCheck, User, Calendar, CreditCard } from 'lucide-react';

export default function VerifyMember() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function verify() {
      try {
        const { data, error } = await supabase
          .from('mob_members')
          .select('*')
          .eq('member_id', id)
          .single();

        if (error) throw error;
        setMember(data);
      } catch (err: any) {
        console.error('Verification error:', err);
        setError('Member not found or invalid QR code');
      } finally {
        setLoading(false);
      }
    }

    if (id) verify();
  }, [id]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-gray-50 font-rajdhani">
      <Helmet>
        <title>Member Verification | Dubai Tuskers RFC</title>
      </Helmet>

      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-[#000033] p-8 text-center text-white relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <ShieldCheck size={120} />
          </div>
          <img src="/logo.webp" alt="Dubai Tuskers" className="w-24 mx-auto mb-4" />
          <h1 className="text-2xl font-bold tracking-wider">VERIFICATION SYSTEM</h1>
        </div>

        <div className="p-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#000033]"></div>
              <p className="mt-4 text-gray-500 font-medium">Verifying Credentials...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="text-red-500" size={48} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">VERIFICATION FAILED</h2>
              <p className="text-red-600 font-medium mb-6">{error}</p>
              <div className="p-4 bg-red-50 rounded-xl border border-red-100 text-sm text-red-700">
                This QR code is either invalid, expired, or doesn't belong to a registered member.
              </div>
            </div>
          ) : (
            <div>
              <div className="text-center mb-8">
                <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                  <CheckCircle className="text-green-500" size={48} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-tight">Verified Member</h2>
                <p className="text-green-600 font-bold uppercase tracking-widest text-xs mt-1">Active Membership</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="bg-white p-3 rounded-xl shadow-sm mr-4">
                    <User className="text-[#000033]" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Full Name</p>
                    <p className="text-gray-800 font-bold text-lg leading-tight">{member.full_name}</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="bg-white p-3 rounded-xl shadow-sm mr-4">
                    <CreditCard className="text-[#000033]" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Member ID</p>
                    <p className="text-gray-800 font-bold text-lg leading-tight">TUSKER-{member.member_id}</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="bg-white p-3 rounded-xl shadow-sm mr-4">
                    <Calendar className="text-[#000033]" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Valid Until</p>
                    <p className="text-gray-800 font-bold text-lg leading-tight">
                      {member.expiry_date ? new Date(member.expiry_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'LIFE MEMBER'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-dashed border-gray-200">
                <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  <span>Verification Date</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-gray-50 p-4 text-center">
           <p className="text-xs text-gray-400 font-medium">Dubai Tuskers RFC Official Verification Portal</p>
        </div>
      </div>
    </div>
  );
}
