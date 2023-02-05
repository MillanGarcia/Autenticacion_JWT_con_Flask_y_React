import React from "react";
import config from "./config";
import { useNavigate } from "react-router-dom"; //sirve para redireccionar al terminar el signup correctamente

export const Signup = () => {
  const navigate = useNavigate();
  const onSignup = async () => {
    const email = document.getElementById("email-input").value;
    const password1 = document.getElementById("password-input-1").value;
    const password2 = document.getElementById("password-input-2").value;

    if (password1.length < 4) {
      alert("Formato de clave incorrecto!");
    }
    if (password1 !== password2) {
      alert("Las contraseñas no son iguales");
      return;
    }

    const body = JSON.stringify({
      email,
      password1,
      password2,
    });

    const res = await fetch(`${config.HOSTNAME}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const data = await res.json();
    if (res.status != 201) {
      alert(data.msg);
      return;
    }

    console.log("El usuario se creo correctamente");
    navigate("/login");
  };
  return (
    <div>
      <h1>Signup</h1>
      <div className="container">
        <div className="mb-3">
          <label htmlFor="email-input" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email-input"
            placeholder="name@example.com"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password-input-1" className="form-label">
            Password 1
          </label>
          <input
            type="password"
            className="form-control"
            id="password-input-1"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password-input-2" className="form-label">
            Password 2
          </label>
          <input
            type="password"
            className="form-control"
            id="password-input-2"
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={onSignup}>
          Submit
        </button>
      </div>
    </div>
  );
};
