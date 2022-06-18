import styles from "../styles/Loader.module.css";

export const Loader = () => {
  return (
    <>
      <div className={styles.spinnerBox}>
        <div className={styles.circleBorder}>
          <div className={styles.circleCore}></div>
        </div>
      </div>
    </>
  );
};

export default Loader;
