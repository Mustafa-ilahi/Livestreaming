import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import { authToken, createMeeting, fetchHlsDownstreamUrl } from "./API";
import ReactPlayer from "react-player";
import images from "./utilities/index";
import styles from "./style.module.css";

function JoinScreen({ getMeetingAndToken }) {
  const [meetingId, setMeetingId] = useState(null);
  const onClick = async () => {
    await getMeetingAndToken(meetingId);
  };
  return (
    // <div>
    //   <input
    //     type="text"
    //     placeholder="Enter Meeting Id"
    //     onChange={(e) => {
    //       setMeetingId(e.target.value);
    //     }}
    //   />
    //   <button onClick={onClick}>Join</button>
    //   {" or "}
    //   <button onClick={onClick}>Create Meeting</button>
    // </div>
    <div className={styles.header}>
      <img className={styles.headerLogo} src={images.logo} />
      <div className={styles.headerRightContainer}>
        <div className={styles.headerInputContainer}>
          <input
            className={styles.headerInput}
            placeholder="Enter Meeting Id"
            onChange={(e) => {
              setMeetingId(e.target.value);
            }}
          />
          <button className={styles.joinBtn} onClick={onClick}>
            Join
          </button>
        </div>
        <div className={styles.separator}></div>
        <button className={styles.createMeetingBtn} onClick={onClick}>
          Create Meeting
        </button>
      </div>
    </div>
  );
}

function HLSJoinScreen({ onDownstreamUrl }) {
  const [meetingId, setMeetingId] = useState(null);

  const handleOnClick = async (meetingId) => {
    const downstreamUrl = await fetchHlsDownstreamUrl({ meetingId });

    onDownstreamUrl(downstreamUrl);
  };

  return (
    <div>
      <input
          className={styles.headerInput}
        type="text"
        placeholder="Enter Meeting Id"
        onChange={(e) => {
          setMeetingId(e.target.value);
        }}
      />
      <button
        className={styles.joinBtn}
        onClick={() => {
          handleOnClick(meetingId);
        }}
      >
        Join
      </button>
    </div>
  );
}

function VideoComponent(props) {
  const micRef = useRef(null);
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
  const { webcamStream, micStream, webcamOn, micOn } = useParticipant(
    props.participantId
  );

  const videoStream = useMemo(() => {
    if (webcamOn) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div key={props.participantId}>
      {micOn && micRef && <audio ref={micRef} autoPlay />}
      {webcamOn && (
        <>
        
        <div className={styles.body}>
        <div className={styles.streamingContainer}>
          <div >
          <ReactPlayer
          //
          playsinline // very very imp prop
          pip={false}
          light={false}
          controls={true}
          muted={true}
          playing={true}
          //
          url={videoStream}
          //
          height={"380px"}
          width={"920px"}
          onError={(err) => {
            console.log(err, "participant video error");
          }}
        />
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
      </>

      )}
    </div>
  );
}

function Controls() {
  const { leave, toggleMic, toggleWebcam } = useMeeting();
  return (
    <div>
      <button className={styles.joinBtn} onClick={leave}>
        Leave
      </button>
      {/* <button
      onClick={toggleMic}
      >
        toggleMic
      </button>
      <button
      onClick={toggleWebcam}
      >
        toggleWebcam
      </button> */}
    </div>
  );
}

function Container(props) {
  const { participants, join, isMeetingJoined, startHls } = useMeeting({
    onMeetingJoined: () => {
      startHls();
    },
    onHlsStarted: (downstreamUrl) => {},
  });

  return (
    <div className="container">
      <h3>Meeting Id: {props.meetingId}</h3>
      {isMeetingJoined ? (
        <div>
          <Controls />
          {[...participants.keys()].map((participantId) => (
            <VideoComponent key={participantId} participantId={participantId} />
          ))}
        </div>
      ) : (
        <button className={styles.joinBtn} onClick={join}>
          Join
        </button>
      )}
    </div>
  );
}

function MeetingContainer() {
  const [meetingId, setMeetingId] = useState(null);

  const getMeetingAndToken = async (id) => {
    const meetingId =
      id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
  };

  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        // name: "Sasha",
      }}
      token={authToken}
    >
      <Container meetingId={meetingId} />
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} />
    
  );
}

function HLSPlayer({ url, handleOnLeave }) {
  return (
    <>
      <button onClick={handleOnLeave}>Leave</button>
      <ReactPlayer
        playing={true}
        playsinline
        height={"70%"}
        width={"60%"}
        url={url}
      />
    </>
  );
}

function HLSContainer() {
  const [downstreamUrl, setDownstreamUrl] = useState("");

  const isJoined = useMemo(() => !!downstreamUrl, [downstreamUrl]);

  return isJoined ? (
    <HLSPlayer
      url={downstreamUrl}
      handleOnLeave={() => {
        setDownstreamUrl("");
      }}
    />
  ) : (
    <HLSJoinScreen
      onDownstreamUrl={(_downstreamUrl) => {
        setDownstreamUrl(_downstreamUrl);
      }}
    />
  );
}

function App() {
  const [mode, setMode] = useState("host");
  
  const isHost = useMemo(() => mode === "host", [mode]);

  useEffect(() => {
    fetchHlsDownstreamUrl({ meetingId: "" });
  }, []);

  return (
    <>
      <button
        className={styles.createMeetingBtn}
        onClick={() => {
          setMode((s) => {
            return s === "host" ? "viewer" : "host";
          });
        }}
      >
        {isHost ? "Join as a Viewer" : "Join as a Host"}
      </button>
      {isHost ? <MeetingContainer /> : <HLSContainer />}
    </>
  );
}

export default App;
