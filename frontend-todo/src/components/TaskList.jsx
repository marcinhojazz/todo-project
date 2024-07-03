import React, { useState, useRef, useEffect } from 'react';

const TaskList = ({ tasks, completeTask, removeTask, updateTask }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (editingTaskId !== null) {
      inputRef.current.focus();
    }
  }, [editingTaskId]);

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setNewTitle(task.title);
  };

  const handleUpdateClick = async (taskId) => {
    await updateTask(taskId, newTitle);
    setEditingTaskId(null);
    setNewTitle(''); // Limpar o título após a atualização
  };

  const handleKeyDown = (event, taskId) => {
    if (event.key === 'Enter') {
      handleUpdateClick(taskId);
    }
  };

  return (
    <ul className='list-none p-0'>
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`flex items-center justify-between mb-2 border rounded ${task.completed ? 'line-through text-gray-500' : 'text-black'}`}
        >
          {editingTaskId === task.id ? (
            <input
              type='text'
              value={newTitle}
              ref={inputRef} // Adiciona a referência ao input
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, task.id)} // Adiciona o manipulador de eventos de teclado
              className='flex-1 border p-1 mr-2 rounded'
            />
          ) : (
            <p className='flex-1'>{task.title}</p>
          )}
          <div className='flex'>
            {editingTaskId === task.id ? (
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded transition duration-300'
                onClick={() => handleUpdateClick(task.id)}
              >
                Update
              </button>
            ) : (
              <button
                className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded transition duration-300 mr-2'
                onClick={() => handleEditClick(task)}
              >
                Edit
              </button>
            )}
            <button
              className={`bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded transition duration-300 ${task.completed ? 'bg-gray-500' : ''}`}
              onClick={() => completeTask(task.id)}
            >
              Complete
            </button>
            <button
              className={`bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded ml-2 transition duration-300 ${task.completed ? 'bg-gray-500' : ''}`}
              onClick={() => removeTask(task.id)}
            >
              Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
