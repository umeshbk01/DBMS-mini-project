import {
    SET_EXPENSES,
    GET_ERRORS,
    REMOVE_TRANSACTION,
    ADD_EXPENSE,
    MONTH_PREVIEW,
    CATEGORY_EXPENSE,
    GET_EXPENSES,
    UPDATE_EXPENSE,
    YEARLY_EXPENSE
  } from "./types";

  import api from '../utils/api';
  import { setAlert } from './alert';

  
  export const setExpenses = transactions => {
    return {
      type: SET_EXPENSES,
      payload: transactions
    };
  };
 
  export const getExpenses = () => async dispatch => {
    try {
      let res = await api.get('/expense/all');
    
      dispatch({
        type: GET_EXPENSES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
  export const yearlyExpense = () => async dispatch => {
    try {
      let res = await api.get('/expense/yearlyExpense');
      dispatch({
        type: YEARLY_EXPENSE,
        payload: res.data
      })

    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
  }
  export const categoryExpense = () => async dispatch => {
    try {
      let res = await api.get('/expense/categoryExpense');
      dispatch({
        type: CATEGORY_EXPENSE,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
  }
  export const monthPreview = () => async dispatch => {
    try {
      let res = await api.get('/expense/monthPreview');

      dispatch({
        type: MONTH_PREVIEW,
        payload: res.data
      })
    } catch (err) {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
  }

  export const addExpense = transaction => async dispatch => {
    try {
        const res = await api.post('/expense', transaction);
    
        dispatch({
          type: ADD_EXPENSE,
          payload: res.data
        });
    
        dispatch(setAlert('Expense Created', 'success'));
      } catch (err) {
        dispatch({
          type: GET_ERRORS,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
      }
  };
  
  export const updateExpense = (id, formData) => async dispatch => {
    try {
      const res = await api.put(`/expense/${id}`, formData);
      console.log(res.data);
      dispatch({
        type: UPDATE_EXPENSE,
        payload: res.data
      });
      dispatch(setAlert('Expense Updated', 'success'));
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
  
  export const deleteTransaction = id => async dispatch => {
    try {
        await api.delete(`/expense/${id}`);
    
        dispatch({
          type: REMOVE_TRANSACTION,
          payload: id
        });
    
        dispatch(setAlert('Expense Deleted', 'success'));
      } catch (err) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }
  };
  
  
  // export const getErrors = errors => {
  //   return {
  //     type: GET_ERRORS,
  //     payload: errors
  //   };
  // };