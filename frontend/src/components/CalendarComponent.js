import React, { useState} from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import '../css/Calendar.css';

const CalendarComponent = () => {
    const [selectedDay, setSelectedDay] = useState(new Date());
    const [time, setTime] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const navigate = useNavigate();

    const fetchAvailableSlots = (day) => {
        const dayString = day.toString(); // Use the default format of the date

        axios.get('https://capstone-backend-self.vercel.app/availability', { params: { day: dayString } })
            .then(response => {
                console.log('Available slots:', response.data);
                setAvailableSlots(response.data.availableSlots);
            })
            .catch(error => {
                console.error('Error fetching available slots:', error);
            });
    };

    const handleDateClick = (date) => {
        setSelectedDay(date);
        localStorage.setItem('selectedate', date);
        setShowTimePicker(true);
        fetchAvailableSlots(date);
    };

    const handleTimeClick = (selectedTime) => {
        setTime(selectedTime);
        localStorage.setItem('selectedtime', selectedTime);
    };



    return (
        <div className='flex h-screen flex-col items-center justify-center'>
            {!showTimePicker ? (
                <Calendar
                    minDate={new Date()}
                    className='REACT-CALENDAR p-2'
                    view='month'
                    onClickDay={handleDateClick}
                />
            ) : (
                <div className='flex max-w-lg flex-wrap gap-4'>
                    {availableSlots.length > 0 ? (
                        availableSlots.map((slot, i) => (
                            <div className='rounded-sm bg-gray-100 p-2' key={`time-${i}`}>
                                <button
                                    onClick={() => handleTimeClick(slot)}
                                    type='button'
                                    className={`p-2 ${time === slot ? 'bg-blue-500 text-white' : ''}`}
                                >
                                    {new Date(`1970-01-01T${slot}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No available slots for this day.</p>
                    )}
                </div>
            )}
            {showTimePicker && (
                <div>
                    <p>Selected Date: {selectedDay.toDateString()}</p>
                    
                    <button onClick={() => navigate(-1)} >Go Back</button>
                </div>
            )}
        </div>
    );
};

export default CalendarComponent;
