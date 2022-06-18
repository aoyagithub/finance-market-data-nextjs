import { useEffect, useState } from "react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import styles from "../styles/Clock.module.css";
dayjs.extend(advancedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

export const Clock = () => {
  const [hour, setHour] = useState();
  const [minute, setMinute] = useState();
  const [date, setDate] = useState();

  useEffect(() => {
    const getDatetime = () => {
      const time = new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
      });
      setHour(dayjs(time).format("H"));
      setMinute(dayjs(time).format("mm A"));
      setDate(dayjs(time).format("M/D/YY"));
    };
    setInterval(getDatetime, 1000);
  }, []);
  if (hour && minute && date) {
    return (
      <>
        <time className={styles.time}>
          {hour}
          <span className={styles.pulse}>:</span>
          {minute} EDT {date}
        </time>
      </>
    );
  }
};

export default Clock;
