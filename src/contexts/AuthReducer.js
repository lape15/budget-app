import React, { createContext, useReducer } from "react";

export const BudgetsContext = createContext();
const initialState = {
  loading: false,
  budgets: [],
  budget: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_BUDGETS_REQUESTS":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_BUDGETS":
      return {
        ...state,
        loading: false,
        budgets: action.payload,
      };

    case "FETCH_BUDGETS_FAILURE":
      return {
        ...state,
      };

    case "FETCH_SINGLE_BUDGET":
      return {
        ...state,
        loading: false,
        budget: action.payload,
      };
    default:
      return initialState;
  }
};

const BudgetsContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <BudgetsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </BudgetsContext.Provider>
  );
};

export default BudgetsContextProvider;
