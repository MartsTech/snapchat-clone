import AttachFileIcon from "@material-ui/icons/AttachFile";
import CloseIcon from "@material-ui/icons/Close";
import CreateIcon from "@material-ui/icons/Create";
import CropIcon from "@material-ui/icons/Crop";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import NoteIcon from "@material-ui/icons/Note";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import TimerIcon from "@material-ui/icons/Timer";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { resetCameraImg, selectCameraImg } from "../features/cameraSlice";
import SendIcon from "@material-ui/icons/Send";
import { v4 as uuid } from "uuid";
import { db, storage } from "../firebase";
import firebase from "firebase/app";

const Preview: React.FC = () => {
  const cameraImg = useSelector(selectCameraImg);

  const dispatch = useDispatch();
  const history = useHistory();

  const closePreview = () => {
    dispatch(resetCameraImg());
  };

  const sendPost = () => {
    if (!cameraImg) {
      return;
    }
    const id = uuid();

    const uploadTask = storage
      .ref(`posts/${id}`)
      .putString(cameraImg, "data_url");

    uploadTask.on(
      "state_changed",
      null,
      (err) => {
        console.error(err);
      },
      () => {
        storage
          .ref("posts")
          .child(id)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              imageUrl: url,
              username: "Martin Velkov",
              read: false,
              profilePic:
                "https://lh3.googleusercontent.com/a-/AOh14Gge4WVENvl9bdKUN7jaaE6RqaS-2o3F5Whp44Bf=s96-c",
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            history.replace("/chats");
          });
      }
    );
  };

  useEffect(() => {
    if (!cameraImg) {
      history.replace("/");
    }
  }, [cameraImg, history]);

  return (
    <PreviewContainer>
      <PreviewClose onClick={closePreview} />
      <PreviewToolbarRight>
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </PreviewToolbarRight>
      <img src={cameraImg || ""} alt="preview" />
      <PreviewFooter onClick={sendPost}>
        <h2>Send Now</h2>
        <PreviewSend fontSize="small" />
      </PreviewFooter>
    </PreviewContainer>
  );
};

export default Preview;

const PreviewContainer = styled.div`
  position: relative;
`;

const PreviewClose = styled(CloseIcon)`
  position: absolute;
  top: 0;
  margin: 5px;
  cursor: pointer;
  color: white;
`;

const PreviewToolbarRight = styled.div`
  color: white;
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  margin: 5px;

  > svg {
    font-size: 20px !important;
    margin-bottom: 8px;
    cursor: pointer;
  }
`;

const PreviewFooter = styled.div`
  position: absolute;
  bottom: 0;
  right: -25px;
  transform: translate(-50%, -50%);
  background: yellow;
  color: black;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 30px;
  padding: 7px;
  cursor: pointer;

  > h2 {
    font-size: 8px;
    margin-right: 3px;
  }
`;

const PreviewSend = styled(SendIcon)`
  font-size: 10px !important;
`;
