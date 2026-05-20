import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Lock, Eye, EyeOff, Loader2, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [hasSession, setHasSession] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase will automatically sign in the user if they clicked a recovery link (setting the session via URL hash fragment)
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setHasSession(true);
      } else {
        // Wait briefly in case Supabase client is still parsing the hash fragment from the URL redirection
        setTimeout(async () => {
          const { data: { session: retrySession } } = await supabase.auth.getSession();
          if (retrySession) {
            setHasSession(true);
          }
        }, 1000);
      }
    };
    checkSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;

      setSuccess(true);
      // Sign out to clean up any active recovery session
      await supabase.auth.signOut();
    } catch (err: any) {
      console.error('Password reset error:', err);
      setError(err.message || 'Failed to update password. Please make sure your link is valid or request a new one.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-rajdhani">
      <SEO
        title="Reset Password"
        description="Reset your password securely on Dubai Tuskers RFC."
      />
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1a1f4e] opacity-5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#f5a623] opacity-5 rounded-full -ml-20 -mb-20 blur-3xl"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="mx-auto w-16 h-16 bg-[#1a1f4e] rounded-2xl flex items-center justify-center mb-6 shadow-xl transform rotate-3">
          <Lock className="w-8 h-8 text-[#f5a623]" />
        </div>
        <h2 className="text-center text-3xl font-extrabold text-[#1a1f4e]">
          Reset Password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your new password below to update your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-gray-100">
          {success ? (
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Password Updated Successfully!</h3>
              <p className="text-sm text-gray-600">
                Your password has been changed. You can now log in using your new credentials.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => navigate('/admin/login')}
                  id="btn-login-redirect"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-[#1a1f4e] hover:bg-[#2a2f5e] focus:outline-none transition-all transform hover:-translate-y-0.5"
                >
                  Go to Login
                </button>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-red-700 font-medium">{error}</p>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="new-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:border-transparent sm:text-sm transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:border-transparent sm:text-sm transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  id="btn-submit-reset"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-[#1a1f4e] hover:bg-[#2a2f5e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a1f4e] transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Updating Password...
                    </>
                  ) : (
                    'Update Password'
                  )}
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 border-t border-gray-200 pt-6">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#1a1f4e] font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
