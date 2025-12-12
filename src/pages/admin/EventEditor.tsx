import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Save, ArrowLeft, Loader2, Image, Code } from 'lucide-react';

export default function EventEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = !id;

    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);

    // Form States
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [formSchema, setFormSchema] = useState('[]');

    useEffect(() => {
        if (!isNew) {
            fetchEvent();
        } else {
            // Default Schema
            setFormSchema(JSON.stringify([
                { id: "full_name", type: "text", label: "Full Name", required: true, width: "full" },
                { id: "email", type: "email", label: "Email Address", required: true, width: "full" },
                { id: "phone", type: "tel", label: "Phone Number", required: true, width: "full" }
            ], null, 2));
        }
    }, [id]);

    const fetchEvent = async () => {
        const { data } = await supabase
            .from('events')
            .select('*')
            .eq('id', id)
            .single();

        if (data) {
            setTitle(data.title);
            // Convert to input friendly date format (YYYY-MM-DDTHH:MM)
            const d = new Date(data.event_date);
            d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
            setDate(d.toISOString().slice(0, 16));

            setLocation(data.location || '');
            setDescription(data.description || '');
            setShortDescription(data.short_description || '');
            setImageUrl(data.image_url || '');
            setFormSchema(JSON.stringify(data.form_schema || [], null, 2));
        }
        setLoading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            // Validate JSON
            let parsedSchema;
            try {
                parsedSchema = JSON.parse(formSchema);
            } catch (e) {
                alert('Invalid JSON Schema');
                setSaving(false);
                return;
            }

            const payload = {
                title,
                event_date: new Date(date).toISOString(),
                location,
                description,
                short_description: shortDescription,
                image_url: imageUrl,
                form_schema: parsedSchema
            };

            let error;
            if (isNew) {
                const { error: insertError } = await supabase.from('events').insert([payload]);
                error = insertError;
            } else {
                const { error: updateError } = await supabase.from('events').update(payload).eq('id', id);
                error = updateError;
            }

            if (error) throw error;
            navigate('/admin/events');

        } catch (err: any) {
            console.error(err);
            alert('Error saving event: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate('/admin/events')}
                    className="p-2 rounded-full hover:bg-white transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-3xl font-bold text-[#1a1f4e]">
                    {isNew ? 'Create New Event' : 'Edit Event'}
                </h1>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
                {/* Main Info Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
                    <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">Event Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Event Title</label>
                            <input
                                required
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Date & Time</label>
                            <input
                                required
                                type="datetime-local"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none"
                                value={date}
                                onChange={e => setDate(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                            <input
                                required
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none"
                                value={location}
                                onChange={e => setLocation(e.target.value)}
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
                            <div className="flex gap-2">
                                <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg shrink-0">
                                    <Image className="w-5 h-5 text-gray-500" />
                                </span>
                                <input
                                    type="url"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none"
                                    placeholder="https://..."
                                    value={imageUrl}
                                    onChange={e => setImageUrl(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Short Description (Summary)</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none"
                                value={shortDescription}
                                onChange={e => setShortDescription(e.target.value)}
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Description</label>
                            <textarea
                                rows={4}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Form Schema Editor */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4 border-b pb-2">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <Code className="w-5 h-5 text-[#f5a623]" />
                            Registration Form Schema (JSON)
                        </h2>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Advanced</span>
                    </div>

                    <p className="text-sm text-gray-500 mb-4">
                        Define the fields for the registration form. Use standard JSON format.
                    </p>
                    <textarea
                        rows={10}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none font-mono text-sm bg-gray-50"
                        value={formSchema}
                        onChange={e => setFormSchema(e.target.value)}
                    />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/events')}
                        className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-8 py-3 rounded-xl bg-[#1a1f4e] text-white font-bold hover:bg-[#2a2f5e] transition-colors shadow-lg flex items-center gap-2"
                    >
                        {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        {isNew ? 'Create Event' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}
