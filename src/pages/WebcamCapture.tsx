import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import React, { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import Webcam from "react-webcam";
import styled from "styled-components";
import { setCameraImg } from "../features/cameraSlice";

const videoConstraints: MediaTrackConstraints = {
  width: 250,
  height: 400,
  facingMode: "user",
};

const WebcamCapture: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);

  const dispatch = useDispatch();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();

    if (imageSrc) {
      dispatch(setCameraImg(imageSrc));
    }
  }, [webcamRef, dispatch]);

  return (
    <WebcamCaptureContainer>
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <RadioButtonUncheckedIcon fontSize="large" onClick={capture} />
    </WebcamCaptureContainer>
  );
};

export default WebcamCapture;

const WebcamCaptureContainer = styled.div``;
