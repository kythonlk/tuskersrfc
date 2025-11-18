import { Users, Calendar, MapPin, Trophy } from 'lucide-react';

export default function Teams() {
  const teams = [
    {
      name: 'Senior Men\'s Team',
      description: 'Our flagship team competing in 15s, 7s, and 10s formats',
      details: [
        'Competes in UAE Rugby League',
        'Emirates Dubai 7s participants',
        'Training 3 times per week',
        'Competitive matches every weekend',
      ],
    },
    {
      name: 'Development Squad',
      description: 'Building the next generation of Tuskers talent',
      details: [
        'Focus on skill development',
        'Structured coaching program',
        'Regular internal matches',
        'Pathway to senior team',
      ],
    },
    {
      name: 'Touch Rugby Team',
      description: 'Fast-paced, non-contact rugby for all abilities',
      details: [
        'Mixed-gender team',
        'Social and competitive leagues',
        'Perfect for beginners',
        'Fun and inclusive environment',
      ],
    },
  ];

  const schedule = [
    {
      day: 'Tuesday',
      time: '19:00 - 21:00',
      activity: 'Senior Team Training',
      location: 'Dubai Sports City',
    },
    {
      day: 'Thursday',
      time: '19:00 - 21:00',
      activity: 'Full Squad Training',
      location: 'Dubai Sports City',
    },
    {
      day: 'Saturday',
      time: '09:00 - 11:00',
      activity: 'Touch Rugby & Skills Session',
      location: 'Dubai Sports City',
    },
    {
      day: 'Saturday/Sunday',
      time: 'TBD',
      activity: 'Match Days',
      location: 'Various Venues',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-[#1a1f4e] to-[#2a2f5e] text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Our Teams
          </h1>
          <div className="w-24 h-1 bg-[#f5a623] mx-auto mb-8"></div>
          <p className="text-xl text-center text-gray-300 max-w-3xl mx-auto">
            Multiple teams catering to all skill levels and formats
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teams.map((team, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-[#f5a623] hover:shadow-2xl transition-all transform hover:-translate-y-2"
              >
                <div className="bg-gradient-to-br from-[#1a1f4e] to-[#2a2f5e] p-6 text-white">
                  <Users className="h-12 w-12 mb-4 text-[#f5a623]" />
                  <h3 className="text-2xl font-bold mb-2">{team.name}</h3>
                  <p className="text-gray-300">{team.description}</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {team.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Trophy className="h-5 w-5 text-[#f5a623] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#1a1f4e] mb-12">
            Training Schedule
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
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
                    {schedule.map((session, index) => (
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
            <div className="mt-8 bg-[#f5a623]/10 border-l-4 border-[#f5a623] p-6 rounded-r-lg">
              <p className="text-gray-700">
                <strong>Note:</strong> Training times may vary during match
                season. All members will be notified of any changes via WhatsApp
                group. Contact us for more information about specific training
                sessions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#1a1f4e] mb-6">
              Join a Team
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Whether you're an experienced player or completely new to rugby,
              we have a place for you in the Tuskers family. Join us for a trial
              session and experience the camaraderie and excitement of rugby.
            </p>
            <a
              href="https://wa.me/971521329719"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#25D366] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#20BA5A] transition-colors shadow-lg"
            >
              Contact Us on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}