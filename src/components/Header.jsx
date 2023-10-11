import React from 'react'
import { useAuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom';

const Header = () => {

    const { currentUser, logout } = useAuthContext();

  return (
    <div className='header'>
        <Link to="/events" className="header-logo">Calendar.</Link>
        <div className="header-profile">
            <p>{currentUser?.name}</p>
            <img src={currentUser?.picture} alt="profile"/>
            <button onClick={logout} className='logoutBtn'>logout</button>
        </div>
    </div>
  )
}

export default Header