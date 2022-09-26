import React from 'react';
import './App.css';
import Signup from './components/reg/Signup';
import Signin from './components/reg/Signin'
import Home from './components/pages/Home';
import Chat from './components/pages/Chat';
import SetAvatar from './components/reg/SetAvatar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
        <Router>
            <div className="w-screen h-screen">
              <Routes>
              <Route path='/' exact element={<Home/>}/>
                <Route path='/sign-up' element={<Signup/>}/>
                  <Route path='/setAvatar' element={<SetAvatar/>}/>
                <Route path='/sign-in' element={<Signin/>}/>#
                <Route path='/chat' element={<Chat/>}/>

              </Routes>
            
            
            </div>

        </Router>
         

     

   
  );
}

export default App;
