import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';

export default function AcademyReg() {
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(',')[1]); // remove "data:...base64,"
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const [formData, setFormData] = useState({
    child_first_name: '',
    child_last_name: '',
    parent_name: '',
    email: '',
    phone: '',
    whatsapp: '',
    dob: '',
    age_sept_2026: '',
    street_address: '',
    city: '',
    medical_conditions: '',
    emirates_id: '',
    emirates_id_file: null as File | null,
    passport_number: '',
    nationality: '',
    passport_photo: null as File | null,
    category: '',
    waiver: '',
    consent: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    
    if (type === 'file' && target.files) {
      setFormData({ ...formData, [name]: target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const formToSubmit: any = { 
        ...formData, 
        membership_type: 'academy',
        first_name: formData.child_first_name,
        last_name: formData.child_last_name,
        address: `${formData.street_address}, ${formData.city}`
      };

      if (formData.emirates_id_file) {
        formToSubmit.emirates_id_file = await fileToBase64(formData.emirates_id_file);
      }

      if (formData.passport_photo) {
        formToSubmit.passport_photo = await fileToBase64(formData.passport_photo);
      }

      const { error: submitError } = await supabase
        .from('memberships')
        .insert([formToSubmit]);

      if (submitError) throw submitError;

      const { error: rapidError } = await supabase.functions.invoke("rapid-handler", {
        body: formToSubmit
      });

      if (rapidError) throw rapidError;

      setSubmitted(true);
      setFormData({
        child_first_name: '',
        child_last_name: '',
        parent_name: '',
        email: '',
        phone: '',
        whatsapp: '',
        dob: '',
        age_sept_2026: '',
        street_address: '',
        city: '',
        medical_conditions: '',
        emirates_id: '',
        emirates_id_file: null,
        passport_number: '',
        nationality: '',
        passport_photo: null,
        category: '',
        waiver: '',
        consent: '',
      });
    } catch (err) {
      console.error(err);
      setError('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <SEO
        title="Academy Registration"
        description="Register for Dubai Tuskers RFC Academy."
        keywords="academy rugby registration, youth rugby dubai"
      />
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-6 text-[#1a1f4e]">
          Academy Player Registration
        </h1>
        <div className="w-24 h-1 bg-[#f5a623] mx-auto mb-8"></div>

        {submitted ? (
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
              <div>
                <h3 className="text-lg font-bold text-green-900 mb-1">Application Submitted!</h3>
                <p className="text-green-700">
                  Thank you for your application. We will contact you shortly.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 space-y-6 max-w-4xl mx-auto">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <p className="text-red-700">{error}</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Childs First Name *</label>
                <input
                  type="text"
                  name="child_first_name"
                  value={formData.child_first_name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623]"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Childs Last Name *</label>
                <input
                  type="text"
                  name="child_last_name"
                  value={formData.child_last_name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Parent’s Name *</label>
                <input
                  type="text"
                  name="parent_name"
                  value={formData.parent_name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623]"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Parent’s Email *</label>
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
                <label className="block font-semibold text-gray-700 mb-1">Parent’s Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623]"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Parent’s Whatsapp</label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Childs Date of Birth *</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623]"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Childs Age as of 1st Sept 2026 *</label>
                <input
                  type="number"
                  name="age_sept_2026"
                  value={formData.age_sept_2026}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Street Address</label>
                <input
                  type="text"
                  name="street_address"
                  value={formData.street_address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623]"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Child Medical Conditions *</label>
              <textarea
                name="medical_conditions"
                value={formData.medical_conditions}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Childs Emirates ID Number *</label>
                <input
                  type="text"
                  name="emirates_id"
                  value={formData.emirates_id}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623]"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Upload Childs Emirates ID Copy Photo *</label>
                <input
                  type="file"
                  name="emirates_id_file"
                  onChange={handleChange}
                  required
                  accept="image/*"
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Childs Passport Number *</label>
                <input
                  type="text"
                  name="passport_number"
                  value={formData.passport_number}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623]"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Childs Nationality *</label>
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
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Upload Childs Passport Size Photo *</label>
                <input
                  type="file"
                  name="passport_photo"
                  onChange={handleChange}
                  accept="image/*"
                  required
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Category (Please enter their Age with respect to their Age on 1st of sept. 2026 E.g. if they are 7 on sept 1st, they are Under 8) *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623]"
              >
                <option value="" disabled>Select Category</option>
                <option value="Under 4">Under 4</option>
                <option value="Under 6">Under 6</option>
                <option value="Under 7">Under 7</option>
                <option value="Under 8">Under 8</option>
                <option value="Under 9">Under 9</option>
                <option value="Under 10">Under 10</option>
                <option value="Under 11">Under 11</option>
                <option value="Under 12">Under 12</option>
                <option value="Under 13">Under 13</option>
                <option value="Under 14">Under 14</option>
                <option value="Under 15">Under 15</option>
                <option value="Under 16">Under 16</option>
                <option value="Under 17">Under 17</option>
                <option value="Under 18">Under 18</option>
              </select>
            </div>

            {/* Waiver */}
            <div className="mt-4">
              <label className="block font-semibold text-gray-700 mb-2">
                1. Assumption of Risk & Liability Waiver *
              </label>
              <div className='pb-4 text-sm text-gray-600'>
                <p>Participation in coaching sessions and rugby activities with Dubai Tuskers Rugby Football Club involves an inherent risk of injury, whether caused by myself or others.</p>
                <p>By registering, I acknowledge and voluntarily accept all such risks. I agree that Dubai Tuskers Rugby Football Club, its coaches, staff, affiliates, and facility providers shall not be held liable for any injury, including but not limited to personal, bodily, or mental injury, or any loss or damage arising from participation, whether resulting from negligence or otherwise.</p>
                <p>In the event of any claim arising from such injury, loss, or damage involving me, I agree to:</p>
                <ol className="list-decimal pl-5">
                  <li>Defend Dubai Tuskers Rugby Football Club against such claims and cover all related expenses; and</li>
                  <li>Indemnify and hold harmless Dubai Tuskers Rugby Football Club from any liabilities arising from such claims.</li>
                </ol>
                <p>By proceeding with registration, I confirm that I have read, understood, and agreed to these terms, and acknowledge that I have received or had access to a copy of this agreement.</p>
              </div>
              <div className="flex gap-4">
                <label>
                  <input
                    type="radio"
                    name="waiver"
                    value="yes"
                    checked={formData.waiver === 'yes'}
                    onChange={handleChange}
                    required
                    className="mr-2"
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="waiver"
                    value="no"
                    checked={formData.waiver === 'no'}
                    onChange={handleChange}
                    required
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            {/* Data protection */}
            <div className="mt-4">
              <label className="block font-semibold text-gray-700 mb-2">
                2. Data Protection & Consent for Data Sharing *
              </label>
              <div className='pb-4 text-sm text-gray-600'>
                <p>Dubai Tuskers Rugby Football Club is committed to protecting personal data in accordance with the Personal Data Protection Law of the United Arab Emirates.</p>
                <p>To facilitate player safety, insurance coverage, and official registration requirements, certain personal data must be shared with authorized third parties:</p>
                <ul className="list-disc pl-5">
                  <li><strong>Insurance Providers:</strong> Name, Date of Birth, Gender, Nationality (for player accident insurance coverage)</li>
                  <li><strong>United Arab Emirates Rugby Federation (UAERF):</strong> Name, Date of Birth, Gender, Nationality, Emirates ID Number, and Email Address (for mandatory player registration)</li>
                </ul>
                <p>All data shared will be limited to what is strictly necessary and used solely for the purposes outlined above.</p>
                <p>By completing the registration, I consent to Dubai Tuskers Rugby Football Club collecting, processing, and sharing my personal data with the relevant parties as required.</p>
              </div>
              <div className="flex gap-4">
                <label>
                  <input
                    type="radio"
                    name="consent"
                    value="yes"
                    checked={formData.consent === 'yes'}
                    onChange={handleChange}
                    required
                    className="mr-2"
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="consent"
                    value="no"
                    checked={formData.consent === 'no'}
                    onChange={handleChange}
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
