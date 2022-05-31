import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

import useAxios from "axios-hooks";
import "./portfolio.scss";

const Portfolio = () => {
  const baseurl = `http://groepswerkana.herokuapp.com`;

  let headersList = {
    "xc-token": "9bYhm5IA6taqBxFyey-K8nRrJeXMZ49JWonriVnu",
    "Content-Type": "application/json",
  };

  //getApiNocoDBCryptoId
  const [loadingOfNocoGetCrypto, setLoadingOfNocoGetCrypto] = useState(false);
  const [dataNocoGetCrypto, setDataNocoGetCrypto] = useState();
  const [errorOfNocoGetCrypto, setErrorOfNocoGetCrypto] = useState(false);
  const [nocoCryptoCoinId, setNocoCryptoCoinId] = useState();
  const [sendNocoCryptoIdToPatch, setSendNocoCryptoIdToPatch] = useState();
  const [inputValueAmount, setInputValueAmount] = useState();

  useEffect(() => {
    (async () => {
      try {
        setLoadingOfNocoGetCrypto(true);
        setErrorOfNocoGetCrypto(false);
        let response = await fetch(
          baseurl + `/api/v1/db/data/noco/groepswerkana/CryptoId`,
          {
            method: "get",
            headers: headersList,
          }
        );
        let data = await response.json();
        setLoadingOfNocoGetCrypto(false);
        setErrorOfNocoGetCrypto(false);
        setDataNocoGetCrypto(data.list);
      } catch (error) {
        setLoadingOfNocoGetCrypto(false);
        setErrorOfNocoGetCrypto(true);
        setDataNocoGetCrypto([]);
      }
    })();
  }, [nocoCryptoCoinId]);

  useEffect(() => {
    setSendNocoCryptoIdToPatch(
      dataNocoGetCrypto?.filter((x) => x.nc_2p2y__users_id == 10) &&
        dataNocoGetCrypto?.filter((x) => x.CryptoId == nocoCryptoCoinId)[0]?.Id
    );
  }, [dataNocoGetCrypto, nocoCryptoCoinId]);

  //getApiNocoDB
  const [loadingOfNocoGet, setLoadingOfNocoGet] = useState(false);
  const [dataNocoGet, setDataNocoGet] = useState();
  const [errorOfNocoGet, setErrorOfNocoGet] = useState(false);
  const [number, setNumber] = useState(10);
  const [coinString, setCoinString] = useState();
  const [triggerDelete, setTriggerDelete] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoadingOfNocoGet(true);
        setErrorOfNocoGet(false);
        let response = await fetch(
          baseurl + `/api/v1/db/data/noco/groepswerkana/Users/${number}`,
          {
            method: "get",
            headers: headersList,
          }
        );
        let data = await response.json();
        setLoadingOfNocoGet(false);
        setErrorOfNocoGet(false);
        setDataNocoGet(data);
        setTriggerDelete(false);
      } catch (error) {
        setLoadingOfNocoGet(false);
        setErrorOfNocoGet(true);
        setDataNocoGet([]);
        setTriggerDelete(false);
      }
    })();
  }, [number, triggerDelete]);

  useEffect(() => {
    if (dataNocoGet && number) {
      setCoinString(dataNocoGet?.CryptoId?.map((x) => x?.CryptoId).join(","));
    }
  }, [dataNocoGet]);

  //CoiGeckoApiDataWithIdFetch

  const [selectCurrency, setSelectCurrency] = useState("usd");
  const [symbolCurrency, setSymbolCurrency] = useState();
  const [selectCoinRange, setSelectCoinRange] = useState(1);

  const [{ data: coinGeckoData, loading, error }, fetchCoinGeckoData] =
    useAxios(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectCurrency}&ids=${coinString}&order=market_cap_desc&per_page=250&page=${selectCoinRange}&sparkline=false`,
      { manual: true }
    );

  useEffect(() => {
    if (selectCurrency && selectCurrency === "usd" && coinString) {
      fetchCoinGeckoData();
      setSymbolCurrency("$");
    }
    if (selectCurrency && selectCurrency === "eur" && coinString) {
      fetchCoinGeckoData();
      setSymbolCurrency("€");
    }
  }, [selectCurrency, selectCoinRange, coinString]);

  //DeleteToNocoDB
  const [loadingOfNocoDelete, setLoadingOfNocoDelete] = useState(false);
  const [dataNocoDelete, setDataNocoDelete] = useState();
  const [errorOfNocoDelete, setErrorNocoDelete] = useState(false);

  const deleteNoco = async (delId) => {
    try {
      setLoadingOfNocoDelete(true);
      setErrorNocoDelete(false);
      let response = await fetch(
        baseurl + `/api/v1/db/data/noco/groepswerkana/CryptoId/${delId}`,
        {
          method: "DELETE",
          headers: headersList,
        }
      );
      let data = await response.json();
      setLoadingOfNocoDelete(false);
      setErrorNocoDelete(false);
      setDataNocoDelete(data);
    } catch (error) {
      setLoadingOfNocoDelete(false);
      setErrorNocoDelete(true);
      setDataNocoDelete([]);
    }
  };

  //expandCards
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Navbar />
      <div className="flexbuttons2">
        <button
          className={`valuebutton2${
            selectCurrency === "usd" ? "--active" : ""
          }`}
          onClick={(e) => {
            setSelectCurrency("usd");
          }}
        >
          $
        </button>
        <button
          className={`valuebutton2${
            selectCurrency === "eur" ? "--active" : ""
          }`}
          onClick={(e) => {
            setSelectCurrency("eur");
          }}
        >
          €
        </button>
      </div>
      {coinGeckoData?.length > 0 && dataNocoGet?.CryptoId?.length > 0 ? (
        <div className="flexCards">
          {coinGeckoData?.map(
            ({
              name,
              market_cap_rank,
              image,
              current_price,
              price_change_percentage_24h,
              price_change_24h,
              id,
              market_cap,
              circulating_supply,
              total_supply,
            }) => (
              <Card sx={{ minWidth: 300, maxWidth: 500 }} key={id}>
                <CardContent>
                  <div className="flexNameAndTrashIcon">
                    <Typography sx={{ fontSize: 20 }} color="text.primary">
                      {name}
                    </Typography>
                    <DeleteIcon
                      onClick={(e) => {
                        deleteNoco(
                          dataNocoGet?.CryptoId?.filter(
                            (x) => x?.CryptoId === id
                          )[0]?.Id
                        );
                        setTriggerDelete(true);
                      }}
                      className="bin"
                    />
                  </div>
                  <Typography
                    className="headerTypo"
                    sx={{ fontSize: 40 }}
                    color="text.primary"
                  >
                    {market_cap_rank}
                    <img className="cardImg" src={image} alt={name} />
                  </Typography>
                  <Typography variant="h5" component="div">
                    {symbolCurrency}
                    {current_price}
                  </Typography>
                  <Typography
                    sx={{ mb: 1.5 }}
                    color="text.secondary"
                  ></Typography>
                  <Typography
                    className={
                      price_change_percentage_24h > 0
                        ? "percentageIndicatorGreen"
                        : "percentageIndicatorRed"
                    }
                  >
                    %{price_change_percentage_24h.toFixed(2)} / {symbolCurrency}
                    {price_change_24h.toFixed(2)}
                  </Typography>
                </CardContent>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setNocoCryptoCoinId(id);
                        console.log(inputValueAmount, sendNocoCryptoIdToPatch);
                      }}
                    >
                      <label>Amount:</label>
                      <input
                        onChange={(e) => {
                          setInputValueAmount(e.target.value);
                        }}
                      />
                    </form>
                    <Typography>
                      Mkt Cap: {symbolCurrency}
                      {market_cap?.toLocaleString()}
                    </Typography>
                    <Typography>
                      Circulating Supply: {circulating_supply?.toLocaleString()}
                    </Typography>
                    <Typography>
                      Total Supply: {total_supply?.toLocaleString()}
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            )
          )}
        </div>
      ) : (
        <div className="flexNoCoin">
          <h1 className="NoCoin">No Coins Added To Your Portfolio :-(</h1>
        </div>
      )}
    </>
  );
};

export default Portfolio;
