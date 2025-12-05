import { FileText, Shield, Users, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Policies() {
  const policies = [
    {
      icon: Shield,
      title: 'Code of Conduct',
      description:
        'Our club upholds the highest standards of behavior both on and off the field.',
      points: [
        'Respect for all players, coaches, referees, and spectators',
        'Zero tolerance for discrimination, harassment, or bullying',
        'Fair play and sportsmanship at all times',
        'Commitment to team values and club culture',
        'Adherence to UAE laws and rugby regulations',
      ],
    },
    {
      icon: Users,
      title: 'Player Welfare & Safety',
      description:
        'The safety and wellbeing of our players is our top priority.',
      points: [
        'Mandatory medical clearance for all playing members',
        'First aid provision at all training sessions and matches',
        'Comprehensive insurance coverage for players',
        'Age-appropriate training for junior members',
        'Qualified and certified coaches',
        'Emergency contact information maintained for all members',
      ],
    },
    {
      icon: AlertCircle,
      title: 'Disciplinary Procedures',
      description:
        'Clear procedures for addressing conduct issues and maintaining standards.',
      points: [
        'Fair and transparent investigation process',
        'Right to be heard and present evidence',
        'Graduated sanctions based on severity',
        'Appeal process available',
        'Confidentiality maintained throughout',
      ],
    },
    {
      icon: FileText,
      title: 'Membership Terms',
      description: 'Terms and conditions for club membership.',
      points: [
        'Annual membership fees as published',
        'Commitment to training attendance (playing members)',
        'Adherence to club policies and code of conduct',
        'Payment of match fees where applicable',
        'Notice period for membership cancellation',
        'Refund policy as per membership agreement',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-[#1a1f4e] to-[#2a2f5e] text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Policies & Documents
          </h1>
          <div className="w-24 h-1 bg-[#f5a623] mx-auto mb-8"></div>
          <p className="text-xl text-center text-gray-300 max-w-3xl mx-auto">
            Important information about club policies, procedures, and guidelines
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            {policies.map((policy, index) => {
              const Icon = policy.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="md:flex">
                    <div className="md:w-1/3 bg-gradient-to-br from-[#1a1f4e] to-[#2a2f5e] p-8 text-white flex flex-col justify-center">
                      <Icon className="h-16 w-16 text-[#f5a623] mb-4" />
                      <h2 className="text-2xl md:text-3xl font-bold mb-3">
                        {policy.title}
                      </h2>
                      <p className="text-gray-300">{policy.description}</p>
                    </div>
                    <div className="md:w-2/3 p-8">
                      <ul className="space-y-3">
                        {policy.points.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-[#f5a623] text-xl font-bold mt-1">
                              •
                            </span>
                            <span className="text-gray-700">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-[#1a1f4e] mb-8">
              Important Documents
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200 hover:border-[#f5a623] transition-colors">
                <FileText className="h-10 w-10 text-[#f5a623] mb-4" />
                <h3 className="text-xl font-bold text-[#1a1f4e] mb-2">
                  Membership Application Form
                </h3>
                <p className="text-gray-600 mb-4">
                  Complete this form to apply for membership
                </p>
                <Link
                  to="/membership"
                >
                  <button className="text-[#1a1f4e] font-semibold hover:text-[#f5a623] transition-colors">
                    Register →
                  </button>
                </Link>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200 hover:border-[#f5a623] transition-colors">
                <FileText className="h-10 w-10 text-[#f5a623] mb-4" />
                <h3 className="text-xl font-bold text-[#1a1f4e] mb-2">
                  Medical Clearance Form
                </h3>
                <p className="text-gray-600 mb-4">
                  Required for all playing members
                </p>
                <button className="text-[#1a1f4e] font-semibold hover:text-[#f5a623] transition-colors">
                  Download PDF →
                </button>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200 hover:border-[#f5a623] transition-colors">
                <FileText className="h-10 w-10 text-[#f5a623] mb-4" />
                <h3 className="text-xl font-bold text-[#1a1f4e] mb-2">
                  Club Constitution
                </h3>
                <p className="text-gray-600 mb-4">
                  Official club constitution and bylaws
                </p>
                <button className="text-[#1a1f4e] font-semibold hover:text-[#f5a623] transition-colors">
                  Download PDF →
                </button>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200 hover:border-[#f5a623] transition-colors">
                <FileText className="h-10 w-10 text-[#f5a623] mb-4" />
                <h3 className="text-xl font-bold text-[#1a1f4e] mb-2">
                  Safeguarding Policy
                </h3>
                <p className="text-gray-600 mb-4">
                  Our commitment to safeguarding all members
                </p>
                <button className="text-[#1a1f4e] font-semibold hover:text-[#f5a623] transition-colors">
                  Download PDF →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#f5a623]/10 border-l-4 border-[#f5a623] rounded-r-xl p-8">
              <h3 className="text-2xl font-bold text-[#1a1f4e] mb-4">
                Privacy & Data Protection
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Dubai Tuskers RFC is committed to protecting your personal
                information. We collect and process member data in accordance with
                UAE data protection regulations. Your information is used solely
                for club administration, communication, and member services.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                We will never share your personal information with third parties
                without your explicit consent, except where required by law or for
                essential club operations (such as insurance).
              </p>
              <a
                href="https://uaerugby.ae/resources/regulations/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1a1f4e] font-semibold hover:text-[#1a1f4e]/80 text-2xl transition-colors mt-4 bg-[#f5a623]/90 p-2 "
              >
                Read UAE Rugby FEDERATION official Policies and Regulations
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#1a1f4e] mb-6">
              Questions About Our Policies?
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              If you have any questions about our policies or need clarification
              on any procedures, please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@dubaituskers.com"
                className="inline-block bg-[#1a1f4e] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#2a2f5e] transition-colors shadow-lg"
              >
                Email Us
              </a>
              <a
                href="https://wa.me/971521329719"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#25D366] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#20BA5A] transition-colors shadow-lg"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
