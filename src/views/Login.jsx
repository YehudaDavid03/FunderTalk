import React, { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import Register from "./Register"

const Login = ({ userInfoSend, userInfoReceived, changeAlert, doesNotWork }) => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios({
      method: "post",
      url: "https://funder-talk-server.herokuapp.com/api/login-user",
      data: {
        userEmail: login.email,
        userPassword: login.password
      },
    })
    .then((response) => {
      userInfoSend({
        userToken: response.data.userToken,
        _id: response.data._id,
        userEmail: response.data.userEmail,
        userUsername: response.data.userUsername,
        userFirstName: response.data.userFirstName,
        userLastName: response.data.userLastName,
        userProfilePicture: response.data.userProfilePicture,
        userWebsite: response.data.userWebsite
      })
    })
    .catch((err) => {
      changeAlert(true, "error", "#DB4437", "Error!", err.response.data)
      const timer = setTimeout(() => {
        changeAlert(false, null, null, null, null)
      }, 3000)
      return () => clearTimeout(timer)
    })
  }

  return (
    <div className="login-main">
      <div>
        <h1>Login</h1>
      </div>

      <div>
        <label>Email Address</label>
        <input
          type="email" 
          name="email"
          value={login.email}
          onChange={handleChange}
          placeholder="example@example.com"
        ></input>
      </div>
      
      <div>
        <label>Password</label>
        <input
          type="password" 
          name="password" 
          value={login.password}
          onChange={handleChange}
          placeholder=""
        ></input>
      </div>

      <div>
        <p onClick={doesNotWork}>Forgot Your Password? <span>Reset Password</span></p>
      </div>

      <button onClick={handleSubmit}>Login</button>
    </div>
  )
}

export default Login