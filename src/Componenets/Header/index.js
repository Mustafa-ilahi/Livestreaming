import React from "react";
import images from "../../utilities";
import styles from "./style.module.css";
export default function Header() {
  return (
    <div className={styles.header}>
      <img className={styles.headerLogo} src={images.logo} />
      <div className={styles.headerRightContainer}>
        <div className={styles.headerInputContainer}>
          <input
            className={styles.headerInput}
            placeholder="Enter Meeting Id"
            // onChange={(e) => {
            //   setMeetingId(e.target.value);
            // }}
          />
          <button className={styles.joinBtn}>Join</button>
        </div>
        <div className={styles.separator}></div>
        <button className={styles.createMeetingBtn}>Create Meeting</button>
      </div>
    </div>
  );
}
