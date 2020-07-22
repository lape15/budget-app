import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { makeAuthenticatedApiCall } from "../Api.js";

const AddItem = ({ handleToggleItem, id, setBudget }) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      budgeted_cost: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Cannot be blank"),

      budgeted_cost: Yup.number().required("Cannot be blank"),
    }),

    onSubmit: (values) => {
      let items = [];
      items.push(values);
      setLoading(true);

      const responses = makeAuthenticatedApiCall("post", "budget_memberships", {
        id,
        items,
      });

      responses
        .then((response) => {
          setLoading(false);
          setBudget(response.data.payload);
          handleToggleItem();
        })
        .catch((error) => {
          setLoading(false);
          console.log({ error });
        });
    },
  });

  return (
    <div className="add-box">
      <div className="btn-box">
        <button onClick={handleToggleItem}>Close</button>
      </div>
      <form onSubmit={formik.handleSubmit}>
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
          <label className={`${formik.values.budgeted_cost ? "shrink" : ""}`}>
            Budgeted_cost
          </label>
          <input
            type="number"
            name="budgeted_cost"
            {...formik.getFieldProps("budgeted_cost")}
            className={`${
              formik.values.budgeted_cost
                ? "border-green"
                : formik.touched.budgeted_cost && formik.errors.budgeted_cost
                ? "border-red"
                : ""
            }`}
          />
          {formik.touched.budgeted_cost && formik.errors.budgeted_cost ? (
            <span className="error">
              <i className="fas fa-times"></i>
              {formik.errors.name}
            </span>
          ) : null}
        </div>
        <div className="w-100">
          <button type="submit" className="btn1">
            Create item {loading && <i className="fas fa-spinner"></i>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
