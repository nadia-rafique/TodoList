import React, { useState } from 'react';

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [editingTask, setEditingTask] = useState({ task: '', index: null });
  const [validationMessage, setValidationMessage] = useState('');

  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  const addTask = () => {
    if (task) {
      if (tasks.includes(task)) {
        setValidationMessage('Task already exists.');
      } else {
        setTasks([...tasks, task]);
        setTask('');
        setValidationMessage('');
      }
    }
  };

  const editTask = (index) => {
    setEditingTask({ task: tasks[index], index });
  };

  const updateTask = () => {
    if (editingTask.task && editingTask.index !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editingTask.index] = editingTask.task;
      setTasks(updatedTasks);
      setEditingTask({ task: '', index: null });
    }
  };

  const cancelEdit = () => {
    setEditingTask({ task: '', index: null });
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="relative flex items-center justify-center h-[100vh]">
      <div className='bg-white shadow-md p-4'>
        <h2 className="text-lg font-semibold">Todo List</h2>
        <div className="flex space-x-2">
            <input
            type="text"
            value={task}
            onChange={handleTaskChange}
            placeholder="Add a task"
            className="w-full p-2 border rounded"
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={addTask}>
            Add
            </button>
        </div>
        {validationMessage && (
            <p className="text-red-500 text-sm mt-2">{validationMessage}</p>
        )}
        <ul className="mt-4">
            {tasks.map((t, index) => (
            <li key={index} className="flex justify-between items-center p-2 border-t">
                {index === editingTask.index ? (
                <div className="w-full flex flex-col">
                    <input
                    type="text"
                    value={editingTask.task}
                    onChange={(e) =>
                        setEditingTask({ task: e.target.value, index })
                    }
                    className="w-full p-2 border rounded"
                    />
                    <div className="flex justify-end mt-2">
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded"
                        onClick={updateTask}
                    >
                        Update
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded ml-2"
                        onClick={cancelEdit}
                    >
                        Cancel
                    </button>
                    </div>
                </div>
                ) : (
                <div className="w-full flex flex-col">
                    <span className="text-gray-800 text-left">{t}</span>
                    <div className="flex justify-end">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded ml-2"
                        onClick={() => editTask(index)}
                    >
                        Edit
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded ml-2"
                        onClick={() => deleteTask(index)}
                    >
                        Delete
                    </button>
                    </div>
                </div>
                )}
            </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
