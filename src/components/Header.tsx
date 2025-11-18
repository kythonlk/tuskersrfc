import { Menu, X, Linkedin, InstagramIcon, Youtube } from 'lucide-react';
import { Facebook, Mail, ShoppingBag } from "lucide-react";
import { useState } from 'react';
import type { Page } from '../types';
import logo from '../images/logo.webp';
import { Link, useLocation } from 'react-router-dom';


export default function Header() {
  const location = useLocation();
  const currentPage = location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; page?: Page; children?: { label: string; page: Page }[] }[] = [
    { label: 'Home', page: 'home' },
    { label: 'History', page: 'about' },
    { label: 'Teams', page: 'teams' },
    { label: 'Players', page: 'players' },
    { label: 'Fixtures & Results', page: 'fixtures' },
    { label: 'Events', page: 'events' },
    { label: 'News', page: 'news' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Membership', page: 'membership' },
    { label: 'Sponsorship', page: 'sponsorship' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <>
      <div className="fixed w-full p-2 h-10 flex z-50 sm:hidden items-center gap-3 justify-between text-base font-semibold bg-black/80 ">
        <a href="mailto:info@dubaituskers.com" className="flex items-center text-gray-100 hover:text-gray-200 transition-colors cursor-pointer">
          INFO@DUBAITUSKERS.COM
        </a>
        <div className='flex gap-4'>
          <a href="https://www.facebook.com/dubaituskersrfc"
            target="_blank" className="text-gray-200 hover:text-[#f5a623] transition-all duration-300"><Facebook className="h-4 w-4" /></a>
          <a href="https://www.instagram.com/dubaituskersrfc"
            target="_blank" className="text-gray-200 hover:text-[#f5a623] transition-all duration-300"><InstagramIcon className="h-4 w-4" /></a>
          <a href="https://www.linkedin.com/company/dubaituskersrfc"
            target="_blank" className="text-gray-200 hover:text-[#f5a623] transition-all duration-300"><Linkedin className="h-4 w-4" /></a>
          <a href="https://www.youtube.com/@DubaiTuskers/"
            target="_blank" className="text-gray-200 hover:text-[#f5a623] transition-all duration-300"><Youtube className="h-4 w-4" /></a>
        </div>
      </div>
      <header className="fixed flex sm:flex-col w-full top-10 sm:top-0 left-0 right-0 z-50 font-rajdhani font-semibold bg-white/60 backdrop-blur-md border-b border-[#f5a623]/20">
        <div >
          <div className="mx-auto max-w-[1600px] px-4 sm:px-8 h-20 flex items-center justify-between text-xs">
            <Link to="/" className="flex-shrink-0 cursor-pointer group" >
              <img src={logo} alt="Dubai Tuskers RFC" className="h-16 w-auto transition-all duration-300 group-hover:scale-105" />
            </Link>
            <div className="xl:flex hidden items-center gap-3 sm:gap-5 justify-center">
              <a href="mailto:info@dubaituskers.com" className="hidden sm:flex items-center gap-2 hover:text-gray-700 transition-colors cursor-pointer">
                <Mail className="h-5 w-5" />
                <span className="text-base font-semibold">INFO@DUBAITUSKERS.COM</span>
              </a>
              <a href="https://www.facebook.com/dubaituskersrfc"
                target="_blank" className="text-gray-900 hover:text-[#f5a623] transition-all duration-300"><Facebook className="h-5 w-5" /></a>
              <a href="https://www.instagram.com/dubaituskersrfc"
                target="_blank" className="text-gray-900 hover:text-[#f5a623] transition-all duration-300"><InstagramIcon className="h-5 w-5" /></a>
              <a href="https://www.linkedin.com/company/dubaituskersrfc"
                target="_blank" className="text-gray-900 hover:text-[#f5a623] transition-all duration-300"><Linkedin className="h-5 w-5" /></a>
              <a href="https://www.youtube.com/@DubaiTuskers/"
                target="_blank" className="text-gray-900 hover:text-[#f5a623] transition-all duration-300"><Youtube className="h-6 w-6" /></a>
              <a href="https://www.shop.dubaituskers.com/"
                target="_blank" className="hidden xl:flex items-center gap-4 pl-20">
                <button className="relative px-6 py-2.5 bg-gradient-to-r from-[#f5a623] via-[#ffb938] to-[#f5a623] text-black font-semibold text-sm tracking-wide overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ffcd62] to-[#f5a623] translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                  <div className="relative z-10 flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    <span>SHOP</span>
                  </div>
                </button>
              </a>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex sm:bg-black/80 sm:backdrop-blur-md border-b border-white/5">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-8">
            <div className="flex items-center justify-center h-12">
              <nav className="hidden xl:flex items-center gap-1">
                {navItems.map((item) => (
                  <Link
                    to={item.page ? `/${item.page}` : '#'}
                    className={`relative px-5 py-2 text-base font-medium tracking-wide transition-all duration-300 group
                ${currentPage === item.page ? 'text-[#f5a623]' : 'text-white/90 hover:text-white'}
              `}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {currentPage === item.page && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#f5a623] to-transparent" />
                    )}
                    <div className="absolute inset-0 bg-white/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="sm:hidden flex justify-center flex-col mx-auto">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-3 text-black/90 hover:text-[#f5a623] hover:bg-white/5 rounded-lg transition-all w-full"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="xl:hidden absolute top-full left-0 right-0 bg-black/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-6">
              <div className="space-y-1 mb-6">
                {navItems.map((item) => (
                  <Link
                    to={item.page ? `/${item.page}` : '#'}
                    onClick={() => {
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all
                ${currentPage === item.page
                        ? 'text-[#f5a623] bg-[#f5a623]/10'
                        : 'text-white/90 hover:text-white hover:bg-white/5'
                      }
              `}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="pt-6 border-t border-white/10 space-y-4">
                <button className="w-full px-6 py-3 bg-gradient-to-r from-[#f5a623] to-[#ffcd62] text-black font-semibold text-sm rounded-lg flex items-center justify-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  <span>SHOP</span>
                </button>
                <div className="flex items-center justify-center gap-6 pt-2">
                  <a href="https://www.facebook.com/dubaituskersrfc"
                    target="_blank" className="text-gray-400 hover:text-[#f5a623] transition-colors"><Facebook className="h-5 w-5" /></a>
                  <a href="https://www.instagram.com/dubaituskersrfc"
                    target="_blank" className="text-gray-400 hover:text-[#f5a623] transition-colors"><InstagramIcon className="h-5 w-5" /></a>
                  <a href="https://www.linkedin.com/company/dubaituskersrfc"
                    target="_blank" className="text-gray-400 hover:text-[#f5a623] transition-colors"><Linkedin className="h-5 w-5" /></a>
                  <a href="https://www.youtube.com/@DubaiTuskers/"
                    target="_blank" className="text-gray-400 hover:text-[#f5a623] transition-colors"><Youtube className="h-5 w-5" /></a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
