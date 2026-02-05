import { CheckCircle2, Users, Trophy, Heart, Calendar, ArrowRight } from 'lucide-react';
import a from '../images/DT_15s.webp';
import b from '../images/DT_touch.webp';
import c from '../images/WR.webp';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Membership() {
  const memberships = [
    {
      label: "Men’s Rugby",
      age: "18 YEARS AND UP",
      price: "AED 1,500",
      image: a,
      type: "men",
      perks: [
        "One-year club membership",
        "Weekly training and fitness sessions led by experienced coaches",
        "Free entry to the Dubai 7s tournament",
        "20% discount on all Dubai Tuskers merchandise",
        "15% discount on Dubai Tuskers events",
        "Free family entry to all Dubai Tuskers social gatherings",
        "All playing kit, organized coaching, insurance included",
      ],
      whatWePlay: "UAE Division & Emirates Dubai 7s",
    },
    {
      label: "Womens’s Rugby",
      age: "18 YEARS AND UP",
      price: "AED 1,250",
      image: c,
      type: "women",
      perks: [
        "One-year club membership",
        "Weekly training and fitness sessions led by experienced coaches",
        "Free entry to the Dubai 7s tournament",
        "20% discount on all Dubai Tuskers merchandise",
        "15% discount on Dubai Tuskers events",
        "Free family entry to all Dubai Tuskers social gatherings",
        "All playing kit, organized coaching, insurance included",
        "25% discount for the member plus 3 persons on McG's by McGettigan's Barsha",
      ],
      whatWePlay: "UAE Divisions & Emirates Dubai 7s",
    },
    {
      label: "Social Touch Rugby",
      age: "16 YEARS AND UP",
      price: "AED 500",
      image: b,
      type: "touch",
      perks: [
        "One-year club membership",
        "Weekly training & fun social sessions",
        "15% discount on Dubai Tuskers events",
        "Free family entry to all Dubai Tuskers social gatherings",
        "20% discount on all Dubai Tuskers merchandise",
        "Free entry to the Dubai 7s tournament",
        "Official Dubai Tuskers singlet",
        "25% discount for the member plus 3 persons on McG's by McGettigan's Barsha",
      ],
      whatWePlay: "UAE Touch Rugby Tournaments",
    },
    {
      label: "Supporter Membership",
      age: "",
      price: "AED 375",
      image: b,
      type: "supporter",
      perks: [
        "One-year club membership",
        "25% discount for the member plus 3 persons on McG's by McGettigan's Barsha",
        "10% discount on Dubai Tuskers events",
        "Free family entry to all Dubai Tuskers social gatherings",
        "10% discount on all Dubai Tuskers merchandise",
        "Official Dubai Tuskers Polo Tshirt",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Membership"
        description="Join Dubai Tuskers RFC. Men's, Women's and Touch Rugby memberships available. Competitive pricing and great benefits."
        keywords="rugby membership dubai, join rugby club, dubai tuskers fees, rugby club dubai prices"
      />
      <section className="bg-gradient-to-br from-[#1a1f4e] to-[#2a2f5e] text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Membership
          </h1>
          <div className="w-24 h-1 bg-[#f5a623] mx-auto mb-8"></div>
          <p className="text-xl text-center text-gray-300 max-w-3xl mx-auto">
            Join the Tuskers family and be part of something special
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="px-4 md:mx-20 lg:mx-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 ms:mx-20">
            {memberships.map((m, index) => (
              <Link
                key={index}
                to={`/membership-reg?type=${m.type}`}
                className="border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white hover:-translate-y-2"
              >
                <div className="relative h-48 sm:h-56 md:h-80 overflow-hidden">
                  <img
                    src={m.image}
                    alt={m.label}
                    className="w-full h-full object-cover transform transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#f5a623] text-[#1a1f4e] text-xs sm:text-sm px-3 py-1 font-semibold shadow-md">
                    {m.age}
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#1a1f4e] mb-2">
                    {m.label}
                  </h3>

                  <p className="text-[#f5a623] text-3xl sm:text-4xl font-extrabold mb-1">
                    {m.price}
                  </p>

                  <h4 className="text-base sm:text-lg font-semibold text-[#1a1f4e] mb-3">
                    Membership Benefits
                  </h4>

                  <ul className="space-y-2 mb-6">
                    {m.perks.map((perk, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-[#f5a623] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{perk}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t pt-4">
                    {m.whatWePlay && (
                      <p className="text-xs sm:text-sm text-gray-500 mb-1 font-semibold">
                        What we play
                      </p>
                    )}
                    <p className="text-[#1a1f4e] font-bold text-sm sm:text-base">
                      {m.whatWePlay}
                    </p>
                  </div>

                  <button className="mt-6 sm:mt-8 w-full bg-[#1a1f4e] hover:bg-[#2a2f5e] text-white py-3 font-semibold flex items-center justify-center gap-2 transition-all">
                    Sign Up <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#1a1f4e]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#f5a623] mb-4">
                Why Join Dubai Tuskers RFC?
              </h2>
              <div className="w-24 h-1 bg-[#f5a623] mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {/* Card 1 */}
              <div className="bg-white rounded-xl shadow-xl p-6 border border-[#f5a623]/20">
                <Users className="h-10 w-10 text-[#f5a623] mb-4" />
                <h3 className="text-xl font-bold text-[#1a1f4e] mb-2">
                  Inclusive Community
                </h3>
                <p className="text-gray-700">
                  Join a diverse, welcoming community united by passion for rugby.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-xl shadow-xl p-6 border border-[#f5a623]/20">
                <Trophy className="h-10 w-10 text-[#f5a623] mb-4" />
                <h3 className="text-xl font-bold text-[#1a1f4e] mb-2">
                  Competitive Play
                </h3>
                <p className="text-gray-700">
                  Compete in tournaments and leagues across the UAE.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-xl shadow-xl p-6 border border-[#f5a623]/20">
                <Heart className="h-10 w-10 text-[#f5a623] mb-4" />
                <h3 className="text-xl font-bold text-[#1a1f4e] mb-2">
                  Expert Coaching
                </h3>
                <p className="text-gray-700">
                  Learn from experienced coaches and former international players.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-white rounded-xl shadow-xl p-6 border border-[#f5a623]/20">
                <Calendar className="h-10 w-10 text-[#f5a623] mb-4" />
                <h3 className="text-xl font-bold text-[#1a1f4e] mb-2">
                  Year-Round Activity
                </h3>
                <p className="text-gray-700">
                  Regular training, matches, and social events throughout the year.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
