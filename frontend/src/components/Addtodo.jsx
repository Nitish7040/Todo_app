import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../Features/Todo/todoslice';

function Addtodo() {
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState([]); // State to hold tasks
  const [newTask, setNewTask] = useState({ title: '', description: '', deadline: '' });
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, deadline } = newTask;

    try {
      const response = await fetch('/api/v1/users/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ content: title, description, deadline }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Task added successfully:', data);
        setTasks([...tasks, data]);
        dispatch(addTodo(data)); // Dispatch action to Redux
        setNewTask({ title: '', description: '', deadline: '' });
        alert('Task added successfully!');
      } else {
        console.error('Failed to add task:', data.message);
        alert('Failed to add task: ' + data.message);
      }
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Error adding task: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-x-3 mt-12'>
      <input
        type='text'
        placeholder='Write Todo...'
        className='w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5'
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
      />
      <input
        type='text'
        placeholder='Description...'
        value={newTask.description}
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        className='w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5'
      />
      <input
        type='date'
        value={newTask.deadline}
        onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
        className='w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5'
      />
      <button type='submit' className='rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0'>
        Add Todo
      </button>
    </form>
  );
}

export default Addtodo;
