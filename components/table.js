import { useEffect, useState } from "react";
import styles from "../styles/Table.module.css";

export const Table = ({
  chartData,
  quoteData,
  symbols,
  selected,
  changeSelected,
  names,
}) => {
  const [data, setData] = useState();
  useEffect(() => {
    if (!(chartData && quoteData)) {
      return;
    }

    if (Object.keys(chartData).length && Object.keys(quoteData).length) {
      const propsData = {
        chart: chartData,
        quote: quoteData,
      };
      setData(propsData);
    }
  }, [chartData, quoteData]);

  const symbolsObjKeys = symbols.map((symbol) => {
    return Object.keys(symbol);
  });
  const tableData = {};
  symbolsObjKeys.forEach((symbol) => {
    let last = null;
    let change = null;
    let chg = null;

    if (symbol !== "euro") {
      last =
        data && data.chart[symbol].data.chart.result[0].meta.regularMarketPrice;
      change =
        data &&
        data.quote[symbol].data.quoteResponse.result[0].regularMarketChange;
      chg =
        data &&
        data.quote[symbol].data.quoteResponse.result[0]
          .regularMarketChangePercent;
    } else {
      last =
        data && data.chart[symbol].data.chart.result[0].meta.regularMarketPrice;
      change =
        data &&
        data.quote[symbol].data.quoteResponse.result[0].regularMarketChange;
      chg =
        data &&
        data.quote[symbol].data.quoteResponse.result[0]
          .regularMarketChangePercent;
    }
    const changeFlag =
      Math.sign(change) === 1 ? styles.positive : styles.negative;
    const chgFlag = Math.sign(chg) === 1 ? styles.positive : styles.negative;
    tableData[symbol] = {
      last,
      change,
      chg,
      changeFlag,
      chgFlag,
    };
  });
  const handleMouseEnter = (e) => {
    e.currentTarget.classList.add("active");
    changeSelected(e.currentTarget.dataset.symbol);
  };
  const handleMouseLeave = (e) => {
    if (selected !== e.currentTarget.dataset.symbol) {
      e.currentTarget.classList.remove("active");
    }
  };

  return (
    <>
      <table className={styles.table}>
        <tbody>
          <tr className={`${styles.tr} ${styles.trHeading}`}>
            <th className={styles.trHeadingTh}></th>
            <th className={styles.trHeadingTh}>LAST</th>
            <th className={styles.trHeadingTh}>CHANGE</th>
            <th className={styles.trHeadingTh}>%CHG</th>
          </tr>
          <tr
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            data-symbol="djia"
            className={`djia ${styles.tr} ${
              selected === "djia" ? styles.active : ""
            }`}
          >
            <th className={styles.th}>{names.djia}</th>
            <td className={styles.last}>{tableData.djia.last}</td>
            <td className={`${tableData.djia.changeFlag} ${styles.change}`}>
              {tableData.djia.change}
            </td>
            <td className={`${tableData.djia.chgFlag} ${styles.chg}`}>
              {tableData.djia.chg}
            </td>
          </tr>
          <tr
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            data-symbol="sp500"
            className={`sp500 ${styles.tr} ${
              selected === "sp500" ? styles.active : ""
            }`}
          >
            <th className={styles.th}>{names.sp500}</th>
            <td className={styles.last}>{tableData.sp500.last}</td>
            <td className={`${tableData.sp500.changeFlag} ${styles.change}`}>
              {tableData.sp500.change}
            </td>
            <td className={`${tableData.sp500.chgFlag} ${styles.chg}`}>
              {tableData.sp500.chg}
            </td>
          </tr>
          <tr
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            data-symbol="nasdaq"
            className={`nasdaq ${styles.tr} ${
              selected === "nasdaq" ? styles.active : ""
            }`}
          >
            <th className={styles.th}>{names.nasdaq}</th>
            <td className={styles.last}>{tableData.nasdaq.last}</td>
            <td className={`${tableData.nasdaq.changeFlag} ${styles.change}`}>
              {tableData.nasdaq.change}
            </td>
            <td className={`${tableData.nasdaq.chgFlag} ${styles.chg}`}>
              {tableData.nasdaq.chg}
            </td>
          </tr>
          <tr
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            data-symbol="nikkei225"
            className={`nikkei225 ${styles.tr} ${
              selected === "nikkei225" ? styles.active : ""
            }`}
          >
            <th className={styles.th}>{names.nikkei225}</th>
            <td className={styles.last}>{tableData.nikkei225.last}</td>
            <td
              className={`${tableData.nikkei225.changeFlag} ${styles.change}`}
            >
              {tableData.nikkei225.change}
            </td>
            <td className={`${tableData.nikkei225.chgFlag} ${styles.chg}`}>
              {tableData.nikkei225.chg}
            </td>
          </tr>
          <tr
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            data-symbol="ftse100"
            className={`ftse100 ${styles.tr} ${
              selected === "ftse100" ? styles.active : ""
            }`}
          >
            <th className={styles.th}>{names.ftse100}</th>
            <td className={styles.last}>{tableData.ftse100.last}</td>
            <td className={`${tableData.ftse100.changeFlag} ${styles.change}`}>
              {tableData.ftse100.change}
            </td>
            <td className={`${tableData.ftse100.chgFlag} ${styles.chg}`}>
              {tableData.ftse100.chg}
            </td>
          </tr>
          <tr
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            data-symbol="crudeOil"
            className={`crudeOil ${styles.tr} ${
              selected === "crudeOil" ? styles.active : ""
            }`}
          >
            <th className={styles.th}>{names.crudeOil}</th>
            <td className={styles.last}>{tableData.crudeOil.last}</td>
            <td className={`${tableData.crudeOil.changeFlag} ${styles.change}`}>
              {tableData.crudeOil.change}
            </td>
            <td className={`${tableData.crudeOil.chgFlag} ${styles.chg}`}>
              {tableData.crudeOil.chg}
            </td>
          </tr>
          <tr
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            data-symbol="gold"
            className={`gold ${styles.tr} ${
              selected === "gold" ? styles.active : ""
            }`}
          >
            <th className={styles.th}>{names.gold}</th>
            <td className={styles.last}>{tableData.gold.last}</td>
            <td className={`${tableData.gold.changeFlag} ${styles.change}`}>
              {tableData.gold.change}
            </td>
            <td className={`${tableData.gold.chgFlag} ${styles.chg}`}>
              {tableData.gold.chg}
            </td>
          </tr>
          <tr
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            data-symbol="yen"
            className={`yen ${styles.tr} ${
              selected === "yen" ? styles.active : ""
            }`}
          >
            <th className={styles.th}>{names.yen}</th>
            <td className={styles.last}>{tableData.yen.last}</td>
            <td className={`${tableData.yen.changeFlag} ${styles.change}`}>
              {tableData.yen.change}
            </td>
            <td className={`${tableData.yen.chgFlag} ${styles.chg}`}>
              {tableData.yen.chg}
            </td>
          </tr>
          <tr
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            data-symbol="euro"
            className={`euro ${styles.tr} ${
              selected === "euro" ? styles.active : ""
            }`}
          >
            <th className={styles.th}>{names.euro}</th>
            <td className={styles.last}>{tableData.euro.last}</td>
            <td className={`${tableData.euro.changeFlag} ${styles.change}`}>
              {tableData.euro.change}
            </td>
            <td className={`${tableData.euro.chgFlag} ${styles.chg}`}>
              {tableData.euro.chg}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Table;
