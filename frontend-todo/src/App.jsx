import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    try {
      const response = await axios.post('http://localhost:5000/tasks', { title: newTask, completed: false });
      setTasks([...tasks, response.data]);
      setNewTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const completeTask = async (id) => {
    try {
      const task = tasks.find((t) => t.id === id);
      const response = await axios.put(`http://localhost:5000/tasks/${id}`, { ...task, completed: true });
      setTasks(tasks.map((t) => (t.id === id ? response.data : t)));
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const removeTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (error) {
      console.error('Error removing task:', error);
    }
  };

  const updateTask = async (id, title) => {
    try {
      const task = tasks.find((t) => t.id === id);
      const response = await axios.put(`http://localhost:5000/tasks/${id}`, { ...task, title });
      setTasks(tasks.map((t) => (t.id === id ? response.data : t)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="App">
      <header>
        <nav className='bg-blue-500 text-white p-4'>
          <h1 className='text-2xl font-bold'>Todo App</h1>
        </nav>
      </header>
      <main className='p-4'>
        <h2 className='text-center text-2xl font-medium p-4'>Todo List</h2>
        <div className='border flex w-full justify-center gap-2'>
          <input
            className='w-full h-12 border border-gray-300 rounded px-2 py-1'
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={handleKeyDown} // Adiciona o manipulador de eventos de teclado
            placeholder="New Task"
          />
          <button onClick={addTask} className='inline-flex gap-2 items-center bg-blue-500 transition-all ease-in-out duration-300 active:-translate-y-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded group'>
            <span>Add</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" className="fill-current text-white transition-transform duration-300 transform group-hover:rotate-180">
              <path d="M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4zm1 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
            </svg>
          </button>
        </div>
        <TaskList tasks={tasks} completeTask={completeTask} removeTask={removeTask} updateTask={updateTask} />
      </main>
    </div>
  );
};

export default App;
