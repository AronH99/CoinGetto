import React, { useState, useEffect } from "react";
const baseurl = `http://groepswerkana.herokuapp.com`;

let headersList = {
  "xc-token": "9bYhm5IA6taqBxFyey-K8nRrJeXMZ49JWonriVnu",
  "Content-Type": "application/json",
};

//getApiNocoDB
const [loadingOfNocoGet, setLoadingOfNocoGet] = useState(false);
const [dataNocoGet, setDataNocoGet] = useState();
const [errorOfNocoGet, setErrorOfNocoGet] = useState(false);
const getNoco = async (endpoint) => {
  try {
    setLoadingOfNocoGet(true);
    setErrorOfNocoGet(false);
    let response = await fetch(baseurl + endpoint, {
      method: "get",
      headers: headersList,
    });
    let data = await response.json();
    console.log(data);
    setLoadingOfNocoGet(false);
    setErrorOfNocoGet(false);
    setDataNocoGet(data);
  } catch (error) {
    setLoadingOfNocoGet(false);
    setErrorOfNocoGet(true);
    setDataNocoGet([]);
  }
};
//postApiToNocoDB
const [loadingOfNocoPost, setLoadingOfNocoPost] = useState(false);
const [dataNocoPost, setDataNocoPost] = useState();
const [errorOfNocoPost, setErrorOfNocoPost] = useState(false);

const postNoco = async (endpoint, bodyContent) => {
  try {
    setLoadingOfNocoPost(true);
    setErrorOfNocoPost(false);
    let response = await fetch(baseurl + endpoint, {
      method: "POST",
      body: JSON.stringify(bodyContent),
      headers: headersList,
    });
    let data = await response.json();
    console.log(data);
    setLoadingOfNocoPost(false);
    setErrorOfNocoPost(false);
    setDataNocoPost(data);
  } catch (error) {
    setLoadingOfNocoPost(false);
    setErrorOfNocoPost(true);
    setDataNocoPost([]);
  }
};

export { postNoco, getNoco };
