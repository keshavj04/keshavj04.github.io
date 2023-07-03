import React, { useState, useEffect } from 'react';
import './ToDo.css';

const ToDo = ({ selectedDate }) => {
  const [inputText, setInputText] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() === '') {
      return;
    }
    const newTask = {
      date: selectedDate,
      task: inputText,
    };

    const updatedTasks = [...tasks, newTask];
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    setTasks(updatedTasks);
    setInputText('');
  };

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);

    setTasks(updatedTasks);

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          className="input-task"
          type="text"
          value={inputText}
          onChange={handleChange}
          placeholder="Enter the Task"
        />
        <button className="submit-button" type="submit">Submit</button>
      </form>

      {tasks.length > 0 && (
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index}>
              <span>{task.date}: </span>
              {task.task}
              <button className="delete-button" onClick={() => handleDeleteTask(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ToDo;
