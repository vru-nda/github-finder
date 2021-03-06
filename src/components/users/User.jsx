import React, { Fragment, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import GithubContext from '../context/github/GithubContext';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';

const User = () => {
  const githubContext = useContext(GithubContext);

  let params = useParams();

  const { loading, user, getUser, repos, getUserRepos } = githubContext;

  useEffect(() => {
    console.log('Trigger');
    getUser(params.login);
    getUserRepos(params.login);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !user) {
    return <Spinner />;
  }

  const {
    name,
    avatar_url,
    location,
    bio,
    company,
    login,
    html_url,
    blog,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user;

  return (
    <Fragment>
      <Link to='/' className='btn btn-light'>
        Back to Search
      </Link>
      Hireable: {''}
      {hireable ? (
        <i className='fa fa-check text-success' />
      ) : (
        <i className='fa fa-times-circle text-danger' />
      )}
      <div className='card grid-2'>
        <div className='all-center'>
          <img
            src={avatar_url}
            alt=''
            className='round-img'
            style={{ width: '150px' }}
          />
          <h1>{name}</h1>
          <p>{location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a href={html_url} className='btn btn-dark my-1'>
            Visit Github Profile
          </a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>me:</strong> {login}
                </Fragment>
              )}
            </li>
            <li>
              {company && (
                <Fragment>
                  <strong>Company:</strong> {company}
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <strong>Website:</strong> {blog}
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className='card text-center'>
        <div className=' badge badge-primary'>Followers: {followers}</div>
        <div className=' badge badge-success'>Following: {following}</div>
        <div className=' badge badge-light'>Public Repos: {public_repos}</div>
        <div className=' badge badge-dark'>Public Gists: {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  );
};

export default User;
