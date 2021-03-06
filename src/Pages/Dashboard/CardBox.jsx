import React, { useState, useContext } from "react";
import EditBudget from "./EditBudget";
import { makeAuthenticatedApiCall } from "../Api.js";
import { Link } from "react-router-dom";
import { BudgetsContext } from "../../contexts/AuthReducer";

const CardBox = ({ item, setBudgets }) => {
  const { dispatch } = useContext(BudgetsContext);
  const [edit, setEdit] = useState(true);

  const handleEdit = () => {
    setEdit(!edit);
  };
  const deleteBudget = (id) => {
    let responses = makeAuthenticatedApiCall("delete", `budgets/${id}`);
    responses.then((response) => {
      dispatch({
        type: "FETCH_BUDGETS",
        payload: response.data.payload.budgets,
      });
    });
  };

  return (
    <div className="item" key={item.id}>
      {edit ? (
        <>
          <i
            className="fas fa-trash-alt trash"
            onClick={() => deleteBudget(item.id)}
          ></i>
          <i className="fas fa-edit edit" onClick={handleEdit}></i>
        </>
      ) : (
        <i className="fas fa-times close" onClick={handleEdit}></i>
      )}
      {edit ? (
        <>
          <div className="links-box">
            <Link to={`/dashboard/budgets/${item.id}`} className="links">
              View
            </Link>
          </div>
          <div className="desc">
            <div className="value b">{item.name}</div>
          </div>
          <div className="desc">
            <div className="value">
              {" "}
              <span>Income - </span>
              {item.income.toLocaleString("en")}
            </div>
          </div>
          <div className="desc">
            <div className="value">
              {" "}
              <span>Actual cost - </span>
              {item.actualCost.toLocaleString("en")}
            </div>
          </div>
          <div className="desc">
            {" "}
            <div className="value">
              {" "}
              <span>Budgeted Cost - </span>
              {item.budgetedCost.toLocaleString("en")}
            </div>
          </div>
          <div className="desc">
            {" "}
            <div className="value">
              <span>Items - </span>
              {item.itemCount}
            </div>
          </div>
          <div className="desc">
            {" "}
            <div className="value">
              <span>Created - </span>
              {new Date(item.createdAt).toDateString()}
            </div>
          </div>{" "}
        </>
      ) : (
        <EditBudget
          name={item.name}
          income={item.income}
          id={item.id}
          handleEdit={handleEdit}
        />
      )}
    </div>
  );
};

export default CardBox;
