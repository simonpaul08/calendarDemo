import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import React from 'react';
import { AiFillTwitterCircle, AiFillLinkedin, AiFillGithub } from 'react-icons/ai';
import { BiLogoDiscord } from 'react-icons/bi';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Login = () => {

  const navigate = useNavigate();
  const { setCurrentUser } = useAuthContext();

  // handle login 
  const handleLogin = async (code) => {

    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_API}google`, { code: code });
      console.log(res.data);
      setCurrentUser(res.data?.userData);
      let userData = res.data?.userData;
      let tokens = res.data?.tokens;
      window.localStorage.setItem('userData', JSON.stringify(userData));
      window.localStorage.setItem('tokens', JSON.stringify(tokens));
      navigate('/events');
    } catch (e) {
      console.log(e);
    }
  }


  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: (res) => {
      console.log(res.code);
      handleLogin(res?.code);
    },
    onError: (res) => {
      console.log(res.error);
    },
    scope: 'openid profile email https://www.googleapis.com/auth/calendar'
  })

  return (
    <div className='login'>
      <div className="login-container">

        {/* left block */}
        <div className="login-left login-block">
          {/* <div className="login-block-vector">
            
          </div> */}

          <div className="login-left__header flex flex-column">

            <div>
              <h3>Calendar</h3>
            </div>

            <div className='flex brand-container align-items-center'>
              <h3>Calendar.</h3>
            </div>

            <div className="social-links flex">
              <div className="social-link">
                <AiFillGithub size={35} />
              </div>
              <div className="social-link">
                <AiFillTwitterCircle size={35} />
              </div>
              <div className="social-link">
                <AiFillLinkedin size={35} />
              </div>
              <div className="social-link">
                <BiLogoDiscord size={35} />
              </div>
            </div>

          </div>
        </div>

        {/* right block */}
        <div className="login-right login-block flex flex-column justify-content-center align-items-center">
          <div className="login-right__content">
            <h3>Sign In</h3>
            <p>Sign in to your account</p>
            <div className="login-with-block flex align-items-center justify-content-between">
              <div className="login-with-item flex  align-items-center" onClick={googleLogin}>
                <FcGoogle size={18}/>
                <p>Sign in with Google</p>
              </div>
            </div>
            <div className='login-form'>
              <form>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login