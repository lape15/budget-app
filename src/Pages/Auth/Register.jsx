import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { currency } from "./currency";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TimelineLite, Power3 } from "gsap";
import { makeAuthenticatedApiCall } from "../Api.js";

const url = "https://atumaatu.herokuapp.com/v1/users";

const Register = (props) => {
  const [authenticationError, setAuthenticationError] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  if (user) {
    props.history.push("/dashboard");
    localStorage.setItem("user", JSON.stringify(user.token));
  }
  let tl = new TimelineLite();
  useEffect(() => {
    tl.from(".register", 3, { y: 10, ease: Power3.easeOut });
  }, []);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      currency: "NGN",
    },

    validationSchema: Yup.object({
      firstname: Yup.string()
        .min(2, "First name must be greater than 2 characters")
        .required("Required")
        .matches(
          /[A-Za-z0-9 ]+$/,
          "First name must  not contain special characters"
        ),

      lastname: Yup.string()
        .min(2, "Last name must be greater than 2 characters")
        .required("Required")
        .matches(
          /[A-Za-z0-9 ]+$/,
          "Last name must not a contain special character"
        ),

      email: Yup.string()
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Email must be valid"
        )
        .required("Required"),

      password: Yup.string()
        .min(6, "Password is too short")
        .required("Required"),

      confirmPassword: Yup.string()
        .min(6, "Password is too short")
        .oneOf([Yup.ref("password")], "Passwords do not match"),

      currency: Yup.string().required("Required or default set to NGN"),
    }),

    onSubmit: (values) => {
      setLoading(true);
      let users = {
        user: {
          firstname: values.firstname,
          lastname: values.lastname,
          email: values.email,
          password: values.password,
          password_confirmation: values.confirmPassword,
          currency: values.currency,
        },
      };

      const responses = makeAuthenticatedApiCall("post", url, users);
      responses
        .then((response) => {
          setLoading(false);
          setUser(response.data.payload);
        })
        .catch((error) => {
          if (error && error.response) {
            setLoading(false);
            setAuthenticationError(error.response.data.error);
          }
        });
    },
  });

  return (
    <form className="register" onSubmit={formik.handleSubmit}>
      {authenticationError ? <h3>{authenticationError}</h3> : null}
      <div className="w-80 first-wrapper">
        <div className="w-40">
          <label className="name">First name</label>
          <input
            type="text"
            name="firstname"
            {...formik.getFieldProps("firstname")}
            className={`${
              formik.touched.firstname && formik.errors.firstname
                ? "border-red"
                : ""
            }`}
          />
          {formik.touched.firstname && formik.errors.firstname ? (
            <span className="error">
              <i className="fas fa-times"></i>
              {formik.errors.firstname}
            </span>
          ) : null}
        </div>
        <div className="w-40">
          <label className="last-name">Last name</label>
          <input
            type="text"
            name="lastname"
            {...formik.getFieldProps("lastname")}
            className={`${
              formik.touched.lastname && formik.errors.lastname
                ? "border-red"
                : ""
            }`}
          />
          {formik.touched.lastname && formik.errors.lastname ? (
            <span className="error">
              <i className="fas fa-times"></i>
              {formik.errors.lastname}
            </span>
          ) : null}
        </div>
      </div>
      <div className="w-80">
        <label className="email">Email</label>{" "}
        <em>So you can log into your account</em>
        <input
          type="email"
          name="email"
          {...formik.getFieldProps("email")}
          className={`${
            formik.touched.email && formik.errors.email ? "border-red" : ""
          }`}
        />
        {formik.touched.email && formik.errors.email ? (
          <span className="error">
            <i className="fas fa-times"></i>
            {formik.errors.email}
          </span>
        ) : null}
      </div>
      <div className="w-80 pas">
        <label className="password">Password</label>
        <em>To keep your account secure</em>
        <input
          type="password"
          name="password"
          {...formik.getFieldProps("password")}
          className={`${
            formik.touched.password && formik.errors.password
              ? "border-red"
              : ""
          }`}
        />
        {formik.touched.password && formik.errors.password ? (
          <span className="error">
            <i className="fas fa-times"></i>
            {formik.errors.password}
          </span>
        ) : null}
      </div>
      <div className="w-80 pas">
        <label className="conPassword">Confirm password</label>
        <em>To verify your password</em>
        <input
          type="password"
          name="confirmPassword"
          {...formik.getFieldProps("confirmPassword")}
          className={`${
            formik.touched.confirmPassword && formik.errors.confirmPassword
              ? "border-red"
              : ""
          }`}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <span className="error">
            <i className="fas fa-times"></i>
            {formik.errors.confirmPassword}
          </span>
        ) : null}
      </div>
      <div className="w-80 sel">
        <label className="cur">Currency</label>
        <em>To verify your currency</em>
        <select name="currency" {...formik.getFieldProps("currency")}>
          {currency.map((cur, index) => {
            return (
              <option value={cur.cc} key={index}>
                {cur.name} - {cur.symbol}
              </option>
            );
          })}
        </select>
      </div>
      <div className="w-80">
        <button type="submit" disabled={loading}>
          Create your free account
          {loading && <i class="fas fa-spinner"></i>}
        </button>
      </div>
      <div className="w-80 back">
        {" "}
        Have an account already? Go to{" "}
        <Link to="/login" className="link">
          Login
        </Link>{" "}
      </div>
    </form>
  );
};

export default Register;
