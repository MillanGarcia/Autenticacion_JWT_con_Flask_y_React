import React from "react";
import config from "./config";

export const Login = () => {
  const onLogin = async () => {
    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;

    const body = JSON.stringify({ email, password });
    const res = await fetch(`${config.HOSTNAME}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const data = await res.json();
    if (res.status == 200) {
      console.log("hola");
      const token = data.data;
      localStorage.token = JSON.stringify({ token }); //asi almacenenamos como un objeto, podria almacenarse solo el token, pero con este proceso cambiamos de string a objeto y de objeto a strng
    } else {
      console.log("mal");
      alert(data.msg);
      return;
    }
  };
  return (
    <div>
      <h1>Login</h1>
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
          <label htmlFor="password-input" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="password-input" />
        </div>
        <button type="button" className="btn btn-primary" onClick={onLogin}>
          Submit
        </button>
      </div>
    </div>
  );
};
