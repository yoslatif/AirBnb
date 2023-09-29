// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useSelector, useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
// import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [showModal, setShowModal] = useState(false);
  const [isLoginDisabled, setIsLoginDisabled] = useState(true);

  const resetForm = () => {
    setCredential('');
    setPassword('');
    setErrors({});
    setIsLoginDisabled(true);  // If you're using this state to disable the button
};


const handleSubmit = (e) => {
  e.preventDefault();
  setErrors({});
  return dispatch(sessionActions.login({ credential, password }))
    .then(() => {
        closeModal();
        resetForm();
    })
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      } else if (data && data.message) {
        setErrors({ general: data.message });
      }
    });
};


  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const handleDemoLogin = () => {
    setCredential('masterchief');
    setPassword('halohalo');
    dispatch(sessionActions.login({ credential: 'masterchief', password: 'halohalo' }));
};

const isButtonDisabled = credential.length < 4 || password.length < 6;


return (
  <>
    <h1>Log In</h1>
    <form onSubmit={handleSubmit}>
      <label>
        Username or Email
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      {errors.credential && (
        <p>{errors.credential}</p>
      )}
      {errors.general && (
        <p>{errors.general}</p>
      )}
      <button disabled={isButtonDisabled} onClick={toggleModal}>Log in</button>
      <button onClick={handleDemoLogin}>Log in as Demo User</button>
    </form>
  </>
);
}

export default LoginFormModal;