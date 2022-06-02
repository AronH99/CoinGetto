import { useState, useEffect } from "react";
import "./charts.scss";
import axios from "axios";
import { chart, table, caps } from "./api";
import {
  ChartComponent,
  Inject,
  LineSeries,
  Category,
  DataLabel,
  SeriesDirective,
  SeriesCollectionDirective,
  Legend,
  Tooltip,
} from "@syncfusion/ej2-react-charts";
import useWindowSize from "./resize";
import { useParams } from "react-router";

const Charts = () => {
  const [prices, setPrices] = useState([]);
  const [volume, setVolume] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const size = useWindowSize();
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(true);
        const { data } = await axios(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=90&interval=daily`
        );
        const { data: dataTable } = await axios(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
        );
        setPrices(data.prices);
        setVolume(data.total_volumes);
        setTableData(dataTable);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const ArrToObjPrices = prices.map((array) => ({
    price: array[1].toFixed(2),
  }));

  const ArrToObjVolumes = volume.map((array) => ({
    volume: array[1].toFixed(0).toLocaleString(),
  }));

  const days = [];
  function date() {
    const today = new Date();
    for (let i = 0; i <= prices.length; i++) {
      const previousDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - i
      );
      days.push(previousDay.toLocaleDateString("en"));
    }
    const reversed = days.reverse();
    return reversed;
  }

  date();

  const objDays = Object.assign({}, days);

  const res = [];
  function separateObject() {
    const keys = Object.keys(objDays);
    keys.forEach((day) => {
      res.push({
        day: objDays[day],
      });
    });
    return res;
  }
  separateObject();

  const arr1 = ArrToObjPrices;
  const arr2 = res;
  const arr3 = ArrToObjVolumes;

  const combined = arr1.map(function (item, index) {
    return {
      price: item.price,
      day: arr2[index].day,
      volume: arr3[index].volume,
    };
  });

  var merged = [];

  for (var i = 0; i <= 168; i++) {
    merged.push([]);
  }

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>ERROR...</p>}
      {/* <pre>{JSON.stringify(combined)}</pre> */}
      <div className="container is-fullhd" id="container_charts">
        <h1 className="titleDetail">{tableData.map(({ name }) => name)}</h1>
        <main className="">
          <article id="chart">
            <ChartComponent
              primaryXAxis={{ valueType: "Category", title: "Period" }}
              primaryYAxis={{ title: "Price" }}
              legendSettings={{ visible: true }}
              tooltip={{ enable: true, shared: true }}
              width={`${(size.width / 100) * 80 - 10}px`}
              height={`${(size.height / 100) * 70 - 10}px`}
            >
              <Inject
                services={[LineSeries, Category, Legend, DataLabel, Tooltip]}
              />
              <SeriesCollectionDirective>
                <SeriesDirective
                  type="Line"
                  dataSource={combined}
                  xName="day"
                  yName="price"
                  name={`${tableData.map(({ id }) => id)} price`}
                  marker={{ DataLabel: { visible: true }, visible: true }}
                ></SeriesDirective>
              </SeriesCollectionDirective>
            </ChartComponent>
          </article>
        </main>
        <aside className="card">
          <div className="titleTable">
            <h2>{tableData.map(({ name }) => name)} Price Statistics</h2>
          </div>
          <div className="tableInfo">
            {table &&
              table.map(({ current_price, market_cap, market_cap_rank }) => (
                <>
                  <div>
                    <span>Bitcoin Price: </span>
                    <span className="bold">
                      {current_price.toLocaleString("de-DE", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </span>
                  </div>
                  <div>
                    <span>Market Cap Rank: </span>
                    <span className="bold">
                      #{market_cap_rank.toLocaleString("de-DE")}
                    </span>
                  </div>
                  <div>
                    <span>Volume / Market Cap: </span>
                    <span className="bold">
                      {market_cap.toLocaleString("de-DE")}
                    </span>
                  </div>
                </>
              ))}
            {caps &&
              caps.map(({ data }) => (
                <>
                  <div>
                    <span>Market Cap Dominance: </span>
                    <span className="bold">
                      {data.total_market_cap.btc.toLocaleString("de-DE")}
                    </span>
                  </div>
                  <div>
                    <span>Trading Volume: </span>
                    <span className="bold">
                      {data.total_volume.btc.toLocaleString("de-DE")}
                    </span>
                  </div>
                </>
              ))}
            {table &&
              table.map(
                ({
                  high_24h,
                  low_24h,
                  ath,
                  ath_change_percentage,
                  atl,
                  atl_change_percentage,
                }) => (
                  <>
                    <div>
                      <span>24h High/ 24h Low: </span>
                      <span className="bold">
                        {high_24h.toLocaleString("de-DE", {
                          style: "currency",
                          currency: "USD",
                        })}{" "}
                      </span>
                      <span> / </span>
                      <span className="bold">
                        {low_24h.toLocaleString("de-DE", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </span>
                    </div>
                    <div>
                      <span>All-Time High: </span>
                      <span className="bold">
                        {ath.toLocaleString("de-DE", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </span>
                      <span> / </span>
                      <span className="bold low">
                        {ath_change_percentage.toLocaleString("de-DE", {
                          style: "percent",
                        })}
                      </span>
                    </div>
                    <div>
                      <span>All-Time Low: </span>
                      <span className="bold">
                        {atl.toLocaleString("de-DE", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </span>
                      <span> / </span>
                      <span className="bold high">
                        {atl_change_percentage.toLocaleString("de-DE", {
                          style: "percent",
                        })}
                      </span>
                    </div>
                  </>
                )
              )}
          </div>
        </aside>
      </div>
    </>
  );
};

export default Charts;
