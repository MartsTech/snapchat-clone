import { LinearProgress } from "@material-ui/core";
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Spinner from "react-spinkit";

const Login = lazy(() => import("./pages/Login"));
const WebcamCapture = lazy(() => import("./pages/WebcamCapture"));
const Preview = lazy(() => import("./pages/Preview"));
const Chats = lazy(() => import("./pages/Chats"));
const ChatView = lazy(() => import("./pages/ChatView"));

const App: React.FC = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <AppWrapper>
        <img src={`${process.env.PUBLIC_URL}/favicon.ico`} alt="logo" />
        <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
      </AppWrapper>
    );
  }

  return (
    <AppWrapper>
      <Router>
        <Switch>
          {!user ? (
            <Suspense fallback={<LinearProgress />}>
              <Login />
            </Suspense>
          ) : (
            <Suspense fallback={<LinearProgress />}>
              <AppContainer>
                <AppBackground>
                  <Route exact path="/" component={WebcamCapture} />
                  <Route path="/preview" component={Preview} />
                  <Route exact path="/chats" component={Chats} />
                  <Route path="/chats/view" component={ChatView} />
                </AppBackground>
              </AppContainer>
            </Suspense>
          )}
        </Switch>
      </Router>
    </AppWrapper>
  );
};

export default App;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fefc01;
  height: 100vh;
  overflow: hidden;
`;

const AppContainer = styled.div`
  background: url("https://www.pngkey.com/png/full/859-8598072_picture-freeuse-library-silhouette-mobile-at-getdrawings-cell.png")
    no-repeat center;
  background-size: contain;
  height: 450px;
  padding: 94px;
`;

const AppBackground = styled.div`
  background: white;
  height: 450px;
  width: 300px;
`;
