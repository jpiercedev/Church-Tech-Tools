import React from 'react';

function LandingPage() {
  return (
    <div>
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">Welcome to Task Tracker</h1>
          <p className="mt-4 text-lg">Easily manage your non-profit tasks with our platform.</p>
          <a href="/signup" className="mt-6 inline-block bg-white text-blue-600 py-2 px-4 rounded">Get Started</a>
        </div>
      </header>
      <main className="container mx-auto px-4 py-10">
        <section className="my-10">
          <h2 className="text-2xl font-bold">Why Choose Us?</h2>
          <p className="mt-4 text-gray-600">We provide the best tools for managing your non-profit's tasks and resources.</p>
        </section>
        <section className="my-10">
          <h2 className="text-2xl font-bold">Features</h2>
          <ul className="mt-4 text-gray-600">
            <li>Task Management</li>
            <li>User Accounts</li>
            <li>Admin Dashboard</li>
            <li>Google Sign-In</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default LandingPage;