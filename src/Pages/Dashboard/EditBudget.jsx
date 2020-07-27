import React, { useState } from "react";
import { useFormik } from "formik";

import { makeAuthenticatedApiCall } from "../Api.js";

const EditBudget = (props) => {
  const [loading, setLoading] = useState(false);

  const { setBudgets } = props;

  const formik = useFormik({
    initialValues: {
      name: props.name,
      income: props.income,
      budgeted_cost: props.budgetedCost,
    },

    onSubmit: (values) => {
      const { name, income, budgeted_cost } = values;
      setLoading(true);
      const responses = makeAuthenticatedApiCall("put", `budgets/${props.id}`, {
        name,
        income,
        budgeted_cost,
      });
      responses
        .then((response) => {
          setBudgets(response.data.payload.budgets);
          setLoading(false);
          props.handleEdit();
        })
        .catch((error) => {
          console.log({ error });
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="w-100">
        <label className={`${formik.values.name ? "shrink" : ""}`}>Name</label>
        <input type="text" name="name" {...formik.getFieldProps("name")} />
      </div>
      <div className="w-100">
        <label className={`${formik.values.income ? "shrink" : ""}`}>
          Income
        </label>
        <input
          type="number"
          name="income"
          {...formik.getFieldProps("income")}
        />
      </div>
      <div className="w-100">
        <label className={`${formik.values.budgeted_cost ? "shrink" : ""}`}>
          Budgeted Cost
        </label>
        <input
          type="number"
          name="budgeted_cost"
          {...formik.getFieldProps("budgeted_cost")}
        />
      </div>

      <div className="w-100">
        <button type="submit" disabled={loading} className="btn1">
          Edit budget {loading && <i className="fas fa-spinner"></i>}
        </button>
      </div>
    </form>
  );
};

export default EditBudget;
