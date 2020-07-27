import React, { useState } from "react";
import { makeAuthenticatedApiCall } from "../Api.js";

const EditItem = ({ handleToggleItem, id, setBudget, handleEdit, item }) => {
  const [loading, setLoading] = useState(false);

  const [editItem, setEditItem] = useState({
    bud_mem_id: item.bud_mem_id,
    name: item.name,
    budgeted_cost: Number(item.budgetedCost),
    actual_cost: Number(item.actualCost),
    executed: false,
  });

  const handleChange = (e) => {
    setEditItem({
      ...editItem,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(editItem);
    const responses = makeAuthenticatedApiCall(
      "put",
      `budget_memberships/${id}`,
      editItem
    );

    responses
      .then((response) => {
        setLoading(false);
        setBudget(response.data.payload);
        handleEdit();
      })
      .catch((error) => {
        setLoading(false);
        console.log({ error });
      });
  };

  return (
    <div className="add-box">
      <div className="btn-box">
        <button onClick={handleEdit}>Close</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="w-100">
          <label className={`${editItem.name ? "shrink" : ""}`}>Name</label>
          <input
            type="text"
            name="name"
            value={editItem.name}
            onChange={handleChange}
            className={`${editItem.name ? "border-green" : ""}`}
            disabled
          />
        </div>

        <div className="w-100">
          <label className={`${editItem.budgeted_cost ? "shrink" : ""}`}>
            Budgeted cost
          </label>
          <input
            type="number"
            name="budgeted_cost"
            onChange={handleChange}
            value={editItem.budgeted_cost}
            className={`${editItem.budgeted_cost ? "border-green" : ""}`}
          />
        </div>

        <div className="w-100">
          <label className={`${editItem.budgeted_cost ? "shrink" : ""}`}>
            Actual cost
          </label>
          <input
            type="number"
            name="actual_cost"
            value={editItem.actual_cost}
            onChange={handleChange}
            className={`${editItem.actual_cost ? "border-green" : ""}`}
          />
        </div>

        <div className="w-100-1">
          <label>
            Executed
            <input
              type="checkbox"
              name="executed"
              value={editItem.executed}
              onChange={(e) => {
                setEditItem({
                  ...editItem,
                  executed: true,
                });
              }}
              checked={editItem.executed ? true : false}
            />
          </label>
        </div>
        <div className="w-100">
          <button type="submit" className="btn1">
            Edit {loading && <i className="fas fa-spinner"></i>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditItem;
