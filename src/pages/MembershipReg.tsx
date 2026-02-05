import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';

export default function MembershipRegister() {
  const [searchParams] = useSearchParams();
  const membershipType = searchParams.get('type') || 'men';

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(',')[1]); // remove "data:...base64,"
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    membership_type: membershipType,
    emergency_contact: '',
    emergency_phone: '',
    phone: '',
    whatsapp: '',
    dob: '',
    playing_position: '',
    secondary_position: '',
    other_position: '',
    address: '',
    height: '',
    weight: '',
    emirates_id: '',
    emirates_id_file: null as File | null,
    passport_number: '',
    nationality: '',
    passport_photo: null as File | null,
  });

  const [formbData, setFormbData] = useState({
    street_address: '',
    city: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlebChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormbData({ ...formbData, [name]: value });
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    console.log(formData);

    try {

      const formToSubmit: any = { ...formData, membership_type: membershipType };

      if (formData.emirates_id_file) {
        formToSubmit.emirates_id_file = await fileToBase64(formData.emirates_id_file);
      }

      if (formData.passport_photo) {
        formToSubmit.passport_photo = await fileToBase64(formData.passport_photo);
      }
      const address = `${formbData.street_address}, ${formbData.city}`;
      formToSubmit.address = address;

      const { error: submitError } = await supabase
        .from('memberships')
        .insert([formToSubmit]);

      if (submitError) throw submitError;
      console.log(formToSubmit);

      const { error: rapidError } = await supabase.functions.invoke("rapid-handler", {
        body: formToSubmit
      });

      if (rapidError) throw rapidError;

      setSubmitted(true);
      setFormData({
        first_name: '',
        last_name: '',
        membership_type: membershipType,
        emergency_contact: '',
        emergency_phone: '',
        email: '',
        phone: '',
        whatsapp: '',
        dob: '',
        playing_position: '',
        secondary_position: '',
        other_position: '',
        address: '',
        height: '',
        weight: '',
        emirates_id: '',
        emirates_id_file: null,
        passport_number: '',
        nationality: '',
        passport_photo: null
      });
      setFormbData({
        street_address: '',
        city: '',
      });
    } catch (err) {
      console.error(err);
      setError('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getPageTitle = () => {
    if (membershipType === 'men') return 'Player Registration - Men’s Rugby';
    if (membershipType === 'touch') return 'Touch Rugby Registration';
    if (membershipType === 'women') return 'Player Registration - Women’s Rugby';
    if (membershipType === 'supporter') return 'Supporter Membership Registration';
    return 'Membership Registration';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <SEO
        title={getPageTitle()}
        description={`Register to join Dubai Tuskers RFC. ${getPageTitle()} - Become part of our family today.`}
        keywords={`join dubai tuskers, ${membershipType} rugby registration, play rugby dubai, rugby club membership`}
      />
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-6 text-[#1a1f4e]">
          {membershipType === 'men' && 'Player Registration - Men’s Rugby'}
          {membershipType === 'touch' && 'Touch Rugby Registration'}
          {membershipType === 'women' && 'Player Registration - Womens’s Rugby'}
          {membershipType === 'supporter' && 'Supporter Membership Registration'}
        </h1>
        <div className="w-24 h-1 bg-[#f5a623] mx-auto mb-8"></div>

        {submitted ? (
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
              <div>
                <h3 className="text-lg font-bold text-green-900 mb-1">Application Submitted!</h3>
                <p className="text-green-700">
                  Thank you for your application. We will contact you within 48 hours.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <p className="text-red-700">{error}</p>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">First Name *</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623]"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Last Name *</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+971 50 123 4567"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623]"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Whatsapp</label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="+971 50 123 4567"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623]"
                />
              </div>
            </div>

            {/* Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Street Address</label>
                <input
                  type="text"
                  name="street_address"
                  value={formbData.street_address}
                  onChange={handlebChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623]"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formbData.city}
                  onChange={handlebChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Date of Birth *</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623]"
                />
              </div>
              {membershipType !== 'supporter' && (
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Preferred Playing Position</label>
                  <input
                    type="text"
                    name="playing_position"
                    value={formData.playing_position}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623]"
                  />
                </div>
              )}
            </div>

            {membershipType !== 'supporter' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Secondary Position</label>
                  <input
                    type="text"
                    name="secondary_position"
                    value={formData.secondary_position}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Other Position</label>
                  <input
                    type="text"
                    name="other_position"
                    value={formData.other_position}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623]"
                  />
                </div>
              </div>
            )}

            {/* Height and Weight */}
            {membershipType !== 'supporter' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Height (cm)</label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623]"
                  />
                </div>
              </div>
            )}

            {/* Emirates ID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Emirates ID Number *</label>
                <input
                  type="text"
                  name="emirates_id"
                  value={formData.emirates_id}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623]"
                  placeholder="_ _ _ - _ _ _ _ - _ _ _ _ _ _ _ - _0"
                />
              </div>
              {membershipType !== 'supporter' && (
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Upload Emirates ID Copy Photo *</label>
                  <input
                    type="file"
                    name="emirates_id_file"
                    onChange={handleChange}
                    required={membershipType !== 'supporter'}
                    accept="image/*"
                    className="w-full"
                  />
                </div>
              )}
            </div>

            {/* Passport */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {membershipType !== 'supporter' && (
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Passport Number *</label>
                  <input
                    type="text"
                    name="passport_number"
                    value={formData.passport_number}
                    onChange={handleChange}
                    required={membershipType !== 'supporter'}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623]"
                  />
                </div>
              )}
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Nationality *</label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623]"
                />
              </div>
            </div>
            {membershipType !== 'supporter' && (
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Upload Passport Size Photo *</label>
                <input
                  type="file"
                  name="passport_photo"
                  onChange={handleChange}
                  accept="image/*"
                  required={membershipType !== 'supporter'}
                  className="w-full"
                />
              </div>
            )}

            {/* Data protection */}
            <div className="mt-4">
              <label className="block font-semibold text-gray-700 mb-2">
                Data Protection and Sharing *
              </label>
              <p className='pb-4'>
                {membershipType === 'supporter' ? (
                  "Dubai Tuskers RFC strictly adheres to the Personal Data Protection Law of the United Arab Emirates. However, certain personal data must be shared with third parties, such as Sponsors. The data shared includes: Name, Date of Birth, Gender, and Nationality. I consent for Dubai Tuskers Rugby Football Club to share only the necessary personal data required to register me with Sponsors."
                ) : (
                  "Dubai Tuskers RFC strictly adheres to the Personal Data Protection Law of the United Arab Emirates. However, certain personal data must be shared with third parties, such as insurers who manage our secondary player accident policy. The data shared includes: Name, Date of Birth, Gender, and Nationality. All adult rugby players are required to be registered with the United Arab Emirates Rugby Federation (UAERF). To complete this registration, the following data must be shared: Name, Date of Birth, Gender, Nationality, Emirates ID Number, and Email Address. I consent for Dubai Tuskers Rugby Football Club to share only the necessary personal data required to register me with both the insurer and the United Arab Emirates Rugby Federation (UAERF)."
                )}
              </p>
              <div className="flex flex-col gap-2">
                <label>
                  <input
                    type="radio"
                    name="data_protection"
                    value="yes"
                    required
                    className="mr-2"
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="data_protection"
                    value="no"
                    required
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-6 bg-[#1a1f4e] text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-[#2a2f5e] transition-colors disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
