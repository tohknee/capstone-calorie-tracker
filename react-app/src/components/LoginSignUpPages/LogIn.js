import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import "./LogInPage.css";

function NoModalLogin() {
  const dispatch = useDispatch();
  const history=useHistory()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
        history.push('/profile')
    }
  };
  const demoLogin = e => {
    setEmail('demo@aa.io')
    setPassword('password')
    return dispatch(login({ email, password }))
      .then(closeModal)
  }
  return (
    <div className="login-form">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li className="error" key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
           
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
          />
        </label>
        <button type="submit">Log In</button>
          <button type="submit" onClick={demoLogin}>Login as Demo User</button>
      </form>
    </div>
  );
}

export default NoModalLogin;
