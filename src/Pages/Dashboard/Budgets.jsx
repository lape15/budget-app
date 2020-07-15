import React, { useState, useEffect } from "react";
import { makeBudgetCall } from "../Api.js";
import CardBox from "./CardBox";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const responses = makeBudgetCall("get");
    responses
      .then((response) => {
        setLoading(false);
        setBudgets(response.data.payload.budgets);
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      setLoading(false);
      setBudgets([]);
      console.log("Clean up");
    };
  }, []);

  return (
    <div className="budgets">
      {loading ? (
        <Loader />
      ) : budgets.length > 0 ? (
        <CardBox items={budgets} />
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
