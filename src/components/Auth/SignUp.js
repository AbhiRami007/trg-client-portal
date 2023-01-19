import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignInOptions from "../Shared/SignInOptions";
import Modal from "../Shared/Modal";
import Auth from "../Shared/Auth";
import { useForm } from "react-hook-form";
import { resendOtp, register, verifyEmailOtp } from "../../requests/Auth";
import OtpInput from "../Shared/OtpInput";
import { useAuth } from "../../core/Auth";
import { toast, ToastContainer } from "react-toastify";

function SignUp() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const { saveAuth, setCurrentUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [password, setPass] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [invalidMsg, setInvalidMsg] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const toggle = () => {
    setModal(!modal);
  };

  const otpData = (value) => {
    setIsValid(true);
    setInvalidMsg("");
    setOtp(value);
  };

  const submitOtp = async () => {
    try {
      let verifyOtp;
      if (!otp) {
        setIsValid(false);
        setInvalidMsg("Otp is required");
      } else {
        verifyOtp = await verifyEmailOtp(otp, email);
      }
      if (verifyOtp.data?.data) {
        toast.success("Registration Successful");
        setModal(false);
        navigate("/auth/login", { state: { email, password } });
      }
    } catch (error) {
      setIsValid(false);
      setInvalidMsg(error.response.data.message);
    }
  };

  const ResendOtp = async () => {
    await resendOtp(email, "");
  };

  const onSubmit = async (data) => {
    try {
      const auth = await register(data);
      setEmail(data.email);
      setPass(data.password);
      saveAuth(auth);
      if (auth) {
        setModal(true);
      }
    } catch (error) {
      saveAuth(undefined);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="signup-main-cont">
      <ToastContainer limit={1} draggablePercent={60} />
      <Modal
        open={modal}
        close={toggle}
        content={<OtpInput value={otp} valueLength={6} onChange={otpData} />}
        submit={submitOtp}
        isValid={isValid}
        invalidMsg={invalidMsg}
        resend={ResendOtp}
        cancel={!modal}
      />
      <Auth signinPage={true} />

      <div className="signup-input-field">
        <div className="right-signup-div1">
          <span>
            Already a member?{" "}
            <Link to="/signin" className="register-link">
              {" "}
              Sign in
            </Link>
          </span>
        </div>
        <div className="right-signup-div2">
          <h3 className="signup-header">Register Now</h3>
          <p className="signup-para">Discover your dream job here!</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="right-signup-div3">
          <div className="form-div">
            <input
              className="signup-input"
              {...register("name", { required: true })}
              placeholder="Full Name*"
            />
            {errors.name && (
              <span className="validation">Name is required</span>
            )}

            <input
              className="signup-input"
              {...register("email", { required: true })}
              placeholder="Email*"
            />
            {errors.email && (
              <span className="validation">Email is required</span>
            )}
            <input
              className="signup-input"
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              placeholder="Password*"
            />
            <i
              className={showPassword ? " fa fa-eye" : "fa fa-eye-slash"}
              style={{ position: "absolute", right: "14%", top: "52%" }}
              aria-hidden="true"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            ></i>
            {errors.password && (
              <span className="validation">Password is required</span>
            )}
            <input
              placeholder="Confirm Password*"
              className="signup-input"
              type={showConfirmPassword ? "text" : "password"}
              {...register("password_confirmation", { required: true })}
            />
            <i
              className={showConfirmPassword ? " fa fa-eye" : "fa fa-eye-slash"}
              style={{ position: "absolute", right: "14%", top: "63%" }}
              aria-hidden="true"
              onClick={() => {
                setConfirmShowPassword(!showConfirmPassword);
              }}
            ></i>
            {errors.password_confirmation && (
              <span className="validation">Confirm Password is required</span>
            )}
            {/* <p style={{ fontSize: '18px', cursor: 'pointer' }}>forget password</p> */}
            <button className="signin-btn">Sign up</button>
          </div>
        </form>
        <SignInOptions />
      </div>
    </div>
  );
}

export default SignUp;
