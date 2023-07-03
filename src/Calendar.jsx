import React, { useState, useEffect } from 'react';
import './Calendar.css';

const Calendar = ({ setSelectedDate, selectedDate }) => {
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let country = 'in';
      let years = ['2022', '2023', '2024'];
      let promises = years.map((year) =>
        fetch(`https://api.api-ninjas.com/v1/holidays?country=${country}&year=${year}`, {
          method: 'GET',
          headers: {
            'X-Api-Key': 'OHhIqOenpNxWxhEnPMKF/Q==OV8YO3OAQIr2kiP3',
            'Content-Type': 'application/json',
          },
        })
      );
  
      Promise.all(promises)
        .then((responses) => {
          return Promise.all(responses.map((response) => response.json()));
        })
        .then((results) => {
          console.log(results);
          setHolidays(results.flat());
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };
  
    setTimeout(() => {
      fetchData();
    }, 0);
  }, []);
  

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleDateClick = (date) => {
    const selected = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    setSelectedDate(selected);
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => {
      return new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1);
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      return new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1);
    });
  };

  function extractDay(dateString) {
    var date = new Date(dateString);
    return date.getDate();
  }

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const calendar = [];
    let currentDate = new Date(firstDay);
    let week = [];

    for (let i = 0; i < currentDate.getDay(); i++) {
      week.push(<div key={`empty-${i}`} className="calendar-cell empty"></div>);
    }

    while (currentDate <= lastDay) {
      const isCurrentMonth = currentDate.getMonth() === month;
      const isToday = currentDate.toDateString() === new Date().toDateString();

      const holidayList = holidays.filter((holiday) => {
        const holidayDate = new Date(holiday.date);
        return holidayDate.toDateString() === currentDate.toDateString();
      });

      week.push(
        <div
          key={currentDate.toISOString()}
          className={`calendar-cell ${isCurrentMonth ? '' : 'other-month'} ${isToday ? 'today' : ''}`}
          onClick={(e) => {
            const targetDiv = e.currentTarget;
            const isDateClicked = targetDiv.classList.contains('date-clicked');
            const cells = document.querySelectorAll('.date-clicked');
            cells.forEach((cell) => {
              cell.classList.remove('date-clicked');
            });
            if (isDateClicked) {
              targetDiv.classList.remove('date-clicked');
            } else {
              targetDiv.classList.add('date-clicked');
            }

            const dateSelected = targetDiv.innerText + ' ' + currentMonth.toLocaleString('en-US', { month: 'short' });
            const holidayNames = holidayList.map((holiday) => holiday.name).join(', '); // Extract holiday names
            setSelectedDate(dateSelected + (holidayList.length > 0 ? ` (${holidayNames})` : '')); // Append holiday names to selected date
          }}
        >
          <span className={holidayList.length > 0 ? 'holiday-date' : ''}>{currentDate.getDate()}</span>
        </div>
      );

      currentDate.setDate(currentDate.getDate() + 1);

      if (currentDate.getDay() === 0 || currentDate > lastDay) {
        calendar.push(<div key={`row-${currentDate}`} className="calendar-row">{week}</div>);
        week = [];
      }
    }

    return calendar;
  };

  return (
    <div>
      <h1 class="calendar-main">Calendar</h1>
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={handlePrevMonth}>{'<'}</button>
          <div className="selected-month">{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
          <button onClick={handleNextMonth}>{'>'}</button>
        </div>
        <div className="calendar-body">
          <div className="calendar-weekdays">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          {renderCalendar()}
        </div>
        <div className="selected-date">
          Selected Date: <span>{selectedDate ? selectedDate : 'None'}</span>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
