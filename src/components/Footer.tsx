import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { supabase, type Sponsor } from '../lib/supabase';
import logo from '../images/logo.webp';
import lion from '../images/lion.webp';
import diddeniya from '../images/diddeniya.webp';
import spiderpluse from '../images/spiderplus.webp';
import thambapanni from '../images/thambapanni.webp';
import kibsons from '../images/kibsons.webp';
import SlipSafe from '../images/slipsafe.webp';

export default function Footer() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [current, setCurrent] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sponsors.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sponsors.length]);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setWidth(contentRef.current.scrollWidth);
    }
  }, [sponsors]);

  useEffect(() => {
    if (containerRef.current && width) {
      containerRef.current.style.setProperty('--loop-width', `${width + 5}px`);
    }
  }, [width]);


  const sp = [
    { name: 'Lion', logo_url: lion, website_url: 'https://www.lionbeer.com/', },
    { name: 'Diddeniya', logo_url: diddeniya, website_url: 'https://diddeniya.com/' },
    { name: 'Spiderplus', logo_url: spiderpluse, website_url: 'https://spiderplus.ae/' },
    { name: 'Thambapanni', logo_url: thambapanni, website_url: 'https://thambapanni.com/' },
    { name: 'Kibsons', logo_url: kibsons, website_url: 'https://kibsons.com/' },
    { name: 'Slip Safe', logo_url: SlipSafe, website_url: 'https://slipsafeme.com/' },
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
        <div className="border-b border-gray-800 overflow-hidden">
          <div className="container mx-auto px-4 py-8">
            <h3 className="text-center text-3xl font-bold mb-6 text-[#f5a623]">
              OUR SPONSORS
            </h3>
            <div className="relative overflow-hidden hidden md:block">
              <div
                ref={containerRef}
                className="flex gap-6"
                style={{
                  width: width ? width * 2 : 'auto',
                  animation: width ? `scrollLoop ${width / 50}s linear infinite` : '',
                }}
              >
                <div ref={contentRef} className="flex gap-6">
                  {sponsors.map((s, i) => (
                    <a key={i} href={sponsors[current].website_url || "#"} className="bg-white w-80 h-40 flex items-center justify-center flex-shrink-0">
                      <img src={s.logo_url} className="w-full h-full object-contain p-3" />
                    </a>
                  ))}
                </div>

                <div style={{ width: '1.5rem' }} />
                <div className="flex gap-6">
                  {sponsors.map((s, i) => (
                    <a key={`clone-${i}`} href={sponsors[current].website_url || "#"} className="bg-white w-80 h-40 flex items-center justify-center flex-shrink-0">
                      <img src={s.logo_url} className="w-full h-full object-contain p-3" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:hidden flex justify-center items-center h-40">
              <a
                href={sponsors[current].website_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white w-64 h-40 flex items-center justify-center shadow-sm hover:shadow-lg transition-all"
              >
                <img
                  src={sponsors[current].logo_url}
                  alt={sponsors[current].name}
                  className="w-full h-full object-contain p-3"
                />
              </a>
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
                href="https://www.facebook.com/dubaituskersrfc"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1a1f4e] p-2 rounded-full hover:bg-[#f5a623] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/dubaituskersrfc"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1a1f4e] p-2 rounded-full hover:bg-[#f5a623] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/dubaituskersrfc"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1a1f4e] p-2 rounded-full hover:bg-[#f5a623] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/@DubaiTuskers/"
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
