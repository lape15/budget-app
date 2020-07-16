import React, { useState } from "react";
import CardBox from "./CardBox";

const CardContainer = ({ items, setBudgets }) => {
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
            <i className="fas fa-square-full" onClick={handleView}>
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

        {items.map((item, index) => {
          return <CardBox item={item} key={index} setBudgets={setBudgets} />;
        })}
      </div>
    </div>
  );
};
export default CardContainer;
