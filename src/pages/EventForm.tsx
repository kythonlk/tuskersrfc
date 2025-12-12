import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2, CheckCircle, Calendar, MapPin, Clock } from 'lucide-react';
import { useParams } from 'react-router-dom';

interface EventField {
    id: string;
    type: 'header' | 'checkbox' | 'radio' | 'text' | 'email' | 'tel' | 'number' | 'date';
    label: string;
    required?: boolean;
    width?: 'full' | 'half';
    options?: string[];
}

interface EventConfig {
    id: string;
    title: string;
    short_description?: string;
    event_date: string;
    location: string;
    form_schema: EventField[];
}

function DynamicEventForm() {
    const { id } = useParams();
    const [eventConfig, setEventConfig] = useState<EventConfig | null>(null);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    // 1. Fetch the Form Configuration from Database
    useEffect(() => {
        const fetchConfig = async () => {
            const { data, error } = await supabase
                .from('events')
                .select('id, title, form_schema, event_date, location, short_description')
                .eq('slug', id)
                .single();

            if (data) {
                setEventConfig(data as EventConfig);
                // Initialize default state
                const initialData: Record<string, any> = {};
                (data.form_schema as EventField[]).forEach(field => {
                    if (field.type !== 'header') initialData[field.id] = '';
                    if (field.type === 'checkbox') initialData[field.id] = false;
                });
                setFormData(initialData);
            }
            setLoading(false);
        };

        fetchConfig();
    }, [id]);

    // 2. Handle Inputs
    const handleChange = (id: string, value: any) => {
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    // 3. Generic Submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!eventConfig) return;
        setSubmitting(true);

        const { error } = await supabase
            .from('generic_registrations')
            .insert([{
                event_id: eventConfig.id,
                submission_data: formData
            }]);

        setSubmitting(false);
        if (!error) setSuccess(true);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    // --- RENDERERS ---

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
    );

    if (!eventConfig) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center p-10 bg-white rounded-xl shadow-lg">
                <h2 className="text-xl font-bold text-gray-800">Event not found</h2>
                <p className="text-gray-500 mt-2">The event you are looking for does not exist or has been removed.</p>
            </div>
        </div>
    );

    if (success) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full border-t-4 border-green-500">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
                <p className="text-gray-600 mb-6">We have received your entry for <span className="font-semibold text-gray-900">{eventConfig.title}</span>.</p>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-500">
                    You should receive a confirmation email shortly.
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
                {/* Header Section */}
                <div className="bg-[#1a1f4e] p-8 md:p-12 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#f5a623] opacity-10 rounded-full -ml-24 -mb-24 blur-2xl"></div>

                    <div className="relative z-10">
                        <div className="inline-block px-3 py-1 bg-[#f5a623] text-[#1a1f4e] text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                            Registration Open
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">{eventConfig.title}</h1>

                        {eventConfig.short_description && (
                            <p className="text-lg text-blue-100 mb-8 max-w-2xl leading-relaxed opacity-90">
                                {eventConfig.short_description}
                            </p>
                        )}

                        <div className="flex flex-wrap gap-6 text-sm font-medium">
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                                <Calendar className="w-4 h-4 text-[#f5a623]" />
                                <span>{formatDate(eventConfig.event_date)}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                                <Clock className="w-4 h-4 text-[#f5a623]" />
                                <span>{formatTime(eventConfig.event_date)}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                                <MapPin className="w-4 h-4 text-[#f5a623]" />
                                <span>{eventConfig.location}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white">
                    {eventConfig.form_schema.map((field) => {
                        // Dynamic Field Rendering Logic
                        const isFullWidth = field.width === 'full' || field.type === 'header' || field.type === 'checkbox' || field.type === 'radio';
                        const colSpan = isFullWidth ? 'md:col-span-2' : 'md:col-span-1';

                        // A. HEADER TYPE
                        if (field.type === 'header') {
                            return (
                                <div key={field.id} className={`mt-6 mb-2 border-b border-gray-100 pb-3 ${colSpan}`}>
                                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                        <div className="w-1 h-6 bg-[#f5a623] rounded-full"></div>
                                        {field.label}
                                    </h3>
                                </div>
                            );
                        }

                        // B. CHECKBOX TYPE
                        if (field.type === 'checkbox') {
                            return (
                                <div key={field.id} className={`${colSpan} bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors`}>
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <div className="flex items-center h-5 mt-0.5">
                                            <input
                                                type="checkbox"
                                                id={field.id}
                                                required={field.required}
                                                checked={formData[field.id] || false}
                                                onChange={(e) => handleChange(field.id, e.target.checked)}
                                                className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 transition duration-200"
                                            />
                                        </div>
                                        <div className="text-sm text-gray-700 select-none">
                                            <span className="font-medium text-gray-900">{field.label}</span>
                                            {field.required && <span className="text-red-500 ml-1">*</span>}
                                        </div>
                                    </label>
                                </div>
                            );
                        }

                        // C. RADIO TYPE
                        if (field.type === 'radio') {
                            return (
                                <div key={field.id} className={colSpan}>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        {field.label} {field.required && <span className="text-red-500">*</span>}
                                    </label>
                                    <div className="flex flex-wrap gap-3">
                                        {field.options?.map(opt => (
                                            <label key={opt} className={`group relative flex items-center justify-center px-4 py-3 border rounded-xl cursor-pointer transition-all duration-200 ${formData[field.id] === opt
                                                ? 'bg-[#1a1f4e] border-[#1a1f4e] text-white shadow-md'
                                                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                                                }`}>
                                                <input
                                                    type="radio"
                                                    name={field.id}
                                                    value={opt}
                                                    checked={formData[field.id] === opt}
                                                    onChange={(e) => handleChange(field.id, e.target.value)}
                                                    className="sr-only"
                                                />
                                                <span className="font-medium">{opt}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            );
                        }

                        // D. STANDARD INPUTS (Text, Email, Tel)
                        return (
                            <div key={field.id} className={colSpan}>
                                <label htmlFor={field.id} className="block text-sm font-semibold text-gray-700 mb-2">
                                    {field.label} {field.required && <span className="text-red-500">*</span>}
                                </label>
                                <input
                                    type={field.type}
                                    id={field.id}
                                    required={field.required}
                                    value={formData[field.id] || ''}
                                    onChange={(e) => handleChange(field.id, e.target.value)}
                                    className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#f5a623] focus:border-[#f5a623] outline-none transition-all duration-200 bg-gray-50 focus:bg-white placeholder-gray-400"
                                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                                />
                            </div>
                        );
                    })}

                    <div className="md:col-span-2 pt-8 mt-4 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-[#1a1f4e] text-white font-bold py-4 rounded-xl hover:bg-[#2a2f5e] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 text-lg transform hover:-translate-y-0.5 active:translate-y-0"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="animate-spin w-5 h-5" />
                                    <span>Processing...</span>
                                </>
                            ) : (
                                'Submit Registration'
                            )}
                        </button>
                        <p className="text-center text-xs text-gray-400 mt-4">
                            By submitting this form, you agree to our terms and conditions.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DynamicEventForm;