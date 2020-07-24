import React, { useState } from "react";
import { makeAuthenticatedApiCall } from "../Api.js";
import * as Yup from "yup";
import { useFormik } from "formik";

const NewBudget = (props) => {
  const [loading, setLoading] = useState(false);
  const [createError, setCreateError] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      income: "",
      budgeted_cost: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Cannot be blank"),

      income: Yup.number().required("Cannot be blank"),
      budgeted_cost: Yup.number().required("Cannot be blank"),
    }),

    onSubmit: (values) => {
      const { name, income, budgeted_cost } = values;
      setLoading(true);
      const responses = makeAuthenticatedApiCall("post", "budgets", {
        name,
        income,
        budgeted_cost,
      });

      responses
        .then(() => {
          setLoading(false);
          props.history.push("/dashboard");
        })
        .catch((error) => {
          setLoading(false);

          const {
            response: { data },
          } = error;
          for (const key in data) {
            setCreateError(key + " " + data[key][0]);
          }
        });
    },
  });

  return (
    <div className="create-box">
      <div className="form-box">
        <form onSubmit={formik.handleSubmit}>
          <div className="w-100 error-box">
            {createError ? <span>{createError}</span> : null}{" "}
          </div>
          <div className="w-100">
            <label className={`${formik.values.name ? "shrink" : ""}`}>
              Name
            </label>
            <input
              type="text"
              name="name"
              {...formik.getFieldProps("name")}
              className={`${
                formik.values.name
                  ? "border-green"
                  : formik.touched.name && formik.errors.name
                  ? "border-red"
                  : ""
              }`}
            />
            {formik.touched.name && formik.errors.name ? (
              <span className="error">
                <i className="fas fa-times"></i>
                {formik.errors.name}
              </span>
            ) : null}
          </div>
          <div className="w-100">
            <label className={`${formik.values.income ? "shrink" : ""}`}>
              Income
            </label>
            <input
              type="number"
              name="income"
              {...formik.getFieldProps("income")}
              className={`${
                formik.values.income
                  ? "border-green"
                  : formik.touched.income && formik.errors.income
                  ? "border-red"
                  : ""
              }`}
            />
            {formik.touched.income && formik.errors.income ? (
              <span className="error">
                <i className="fas fa-times"></i>
                {formik.errors.income}
              </span>
            ) : null}
          </div>

          <div className="w-100">
            <label className={`${formik.values.budgeted_cost ? "shrink" : ""}`}>
              Budgeted Cost
            </label>
            <input
              type="number"
              name="budgeted_cost"
              {...formik.getFieldProps("budgeted_cost")}
              className={`${
                formik.values.budgeted_cost
                  ? "border-green"
                  : formik.touched.budgeted_cost && formik.errors.budget_cost
                  ? "border-red"
                  : ""
              }`}
            />
            {formik.touched.budgeted_cost && formik.errors.budgeted_cost ? (
              <span className="error">
                <i className="fas fa-times"></i>
                {formik.errors.budgeted_cost}
              </span>
            ) : null}
          </div>

          <div className="w-100">
            <button type="submit" disabled={loading} className="btn1">
              Create budget {loading && <i className="fas fa-spinner"></i>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default NewBudget;
