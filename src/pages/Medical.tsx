import { useState } from "react";
import { AlertTriangle, Check, FileText, Shield, Stethoscope, User } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function MedicalClearanceForm() {
  const today = new Date().toISOString().split('T')[0];
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    nationality: "",
    passportId: "",
    contactNumber: "",
    emergencyContact: "",
    hasInsurance: "yes", // 'yes' or 'no'
    insuranceProvider: "",
    policyNumber: "",
    policyExpiry: "",
    coverageDetails: "",
    uninsuredSignature: "",
    uninsuredDate: "",
    history: {
      asthma: false,
      heartConditions: false,
      allergies: false,
      diabetes: false,
      majorInjuries: false,
      other: false,
    },
    otherSpecify: "",
    injuryDetails: "",
    medication: "",
    doctorName: "",
    clinicName: "",
    doctorSignature: "",
    doctorDate: "",
    playerSignature: "",
    declarationDate: today,
  });
  const [success, setSuccess] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (field: string) => {
    setFormData((prev) => ({
      ...prev,
      history: {
        ...prev.history,
        [field]: !prev.history[field as keyof typeof prev.history],
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setLoading(true);

    try {
      const data = {
        full_name: formData.fullName,
        dob: formData.dob,
        nationality: formData.nationality,
        passport_id: formData.passportId,
        contact_number: formData.contactNumber,
        emergency_contact: formData.emergencyContact,
        has_insurance: formData.hasInsurance === 'yes', // Convert 'yes'/'no' string to boolean
        insurance_provider: formData.insuranceProvider,
        policy_number: formData.policyNumber,
        policy_expiry: formData.policyExpiry || null, // Handle empty dates
        coverage_details: formData.coverageDetails,
        uninsured_signature: formData.uninsuredSignature,
        uninsured_date: formData.uninsuredDate || null,
        history_asthma: formData.history.asthma,
        history_heart_conditions: formData.history.heartConditions,
        history_allergies: formData.history.allergies,
        history_diabetes: formData.history.diabetes,
        history_major_injuries: formData.history.majorInjuries,
        history_other: formData.history.other,
        history_other_specify: formData.otherSpecify,
        injury_details: formData.injuryDetails,
        medication: formData.medication,
        doctor_name: formData.doctorName,
        clinic_name: formData.clinicName,
        doctor_signature: formData.doctorSignature,
        doctor_date: formData.doctorDate || null,
        player_signature: formData.playerSignature,
        declaration_date: formData.declarationDate,
      }
      const { error } = await supabase
        .from('medical_clearance_forms')
        .insert([data]);

      if (error) throw error;

      await supabase.functions.invoke('send-medical-email', {
        body: data,
      });

      setSuccess("Form submitted successfully!");
      setFormData({
        fullName: "",
        dob: "",
        nationality: "",
        passportId: "",
        contactNumber: "",
        emergencyContact: "",
        hasInsurance: "yes",
        insuranceProvider: "",
        policyNumber: "",
        policyExpiry: "",
        coverageDetails: "",
        uninsuredSignature: "",
        uninsuredDate: "",
        history: {
          asthma: false,
          heartConditions: false,
          allergies: false,
          diabetes: false,
          majorInjuries: false,
          other: false,
        },
        otherSpecify: "",
        injuryDetails: "",
        medication: "",
        doctorName: "",
        clinicName: "",
        doctorSignature: "",
        doctorDate: "",
        playerSignature: "",
        declarationDate: today,
      });

    } catch (error: any) {
      console.error('Error:', error);
      alert("Error submitting form: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1229] text-gray-200 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto bg-[#1a1f3d] rounded-xl shadow-2xl border border-white/10 overflow-hidden">
        <div className="bg-[#0f1229] p-8 border-b border-[#f5a623] text-center">
          <p className="text-[#f5a623] font-semibold mt-2 uppercase text-2xl tracking-wide">
            Medical Clearance & Liability Form
          </p>
        </div>
        {loading && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="w-16 h-16 border-4 border-[#f5a623] border-t-transparent rounded-full animate-spin"></div>
          </div>)}

        <form onSubmit={handleSubmit} className="p-8 space-y-12">
          <section>
            <div className="flex items-center gap-3 mb-6">
              <User className="text-[#f5a623]" />
              <h2 className="text-2xl font-bold text-white">Player Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup label="Full Name" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
              <InputGroup label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleInputChange} required />
              <InputGroup label="Nationality" name="nationality" value={formData.nationality} onChange={handleInputChange} required />
              <InputGroup label="Passport / Emirates ID" name="passportId" value={formData.passportId} onChange={handleInputChange} required />
              <InputGroup label="Contact Number" name="contactNumber" type="tel" value={formData.contactNumber} onChange={handleInputChange} required />
              <InputGroup label="Emergency Contact (Name & Number)" name="emergencyContact" value={formData.emergencyContact} onChange={handleInputChange} required />
            </div>
          </section>

          <hr className="border-white/10" />
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Shield className="text-[#f5a623]" />
              <h2 className="text-2xl font-bold text-white">Medical Insurance Details</h2>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">Do you have active medical insurance?</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="hasInsurance"
                    value="yes"
                    checked={formData.hasInsurance === "yes"}
                    onChange={handleInputChange}
                    className="accent-[#f5a623] w-5 h-5"
                  />
                  <span className="text-white">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="hasInsurance"
                    value="no"
                    checked={formData.hasInsurance === "no"}
                    onChange={handleInputChange}
                    className="accent-[#f5a623] w-5 h-5"
                  />
                  <span className="text-white">No</span>
                </label>
              </div>
            </div>

            {formData.hasInsurance === "yes" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-green-900/10 p-6 rounded-lg border border-green-500/20">
                <InputGroup label="Insurance Provider" name="insuranceProvider" value={formData.insuranceProvider} onChange={handleInputChange} required />
                <InputGroup label="Policy Number" name="policyNumber" value={formData.policyNumber} onChange={handleInputChange} required />
                <InputGroup label="Policy Expiry Date" name="policyExpiry" type="date" value={formData.policyExpiry} onChange={handleInputChange} required />
                <div className="md:col-span-2">
                  <InputGroup label="Coverage Details" name="coverageDetails" value={formData.coverageDetails} onChange={handleInputChange} />
                </div>
              </div>
            ) : (
              <div className="bg-red-900/20 p-6 rounded-lg border border-red-500/30">
                <div className="flex gap-3 mb-4">
                  <AlertTriangle className="text-red-500 flex-shrink-0" />
                  <p className="text-sm text-gray-300 italic">
                    "I acknowledge that I do not currently possess medical insurance. I understand and accept that by participating in any training sessions, matches, events, or activities organized by Dubai Tuskers RFC, I do so entirely at my own risk. I take full responsibility for any injuries, medical expenses, or health-related issues that may occur, and I release Dubai Tuskers RFC, its officials, coaches, and representatives from any liability arising from my participation."
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup label="Digital Signature (Type Full Name)" name="uninsuredSignature" value={formData.uninsuredSignature} onChange={handleInputChange} placeholder="I accept the risk..." />
                  <InputGroup label="Date" name="uninsuredDate" type="date" value={formData.uninsuredDate} onChange={handleInputChange} />
                </div>
              </div>
            )}
          </section>

          <hr className="border-white/10" />
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Stethoscope className="text-[#f5a623]" />
              <h2 className="text-2xl font-bold text-white">Medical History</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {Object.keys(formData.history).map((key) => (
                <label key={key} className="flex items-center gap-3 p-3 bg-white/5 rounded border border-white/10 cursor-pointer hover:bg-white/10 transition">
                  <input
                    type="checkbox"
                    checked={formData.history[key as keyof typeof formData.history]}
                    onChange={() => handleCheckboxChange(key)}
                    className="w-5 h-5 rounded border-gray-500 accent-[#f5a623]"
                  />
                  <span className="capitalize text-gray-300">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </label>
              ))}
            </div>

            {formData.history.other && (
              <div className="mb-6">
                <InputGroup label="Specify Other Conditions" name="otherSpecify" value={formData.otherSpecify} onChange={handleInputChange} />
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#f5a623] mb-2">Details of Major Injuries & Surgeries</label>
                <textarea
                  name="injuryDetails"
                  value={formData.injuryDetails}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full bg-[#0f1229] border border-white/20 rounded p-3 text-white focus:outline-none focus:border-[#f5a623] transition"
                  placeholder="List significant injuries, dates, treatment, and current status..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#f5a623] mb-2">Current Medication</label>
                <textarea
                  name="medication"
                  value={formData.medication}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full bg-[#0f1229] border border-white/20 rounded p-3 text-white focus:outline-none focus:border-[#f5a623] transition"
                  placeholder="List any current medications..."
                ></textarea>
              </div>
            </div>
          </section>

          <hr className="border-white/10" />

          <section className="opacity-75 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="text-[#f5a623]" />
              <h2 className="text-2xl font-bold text-white">Medical Clearance <span className="text-sm font-normal text-gray-400">(Optional - if certified by Doctor)</span></h2>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-dashed border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <InputGroup label="Doctor's Name" name="doctorName" value={formData.doctorName} onChange={handleInputChange} />
                <InputGroup label="Clinic / Hospital" name="clinicName" value={formData.clinicName} onChange={handleInputChange} />
              </div>
              <p className="text-sm text-gray-300 mb-4 italic">"The above individual is medically fit to participate in rugby-related physical activities."</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="Doctor's Signature / Stamp ID" name="doctorSignature" value={formData.doctorSignature} onChange={handleInputChange} />
                <InputGroup label="Date" name="doctorDate" type="date" value={formData.doctorDate} onChange={handleInputChange} />
              </div>
            </div>
          </section>

          <hr className="border-white/10" />

          <section>
            <div className="flex items-center gap-3 mb-6">
              <Check className="text-[#f5a623]" />
              <h2 className="text-2xl font-bold text-white">Player Declaration</h2>
            </div>

            <p className="text-gray-300 mb-6">
              I hereby confirm that all information provided in this form is true and accurate. I understand the physical nature of rugby and acknowledge the risks involved.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup label="Digital Signature (Type Full Name)" name="playerSignature" value={formData.playerSignature} onChange={handleInputChange} required />
              <InputGroup label="Date" name="declarationDate" type="date" value={formData.declarationDate} onChange={handleInputChange} required />
            </div>
          </section>
          <div className="mt-12 pt-6 border-t-4 border-[#f5a623]/50 bg-[#000000]/30 p-6 rounded">
            <h3 className="text-lg font-bold text-gray-500 uppercase mb-4">Official Use Only</h3>
            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-gray-500">
                  <input type="checkbox" disabled className="rounded border-gray-600 bg-transparent" />
                  Cleared to Play
                </label>
                <label className="flex items-center gap-2 text-gray-500">
                  <input type="checkbox" disabled className="rounded border-gray-600 bg-transparent" />
                  Not Cleared
                </label>
              </div>
              <div className="flex-1 border-b border-gray-700 h-8 flex items-end text-gray-600 text-sm">
                Reviewed By: _________________
              </div>
              <div className="w-40 border-b border-gray-700 h-8 flex items-end text-gray-600 text-sm">
                Date: ________
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              type="submit"
              className="bg-[#f5a623] hover:bg-[#e09612] text-[#0f1229] font-bold py-4 px-12 rounded shadow-lg transform hover:scale-105 transition-all uppercase tracking-wider"
            >
              Submit Declaration
            </button>
          </div>

        </form>

        {success && (
          <div className="m-6 p-4 bg-green-800/40 text-green-300 border border-green-500/30 rounded">
            {success}
          </div>
        )}
      </div>
    </div>
  );
}
const InputGroup = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false
}: any) => (
  <div className="w-full">
    <label className="block text-sm font-medium text-gray-400 mb-1">
      {label} {required && <span className="text-[#f5a623]">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="w-full bg-[#0f1229] border border-white/20 rounded px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#f5a623] focus:ring-1 focus:ring-[#f5a623] transition"
    />
  </div>
);
