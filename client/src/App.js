import React from 'react';
import './App.css';
import Signup from './components/reg/Signup';
import Signin from './components/reg/Signin'
import Home from './components/pages/Home';
import MyProfile from './components/pages/profile/MyProfile';
import Chat from './components/pages/Chat';
import SetAvatar from './components/reg/SetAvatar';
import CallScreen from './components/pages/videoCall/CallScreen';
import UserProfile from './components/pages/profile/UserProfile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
        <Router>
            <div className="w-screen h-screen">
              <Routes>
              <Route path='/' exact element={<Home/>}/>
                <Route path='/sign-up' element={<Signup/>}/>
                  <Route path='/setAvatar' element={<SetAvatar/>}/>
                <Route path='/sign-in' element={<Signin/>}/>
                <Route path='/my-profile' element={<MyProfile/>}/>
                <Route path="/user/:id" element={<UserProfile/>}/>
                <Route path="/video" element={<CallScreen/>}/>
              </Routes>
            
            
            </div>

        </Router>
         

     

   
  );
}

export default App;
