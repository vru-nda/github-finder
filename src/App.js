import './App.css';
import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

import axios from 'axios';

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
  };

  searchUsers = async (text) => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&
    client_id=${process.env.REACT_APP_GIT_CLIENT_ID}&
    client_secret= ${process.env.REACT_APP_GIT_CLIENT_SECRET}`);

    this.setState({ users: res.data.items, loading: false });
  };

  getUser = async (username) => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/users/${username}?&
    client_id=${process.env.REACT_APP_GIT_CLIENT_ID}&
    client_secret= ${process.env.REACT_APP_GIT_CLIENT_SECRET}`);

    this.setState({ user: res.data, loading: false });
  };

  getUserRepos = async (username) => {
    this.setState({ loading: true });

    const res =
      await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&
    client_id=${process.env.REACT_APP_GIT_CLIENT_ID}&
    client_secret= ${process.env.REACT_APP_GIT_CLIENT_SECRET}`);

    this.setState({ repos: res.data, loading: false });
  };

  clearUsers = () => this.setState({ users: [], loading: false });

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { alert, users, loading, user, repos } = this.state;
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
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
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
                    getUser={this.getUser}
                    repos={repos}
                    getUserRepos={this.getUserRepos}
                    loading={loading}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
