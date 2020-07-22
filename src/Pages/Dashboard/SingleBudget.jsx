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
  const [edit, setEdit] = useState(false);

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

  const handleEdit = () => {
    setEdit(!edit);
  };
  return (
    <div className="container">
      {loading ? <Loader /> : null}
      {budget ? (
        <div className="item-box">
          <div className="btn-box">
            <button onClick={handleToggleItem}>Add item</button>
          </div>
          <div className="desc name">
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

          {budget.items.length > 0 ? (
            <div className="items">
              <div className="title">
                <div className="w-30"> Item</div>
                <div className="w-30"> Budget</div>
                <div className="w-30"> Executed</div>
              </div>
              {budget.items.map((item) => {
                return (
                  <div key={item.item_id} className="item">
                    <div className="desc">
                      <div className="value">{item.name}</div>
                    </div>
                    <div className="desc">
                      <div className="value"> {item.budgetedCost}</div>
                    </div>
                    <div className="desc">
                      <div className="value">
                        <input type="checkbox" />
                      </div>
                    </div>

                    <i className="fas fa-edit edit"></i>
                  </div>
                );
              })}
            </div>
          ) : null}
          {toggleItem ? (
            <AddItem
              handleToggleItem={handleToggleItem}
              id={id}
              setBudget={setBudget}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default SingleBudget;
