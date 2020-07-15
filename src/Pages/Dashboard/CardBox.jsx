import React, { useState } from "react";

const CardBox = ({ items }) => {
  const [view, setView] = useState(true);

  const handleView = () => {
    setView(!view);
  };

  return (
    <div className="box">
      <div className={`${view ? "card-box" : "list-box"}`}>
        <div className="view">
          {view ? (
            <i className="fas fa-list" onClick={handleView}>
              List view
            </i>
          ) : (
            <i class="fas fa-square-full" onClick={handleView}>
              Card view
            </i>
          )}
        </div>
        <div className="title">
          <div className="w-30">Name</div>
          <div className="w-30">Income</div>
          <div className="w-30">Actual cost</div>{" "}
          <div className="w-30">Budget</div>
          <div className="w-30">Items</div>
          <div className="w-30">Created</div>
        </div>
        {items.map((item) => {
          return (
            <div className="item" key={item.id}>
              <i className="fas fa-edit"></i>
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardBox;
