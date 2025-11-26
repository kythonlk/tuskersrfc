import { Trophy, Users, Eye, Target, Mail, Phone } from 'lucide-react';

export default function Sponsorship() {
  const benefits = [
    {
      icon: Eye,
      title: 'Brand Visibility',
      description:
        'Logo placement on team kits, banners, and digital platforms',
    },
    {
      icon: Users,
      title: 'Community Engagement',
      description: 'Connect with a diverse, active community of rugby enthusiasts',
    },
    {
      icon: Trophy,
      title: 'Tournament Exposure',
      description: 'Visibility at major tournaments and competitive events',
    },
    {
      icon: Target,
      title: 'Marketing Opportunities',
      description: 'Social media features, event sponsorships, and PR opportunities',
    },
  ];

  const tiers = [
    {
      name: 'Platinum Partner',
      color: 'from-gray-400 to-gray-600',
      benefits: [
        'Primary logo placement on match and training kits',
        'Prominent branding at all events and matches',
        'Exclusive naming rights opportunities',
        'Featured sponsor on website and social media',
        'VIP hospitality packages for all home matches',
        'Direct marketing access to club database',
        'Board representation and strategic input',
      ],
    },
    {
      name: 'Gold Sponsor',
      color: 'from-yellow-400 to-yellow-600',
      benefits: [
        'Logo on match kits',
        'Banner display at home matches',
        'Website homepage featuring',
        'Social media promotion',
        'Match day hospitality (4 guests)',
        'Quarterly newsletter features',
      ],
    },
    {
      name: 'Silver Sponsor',
      color: 'from-gray-300 to-gray-500',
      benefits: [
        'Logo on training kits',
        'Website sponsor page listing',
        'Social media mentions',
        'Match day tickets (2 guests)',
        'Email marketing inclusion',
      ],
    },
    {
      name: 'Bronze Supporter',
      color: 'from-orange-400 to-orange-600',
      benefits: [
        'Logo on website',
        'Social media acknowledgment',
        'Newsletter mentions',
        'Community appreciation',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-[#1a1f4e] to-[#2a2f5e] text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Sponsorship Opportunities
          </h1>
          <div className="w-24 h-1 bg-[#f5a623] mx-auto mb-8"></div>
          <p className="text-xl text-center text-gray-300 max-w-3xl mx-auto">
            Partner with Dubai Tuskers RFC and be part of our growing success story
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1a1f4e] mb-4">
                Why Sponsor Us?
              </h2>
              <div className="w-24 h-1 bg-[#f5a623] mx-auto mb-6"></div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Dubai Tuskers RFC is a rapidly growing rugby club with a strong
                community presence and competitive success. By partnering with us,
                your brand gains exposure to an engaged, diverse audience while
                supporting the development of rugby in the UAE.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-[#1a1f4e] to-[#2a2f5e] rounded-xl shadow-lg p-6 text-white hover:shadow-2xl transition-all transform hover:-translate-y-2"
                  >
                    <div className="bg-[#f5a623] w-14 h-14 rounded-full flex items-center justify-center mb-4">
                      <Icon className="h-7 w-7 text-[#1a1f4e]" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                    <p className="text-gray-300">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* <section className="py-16 bg-[#1a1f4e]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Sponsorship Tiers
            </h2>
            <div className="w-24 h-1 bg-[#f5a623] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {tiers.map((tier, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2"
              >
                <div
                  className={`bg-gradient-to-r ${tier.color} p-6 text-white text-center`}
                >
                  <h3 className="text-2xl font-bold">{tier.name}</h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {tier.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#f5a623] mt-1">✓</span>
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-[#1a1f4e] to-[#2a2f5e] rounded-xl shadow-2xl p-8 md:p-12 text-white">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  Custom Sponsorship Packages
                </h2>
                <div className="w-24 h-1 bg-[#f5a623] mx-auto mb-6"></div>
                <p className="text-lg text-gray-300">
                  We understand that every business has unique needs. We're happy
                  to create a custom sponsorship package tailored to your
                  objectives and budget.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-4 text-[#f5a623]">
                    Event Sponsorship
                  </h3>
                  <p className="text-gray-300">
                    Sponsor specific tournaments, matches, or social events for
                    targeted exposure
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-4 text-[#f5a623]">
                    Equipment Sponsorship
                  </h3>
                  <p className="text-gray-300">
                    Provide kits, training equipment, or facilities in exchange
                    for branding
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-4 text-[#f5a623]">
                    Team Sponsorship
                  </h3>
                  <p className="text-gray-300">
                    Sponsor a specific team within our club structure
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-4 text-[#f5a623]">
                    Digital Partnership
                  </h3>
                  <p className="text-gray-300">
                    Focus on social media, website, and digital marketing
                    collaboration
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="py-16 bg-gradient-to-br from-[#f5a623] to-[#ffc043]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1f4e] mb-6">
              Become a Sponsor Today
            </h2>
            <p className="text-lg text-[#1a1f4e] mb-8">
              Join us in building a stronger rugby community in Dubai. Contact us
              to discuss how we can create a partnership that benefits your brand
              and our club.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@dubaituskers.com"
                className="inline-flex items-center gap-2 bg-[#1a1f4e] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#2a2f5e] transition-colors shadow-lg"
              >
                <Mail className="h-5 w-5" />
                Email Us
              </a>
              <a
                href="tel:+971521329719"
                className="inline-flex items-center gap-2 bg-white text-[#1a1f4e] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                <Phone className="h-5 w-5" />
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
