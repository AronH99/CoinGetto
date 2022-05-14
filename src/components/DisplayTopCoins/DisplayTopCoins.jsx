import { React, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./displaytopcoins.scss";
import useAxios from "axios-hooks";
import axios from "axios";

const DisplayTopCoins = () => {
  const [selectCurrency, setSelectCurrency] = useState("usd");
  /* const [coinGeckoData, setCoinGeckoData] = useState([]);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState(false); */

  /*   useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const { data } = await axios(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectCurrency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
        );
        setLoading(false);
        setError(false);
        setCoinGeckoData(data);
      } catch (error) {
        setLoading(false);
        setError(true);
        setCoinGeckoData([]);
      }
    })();
  }, [selectCurrency]); */

  const [{ data: coinGeckoData, loading, error }, fetchCoinGeckoData] =
    useAxios(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectCurrency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
      { manual: true }
    );

  useEffect(() => {
    if (selectCurrency) {
      fetchCoinGeckoData();
    }
  }, [selectCurrency]);

  return (
    <>
      <Navbar />
      <section className="DisplayTopCoins">
        <h1 className="TitleTopCoins">Cryptocurrency Prices by Market Cap</h1>
      </section>
      <div className="ErrorandLoading">
        {error && <p>Oeps... Something went wrong.</p>}
        {loading && <p>Loading...</p>}
      </div>
      {!error && coinGeckoData?.length > 0 && (
        <section className="DisplayTopCoins">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>#</th>
                <th>Coin</th>
                <th></th>
                <th>Price</th>
                <th>1h</th>
                <th>24h</th>
                <th>7d</th>
                <th>24h Volume</th>
                <th>Mkt Cap</th>
              </tr>
            </thead>
            <tbody>
              {coinGeckoData?.map(
                ({
                  name,
                  image,
                  current_price,
                  market_cap,
                  symbol,
                  id,
                  price_change_percentage_24h,
                  total_volume,
                }) => (
                  <tr key={id}>
                    <td></td>
                    <td>1</td>
                    <td>
                      <span>
                        <img src={image} alt={name} />
                        <p className="namep">{name}</p>
                      </span>
                      <p className="symbolp">{symbol.toUpperCase()}</p>
                    </td>
                    <td>${current_price.toLocaleString()}</td>
                    <td>xxx</td>
                    <td>xxx</td>
                    <td>xxx</td>
                    <td>xxx</td>
                    <td>${market_cap.toLocaleString()}</td>
                    <td>xxx</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </section>
      )}
    </>
  );
};

export default DisplayTopCoins;
