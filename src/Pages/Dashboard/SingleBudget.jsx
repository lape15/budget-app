import React, { useState, useEffect, useContext } from "react";
import { makeAuthenticatedApiCall } from "../Api.js";
import Loader from "./Loader";
import AddItem from "./AddItem";
import { BudgetsContext } from "../../contexts/AuthReducer";
import Item from "./Item";

const SingleBudget = (props) => {
  const { dispatch, state } = useContext(BudgetsContext);

  const {
    match: {
      params: { id },
    },
  } = props;

  const [toggleItem, setToggleItem] = useState(false);

  const handleToggleItem = () => {
    setToggleItem(!toggleItem);
  };

  useEffect(() => {
    dispatch({
      type: "FETCH_BUDGETS_REQUESTS",
    });
    const responses = makeAuthenticatedApiCall(
      "get",
      `budget_memberships/${id}`
    );
    responses
      .then((response) => {
        dispatch({
          type: "FETCH_SINGLE_BUDGET",
          payload: response.data.payload,
        });
      })
      .catch((error) => {
        console.log({ error });
        dispatch({
          type: "FETCH_BUDGETS_FAILURE",
        });
      });
  }, []);

  const { loading, budget } = state;
  console.log(state.budget);

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
            <div className="value">
              {budget.budget.income.toLocaleString("en")}
            </div>
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
              <div className="titles">
                <div className="w-24"> Item</div>
                <div className="w-24"> Budget Cost</div>
                <div className="w-24">Actual Cost</div>
                <div className="w-24"> Executed</div>
              </div>
              {budget.items.map((item) => {
                return <Item item={item} key={item.item_id} id={id} />;
              })}
            </div>
          ) : null}
          {toggleItem ? (
            <AddItem handleToggleItem={handleToggleItem} id={id} />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default SingleBudget;
