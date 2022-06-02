import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import React, { useState, useEffect } from "react";
import useAxios from "axios-hooks";
import "./displaytopcoins.scss";
import Navbar from "../Navbar/Navbar";
import { NavLink } from "react-router-dom";

const DataTables = () => {
  const baseurl = `https://groepswerkana.herokuapp.com`;

  let headersList = {
    "xc-token": "9bYhm5IA6taqBxFyey-K8nRrJeXMZ49JWonriVnu",
    "Content-Type": "application/json",
  };

  //getApiNocoDB
  const [loadingOfNocoGet, setLoadingOfNocoGet] = useState(false);
  const [dataNocoGet, setDataNocoGet] = useState();
  const [errorOfNocoGet, setErrorOfNocoGet] = useState(false);
  //code for verifying users portfolio data (coins) and sending the data through to table => red hearths
  const [fullyFiltered, setfullyFiltered] = useState();
  const [number, setNumber] = useState(
    JSON?.parse(localStorage?.getItem("user"))?.Id
  );

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
        } catch (error) {
          setLoadingOfNocoGet(false);
          setErrorOfNocoGet(true);
          setDataNocoGet([]);
        }
      })();
  }, [number]);

  useEffect(() => {
    if (dataNocoGet && number) {
      const stringWithCoinsOfUser = dataNocoGet?.CryptoId?.map(
        (x) => x?.CryptoId
      ).join(", ");
      setfullyFiltered(stringWithCoinsOfUser);
    }
  }, [dataNocoGet]);

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
      setLoadingOfNocoPost(false);
      setErrorOfNocoPost(false);
      setDataNocoPost(data);
    } catch (error) {
      setLoadingOfNocoPost(false);
      setErrorOfNocoPost(true);
      setDataNocoPost([]);
    }
  };

  //apiDataHandlingTable
  const [selectCurrency, setSelectCurrency] = useState("usd");
  const [symbolCurrency, setSymbolCurrency] = useState();
  const [selectCoinRange, setSelectCoinRange] = useState(1);

  const [{ data: coinGeckoData, loading, error }, fetchCoinGeckoData] =
    useAxios(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectCurrency}&order=market_cap_desc&per_page=250&page=${selectCoinRange}&sparkline=false`,
      { manual: true }
    );

  useEffect(() => {
    if (selectCurrency && selectCurrency === "usd") {
      fetchCoinGeckoData();
      setSymbolCurrency("$");
    }
    if (selectCurrency && selectCurrency === "eur") {
      fetchCoinGeckoData();
      setSymbolCurrency("€");
    }
  }, [selectCurrency, selectCoinRange]);

  let rows = coinGeckoData;

  //columns
  const columns = [
    { id: "market_cap_rank", label: "", minWidth: 10 },
    { id: "hartje", label: "", minWidth: 10 },
    { id: "name", label: "Coin", minWidth: 250, align: "right" },
    { id: "symbol", label: "", minWidth: 100, align: "right" },
    {
      id: "current_price",
      label: "Price",
      minWidth: 150,
      align: "right",
    },
    {
      id: "price_change_percentage_24h",
      label: "24h",
      minWidth: 150,
      align: "right",
    },
    {
      id: "total_volume",
      label: "24h Volume",
      minWidth: 200,
      align: "right",
    },
    {
      id: "market_cap",
      label: "Mkt Cap",
      minWidth: 200,
      align: "right",
    },
  ];

  //pageshandling
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //filtering
  const [filtering, setFiltering] = useState("");
  return (
    <>
      <Navbar />
      <h5>Cryptocurrency Prices by Market Cap</h5>
      <div className="flexbuttons">
        <button
          className={`valuebutton${selectCurrency === "usd" ? "--active" : ""}`}
          onClick={(e) => {
            setSelectCurrency("usd");
          }}
        >
          $
        </button>
        <button
          className={`valuebutton${selectCurrency === "eur" ? "--active" : ""}`}
          onClick={(e) => {
            setSelectCurrency("eur");
          }}
        >
          €
        </button>
      </div>
      <div className="rangeButtons">
        <button
          className={`rangeButton${selectCoinRange === 1 ? "--active" : ""}`}
          onClick={(e) => {
            setSelectCoinRange(1);
          }}
        >
          0-250
        </button>
        <button
          className={`rangeButton${selectCoinRange === 2 ? "--active" : ""}`}
          onClick={(e) => {
            setSelectCoinRange(2);
          }}
        >
          251-500
        </button>
        <button
          className={`rangeButton${selectCoinRange === 3 ? "--active" : ""}`}
          onClick={(e) => {
            setSelectCoinRange(3);
          }}
        >
          501-750
        </button>
        <button
          className={`rangeButton${selectCoinRange === 4 ? "--active" : ""}`}
          onClick={(e) => {
            setSelectCoinRange(4);
          }}
        >
          751-1000
        </button>
      </div>
      <div className="flexinput">
        <input
          className="inputsmallfiltering"
          onChange={(e) => {
            setFiltering(e.target.value.toLowerCase().trim());
          }}
        />
      </div>
      {!error && rows?.length > 0 && (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 400 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns?.map((column) => (
                    <TableCell
                      key={column?.id}
                      align={column?.align}
                      style={{ minWidth: column?.minWidth }}
                    >
                      {column?.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .filter((row) =>
                    row?.name?.toLowerCase().trim()?.includes(filtering)
                  )
                  .map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row?.id}>
                      <TableCell className="rank">
                        {row?.market_cap_rank}
                      </TableCell>
                      <TableCell>
                        {JSON?.parse(localStorage?.getItem("user"))?.Id && (
                          <FavoriteOutlinedIcon
                            className={`hearth${
                              fullyFiltered?.includes(row.id) ? "--active" : ""
                            }`}
                            fontSize="inherit"
                            onClick={(e) => {
                              e.target.style.color = "red";
                              e.target.style.pointerEvents = "none";
                              postNoco(
                                `/api/v1/db/data/noco/groepswerkana/CryptoId`,
                                {
                                  CryptoId: `${row?.id}`,
                                  nc_2p2y__users_id: JSON?.parse(
                                    localStorage?.getItem("user")
                                  )?.Id,
                                }
                              );
                            }}
                          />
                        )}
                      </TableCell>
                      <TableCell className="coinimageflex">
                        <NavLink to={`/Detail/${row?.id}`}>
                          <img
                            className="coinimage"
                            src={row?.image}
                            alt={name}
                          />
                          {row?.name}
                        </NavLink>
                      </TableCell>
                      <TableCell>{row?.symbol?.toUpperCase()}</TableCell>
                      <TableCell>
                        {symbolCurrency}
                        {row?.current_price?.toLocaleString()}
                      </TableCell>
                      <TableCell
                        className={
                          row?.price_change_percentage_24h > 0
                            ? "percentageIndicatorGreen"
                            : "percentageIndicatorRed"
                        }
                      >
                        {row?.price_change_percentage_24h?.toFixed(2)}%
                      </TableCell>
                      <TableCell>
                        {symbolCurrency}
                        {row.total_volume?.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {symbolCurrency}
                        {row?.market_cap?.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[50, 100, 250]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </>
  );
};

export default DataTables;
