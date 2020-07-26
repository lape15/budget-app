import React, { useState } from "react";
import EditItem from "./EditItem";
import { makeAuthenticatedApiCall } from "../Api.js";

const Item = ({ item, id, setBudget }) => {
  const [edit, setEdit] = useState(false);

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
      setBudget(response.data.payload);
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
      {edit ? (
        <EditItem
          id={id}
          setBudget={setBudget}
          item={item}
          handleEdit={handleEdit}
        />
      ) : null}
    </div>
  );
};
export default Item;
