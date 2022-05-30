export const API_KEY = "9bYhm5IA6taqBxFyey-K8nRrJeXMZ49JWonriVnu";
export const baseurl = `http://groepswerkana.herokuapp.com`;
/*const [loading, setLoading] = useState(false);
const [dataNoco, setDataNoco] = useState();
const [error, setError] = useState(false);


let headersList = {
  "xc-token": "9bYhm5IA6taqBxFyey-K8nRrJeXMZ49JWonriVnu",
  "Content-Type": "application/json",
};

let bodyContent = JSON.stringify({});

let id = JSON.stringify({
  id: id,
});

//get request

export const getNoco = async (endpoint) => {
  try {
    setLoading(true);
    setError(false);
    let response = await fetch(baseurl + endpoint, {
      method: "get",
      headers: headersList,
    });
    let data = await response.json();
    console.log(data);
    setLoading(false);
    setError(false);
    setDataNoco(data);
  } catch (error) {
    setLoading(false);
    setError(true);
    setDataNoco([]);
  }
};

//post request

export const postNoco = async (endpoint) => {
  try {
    setLoading(true);
    setError(false);
    let response = await fetch(baseurl + endpoint, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });
    let data = await response.json();
    console.log(data);
    setLoading(false);
    setError(false);
    setDataNoco(data);
  } catch (error) {
    setLoading(false);
    setError(true);
    setDataNoco([]);
  }
};

// custom id request

export const idPostRequest = async (endpoint) => {
  try {
    setLoading(true);
    setError(false);
    let response = await fetch(baseurl + endpoint, {
      method: "POST",
      body: id,
      headers: headersList,
    });
    let data = await response.json();
    console.log(data);
    setLoading(false);
    setError(false);
    setDataNoco(data);
  } catch (error) {
    setLoading(false);
    setError(true);
    setDataNoco([]);
  }
};
*/
