import React, { useState } from "react";
import { Modal, Button, Form, InputGroup, CloseButton } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { forgotPassword, resetPassword, verifyOtp } from "../../../redux/slices/User/userSlice";

const ForgotPassword = ({ show, handleClose }) => {
  const dispatch = useDispatch();

  const [step, setStep] = useState(1); // 1 -> Forgot Password, 2 -> OTP, 3 -> Reset Password
  const [email, setEmail] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: ""
  })
  const [otp, setOtp] = useState("");
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(forgotPassword({ email: email }))
      console.log(res)
      if (res) {
        console.log(res)
        setStep(2); // Proceed to OTP step
      }
    }
    catch (err) {
      console.log(err.payload.error)
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    console.log(otp)
    console.log(email)
    try {
      const res = await dispatch(verifyOtp({ email: email, otp: otp }))
      if (res) {
        setStep(3); // Proceed to Reset Password step
      }
    } catch (error) {
      console.error(error)
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();

    // Correctly destructure password state
    const { password: newPassword, confirmPassword } = password;
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log(
      email,
      otp
    )

    try {
      const res = await dispatch(resetPassword({
        email: email,
        newPassword: newPassword,
        confirmPassword: confirmPassword
      }));

      if (res.payload) {  // Ensure request was successful
        alert("Password has been reset successfully!");
        setStep(4); // Proceed to Success step
        handleClose(); // Close the modal
      } else {
        console.log(res)
        alert("Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("An error occurred. Please try again.");
    }
  };


  const handleOtpChange = (e, index) => {
    let value = e.target.value;

    // Allow only numbers
    if (!/^\d*$/.test(value)) return;

    let newOtp = otp.split("");
    newOtp[index] = value;
    setOtp(newOtp.join(""));

    // Move to the next input
    if (value && index < 3) {
      document.querySelectorAll(".otp-input")[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    // Handle backspace to go back
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      let newOtp = otp.split("");
      newOtp[index - 1] = "";
      setOtp(newOtp.join(""));
      document.querySelectorAll(".otp-input")[index - 1].focus();
    }
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword((prevState) => ({
      ...prevState,
      [name]: value, // Dynamically update password or confirmPassword
    }));
  };






  return (
    <>
      <Modal
        centered
        size="md"
        show={show}
        onHide={() => {
          setStep(1);
          handleClose();
        }}
        dialogClassName="custom-forgot-modal"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            borderRadius: "10px",
            maxWidth: "100%",
          }}
        >
          <div className="close-btn"
            onClick={handleClose} // replace with your close handler
          >
            ×
          </div>
        </div>



        <Modal.Header className="border-0 pb-0">
          <Modal.Title className="w-100 text-center fw-bold fs-2 text-dark mb-4">
            {step === 1
              ? "Forgot Password"
              : step === 2
                ? "Verification Code"
                : "Reset Password"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center pt-2">
          {step === 1 && (
            <>
              <p className="text-muted mb-4">
                Enter the Email/Phone number associated with your account.
              </p>
              <Form onSubmit={handleForgotSubmit}>
                <Form.Group>
                  <Form.Label className="float-start">Email/Phone</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your Email/Phone"
                    required
                  />
                </Form.Group>
                <Button type="submit" className="mt-4 w-40">
                  Submit
                </Button>
              </Form>
            </>
          )}

          {step === 2 && (
            <Form onSubmit={handleOtpSubmit}>
              <p className="text-muted mb-3">
                Enter the 4-digit verification code sent to your email.
              </p>
              <div className="d-flex justify-content-between gap-2 mb-3 otp-input-group">
                {[...Array(4)].map((_, index) => (
                  <Form.Control
                    key={index}
                    type="text"
                    maxLength="1"
                    className="otp-input"
                    value={otp[index] || ""}
                    onChange={(e) => handleOtpChange(e, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                  />
                ))}
              </div>

              <Button type="submit" className="w-100">
                Submit
              </Button>
            </Form>
          )}

          {step === 3 && (
            <Form onSubmit={handleResetSubmit}>
              <Form.Group>
                <Form.Label className="float-start">Create Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                    value={password.password}
                    placeholder="Create a new password"
                    required
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={togglePasswordVisibility}
                    type="button"
                  >
                    {passwordVisible ? "🙈" : "👁"}
                  </Button>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label className="float-start">Confirm Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={confirmPasswordVisible ? "text" : "password"}
                    name="confirmPassword"
                    onChange={handleChange}
                    value={password.confirmPassword}
                    placeholder="Confirm your password"
                    required
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={toggleConfirmPasswordVisibility}
                    type="button"
                  >
                    {confirmPasswordVisible ? "🙈" : "👁"}
                  </Button>
                </InputGroup>
              </Form.Group>

              <Button type="submit" className="mt-4 w-100">
                Submit
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>

      {/* Styling inside a <style> tag */}
      <style>{`
    .custom-forgot-modal .modal-content {
      border-radius: 20px;
      padding: 1rem 2rem;
      box-shadow: 0 0 25px rgba(0, 0, 0, 0.1);
      color:black
    }

    .otp-input {
      border: 1px solid #ced4da;
      border-radius: 0.5rem;
      text-align: center;
      font-size: 1.5rem;
      height: 50px;
      width: 50px;
    }

    .modal-body p {
      font-size: 0.95rem;
    }

    .form-label {
      font-weight: 500;
    }
    .close-btn {
      backgroundColor: #3182CE;
      color: #fff;
    }
  .otp-input {
  width: 25px;
  height: 25px;
  font-size: 1.2rem;
  text-align: center;
  border: none;
  border-radius: 8px;
  transition: 0.2s ease;
  outline: none;
  background-color: #fdfdfd;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}
.otp-input:focus {
  outline: none;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  background-color: #ffffff;
}

.otp-input-group {
  justify-content: center;
}

  `}</style>
    </>

  );
};

export default ForgotPassword;