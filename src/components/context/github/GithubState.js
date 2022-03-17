import React, { useReducer } from 'react';
import GithubContext from './GithubContext';
import GithubReducer from './GithubReducer';
import axios from 'axios';
import {
  CLEAR_USERS,
  GET_REPOS,
  GET_USER,
  SEARCH_USERS,
  SET_LOADING,
} from '../types';

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    alert: null,
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  //search users
  const searchUsers = async (text) => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&
    client_id=${process.env.REACT_APP_GIT_CLIENT_ID}&
    client_secret= ${process.env.REACT_APP_GIT_CLIENT_SECRET}`);

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
  };

  // get single user
  const getUser = async (username) => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}?&
        client_id=${process.env.REACT_APP_GIT_CLIENT_ID}&
        client_secret= ${process.env.REACT_APP_GIT_CLIENT_SECRET}`);

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  };

  // get repos
  const getUserRepos = async (username) => {
    setLoading(true);

    const res =
      await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&
    client_id=${process.env.REACT_APP_GIT_CLIENT_ID}&
    client_secret= ${process.env.REACT_APP_GIT_CLIENT_SECRET}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  };

  //clear states
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        alert: state.alert,
        loading: state.loading,
        searchUsers,
        getUser,
        getUserRepos,
        clearUsers,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
