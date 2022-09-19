import React from 'react';
import './App.css';
import Signup from './components/reg/Signup';
import Signin from './components/reg/Signin'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
        <Router>
            <div className="w-screen h-screen">
              <Routes>
                <Route path='/sign-up' element={<Signup/>}/>
                <Route path='/sign-in' element={<Signin/>}/>
              </Routes>
            
            
            </div>

        </Router>
         

     

   
  );
}

export default App;
