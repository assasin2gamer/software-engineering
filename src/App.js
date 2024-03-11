import logo from './logo.svg';
import './App.css';
import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import page components
import { Home } from './pages/home/home.js';
import { About } from './pages/about/about';
import { Login } from './pages/login/login';
import { Account } from './pages/account/account';
import { Console } from './pages/console/console';


import { Nav } from './pages/home/nav';

function App() {


  return (
    <div className="App">
      
        <Router>    
        <Nav style={{zindex:'5'}}/>   
               
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/login' element={<Login />} />
                <Route path='/account' element={<Account />} />
                <Route path='/console' element={<Console />} />

            </Routes>

        </Router>
    </div>
  );
}

export default App;
