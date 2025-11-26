import { Calendar, MapPin } from "lucide-react";
import { useParams } from "react-router-dom";
import a from '../images/a.webp';

export default function TeamPage() {
    const { type } = useParams();

    const teams = {
        "15s": {
            title: "15s Rugby",
            banner: "/images/teams/15s.webp",
            short:
                "Dubai Tuskers RFC proudly competes in full-contact 15-a-side rugby, representing the club in the UAE Rugby League (Division 2). This format showcases structure, discipline, and teamwork — the classic heart of world rugby.",
            description:
                "15s rugby demands strategy, physicality, and unity. Our squad brings intensity, intelligence, and brotherhood to every match as we progress through the UAE rugby ecosystem. This is the battlefield where every phase counts.",
            highlights: [
                "🏆 Expanding beyond 7s into traditional 15-a-side rugby",
                "🌍 Developing players across all positions",
                "💪 High-performance culture for long-term growth",
                "👥 Strong community presence in UAE rugby"
            ],
            training: {
                schedule: "Tuesday & Thursday – 7:00 PM to 9:00 PM",
                location: "Al Barsha Sports Complex",
                coach: "Head Coach Mark Thompson"
            },
            schedule: [
                { day: "Tuesday", time: "19:00 - 21:00", activity: "Senior Team Training", location: "Dubai Sports City" },
                { day: "Thursday", time: "19:00 - 21:00", activity: "Full Squad Training", location: "Dubai Sports City" },
                { day: "Saturday", time: "09:00 - 11:00", activity: "Touch Rugby & Skills Session", location: "Dubai Sports City" },
                { day: "Saturday/Sunday", time: "TBD", activity: "Match Days", location: "Various Venues" }
            ]
        },

        "10s": {
            title: "10s Rugby",
            banner: "/images/teams/10s.webp",
            short:
                "A fast, explosive format that blends the structure of 15s with the speed of 7s. Our 10s squad thrives on agility, handling, and open-field movement.",
            description:
                "10s rugby rewards pace, intelligent support lines, and quick decision-making. The squad competes across UAE tournaments and serves as a development pathway toward our elite 7s program.",
            highlights: [
                "High-tempo matches with quick transitions",
                "Focus on tactical movement and handling skills",
                "Regular participation in UAE 10s tournaments",
                "Ideal stepping stone into elite 7s rugby"
            ],
            training: {
                schedule: "Wednesday – 7:30 PM to 9:00 PM",
                location: "Al Barsha Sports Complex",
                coach: "Coach Jamie Lewis"
            },
            schedule: [
                { day: "Tuesday", time: "19:00 - 21:00", activity: "Senior Team Training", location: "Dubai Sports City" },
                { day: "Thursday", time: "19:00 - 21:00", activity: "Full Squad Training", location: "Dubai Sports City" },
                { day: "Saturday", time: "09:00 - 11:00", activity: "Touch Rugby & Skills Session", location: "Dubai Sports City" },
                { day: "Saturday/Sunday", time: "TBD", activity: "Match Days", location: "Various Venues" }
            ]
        },

        "7s": {
            title: "7s Rugby",
            banner: "/images/teams/7s.webp",
            short:
                "High-speed, high-intensity, elite-level rugby. Our 7s squad represents Dubai Tuskers RFC in major tournaments including the Dubai 7s.",
            description:
                "Rugby 7s demands explosive pace, elite conditioning, and tactical precision. The Tuskers 7s team competes at a high standard across UAE tournaments while developing players for international-level opportunities.",
            highlights: [
                "Elite conditioning and speed-focused training",
                "Advanced tactical systems built around space and movement",
                "Participation in top UAE 7s competitions",
                "Specialized skills, agility, and strength programs"
            ],
            training: {
                schedule: "Tuesday & Thursday – 7:00 PM to 9:00 PM",
                location: "Dubai Sports City",
                coach: "COO & Coaching Director Jason Brown"
            },
            schedule: [
                { day: "Tuesday", time: "19:00 - 21:00", activity: "Senior Team Training", location: "Dubai Sports City" },
                { day: "Thursday", time: "19:00 - 21:00", activity: "Full Squad Training", location: "Dubai Sports City" },
                { day: "Saturday", time: "09:00 - 11:00", activity: "Touch Rugby & Skills Session", location: "Dubai Sports City" },
                { day: "Saturday/Sunday", time: "TBD", activity: "Match Days", location: "Various Venues" }
            ]
        },

        "touch": {
            title: "Touch Rugby",
            banner: "/images/teams/touch.webp",
            short:
                "A fast, social, non-contact format of rugby perfect for fitness, agility, and teamwork. Inclusive, welcoming, and open to all levels.",
            description:
                "Touch Rugby builds speed, coordination, and strategy without physical tackling. It’s a core part of Tuskers culture — ideal for beginners, mixed teams, or players looking to sharpen their running and handling skills.",
            highlights: [
                "Non-contact and beginner-friendly",
                "Great for fitness, agility, and game IQ",
                "Regular tournaments and social matches",
                "Inclusive mixed-team environment"
            ],
            training: {
                schedule: "Friday – 6:30 PM to 8:00 PM",
                location: "Dubai College Grounds",
                coach: "Coach Maria Lopez"
            },
            schedule: [
                { day: "Tuesday", time: "19:00 - 21:00", activity: "Senior Team Training", location: "Dubai Sports City" },
                { day: "Thursday", time: "19:00 - 21:00", activity: "Full Squad Training", location: "Dubai Sports City" },
                { day: "Saturday", time: "09:00 - 11:00", activity: "Touch Rugby & Skills Session", location: "Dubai Sports City" },
                { day: "Saturday/Sunday", time: "TBD", activity: "Match Days", location: "Various Venues" }
            ]
        }
    };


    const t = teams[type];

    return (
        <div className="font-rajdhani">
            {/* Banner */}
            <section className="relative h-[400px] bg-[#0f1229]">
                <img
                    src={a}
                    alt={t.title}
                    className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f1229]/90 to-[#1a1f4e]/50"></div>

                <div className="absolute bottom-10 left-10">
                    <h1 className="text-6xl font-extrabold text-white uppercase tracking-wide">
                        🏉 Dubai Tuskers RFC - {t.title}
                    </h1>
                </div>
            </section>

            {/* About Section */}
            <section className="py-10 bg-white">
                <div className="max-w-6xl mx-auto px-6 pb-10">
                    <h2 className="text-4xl font-bold uppercase tracking-wide text-[#f5a623]">
                        Pushing Forward, One Phase at a Time
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        {t.short}
                    </p>
                </div>
                <div className="max-w-6xl mx-auto px-6 pb-10">
                    <h2 className="text-4xl font-bold uppercase tracking-wide text-[#f5a623]">
                        What {t.title} Means to Us
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        {t.description}
                    </p>
                </div>
            </section>

            {/* Highlights */}
            <section className="py-20 bg-[#0f1229] text-white">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-4xl font-bold mb-10 uppercase tracking-wide text-[#f5a623]">
                        Why We’re Competing in {t.title}
                    </h2>

                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {t.highlights.map((h, i) => (
                            <li
                                key={i}
                                className="p-6 border border-white/20 bg-white/5 hover:bg-white/10 transition-all text-lg"
                            >
                                {h}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Training Info */}
            <section className="py-10 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-4xl font-bold mb-10 uppercase tracking-wide text-[#1a1f4e]">
                        Training & Team Ethos
                    </h2>
                    <p className="text-gray-700">Our {t.title} squad trains weekly under the guidance of COO & Coaching Director Jason Brown, with a focus on tactical preparation, physical conditioning, and team unity. Every player is valued — whether you’re a seasoned lock or a new winger – because we play as one.</p>
                </div>
            </section >
            <div className="max-w-6xl mx-auto my-8">
                <h2 className="text-4xl font-bold mb-10 uppercase tracking-wide text-[#1a1f4e]">
                    Training Schedule
                </h2>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto border border-[#1a1f4e]">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-[#1a1f4e] to-[#2a2f5e] text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left font-bold">Day</th>
                                    <th className="px-6 py-4 text-left font-bold">Time</th>
                                    <th className="px-6 py-4 text-left font-bold">Activity</th>
                                    <th className="px-6 py-4 text-left font-bold">Location</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {t.schedule.map((session, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-5 w-5 text-[#f5a623]" />
                                                <span className="font-semibold text-[#1a1f4e]">
                                                    {session.day}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">
                                            {session.time}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {session.activity}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <MapPin className="h-4 w-4 text-[#f5a623]" />
                                                {session.location}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    );
}
