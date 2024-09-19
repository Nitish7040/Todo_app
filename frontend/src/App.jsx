import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Addtodo from './components/Addtodo'
import Todo from './components/Todo'
import LoginForm from './components/Login'
import RegistrationForm from './components/Registration'
import Home from './components/Home'

function App() {
 // const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/dashboard" element={<>
        <h1>Todo</h1>
        <Addtodo />
        <Todo />
      </>} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegistrationForm />} />
    </Routes>
  );
};

export default App