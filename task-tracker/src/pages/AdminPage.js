import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

function AdminPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = async () => {
    const { error } = await supabase
      .from('tasks')
      .insert([{ title, description, link, user_id: supabase.auth.user().id }]);

    if (error) console.error('Error creating task:', error);
  };

  return (
    <div>
      <h1>Create a Task</h1>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task Title" />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input type="text" value={link} onChange={(e) => setLink(e.target.value)} placeholder="Link" />
      <button onClick={handleSubmit}>Create Task</button>
    </div>
  );
}

export default AdminPage;