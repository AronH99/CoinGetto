const API_KEY = "9bYhm5IA6taqBxFyey-K8nRrJeXMZ49JWonriVnu";
const [loading, setLoading] = useState(false);
const [dataNoco, setDataNoco] = useState();
const [error, setError] = useState(false);

const url = `http://groepswerkana.herokuapp.com/api/v1/db/data/noco/groepswerkana/test`;

let headersList = {
  "xc-token": "9bYhm5IA6taqBxFyey-K8nRrJeXMZ49JWonriVnu",
  "Content-Type": "application/json",
};

let bodyContent = JSON.stringify({});

let id = JSON.stringify({
  id: id,
});

//get request

export const getNoco = async () => {
  try {
    setLoading(true);
    setError(false);
    let response = await fetch(url, {
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

export const postNoco = async () => {
  try {
    setLoading(true);
    setError(false);
    let response = await fetch(url, {
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

export const idPostRequest = async () => {
  try {
    setLoading(true);
    setError(false);
    let response = await fetch(url, {
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
