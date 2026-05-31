import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { CheckCircle2, ShieldCheck, Mail, Phone, Building } from 'lucide-react';
import SEO from '../components/SEO';

export default function SponsorReg() {
  const [formData, setFormData] = useState({
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    tier: 'Club Platinum Plus Sponsor',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const tiers = [
    'Club Platinum Plus Sponsor',
    'Club Platinum Sponsor',
    'Club Gold Sponsor',
    'Club Silver Sponsor',
    'Club Bronze Sponsor',
    'Other Sponsors',
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const { error: submitError } = await supabase
        .from('sponsor_registrations')
        .insert([formData]);

      if (submitError) throw submitError;

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      setError('Failed to submit registration. Please try again or contact us directly.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <SEO
        title="Sponsor Registration - Dubai Tuskers RFC"
        description="Become a partner of Dubai Tuskers RFC. Submit your sponsor application online and join our growing rugby community."
        keywords="dubai rugby sponsor, sponsor registration, tuskers rfc partnership, support rugby dubai"
      />
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1a1f4e] mb-3">
            Sponsor Registration
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Partner with Dubai Tuskers RFC and elevate your brand visibility in the UAE sports community.
          </p>
          <div className="w-24 h-1 bg-[#f5a623] mx-auto mt-4"></div>
        </div>

        {submitted ? (
          <div className="bg-white border border-green-100 shadow-xl rounded-2xl p-8 md:p-12 text-center max-w-2xl mx-auto transform transition-all">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 text-green-500 mb-6">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Application Received!</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Thank you for registering your interest in sponsoring Dubai Tuskers RFC. A member of our sponsorship committee will reach out to you within 48 hours to discuss packages, logo placements, and partnership details.
            </p>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-500 flex items-center justify-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#f5a623]" />
              Your details have been securely logged in our systems.
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2 bg-white shadow-xl rounded-2xl p-6 md:p-8 border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg text-red-700 text-sm">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1.5">Company Name *</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                        <Building className="h-5 w-5" />
                      </span>
                      <input
                        type="text"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleChange}
                        required
                        placeholder="Your Company Ltd"
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1.5">Contact Person Name *</label>
                    <input
                      type="text"
                      name="contact_name"
                      value={formData.contact_name}
                      onChange={handleChange}
                      required
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="jane@company.com"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1.5">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+971 50 123 4567"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1.5">Preferred Sponsorship Tier *</label>
                    <select
                      name="tier"
                      value={formData.tier}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:border-transparent transition-all bg-white"
                    >
                      {tiers.map((tier) => (
                        <option key={tier} value={tier}>
                          {tier}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1.5">Message / Special Requests</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us about your brand, budget requirements, or customized options you'd like to explore..."
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:border-transparent transition-all resize-y"
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full mt-6 bg-[#1a1f4e] text-white px-6 py-3.5 rounded-lg font-bold text-lg hover:bg-[#2a2f5e] transition-colors disabled:opacity-50 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  {submitting ? 'Registering...' : 'Submit Sponsorship Application'}
                </button>
              </form>
            </div>

            {/* Sidebar Info Section */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#1a1f4e] to-[#2a2f5e] text-white rounded-2xl p-6 shadow-lg border border-white/5">
                <h3 className="text-xl font-bold mb-4 text-[#f5a623]">Why Dubai Tuskers?</h3>
                <ul className="space-y-3.5 text-sm text-gray-200">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#f5a623] font-bold mt-0.5">•</span>
                    <span>Direct visibility on team kits and training apparel.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#f5a623] font-bold mt-0.5">•</span>
                    <span>Brand coverage across official tournament photography.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#f5a623] font-bold mt-0.5">•</span>
                    <span>Active engagement with a highly passionate local sports community.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
                <h4 className="font-bold text-[#1a1f4e] mb-3">Direct Contact</h4>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                  Have questions before submitting? Reach out to our committee directly:
                </p>
                <div className="space-y-2.5 text-sm">
                  <a
                    href="mailto:info@dubaituskers.com"
                    className="flex items-center justify-center gap-2 text-gray-600 hover:text-[#f5a623] transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    info@dubaituskers.com
                  </a>
                  <a
                    href="tel:+971521329719"
                    className="flex items-center justify-center gap-2 text-gray-600 hover:text-[#f5a623] transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    +971 52 132 9719
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
