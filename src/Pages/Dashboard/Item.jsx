import React, { useState } from "react";
import EditItem from "./EditItem";

const Item = ({ item, id, setBudget }) => {
  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    setEdit(!edit);
  };

  return (
    <div key={item.item_id} className="item">
      <div className="desc">
        <div className="value">{item.name}</div>
      </div>
      <div className="desc">
        <div className="value"> {item.budgetedCost}</div>
      </div>
      <div className="desc">
        <div className="value"> {item.actualCost}</div>
      </div>
      <div className="desc">
        <div className="value">{!item.executed ? "false" : "true"}</div>
      </div>
      <i className="fas fa-edit edit" onClick={handleEdit}></i>
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
