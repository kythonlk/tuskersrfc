import { CheckCircle2, Users, Trophy, Target, Heart, ArrowRight, TrendingUp, Activity, Shield, Award, Star, DollarSign, Gift, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

// Local images
import heroImage from '../images/BuildStrengthSkillBrotherhood.webp';
import missionImage from '../images/OurMission.webp';
import philosophyImage from '../images/OurPhilosophy.webp';
import ageGroupsImage from '../images/AgeGroups.webp';
import gymPhysioImage from '../images/GymPhysio.webp';
import stashImage from '../images/Stash.webp';
import dubai7sImage from '../images/Dubai7s.webp';

export default function Academy() {
  const ageGroups = [
    { group: 'U4 – U6', fee: 'AED 1,500' },
    { group: 'U7 – U8', fee: 'AED 1,700' },
    { group: 'U9 – U11', fee: 'AED 2,500' },
    { group: 'U12 – U13', fee: 'AED 2,800' },
    { group: 'U14 – U16', fee: 'AED 3,000' },
    { group: 'U17 – U18', fee: 'AED 3,500' },
  ];

  const coreValues = ['Respect', 'Discipline', 'Teamwork', 'Integrity'];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Academy | Dubai Tuskers RFC"
        description="Join Dubai Tuskers RFC Academy. Youth rugby programs from U4 to U18. Professional coaching, player development tracking, and pathways to elite rugby."
        keywords="rugby academy dubai, youth rugby dubai, kids rugby training, junior rugby uae"
      />

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={stashImage} alt="Dubai Tuskers Academy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f4e] via-[#1a1f4e]/70 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Dubai Tuskers RFC Academy</h1>
          <div className="w-24 h-1 bg-[#f5a623] mx-auto mb-6" />
          <p className="text-2xl md:text-3xl font-semibold text-[#f5a623] mb-4">Build Strength. Skill. Brotherhood.</p>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8">
            Developing the next generation of rugby players in the UAE through skill development, fitness, discipline, and team culture.
          </p>
          <Link
            to="/membership-register?type=academy"
            className="inline-flex items-center gap-2 bg-[#f5a623] hover:bg-[#e09513] text-[#1a1f4e] px-8 py-4 font-bold text-lg transition-all hover:scale-105"
          >
            Join the Tuskers Family <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Mission & Philosophy Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Mission */}
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg">
              <img src={missionImage} alt="Our Mission" className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-6 w-6 text-[#f5a623]" />
                  <h2 className="text-2xl font-bold text-[#1a1f4e]">Our Mission</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  Create a high-performance rugby environment developing players physically, mentally, and socially.
                </p>
                <div className="flex flex-wrap gap-2">
                  {coreValues.map((value) => (
                    <span key={value} className="bg-[#1a1f4e] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Philosophy */}
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg">
              <img src={philosophyImage} alt="Our Philosophy" className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="h-6 w-6 text-[#f5a623]" />
                  <h2 className="text-2xl font-bold text-[#1a1f4e]">Our Philosophy</h2>
                </div>
                <p className="text-[#f5a623] font-semibold text-lg mb-2">Player development and enjoyment come first.</p>
                <p className="text-gray-700">
                  We are not driven by profit — we are driven by a passion to grow rugby and support every player's journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Age Groups & Pricing */}
      <section className="py-16 bg-[#1a1f4e] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-8 w-8 text-[#f5a623]" />
                  <h2 className="text-3xl font-bold">Age Groups & Pricing</h2>
                </div>
                <div className="w-20 h-1 bg-[#f5a623] mb-6" />
                
                <div className="space-y-3">
                  {ageGroups.map((age) => (
                    <div key={age.group} className="flex items-center justify-between bg-white/10 backdrop-blur rounded-lg px-4 py-3">
                      <span className="font-semibold">{age.group}</span>
                      <span className="bg-[#f5a623] text-[#1a1f4e] px-3 py-1 rounded-full font-bold text-sm">
                        {age.fee}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-[#f5a623]/20 rounded-lg border border-[#f5a623]/30">
                  <div className="flex items-start gap-3">
                    <DollarSign className="h-5 w-5 text-[#f5a623] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#f5a623]">Flexible Payment</p>
                      <p className="text-sm text-gray-300">Fees can be paid in installments. Sibling discount: 20% off.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img src={ageGroupsImage} alt="Age Groups" className="rounded-xl shadow-2xl w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training & Development */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Sparkles className="h-10 w-10 text-[#f5a623] mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-[#1a1f4e]">Training Programs</h2>
              <div className="w-24 h-1 bg-[#f5a623] mx-auto mt-4" />
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { title: 'Grassroots', desc: 'U4-U8: Intro to Rugby / Fun Development' },
                { title: 'Development', desc: 'U9-U13: Foundation Skills & Game Awareness' },
                { title: 'Performance', desc: 'U14-U18: Advanced Skills & Competitive Rugby' }
              ].map((program) => (
                <div key={program.title} className="bg-gray-50 rounded-xl p-6 border-l-4 border-[#f5a623]">
                  <h3 className="text-xl font-bold text-[#1a1f4e] mb-2">{program.title}</h3>
                  <p className="text-gray-600">{program.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#1a1f4e] rounded-xl p-8 text-white">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-[#f5a623]" />
                    Player Development Tracking
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#f5a623]" />
                      <span>Individual performance monitoring</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#f5a623]" />
                      <span>Personalized feedback</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#f5a623]" />
                      <span>Position-specific coaching</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#f5a623]" />
                      <span>Special development sessions</span>
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="bg-[#f5a623] text-[#1a1f4e] rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                    <Trophy className="h-12 w-12" />
                  </div>
                  <p className="text-2xl font-bold text-[#f5a623]">Highest Training Exposure</p>
                  <p className="text-gray-300">More sessions per week than any Dubai academy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support & Kit */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Gym & Physio */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img src={gymPhysioImage} alt="Gym and Physio" className="w-full h-60 object-cover" />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Activity className="h-6 w-6 text-[#f5a623]" />
                    <h3 className="text-xl font-bold text-[#1a1f4e]">Performance & Support</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#f5a623] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Free Physio Consultation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#f5a623] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Gym & Strength Training Guidance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#f5a623] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Injury prevention & recovery support</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Stash Pack */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img src={stashImage} alt="Academy Kit" className="w-full h-60 object-cover" />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Gift className="h-6 w-6 text-[#f5a623]" />
                    <h3 className="text-xl font-bold text-[#1a1f4e]">Academy Kit Included</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {['Training T-Shirt', 'Polo Shirt', 'Hoodie', 'Shorts', 'Cap', 'Backpack'].map((item) => (
                      <div key={item} className="flex items-center gap-2 bg-gray-50 rounded px-3 py-2">
                        <CheckCircle2 className="h-4 w-4 text-[#f5a623]" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Parent Benefits */}
            <div className="mt-8 bg-[#f5a623]/10 rounded-xl p-6 border border-[#f5a623]/30">
              <div className="flex items-start gap-4">
                <Users className="h-6 w-6 text-[#f5a623] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-[#1a1f4e] mb-1">Parent Membership Benefits</h4>
                  <p className="text-gray-700 text-sm">
                    Complimentary Club Supporter Membership for both parents with exclusive partner discounts and event invitations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Elite Opportunities */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={dubai7sImage} alt="Dubai 7s" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1a1f4e]/90" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Trophy className="h-16 w-16 text-[#f5a623] mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">Elite Playing Opportunities</h2>
            <div className="w-24 h-1 bg-[#f5a623] mx-auto mb-8" />
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#f5a623] mb-3">Emirates Dubai Rugby 7s</h3>
                <p className="text-gray-300">
                  Selected players represent Dubai Tuskers RFC at the prestigious Emirates Dubai Rugby 7s, one of the world's biggest rugby events.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#f5a623] mb-3">UAE Rugby League</h3>
                <p className="text-gray-300">
                  Direct pathway to Dubai Tuskers RFC squads competing in the UAE Rugby League, progressing into competitive senior rugby.
                </p>
              </div>
            </div>

            <Link
              to="/membership-register?type=academy"
              className="inline-flex items-center gap-2 bg-[#f5a623] hover:bg-[#e09513] text-[#1a1f4e] px-8 py-4 font-bold text-lg transition-all hover:scale-105"
            >
              Start Your Journey <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
