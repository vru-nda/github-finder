import './App.css';
import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const searchUsers = async (text) => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&
    client_id=${process.env.REACT_APP_GIT_CLIENT_ID}&
    client_secret= ${process.env.REACT_APP_GIT_CLIENT_SECRET}`);

    setUsers(res.data.items);
    setLoading(false);
  };

  const getUser = async (username) => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}?&
    client_id=${process.env.REACT_APP_GIT_CLIENT_ID}&
    client_secret= ${process.env.REACT_APP_GIT_CLIENT_SECRET}`);

    setUser(res.data);
    setLoading(false);
  };

  const getUserRepos = async (username) => {
    setLoading(true);

    const res =
      await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&
    client_id=${process.env.REACT_APP_GIT_CLIENT_ID}&
    client_secret= ${process.env.REACT_APP_GIT_CLIENT_SECRET}`);

    setRepos(res.data);
    setLoading(false);
  };

  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <Router>
      <div className='App'>
        <Navbar title='Github finder' />
        <div className='container'>
          <Alert alert={alert} />
          <Routes>
            <Route
              path='/'
              element={
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showAlert={showAlert}
                    showClear={users.length > 0 ? true : false}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              }
            />
            <Route path='/about' element={<About />} />
            <Route
              exact
              path='/user/:login'
              element={
                <User
                  user={user}
                  getUser={getUser}
                  repos={repos}
                  getUserRepos={getUserRepos}
                  loading={loading}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
