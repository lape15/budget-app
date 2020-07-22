import React, { useState, useEffect } from "react";
import { makeAuthenticatedApiCall } from "../Api.js";
import Loader from "./Loader";
import AddItem from "./AddItem";

const SingleBudget = (props) => {
  const {
    match: {
      params: { id },
    },
  } = props;
  const [budget, setBudget] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toggleItem, setToggleItem] = useState(false);

  const handleToggleItem = () => {
    setToggleItem(!toggleItem);
  };

  useEffect(() => {
    setLoading(true);
    const responses = makeAuthenticatedApiCall(
      "get",
      `budget_memberships/${id}`
    );
    responses
      .then((response) => {
        setLoading(false);
        setBudget(response.data.payload);
      })
      .catch((error) => {
        console.log({ error });
      });
    return () => {
      console.log("done");
      setBudget(null);
      setLoading(false);
    };
  }, []);

  return (
    <div className="container">
      {loading ? <Loader /> : null}
      {budget ? (
        <div className="item-box">
          <div className="btn-box">
            <button onClick={handleToggleItem}>Add item</button>
          </div>
          <div className="desc name">
            <div className="title ">Name</div>
            <div className="value b">{budget.budget.name}</div>
          </div>
          <div className="desc">
            <div className="title">Income</div>
            <div className="value">{budget.budget.income}</div>
          </div>
          <div className="desc">
            <div className="title">Created</div>
            <div className="value">
              {new Date(budget.budget.created_at).toDateString()}
            </div>
          </div>
          <div className="desc">
            <div className="title">Updated</div>
            <div className="value">
              {new Date(budget.budget.updated_at).toDateString()}
            </div>
          </div>
          <div className="desc">
            <div className="title">No of Items</div>
            <div className="value">{budget.items.length}</div>
          </div>
          {toggleItem ? (
            <AddItem handleToggleItem={handleToggleItem} id={id} />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default SingleBudget;
