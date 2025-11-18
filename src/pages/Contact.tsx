import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube, MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-[#1a1f4e] to-[#2a2f5e] text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Contact Us
          </h1>
          <div className="w-24 h-1 bg-[#f5a623] mx-auto mb-8"></div>
          <p className="text-xl text-center text-gray-300 max-w-3xl mx-auto">
            Get in touch with Dubai Tuskers RFC
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold text-[#1a1f4e] mb-8">
                Get In Touch
              </h2>

              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#1a1f4e] text-[#f5a623] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#1a1f4e] mb-2">
                        Email
                      </h3>
                      <a
                        href="mailto:info@dubaituskers.com"
                        className="text-gray-700 hover:text-[#f5a623] transition-colors"
                      >
                        info@dubaituskers.com
                      </a>
                      <p className="text-sm text-gray-500 mt-1">
                        For general inquiries and information
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#1a1f4e] text-[#f5a623] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#1a1f4e] mb-2">
                        Phone
                      </h3>
                      <a
                        href="tel:+971521329719"
                        className="text-gray-700 hover:text-[#f5a623] transition-colors"
                      >
                        +971 52 132 9719
                      </a>
                      <p className="text-sm text-gray-500 mt-1">
                        Available during business hours
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#25D366] text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#1a1f4e] mb-2">
                        WhatsApp
                      </h3>
                      <a
                        href="https://wa.me/971521329719"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-[#25D366] transition-colors"
                      >
                        +971 52 132 9719
                      </a>
                      <p className="text-sm text-gray-500 mt-1">
                        Quick response via WhatsApp
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#1a1f4e] text-[#f5a623] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#1a1f4e] mb-2">
                        Location
                      </h3>
                      <p className="text-gray-700">Dubai Sports City</p>
                      <p className="text-gray-700">Dubai, UAE</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Training and match venue
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#1a1f4e] mb-8">
                Leadership Team
              </h2>

              <div className="space-y-4">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-[#1a1f4e] mb-1">
                    Dayan Diddeniya
                  </h3>
                  <p className="text-[#f5a623] font-semibold mb-2">
                    Founder & Director of Rugby
                  </p>
                  <p className="text-sm text-gray-600">
                    Former Sri Lanka Rugby player and coach
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-[#1a1f4e] mb-1">
                    Chamara Dabare
                  </h3>
                  <p className="text-[#f5a623] font-semibold mb-2">
                    Chief Executive Officer
                  </p>
                  <p className="text-sm text-gray-600">
                    Strategic leadership and operations
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-[#1a1f4e] mb-1">
                    Jason Brown
                  </h3>
                  <p className="text-[#f5a623] font-semibold mb-2">
                    COO & Coaching Director
                  </p>
                  <p className="text-sm text-gray-600">
                    Operations and coaching development
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-[#1a1f4e] mb-1">
                    Arshad Jamaldeen
                  </h3>
                  <p className="text-[#f5a623] font-semibold mb-2">
                    Sports Operations Director
                  </p>
                  <p className="text-sm text-gray-600">
                    Day-to-day sports operations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#1a1f4e] mb-8">
              Follow Us on Social Media
            </h2>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://www.facebook.com/dubaituskers"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1877f2] text-white p-4 rounded-xl hover:bg-[#166fe5] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-3 min-w-[200px]"
              >
                <Facebook className="h-6 w-6" />
                <span className="font-semibold">Facebook</span>
              </a>

              <a
                href="https://www.instagram.com/dubaituskers"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white p-4 rounded-xl hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-3 min-w-[200px]"
              >
                <Instagram className="h-6 w-6" />
                <span className="font-semibold">Instagram</span>
              </a>

              <a
                href="https://www.linkedin.com/company/dubaituskers"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0077b5] text-white p-4 rounded-xl hover:bg-[#006399] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-3 min-w-[200px]"
              >
                <Linkedin className="h-6 w-6" />
                <span className="font-semibold">LinkedIn</span>
              </a>

              <a
                href="https://www.youtube.com/dubaituskers"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#ff0000] text-white p-4 rounded-xl hover:bg-[#cc0000] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-3 min-w-[200px]"
              >
                <Youtube className="h-6 w-6" />
                <span className="font-semibold">YouTube</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#1a1f4e] to-[#2a2f5e] rounded-xl shadow-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Visit Us</h2>
            <div className="w-24 h-1 bg-[#f5a623] mx-auto mb-6"></div>
            <p className="text-lg text-gray-300 mb-6">
              Come watch a match or join us for a training session at Dubai Sports
              City. We train Tuesday, Thursday evenings and Saturday mornings.
            </p>
            <a
              href="https://www.google.com/maps/search/Dubai+Sports+City"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#f5a623] text-[#1a1f4e] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#ffc043] transition-colors shadow-lg"
            >
              <MapPin className="h-5 w-5" />
              Get Directions
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}