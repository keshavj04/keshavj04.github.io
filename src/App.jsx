import React, { useState } from 'react';
import Calendar from './Calendar.jsx';
import ToDo from './ToDo.jsx';
import './App.css'

const App = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <>
      <Calendar setSelectedDate={setSelectedDate} selectedDate={selectedDate} />
      <ToDo selectedDate={selectedDate} />
    </>
  );
};

export default App;
