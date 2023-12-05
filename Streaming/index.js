import React, { useState } from "react";
import styles from "./style.module.css";
import images from "../utilities/index";

export default function Streaming() {
  const [chat, setChat] = useState([
    { userImg: images.user1, userName: "Jane Cooper: ", msg: "So cool" },
    {
      userImg: images.user2,
      userName: "Wade Warren: ",
      msg: "Pretty girl, let's be friends",
    },
    {
      userImg: images.user3,
      userName: "Cameron Williamson: ",
      msg: "Love the streaming, keep goining",
    },
    { userImg: images.user4, userName: "Leslie Alexander: ", msg: "So coo" },
    {
      userImg: images.user5,
      userName: "Guy Hawkins: ",
      msg: "Pretty girl, let's be friends",
    },
    {
      userImg: images.user6,
      userName: "Robert Fox: ",
      msg: "Love the streaming, keep goining",
    },
    { userImg: images.user7, userName: "Jacob Jones: ", msg: "So cool" },
    {
      userImg: images.user8,
      userName: "Devon Lane: ",
      msg: "Pretty girl, let's be friends",
    },
    {
      userImg: images.user9,
      userName: "Floyd Miles: ",
      msg: "Love the streaming, keep goining",
    },
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img className={styles.headerLogo} src={images.logo} />
        <div className={styles.headerRightContainer}>
          <div className={styles.headerInputContainer}>
            <input
              className={styles.headerInput}
              placeholder="Enter Meeting Id"
            />
            <button className={styles.joinBtn}>Join</button>
          </div>
          <div className={styles.separator}></div>
          <button className={styles.createMeetingBtn}>Create Meeting</button>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.streamingContainer}>
          <div className={styles.streamBgContainer}>
            <div className={styles.liveBtn}>
              <img className={styles.liveIcon} src={images.liveIcon} />
              Live
            </div>
            <div className={styles.eyeBtn}>
              <img className={styles.eyeIcon} src={images.eyeIcon} />
              12k
            </div>
            <img className={styles.volumeIcon} src={images.volumeIcon} />
            <div className={styles.qualityBtn}>1080p</div>
            <img
              className={styles.fullScreenIcon}
              src={images.fullScreenIcon}
            />
            {/* <img className={styles.streamBg} src={images.streamBg} /> */}
          </div>
          <div className={styles.streamChatContainer}>
            <div className={styles.streamChatHeadingContainer}>
              <div className={styles.streamChatHeading}>STREAM CHAT</div>
              <div className={styles.addUserIconContainer}>
                <img className={styles.addUserIcon} src={images.addUserIcon} />
              </div>
            </div>
            <div>
              {chat.map((item, index) => {
                return (
                  <div className={styles.messageContainer} key={index}>
                    <img className={styles.userImg} src={item.userImg} />
                    <div className={styles.userName}>{item.userName}</div>
                    <div className={styles.msg}>{item.msg}</div>
                  </div>
                );
              })}
            </div>
            <div className={styles.sendMsgContainer}>
              <input
                className={styles.sendMsgInput}
                placeholder="Send a message"
              />
              <div className={styles.heartIconContainer}>
                <img className={styles.heartIcon} src={images.heartIcon} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
