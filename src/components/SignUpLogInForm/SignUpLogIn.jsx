import { useState } from "react";
// Axios
import axios from "axios";
// Css
import "./SignUpLogIn.css";
// React toastify library
import { toast } from "react-toastify";


const SignUpLogIn = () => {
  // useState for managin login or sign up
  const [login, setLogin] = useState(false);

  const [loading, setLoading] = useState(false);

 

  const initial = {
    name: "",
    email: "",
    userName: "",
    loginId: "",
    password: "",
  };

  const [formDetails, setFormDetails] = useState(initial);

  function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    if (login) {
      LogIn();
    } else {
      SignUp();
    }
  }

  async function SignUp() {
    try {
      const response = await axios.post(
        `https://my-todos-0fxd.onrender.com/signup`,
        {
          name: formDetails.name,
          email: formDetails.email,
          userName: formDetails.userName,
          password: formDetails.password,
        },
        { withCredentials: true }
      );

      if (response.data.status === 201) {
        setFormDetails(initial);
        toast.success(response.data.message);
        setLoading(false);
        localStorage.setItem('token',response.data.data.token);
        window.location.reload();
      } else {
        setLoading(false);
        toast.error(response.data.message);
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  }

  async function LogIn() {
    try {
      const response = await axios.post(
        `https://my-todos-0fxd.onrender.com/login`,
        {
          loginId: formDetails.loginId,
          password: formDetails.password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.status !== 400) {
        setFormDetails(initial);
        toast.success(response.data.message);
        setLoading(false);
        localStorage.setItem('token',response.data.data.token);
        window.location.reload();
      } else {
        setLoading(false);
        toast.error(response.data.message);
      }

      //   Reseting form data
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  }

  return (
    <>
      {!login ? (
        <h1 className="Form-type">Sign Up</h1>
      ) : (
        <h1 className="Form-type">Log In</h1>
      )}

      <div className="form-holder">
        <form onSubmit={handleSubmit} className="SignupLoginForm">
          {!login ? (
            <input
              onInput={(e) => {
                setFormDetails({ ...formDetails, name: e.target.value });
              }}
              type="text"
              value={formDetails.name}
              id="name"
              placeholder="Enter Name"
              name="name"
              pattern="[a-zA-z ]*"
              title="Only Alphabets accepted"
              required
            />
          ) : (
            <></>
          )}

          {!login ? (
            <input
              onInput={(e) => {
                setFormDetails({ ...formDetails, email: e.target.value });
              }}
              type="email"
              value={formDetails.email}
              id="email"
              placeholder="Email@xyz.com"
              name="email"
              required
            />
          ) : (
            <></>
          )}

          {!login ? (
            <input
              type="text"
              id="user-name"
              value={formDetails.userName}
              onInput={(e) => {
                setFormDetails({ ...formDetails, userName: e.target.value });
              }}
              placeholder="User Name like user_23"
              name="userName"
              required
            />
          ) : (
            <></>
          )}

          {login ? (
            <input
              type="text"
              id="loginId"
              value={formDetails.loginId}
              onInput={(e) => {
                setFormDetails({ ...formDetails, loginId: e.target.value });
              }}
              name="loginId"
              placeholder="Enter user name or email"
            />
          ) : (
            <></>
          )}

          <input
            type="password"
            id="password"
            value={formDetails.password}
            name="password"
            onInput={(e) => {
              setFormDetails({ ...formDetails, password: e.target.value });
            }}
            placeholder="Password [0-9] min 4 digits"
            pattern="[0-9]{4,}"
            title="from 0 to 9 minimum 4 numbers"
            required
          />
          <button type="submit">{!loading ? "Submit" : "Loading..."}</button>
        </form>
        <p style={{ color: "white" }}>
          {!login ? " Already have an account. " : "Don't have an account. "}

          <span
            onClick={() => {
              setLogin(!login);
            }}
            style={{ cursor: "pointer", color: "wheat" }}
          >
            {!login ? "Login" : "Signup"}
          </span>
        </p>
      </div>
    </>
  );
};

export default SignUpLogIn;
