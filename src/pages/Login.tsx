import { Button } from "@material-ui/core";
import React from "react";
import { auth, provider } from "../firebase";
import styled from "styled-components";

const Login: React.FC = () => {
  const signIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };

  return (
    <LoginContainer>
      <img src={`${process.env.PUBLIC_URL}/favicon.ico`} alt="logo" />
      <Button variant="outlined" onClick={signIn}>
        Sign in
      </Button>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  background: #f3ff00;
  display: flex;
  flex-direction: column;

  > img {
    object-fit: contain;
    height: 300px;
  }
`;
