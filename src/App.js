import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import User from './components/users/User';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';

import GithubState from './components/context/github/GithubState';
import AlertState from './components/context/alert/AlertState';

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className='App'>
            <Navbar title='Github finder' />
            <div className='container'>
              <Alert alert={alert} />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route exact path='/user/:login' element={<User />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
