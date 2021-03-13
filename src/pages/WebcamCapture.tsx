import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import React, { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Webcam from "react-webcam";
import styled from "styled-components";
import { setCameraImg } from "../features/cameraSlice";

const videoConstraints = {
  width: 300,
  height: 450,
  facingMode: "user",
};

const WebcamCapture: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();

    if (imageSrc) {
      dispatch(setCameraImg(imageSrc));
      history.push("/preview");
    }
  }, [webcamRef, dispatch, history]);

  return (
    <WebcamCaptureContainer>
      <Webcam
        ref={webcamRef}
        height={videoConstraints.height}
        width={videoConstraints.width}
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <CaptureButton fontSize="large" onClick={capture} />
    </WebcamCaptureContainer>
  );
};

export default WebcamCapture;

const WebcamCaptureContainer = styled.div`
  position: relative;
  width: 300;
  height: 450;
`;

const CaptureButton = styled(RadioButtonUncheckedIcon)`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  color: white;
`;
