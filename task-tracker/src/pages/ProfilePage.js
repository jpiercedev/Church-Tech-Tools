import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const user = supabase.auth.user();
      if (user) {
        setUser(user);
        setEmail(user.email);
        // Assuming first name and last name are stored as user metadata
        setFirstName(user.user_metadata.firstName || '');
        setLastName(user.user_metadata.lastName || '');
        setBio(user.user_metadata.bio || '');
      }
    };
    fetchUser();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const updates = {
      email,
      password: newPassword,
      user_metadata: {
        firstName,
        lastName,
        bio,
      },
    };
    const { error } = await supabase.auth.update(updates);
    if (error) console.error('Update profile error:', error);
  };

  return (
    <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 mx-auto">
      <div className="bg-white rounded-xl shadow p-4 sm:p-7">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800">Profile</h2>
          <p className="text-sm text-gray-600">
            Manage your name, password, and account settings.
          </p>
        </div>

        <form onSubmit={handleUpdateProfile}>
          <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
            <div className="sm:col-span-3">
              <label className="inline-block text-sm text-gray-800 mt-2.5">Profile photo</label>
            </div>

            <div className="sm:col-span-9">
              <div className="flex items-center gap-5">
                <img className="inline-block size-16 rounded-full ring-2 ring-white" src="https://preline.co/assets/img/160x160/img1.jpg" alt="Avatar" />
                <div className="flex gap-x-2">
                  <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50">
                    Upload photo
                  </button>
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="firstName" className="inline-block text-sm text-gray-800 mt-2.5">Full name</label>
            </div>

            <div className="sm:col-span-9">
              <div className="sm:flex">
                <input
                  id="firstName"
                  type="text"
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="email" className="inline-block text-sm text-gray-800 mt-2.5">Email</label>
            </div>

            <div className="sm:col-span-9">
              <input
                id="email"
                type="email"
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="newPassword" className="inline-block text-sm text-gray-800 mt-2.5">Password</label>
            </div>

            <div className="sm:col-span-9">
              <div className="space-y-2">
                <input
                  id="newPassword"
                  type="password"
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="bio" className="inline-block text-sm text-gray-800 mt-2.5">BIO</label>
            </div>

            <div className="sm:col-span-9">
              <textarea
                id="bio"
                className="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                rows="6"
                placeholder="Type your bio..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-x-2">
            <button
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;