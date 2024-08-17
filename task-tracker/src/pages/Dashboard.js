import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const user = sessionData?.session?.user;

        if (user) {
          const { data: tasks, error } = await supabase
            .from('tasks')
            .select('*')
            .eq('user_id', user.id);

          if (error) {
            console.error('Error fetching tasks:', error);
          } else {
            setTasks(tasks);
          }
        } else {
          console.log('No user is logged in.');
        }
      } catch (error) {
        console.error('Error fetching session or tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Preline CSS Header */}
      <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5 lg:ps-[260px]">
        <nav className="px-4 sm:px-6 flex basis-full items-center w-full mx-auto">
          <div className="me-5 lg:me-0 lg:hidden">
            {/* Logo */}
            <a className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-none focus:opacity-80" href="#" aria-label="Preline">
              {/* Logo SVG */}
            </a>
          </div>

          <div className="w-full flex items-center justify-end ms-auto md:justify-between gap-x-1 md:gap-x-3">
            {/* Other header content */}
          </div>
        </nav>
      </header>

      {/* Preline CSS Sidebar */}
      <div className="hs-overlay [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform w-[260px] h-full hidden fixed inset-y-0 start-0 z-[60] bg-white border-e border-gray-200 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0">
        <div className="relative flex flex-col h-full max-h-full">
          <div className="px-6 pt-4">
            <a className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80" href="#" aria-label="Preline">
              {/* Logo SVG */}
            </a>
          </div>
          <div className="h-full overflow-y-auto">
            <nav className="hs-accordion-group p-3 w-full flex flex-col flex-wrap">
              {/* Sidebar content */}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full lg:ps-64">
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <h1>Your Tasks</h1>
          {tasks.length > 0 ? (
            <ul>
              {tasks.map((task) => (
                <li key={task.id}>{task.title}</li>
              ))}
            </ul>
          ) : (
            <p>No tasks found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;