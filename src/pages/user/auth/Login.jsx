import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/slices/User/userSlice";
import ForgotPassword from "./ForgotPassword";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  useEffect(() => {
    if(JSON.parse(localStorage.getItem("trust-account"))?.token) {
      navigate("/bank-statement");
    }
  },[]);

  const [showPassword, setShowPassword] = useState(false);
  const [showForgetModal, setShowForgetModal] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    // phone: Yup.string().required('Phone number is required').matches(/^\d+$/, 'Phone number must only contain numbers'),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleSubmit = async (values) => {
    dispatch(login(values))
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  return (
    <div className="sign-up-sec">
      <div className="container-fluid">
        <div className="sign-up-inr">
          <div className="row">
            <div className="sign-up-left col-lg-5">
              <div className="sign-up-left-inr">
                <div className="sign-sec-head">
                  <h1>
                    Trust Account <span>Reconciliation</span>
                  </h1>
                </div>
                <div className="sign-img">
                  <img src="images/sign-up-img.png" alt="Image" />
                </div>
                <div className="sign-content-slider-wrp">
                  <div className="sign-content-slider">
                    <div className="sign-content-slider-item">
                      <div className="sign-content-slider-item-inr">
                        <p>
                          Simplifying trust account management by automating
                          monthly reconciliations with bank statements.
                        </p>
                      </div>
                    </div>
                    <div className="sign-content-slider-item">
                      <div className="sign-content-slider-item-inr">
                        <p>
                          Simplifying trust account management by automating
                          monthly reconciliations with bank statements.
                        </p>
                      </div>
                    </div>
                    <div className="sign-content-slider-item">
                      <div className="sign-content-slider-item-inr">
                        <p>
                          Simplifying trust account management by automating
                          monthly reconciliations with bank statements.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sign-up-right col-lg-7">
              <div className="sign-right-inr-wrp">
                <div className="signup-top-head">
                  <div className="signup-option">
                    Don't have an account? <Link to="/signup">SIGN UP NOW</Link>
                  </div>
                </div>
                <div className="sign-up-right-inr">
                  <div className="signup-form-head">
                    <h2>Sign In</h2>
                  </div>
                  <div className="signup-form">
                    <Formik
                      initialValues={{
                        email: "",
                        // phone: "",
                        password: "",
                      }}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      <Form>
                        <div className="form-fields">
                          <div className="input-grp">
                            <label>Email</label>
                            <Field
                              type="email"
                              name="email"
                              placeholder="Enter your Email"
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="error"
                            />
                          </div>
                          {/* <div className="input-grp">
                            <label>Phone</label>
                            <Field
                              type="tel"
                              name="phone"
                              placeholder="Enter your Phone number"
                            />
                            <ErrorMessage
                              name="phone"
                              component="div"
                              className="error"
                            />
                          </div> */}
                          <div className="input-grp">
                            <label>Password</label>
                            <Field
                              type={showPassword ? "text" :"password"}
                              name="password"
                              placeholder="Enter your Password"
                            />
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="error"
                            />
                            <button type="button" className="toggle-btn" onClick={() => setShowPassword(!showPassword)}>
                              <img src="./images/eye-open.png" alt="Icon" />
                            </button>
                          </div>
                          <a className="forgot-pass cursor-pointer" onClick={() => setShowForgetModal(true)}>
                            Forgot password ?
                          </a>
                        </div>
                        <input type="submit" value="GET STARTED" />
                      </Form>
                    </Formik>
                  </div>
                </div>

                <div className="help-link">
                  <img src="images/i-btn.svg" alt="Help Icon" />
                  <a href="#url">Need help?</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="sign-popup-outer popup-wrp forgot-password">
        <div className="pop-overlay"></div>
        <div className="pop-up-inr-wrp">
          <div className="sign-popup">
            <div className="close-btn">
              <i className="fa-solid fa-times"></i>
            </div>
            <div className="sign-pop-head">
              <h2>Forgot Password</h2>
            </div>
            <p className="pop-info">
              Enter the Email/Phone number associated with your account.
            </p>
            <form>
              <div className="signup-form">
                <div className="form-fields">
                  <div className="input-grp">
                    <label>Email/Phone </label>
                    <input
                      type="text"
                      placeholder="Enter your Email/Phone"
                      required
                    />
                  </div>
                </div>
                <input type="submit" value={loading ? "Loading..." :"Submit"} disabled={loading} />
              </div>
            </form>
          </div>
        </div>
      </div> */}
      <ForgotPassword show={showForgetModal} handleClose={() => setShowForgetModal(false)} />
    </div>
  );
};

export default Login;
