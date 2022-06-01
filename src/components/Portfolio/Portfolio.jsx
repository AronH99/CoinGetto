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
  const baseurl = `https://groepswerkana.herokuapp.com`;

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
  const [triggerPatch, setTriggerPatch] = useState(false);

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
  }, [nocoCryptoCoinId, triggerPatch]);

  useEffect(() => {
    setSendNocoCryptoIdToPatch(
      dataNocoGetCrypto?.filter(
        (x) =>
          x.nc_2p2y__users_id == JSON?.parse(localStorage?.getItem("user"))?.Id
      ) &&
        dataNocoGetCrypto?.filter((x) => x.CryptoId == nocoCryptoCoinId)[0]?.Id
    );
  }, [dataNocoGetCrypto]);

  //getApiNocoDB
  const [loadingOfNocoGet, setLoadingOfNocoGet] = useState(false);
  const [dataNocoGet, setDataNocoGet] = useState();
  const [errorOfNocoGet, setErrorOfNocoGet] = useState(false);
  const [number, setNumber] = useState(
    JSON?.parse(localStorage?.getItem("user"))?.Id
  );
  const [coinString, setCoinString] = useState();
  const [triggerDelete, setTriggerDelete] = useState(false);

  useEffect(() => {
    number &&
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

  //PatchToApiNocoDB
  const [loadingOfNocoPatch, setLoadingOfNocoPatch] = useState(false);
  const [dataNocoPatch, setDataNocoPatch] = useState();
  const [errorOfNocoPatch, setErrorOfNocoPatch] = useState(false);

  const patchNoco = async (nocoDbIdCrypto, bodyContent) => {
    try {
      setLoadingOfNocoPatch(true);
      setErrorOfNocoPatch(false);
      let response = await fetch(
        baseurl +
          `/api/v1/db/data/noco/groepswerkana/CryptoId/${nocoDbIdCrypto}`,
        {
          method: "PATCH",
          body: JSON.stringify(bodyContent),
          headers: headersList,
        }
      );
      let data = await response.json();
      setLoadingOfNocoPatch(false);
      setErrorOfNocoPatch(false);
      setDataNocoPatch(data);
      setTriggerPatch(false);
    } catch (error) {
      setLoadingOfNocoPatch(false);
      setErrorOfNocoPatch(true);
      setDataNocoPatch([]);
      setTriggerPatch(false);
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
                    {dataNocoGetCrypto?.length > 0 && (
                      <>
                        {dataNocoGetCrypto?.map(
                          ({ QuantityOfCoins, CryptoId, Id }) => (
                            <div key={Id}>
                              <div className="FlexQuantity">
                                <Typography className="numberQuantity">
                                  {id === CryptoId ? QuantityOfCoins : ""}
                                </Typography>
                                <Typography className="nameQuantity">
                                  {" "}
                                  {(id === CryptoId &&
                                    QuantityOfCoins !== null) ||
                                  0 ||
                                  undefined
                                    ? ` ${name}`
                                    : id === CryptoId && `You got 0 ${name}`}
                                </Typography>
                              </div>
                              <Typography className="totalValue">
                                {id === CryptoId
                                  ? `Value: ${symbolCurrency}${(
                                      QuantityOfCoins * current_price
                                    ).toFixed(2)}`
                                  : ""}
                              </Typography>
                            </div>
                          )
                        )}
                      </>
                    )}
                    <form
                      className="formCards"
                      onClick={(e) => {
                        setNocoCryptoCoinId(id);
                      }}
                      onSubmit={(e) => {
                        e.preventDefault();
                        setTriggerPatch(true);
                        patchNoco(sendNocoCryptoIdToPatch, {
                          QuantityOfCoins: inputValueAmount,
                        });
                      }}
                    >
                      <label className="labelSizeOfCards">Amount:</label>
                      <input
                        className="inputAmount"
                        onChange={(e) => {
                          const re = /^[0-9\b]+$/;
                          if (
                            e.target.value === "" ||
                            re.test(e.target.value)
                          ) {
                            setInputValueAmount(e.target.value);
                          }
                        }}
                      />
                    </form>
                  </CardContent>
                </Collapse>
              </Card>
            )
          )}
        </div>
      ) : (
        <div className="flexNoCoin">
          <h1 className="NoCoin">
            Login or add coins to your portfolio to use this feature :-)
          </h1>
        </div>
      )}
    </>
  );
};

export default Portfolio;
