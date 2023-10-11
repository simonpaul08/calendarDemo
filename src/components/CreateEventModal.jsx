import axios from 'axios';
import React, { useState } from 'react'

const CreateEventModal = ({ setModal, getAllEvents }) => {

    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLoaction] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    let { refresh_token } = JSON.parse(window.localStorage.getItem('tokens'))

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API}events`,
                { summary, description, location, startDate, endDate, refresh_token })

            console.log(res.data);
            setModal(false);
            getAllEvents();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className='modal'>
            <div className="modal-container">
                <form onSubmit={handleSubmit} className='event-form'>
                    <h3>Create Event</h3>

                    <div className="form-group">
                        <input type="text" name='summary' id='summary' placeholder='Summary' value={summary} onChange={(e) => setSummary(e.target.value)} required/>
                    </div>

                    <div className="form-group">
                        <textarea type="text" name='description' id='description' placeholder='Description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} cols="10" rows="5" required></textarea> 
                    </div>

                    <div className="form-group">
                        <input type="text" name='location' id='location' placeholder='location' value={location} onChange={(e) => setLoaction(e.target.value)} required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="startDate">Start Date</label>
                        <input type="datetime-local" name='startDate' id='startDate' value={startDate} onChange={(e) => setStartDate(e.target.value)} required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="endDate">End Date</label>
                        <input type="datetime-local" name='endDate' id='endDate' value={endDate} onChange={(e) => setEndDate(e.target.value)} required/>
                    </div>

                    <div className="form-group">
                        <button type='submit' className='submitBtn'>Create Event</button>
                        <button type='submit' className='cancelBtn' onClick={() => setModal(false)}>Cancel</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default CreateEventModal