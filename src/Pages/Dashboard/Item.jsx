import React, { useState, useContext } from "react";
import EditItem from "./EditItem";
import { BudgetsContext } from "../../contexts/AuthReducer";
import { makeAuthenticatedApiCall } from "../Api.js";

const Item = ({ item, id }) => {
  const [edit, setEdit] = useState(false);
  const { dispatch } = useContext(BudgetsContext);

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleItemDelete = (itemId) => {
    let responses = makeAuthenticatedApiCall(
      "delete",
      `budget_memberships/${id}`,
      {
        bud_mem_id: itemId,
      }
    );
    responses.then((response) => {
      dispatch({
        type: "FETCH_SINGLE_BUDGET",
        payload: response.data.payload,
      });
    });
  };

  return (
    <div key={item.item_id} className="item">
      <div className="descs">
        <div className="value">{item.name}</div>
      </div>
      <div className="descs">
        <div className="value"> {item.budgetedCost.toLocaleString("en")}</div>
      </div>
      <div className="descs">
        <div className="value"> {item.actualCost.toLocaleString("en")}</div>
      </div>
      <div className="descs">
        <div className="value">{!item.executed ? "false" : "true"}</div>
      </div>
      <div className="icons">
        <div className="value">
          <i className="fas fa-edit edit" onClick={handleEdit}></i>
          <i
            className="fas fa-trash"
            onClick={() => handleItemDelete(item.bud_mem_id)}
          ></i>
        </div>
      </div>
      {edit ? <EditItem id={id} item={item} handleEdit={handleEdit} /> : null}
    </div>
  );
};
export default Item;
