import {
    SET_EXPENSES,
    REMOVE_TRANSACTION,
    ADD_EXPENSE,
    MONTH_PREVIEW,
    GET_ERRORS
  } from "../actions/types";
  
  const initialState = {
    expenses: [],
    expense: null,
    month: [],
    loading: true,
    error: {}
  };
  
  export default function(state = initialState, action) {
      const { type, payload } = action
    switch (action.type) {
      case SET_EXPENSES:
        return {
          ...state,
          expenses: action.payload
        };
      case ADD_EXPENSE:
        return {
          ...state,
          expenses: [...state.expenses, action.payload]
        };
      case REMOVE_TRANSACTION:
        return {
            ...state,
            expenses: state.expenses.filter(expense => expense._id !== payload),
            loading: false
        };
      case MONTH_PREVIEW:
        return {
          ...state,
          month: payload,
          loading: false
        }
      case GET_ERRORS:
        return {
          ...state,
          error: payload,
          loading: false
        }
      default:
        return state;
    }
  }
  