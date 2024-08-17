import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.error('Sign up error:', error);
      setError(error.message);
    } else {
      setSuccess(true);
      // Redirect the user to the login page or another page if needed
      // For example: window.location.href = '/login';
    }
  };

  const handleGoogleSignUp = async () => {
    setError(null);
    setSuccess(false);

    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) {
      console.error('Google sign-up error:', error);
      setError(error.message);
    } else {
      setSuccess(true);
      // Redirect the user to the dashboard or another page if needed
    }
  };

  return (
    <div className="bg-gray-100 flex h-full items-center py-16 h-lvh">
      <div className="w-full max-w-md mx-auto p-6">
        <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800">Sign up</h1>
              <p className="mt-2 text-sm text-gray-600">
                Already have an account?
                <a className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium pl-1" href="/login">
                  Sign in here
                </a>
              </p>
            </div>

            <div className="mt-5">
              <button
                type="button"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                onClick={handleGoogleSignUp}
              >
                {/* Google SVG Path */}
                Sign up with Google
              </button>

              <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">Or</div>

              <form onSubmit={handleSignUp}>
                <div className="grid gap-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm mb-2">Email address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="py-3 px-4 block w-full ring-1 ring-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm mb-2">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="py-3 px-4 block w-full ring-1 ring-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="confirm-password" className="block text-sm mb-2">Confirm Password</label>
                    <input
                      type="password"
                      id="confirm-password"
                      name="confirm-password"
                      className="py-3 px-4 block w-full ring-1 ring-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center">
                    <input id="terms" name="terms" type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500" required />
                    <label htmlFor="terms" className="ms-3 text-sm">I accept the <a className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium" href="#">Terms and Conditions</a></label>
                  </div>

                  <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">Sign up</button>
                </div>
              </form>

              {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
              {success && <p className="mt-4 text-sm text-green-600">Sign-up successful! Please check your email for confirmation.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;