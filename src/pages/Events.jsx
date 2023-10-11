import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import Header from '../components/Header';
import moment from 'moment/moment';
import CreateEventModal from '../components/CreateEventModal';

const Events = () => {

  const [events, setEvents] = useState([]);
  const { currentUser } = useAuthContext();
  const [modal, setModal] = useState(false);

  let { refresh_token } = JSON.parse(window.localStorage.getItem('tokens'))
  console.log(refresh_token)

  const getAllEvents = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_API}events/fetch`, { refresh_token: refresh_token });
      console.log(res.data);
      setEvents(res.data);
    } catch (e) {
      console.log(e);
    }
  }


  useEffect(() => {
    getAllEvents();
  }, [])
  return (
    <>
    {modal && <CreateEventModal setModal={setModal} getAllEvents={getAllEvents}/>}
      <Header />
      <div className='events'>
        <div className="events-wrapper">
        <div className="modal-wrapper">
          <button className='createBtn' onClick={() => setModal(true)}>Create Event</button>
        </div>
          <div className="event-card-wrapper">
            {events?.map((event, index) => {

              let startDate = moment(event?.start?.dateTime)?.format('DD-MM-YYYY');
              let endDate = moment(event?.end?.dateTime)?.format('DD-MM-YYYY');

              console.log(startDate, endDate);

              return (
                <div className="event-card">
                  <p className='event-num'>#EVENT {index + 1}</p>
                  <h3 className='summary'>{event?.summary}</h3>
                  <p className='description'>{event?.description || "No Description Available"}</p>

                  <p className='location'>Location - {event?.location}</p>

                  <div className='event-time'>
                    <p>{startDate}</p>
                    <p className='dash'>-</p>
                    <p>{endDate}</p>
                  </div>
                </div>
              )
            })}

            {/* <div className="event-card"></div>
            <div className="event-card"></div>
            <div className="event-card"></div>
            <div className="event-card"></div>
            <div className="event-card"></div> */}
          </div>


        </div>
      </div>
    </>

  )
}

export default Events