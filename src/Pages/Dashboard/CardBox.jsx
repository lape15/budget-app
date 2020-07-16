import React, { useState } from "react";
import EditBudget from "./EditBudget";
import { makeUpdateApiCall } from "../Api.js";

const CardBox = ({ item, setBudgets }) => {
  const [edit, setEdit] = useState(true);

  const handleEdit = () => {
    setEdit(!edit);
  };
  const deleteBudget = (id) => {
    let responses = makeUpdateApiCall("delete", id);
    responses.then((response) => {
      setBudgets(response.data.payload.budgets);
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
          {" "}
          <div className="desc">
            <div className="value b">{item.name}</div>
          </div>
          <div className="desc">
            <div className="value">
              {" "}
              <span>Income - </span>
              {item.income}
            </div>
          </div>
          <div className="desc">
            <div className="value">
              {" "}
              <span>Actual cost - </span>
              {item.actualCost}
            </div>
          </div>
          <div className="desc">
            {" "}
            <div className="value">
              {" "}
              <span>Budget - </span>
              {item.budgetedCost}
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
          setBudgets={setBudgets}
        />
      )}
    </div>
  );
};

export default CardBox;
