import React, {useReducer} from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';

import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../type';

const GithubState = props => {
    const initalState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initalState);

    // Search Users
    const searchUsers = async (text) => {
        setLoading();
    
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=853e9fb025a8ada733ba&secret_id=5f7d87fcf5de1992e9e26eeb5ab93d8ab10c6ae3`);
        
        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        });
    }
    // Get User
    const getUser = async (username) => {
        setLoading();
    
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=853e9fb025a8ada733ba&secret_id=5f7d87fcf5de1992e9e26eeb5ab93d8ab10c6ae3`);
        
        dispatch({
            type: GET_USER,
            payload: res.data
        });
    }
    // Get Repos
    const getUserRepos = async (username) => {
        setLoading();
    
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=853e9fb025a8ada733ba&secret_id=5f7d87fcf5de1992e9e26eeb5ab93d8ab10c6ae3`);
        
        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
    }

    // Clear Users
    const clearUsers = () => {
        dispatch({type: CLEAR_USERS});
    }

    // Set Loading
    const setLoading = () => dispatch({type: SET_LOADING});

    return <GithubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos
        }}
    >
        {props.children}
    </GithubContext.Provider>
}

export default GithubState;