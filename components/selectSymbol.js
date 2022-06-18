import styles from "../styles/SelectSymbol.module.css";

export const SelectSymbol = ({ names, selected, changeSelected }) => {
  return (
    <>
      <select
        className={styles.select}
        value={selected}
        onChange={(e) => changeSelected(e.target.value)}
      >
        <option value="djia">{names.djia}</option>
        <option value="sp500">{names.sp500}</option>
        <option value="nasdaq">{names.nasdaq}</option>
        <option value="nikkei225">{names.nikkei225}</option>
        <option value="ftse100">{names.ftse100}</option>
        <option value="crudeOil">{names.crudeOil}</option>
        <option value="gold">{names.gold}</option>
        <option value="yen">{names.yen}</option>
        <option value="euro">{names.euro}</option>
      </select>
    </>
  );
};
export default SelectSymbol;
