import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase, type Sponsor } from '../lib/supabase';
import logo from '../images/logo.webp';
import lion from '../images/lion.webp';
import diddeniya from '../images/diddeniya.webp';
import spiderpluse from '../images/spiderplus.svg';
import thambapanni from '../images/thambapanni.webp';
import kibsons from '../images/kibsons.webp';

export default function Footer() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

  const sp = [
    { name: 'Lion', logo_url: lion, website_url: 'https://lionbeer.com/', },
    { name: 'Diddeniya', logo_url: diddeniya, website_url: 'https://diddeniya.com/' },
    { name: 'Spiderplus', logo_url: spiderpluse, website_url: 'https://spiderplus.com/' },
    { name: 'Thambapanni', logo_url: thambapanni, website_url: 'https://thambapanni.com/' },
    { name: 'Kibsons', logo_url: kibsons, website_url: 'https://kibsons.com/' },
  ]

  useEffect(() => {
    const fetchSponsors = async () => {
      const { data } = await supabase
        .from('sponsors')
        .select('*')
        .order('display_order', { ascending: true });

      if (data) {
        const mergedSponsors = [...data, ...sp];
        setSponsors(mergedSponsors);
      }
    };

    fetchSponsors();
  }, []);
  return (
    <footer className="bg-[#0f1235] text-white">
      {sponsors.length > 0 && (
        <div className="border-b border-gray-800">
          <div className="container mx-auto px-4 py-8">
            <h3 className="text-center text-3xl font-bold mb-6 text-[#f5a623]">
              OUR SPONSORS
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-items-center">
              {sponsors.map((sponsor) => (
                <a
                  href={sponsor.website_url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:shadow-xl rounded-lg transition-shadow w-full h-40 flex items-center justify-center"
                >
                  <img
                    src={sponsor.logo_url}
                    alt={sponsor.name}
                    className="w-full min-w-full h-auto max-h-40 object-cover bg-white rounded-lg px-4"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <img
              src={logo}
              alt="Dubai Tuskers RFC"
              className="h-16 w-auto mb-4 bg-white rounded-lg px-4"
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              Dubai Tuskers RFC is a premier rugby club in Dubai, founded by
              Dayan Diddeniya. We are committed to developing rugby talent and
              building a strong community through sport.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-[#f5a623]">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-[#f5a623] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#f5a623] transition-colors">
                  Membership
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#f5a623] transition-colors">
                  Fixtures & Results
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#f5a623] transition-colors">
                  Sponsorship
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#f5a623] transition-colors">
                  Policies & Documents
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-[#f5a623]">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="h-5 w-5 text-[#f5a623] flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:info@dubaituskers.com"
                  className="text-gray-400 hover:text-[#f5a623] transition-colors"
                >
                  info@dubaituskers.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-5 w-5 text-[#f5a623] flex-shrink-0 mt-0.5" />
                <a
                  href="tel:+971521329719"
                  className="text-gray-400 hover:text-[#f5a623] transition-colors"
                >
                  +971 52 132 9719
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-[#f5a623] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">Dubai, UAE</span>
              </li>
            </ul>

            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://www.facebook.com/dubaituskers"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1a1f4e] p-2 rounded-full hover:bg-[#f5a623] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/dubaituskers"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1a1f4e] p-2 rounded-full hover:bg-[#f5a623] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/dubaituskers"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1a1f4e] p-2 rounded-full hover:bg-[#f5a623] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/dubaituskers"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1a1f4e] p-2 rounded-full hover:bg-[#f5a623] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Dubai Tuskers RFC. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
