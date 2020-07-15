import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { TimelineLite, Power3 } from "gsap";
import { makeUnAuthenticatedApiCall } from "../Api.js";
import { withRouter } from "react-router-dom";

const path = "sessions";

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [authenticationError, setAuthenticationError] = useState(null);
  const [tl] = useState(
    new TimelineLite({
      paused: true,
    })
  );

  useEffect(() => {
    tl.from(".login", 3, { y: 30, ease: Power3.easeOut });
    tl.play();
  }, [tl]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Email must be valid"
        )
        .required("Required"),

      password: Yup.string()
        .min(6, "Password is too short")
        .required("Required"),
    }),

    onSubmit: (values) => {
      setLoading(true);
      const responses = makeUnAuthenticatedApiCall("post", path, {
        email: values.email,
        password: values.password,
      });

      responses
        .then((response) => {
          setLoading(false);
          localStorage.setItem("user", JSON.stringify(response.data.payload));
          props.history.push("/dashboard");
        })
        .catch((error) => {
          setLoading(false);
          if (error && error.response) {
            setAuthenticationError(error.response.data.error);
          }
        });
    },
  });

  return (
    <form className="login" onSubmit={formik.handleSubmit}>
      <div className="w-80 error-box">
        {authenticationError ? <span>{authenticationError}</span> : null}{" "}
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
      <div className="w-80">
        <button type="submit" disabled={loading}>
          Login
          {loading && <i className="fas fa-spinner"></i>}
        </button>
      </div>
      <div className="w-80 back">
        {" "}
        Don't have an account ? Go to{" "}
        <Link to="/register" className="link">
          Register
        </Link>{" "}
      </div>
    </form>
  );
};
export default withRouter(Login);
