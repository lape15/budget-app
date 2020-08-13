import React, { useEffect, useContext } from "react";
import { makeAuthenticatedApiCall } from "../Api.js";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import CardConatiner from "./CardContainer";
import { BudgetsContext } from "../../contexts/AuthReducer";
const Budgets = () => {
  const { dispatch, state } = useContext(BudgetsContext);
  useEffect(() => {
    dispatch({
      type: "FETCH_BUDGETS_REQUESTS",
    });
    const responses = makeAuthenticatedApiCall("get", "budgets");
    responses
      .then((response) => {
        dispatch({
          type: "FETCH_BUDGETS",
          payload: response.data.payload.budgets,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: "FETCH_BUDGETS_FAILURE",
        });
      });
  }, []);
  const { budgets, loading } = state;
  return (
    <div className="budgets">
      {loading ? (
        <Loader />
      ) : budgets.length > 0 ? (
        <CardConatiner items={budgets} />
      ) : (
        <div className="message-box">
          You currently have no budget{" "}
          <Link to="/dashboard/create-budget" className="link">
            Click
          </Link>
          <span>to create a budget.</span>
        </div>
      )}
    </div>
  );
};

export default Budgets;
