import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from './Avatar';
import Task from './Task';
import './index.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', deadline: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/v1/users/profile', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setUser(data);
        } else {
          console.error('Failed to fetch user data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchTasks = async () => {
      try {
        const response = await fetch('/api/v1/users/todos', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const text = await response.text(); // Get response text
        console.log('Response text:', text); // Log the response text
        const data = JSON.parse(text); // Parse JSON
        if (response.ok) {
          setTasks(data);
        } else {
          console.error('Failed to fetch tasks:', data.message);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchUserData();
    fetchTasks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleAddTask = () => {
    setIsAddingTask(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, deadline } = newTask;
    
    try {
      const response = await fetch('/api/v1/users/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          content: title,
          description,
          deadline
        })
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Task added successfully:', data);
        setTasks([...tasks, data]);
        setNewTask({ title: '', description: '', deadline: '' });
        setIsAddingTask(false);
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

  const handleEditTask = (id) => {
    // Logic for editing a task
    console.log('Edit task with id:', id);
  };

  const handleDeleteTask = (id) => {
    // Logic for deleting a task
    setTasks(tasks.filter(task => task._id !== id)); // Assuming _id is the task identifier
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <h2>Dashboard</h2>
        <div className="navbar-right">
          {user && (
            <Avatar 
              image={user.avatar}  
              name={user.name} 
              size="medium" 
            />
          )}
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <div className="content">
        <h1>My Task</h1>
        <button className="add-task-btn" onClick={handleAddTask}>Add Task</button>
        {isAddingTask && (
          <div className="task-form">
            <h2>Add Task</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={newTask.title}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Description:
                <textarea
                  name="description"
                  value={newTask.description}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Deadline:
                <input
                  type="date"
                  name="deadline"
                  value={newTask.deadline}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <button type="submit">Add Task</button>
              <button type="button" onClick={() => setIsAddingTask(false)}>Cancel</button>
            </form>
          </div>
        )}
        <div className="tasks-container">
          {tasks.length > 0 ? (
            tasks.map(task => (
              <Task 
                key={task._id} // Assuming _id is the task identifier
                task={task} 
                onEdit={handleEditTask} 
                onDelete={handleDeleteTask} 
              />
            ))
          ) : (
            <p>No tasks available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
