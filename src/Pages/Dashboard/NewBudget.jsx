import React, { useState } from "react";
import { makeBudgetCall } from "../Api.js";
import * as Yup from "yup";
import { useFormik } from "formik";

const NewBudget = (props) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      income: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Cannot be blank"),

      income: Yup.number().required("Cannot be blank"),
    }),

    onSubmit: (values) => {
      setLoading(true);
      const responses = makeBudgetCall("post", {
        name: values.name,
        income: values.income,
      });

      responses
        .then((response) => {
          setLoading(false);

          props.history.push("/dashboard");
        })
        .catch((error) => {
          setLoading(false);
          console.log({ error });
        });
    },
  });

  return (
    <div className="create-box">
      <div className="form-box">
        <form onSubmit={formik.handleSubmit}>
          <div className="w-100">
            <label className={`${formik.values.name ? "shrink" : ""}`}>
              Name
            </label>
            <input
              type="text"
              name="name"
              {...formik.getFieldProps("name")}
              className={`${formik.values.name ? "border-green" : ""}`}
            />
          </div>
          <div className="w-100">
            <label className={`${formik.values.income ? "shrink" : ""}`}>
              Income
            </label>
            <input
              type="number"
              name="income"
              {...formik.getFieldProps("income")}
              className={`${formik.values.number ? "border-green" : ""}`}
            />
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
