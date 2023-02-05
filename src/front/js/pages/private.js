import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { Util } from "./util";
import config from "./config";

export const Util = (setDisabled, navigate) => {
  const tokenOBJ = localStorage.token;
  console.log("hola");
  if (!tokenOBJ) {
    navigate("/login");
    return; //o hacer el return aqui o...
  }
  //...hacer un else de todo lo de abajo, lo importante es que no corra el codigo si no hay token
  const tokenData = JSON.parse(tokenOBJ);
  console.log("que haces");
  fetch(`${config.HOSTNAME}/api/private`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tokenData.token}`,
    },
  })
    .then((res) => {
      console.log({ res });
      return res.json();
    })
    .then((data) => {
      console.log({ data });
      setDisabled(false);
    });
};

export const Private = () => {
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Util(setDisabled, navigate);
  }, [disabled]);

  if (disabled) {
    return <div>Cargando...</div>;
  }

  return <div>Private</div>;
};
