import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './components/Login'
import Events from './pages/Events';
import { useAuthContext } from './context/AuthContext';

function App() {

  const { currentUser } = useAuthContext();

  return (

    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={currentUser ? <Navigate to="/events" />:<Login />} />
          <Route path='events' element={currentUser ? <Events /> : <Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  )
}

export default App

