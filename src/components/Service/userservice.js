import { API_KEY, baseurl } from "../../Helpers/NocoDataFlow";

export default login;

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        /*logout();*/
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

function login(email, password) {
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "xc-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
      "xc-auth":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5haW1lbGhhbW1vdWNoaUBpY2xvdWQuY29tIiwiZmlyc3RuYW1lIjpudWxsLCJsYXN0bmFtZSI6bnVsbCwiaWQiOiJ1c19jbWdhM2M5bHRoZTBqNiIsInJvbGVzIjoidXNlciIsImlhdCI6MTY1MzkxMTYyNX0.P_XTJe0kyi7l4DwYzndTqFtuncC1KP_G-FNTiz_2tDA",
    },
  };

  return fetch(
    `${baseurl}/api/v1/db/data/noco/groepswerkana/Users?where=%28Email%2Ceq%2C${email}%29`,
    requestOptions
  )
    .then(handleResponse)
    .then((data) => {
      console.log(data.list[0].Password);
      // login successful if there's a user in the response
      if (data.list[0].Password === password) {
        // store user details and basic auth credentials in local storage
        // to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(data.list[0]));
      }
      window.location.href = "/";
    });
}
