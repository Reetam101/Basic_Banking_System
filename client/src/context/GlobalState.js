import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

import axios from 'axios';

// Initial State
const initialState = {
  users: [],
  transactions: [],
  error: null,
  loading: true
}

// Create Context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  async function getUsers() {
    try {
      const res = await axios.get('/api/v1/users');

      dispatch({
        type: 'GET USERS',
        payload: res.data.data
      });
    } catch(err) {
      console.log(err);
    }

  }

  async function getSingleUser(id) {
    try {
      const res = await axios.get(`/api/v1/user/${id}`)
      console.log(res.data.data);
      dispatch({
        type: 'GET A USER',
        payload: res.data.data
      })
    } catch (err) {
      console.log(err);
    }
  }

  async function addUser(user) {
    const config = {
      headers: {
        'Content-Type': 'application/json'        
      }
    };

    try {
      const res = await axios.post('/api/v1/users', user, config);
      dispatch({
        type: 'ADD USER',
        payload: res.data.data
      })
    } catch(err) {
      console.log(err);
      dispatch({
        type: 'USER ERROR',
        payload: err.response.data.error
      })
    }
  }

  async function getTransactions() {
    try {
      const res = await axios.get('/api/v1/transactions');

      dispatch({
        type: 'GET TRANSACTIONS',
        payload: res.data.data
      });
    } catch(err) {
      console.log(err);
    }
  }

  async function addTransaction(transaction) {
    const config = {
      headers: {
        'Content-Type': 'application/json'        
      }
    };

    try {
      const res = await axios.post('/api/v1/makeTransaction', transaction, config);
      dispatch({
        type: 'ADD TRANSACTION',
        payload: res.data.data
      })

    } catch(err) {
      console.log(err);
      dispatch({
        type: 'TRANSACTION ERROR',
        payload: err.response.data.error
      })
    }

  }

  return (<GlobalContext.Provider value={{
    users: state.users,
    transactions: state.transactions,
    error: state.error,
    loading: state.loading,
    getUsers,
    getSingleUser,
    addUser,
    getTransactions,
    addTransaction
  }}>
    {children}
  </GlobalContext.Provider>
  )
}