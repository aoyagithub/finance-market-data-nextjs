import { useEffect, useState } from "react";
import Head from "next/head";
import Chart from "../components/chart";
import Clock from "../components/clock";
import SelectSymbol from "../components/selectSymbol";
import SelectRange from "../components/selectRange";
import Table from "../components/table";
import axios from "axios";
import Loader from "../components/loader";
import styles from "../styles/Home.module.css";
import { GA_ID, existsGaId } from "../lib/gtag";

const symbols = [
  { djia: "%5EDJI" },
  { sp500: "%5EGSPC" },
  { nasdaq: "%5EIXIC" },
  { nikkei225: "%5EN225" },
  { ftse100: "%5EFTSE" },
  { crudeOil: "QM=F" },
  { gold: "MGC=F" },
  { yen: "JPY=X" },
  { euro: "EURUSD=X" },
];
const names = {
  djia: "DJIA",
  sp500: "S&P 500",
  nasdaq: "Nasdaq Composite",
  nikkei225: "Japan: Nikkei 225",
  ftse100: "UK: FTSE 100",
  crudeOil: "Crude Oil Futures",
  gold: "Gold Futures",
  yen: "Yen",
  euro: "Euro",
};
const ranges = ["1d", "5d"];

export const App = () => {
  const [chartData, setChartData] = useState();
  const [quoteData, setQuoteData] = useState();
  const [selected, setSelected] = useState("djia");
  const [selectedRange, setSelectedRange] = useState("1d");
  const [loadState, setLoadState] = useState(false);
  const symbolsObjKeys = symbols.map((symbol) => {
    return Object.keys(symbol);
  });
  const symbolsObjValues = symbols.map((symbol) => {
    return Object.values(symbol);
  });
  const response = {
    chart: {},
    quote: {},
  };
  const changeSelected = (selected) => {
    setSelected(selected);
  };
  const changeSelectedRange = (selected) => {
    setSelectedRange(selected);
  };
  const changeLoadState = (state) => {
    setLoadState(state);
  };
  useEffect(() => {
    const getData = async (symbolsObjValues) => {
      await symbolsObjValues.map(async (symbol, index) => {
        await axios
          .get(
            `/api/getData?symbol=${symbol}&range=${selectedRange}&type=chart`
          )
          .then((res) => {
            response.chart[symbolsObjKeys[index]] = res;
            if (Object.keys(response.chart).length === 9) {
              setChartData(response.chart);
              if (loadState) {
                setLoadState(false);
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
      await symbolsObjValues.map(async (symbol, index) => {
        await axios
          .get(`/api/getData?symbol=${symbol}&type=quote`)
          .then((res) => {
            response.quote[symbolsObjKeys[index]] = res;
            if (Object.keys(response.quote).length === 9) {
              setQuoteData(response.quote);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    };
    getData(symbolsObjValues);
    setInterval(() => {
      getData(symbolsObjValues);
    }, 60000);
  }, [selectedRange]);

  return (
    <>
      <Head>
        <title>Market Data</title>
        <meta name="description" content="Market Data" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="noindex, nofollow" />
        {/* Google Analytics */}
        {existsGaId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                  });`,
              }}
            />
          </>
        )}
      </Head>
      <h1 className={styles.h1}>MARKET DATA</h1>
      <div className="inner">
        <div className={styles.heading}>
          <h2 className={styles.h2}>Overview</h2>
          <Clock />
        </div>
        <main className={styles.main}>
          <Table
            chartData={chartData}
            quoteData={quoteData}
            symbols={symbols}
            names={names}
            selected={selected}
            changeSelected={changeSelected}
          />
          <div className={styles.mainItem}>
            <h3 className={styles.h3}>{names[selected]}</h3>
            <div className={styles.chartArea}>
              {(() => {
                if (loadState) {
                  return <Loader />;
                } else {
                  return (
                    <Chart
                      chartData={chartData}
                      quoteData={quoteData}
                      symbols={symbols}
                      selected={selected}
                      selectedRange={selectedRange}
                    />
                  );
                }
              })()}
            </div>
            <div className={styles.selectArea}>
              <SelectSymbol
                names={names}
                selected={selected}
                changeSelected={changeSelected}
              />
              <SelectRange
                ranges={ranges}
                selectedRange={selectedRange}
                changeSelectedRange={changeSelectedRange}
                changeLoadState={changeLoadState}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default App;
