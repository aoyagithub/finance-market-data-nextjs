import styles from "../styles/SelectedRange.module.css";
export const SelectSymbol = ({
  changeSelectedRange,
  changeLoadState,
  ranges,
  selectedRange,
}) => {
  const changeRange = (e) => {
    changeLoadState(true);
    changeSelectedRange(e.currentTarget.dataset.range);
  };

  return (
    <>
      <ul className={styles.list}>
        {ranges.map((range) => {
          return (
            <li className={styles.item} key={range}>
              <button
                className={`${styles.button} ${
                  selectedRange === range ? styles.active : ""
                }`}
                onClick={(e) => changeRange(e)}
                data-range={range}
              >
                {range}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default SelectSymbol;
