import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { makeAuthenticatedApiCall } from "../Api.js";

const AddItem = ({ handleToggleItem, id }) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      budgetedCost: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Cannot be blank"),

      budgetedCost: Yup.number().required("Cannot be blank"),
    }),

    onSubmit: (values) => {
      const { name, budgetedCost } = values;
      console.log(name, budgetedCost);
      //   setLoading(true);
      //   const responses = makeAuthenticatedApiCall("post", "budgets", {
      //     name,
      //     income,
      //   });

      //   responses
      //     .then(() => {
      //       setLoading(false);
      //        })
      //     .catch((error) => {
      //       setLoading(false);

      //       const {
      //         response: { data },
      //       } = error;
      //       for (const key in data) {
      //         setCreateError(key + " " + data[key][0]);
      //       }
      //     });
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
          <label className={`${formik.values.budgetedCost ? "shrink" : ""}`}>
            Budgeted_cost
          </label>
          <input
            type="number"
            name="budgetedCost"
            {...formik.getFieldProps("budgetedCost")}
            className={`${
              formik.values.budgetedCost
                ? "border-green"
                : formik.touched.budgetedCost && formik.errors.budgetedCost
                ? "border-red"
                : ""
            }`}
          />
          {formik.touched.budgetedCost && formik.errors.budgetedCost ? (
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
