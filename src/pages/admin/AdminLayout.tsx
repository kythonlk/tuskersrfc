import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import {
  Users,
  Calendar,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  Newspaper,
  Trophy,
  User,
  FileText
} from 'lucide-react';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.email) {
        setUserEmail(user.email);
      } else {
        navigate("/admin/login", { replace: true });
      }
    };

    getUser();
  }, [navigate]);

  /* -------------------- LOGOUT -------------------- */
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  /* -------------------- ROLE -------------------- */
  const isMembershipAdmin =
    userEmail === "membership@dubaituskers.com";

  /* -------------------- NAV ITEMS -------------------- */
  const allNavItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Members", path: "/admin/members", icon: Users },
    { name: "Events", path: "/admin/events", icon: Calendar },
    { name: "Fixtures", path: "/admin/fixtures", icon: Trophy },
    { name: "News", path: "/admin/news", icon: Newspaper },
    { name: "Players", path: "/admin/players", icon: User },
    { name: "Medical", path: "/admin/medical", icon: FileText },
    { name: "Submissions", path: "/admin/submissions", icon: FileText },
  ];

  /* -------------------- SIDEBAR VISIBILITY -------------------- */
  const navItems = allNavItems.filter((item) => {
    if (!userEmail) return false;

    // Membership admin → ONLY Members
    if (isMembershipAdmin) {
      return item.name === "Members";
    }

    // Other users → EVERYTHING
    return true;
  });

  /* -------------------- ROUTE GUARD -------------------- */
  useEffect(() => {
    if (!userEmail) return;

    const currentPath = location.pathname;
    if (currentPath === "/admin/login") return;

    // Membership admin: block everything except Members
    if (isMembershipAdmin) {
      if (!currentPath.startsWith("/admin/members")) {
        navigate("/admin/members", { replace: true });
      }
    }
    // Other users: no restrictions
  }, [userEmail, location.pathname, isMembershipAdmin, navigate]);

  /* -------------------- HELPERS -------------------- */
  const isActive = (path: string) =>
    location.pathname.startsWith(path);

  if (!userEmail) return null; // can replace with loader

  return (
    <div className="min-h-screen bg-gray-50 flex font-rajdhani">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#1a1f4e] text-white transition-transform duration-300 ease-in-out transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:static md:inset-auto shadow-xl flex flex-col`}
      >
        <div className="flex items-center justify-between p-6 border-b border-[#2a2f5e]">
          <h1 className="text-2xl font-bold tracking-wider">Tuskers<span className="text-[#f5a623]">Admin</span></h1>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-300 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-6 py-4 border-b border-[#2a2f5e] text-xs text-gray-400">
          Logged in as:<br />
          <span className="text-white font-medium truncate block" title={userEmail}>{userEmail}</span>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive(item.path)
                ? 'bg-[#f5a623] text-[#1a1f4e] font-bold shadow-lg'
                : 'text-gray-300 hover:bg-[#2a2f5e] hover:text-white'
                }`}
            >
              <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-[#1a1f4e]' : 'text-[#f5a623]'}`} />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-[#2a2f5e]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-300 hover:bg-red-500/10 hover:text-red-200 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden pt-10">
        {/* Mobile Header */}
        <header className="md:hidden bg-white shadow-sm border-b border-gray-200 p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-[#1a1f4e]">Tuskers<span className="text-[#f5a623]">Admin</span></h1>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
