import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';
import PropTypes from 'prop-types';

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
    setNewTitle('');
  };

  const handleKeyDown = (event, taskId) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleUpdateClick(taskId);
    }
  };

  return (
    <ul className="list-none p-0 w-full py-4">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`flex gap-4 sm:flex-row justify-between mb-2 p-4 border rounded ${task.completed ? 'line-through text-gray-500' : 'text-black'} overflow-hidden`}
        >
          {editingTaskId === task.id ? (
            <div className='w-full'>
              <textarea
                value={newTitle}
                ref={inputRef}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, task.id)}
                className="w-full h-full p-1 border rounded resize-none"
              />
            </div>
          ) : (
            <div className='flex-1 text-ellipsis overflow-hidden w-full sm:w-auto'>
              <p onClick={() => handleEditClick(task)} className="whitespace-pre-wrap">{task.title}</p>
            </div>
          )}
          <div className="flex flex-col gap-2">
            {editingTaskId === task.id ? (
              <Button
                onClick={() => handleUpdateClick(task.id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold mb-2 sm:mb-0 sm:mr-2"
              >
                Update
              </Button>
            ) : (
              <Button
                onClick={() => handleEditClick(task)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold mb-2 sm:mb-0 sm:mr-2"
              >
                Edit
              </Button>
            )}
            <Button
              onClick={() => completeTask(task.id)}
              className={`bg-green-500 hover:bg-green-700 text-white font-bold mb-2 sm:mb-0 sm:mr-2 ${task.completed ? 'bg-gray-500' : ''}`}
            >
              Complete
            </Button>
            <Button
              onClick={() => removeTask(task.id)}
              className={`bg-red-500 hover:bg-red-700 text-white font-bold ${task.completed ? 'bg-gray-500' : ''}`}
            >
              Remove
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  completeTask: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default TaskList;
