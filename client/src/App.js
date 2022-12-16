import React from 'react';
import './App.css';
import Signup from './components/reg/Signup';
import Signin from './components/reg/Signin'
import Protected from "./Protected.js"
import Home from './components/pages/Home';
import MyProfile from './components/pages/profile/MyProfile';
import Chat from './components/pages/Chat';
import Features from './components/landingpage/Features';
import SetAvatar from './components/reg/SetAvatar';
import LandingPage from './components/landingpage/LandingPage';
import CallScreen from './components/pages/videoCall/CallScreen';
import UserProfile from './components/pages/profile/UserProfile';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const {user} = useSelector((state=> state.auth))
  return (
        <Router>
            <div className="w-screen h-screen">
              <Routes>
              <Route path='/' exact element={<Protected user={user}><Home/></Protected>}/>
                <Route path='/register' element={<Signup/>}/>
                  <Route path='/setAvatar' element={<Protected user={user}><SetAvatar/></Protected>}/>
                  <Route path='/welcome' element={<LandingPage/>}/>
                <Route path='/login' element={<Signin/>}/>
                <Route path='/my-profile' element={<Protected user={user}><MyProfile/></Protected>}/>
                <Route path="/user/:id" element={<Protected user={user}><UserProfile/></Protected>}/>
                <Route path="/video" element={<Protected user={user}><CallScreen/></Protected>}/>
                  <Route path="/features" element={<Features/>}></Route>
              </Routes>
            
            
            </div>

        </Router>
         

     

   
  );
}

export default App;
