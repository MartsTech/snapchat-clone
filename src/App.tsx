import { LinearProgress } from "@material-ui/core";
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";

const WebcamCapture = lazy(() => import("./pages/WebcamCapture"));
const Preview = lazy(() => import("./pages/Preview"));
const Chats = lazy(() => import("./pages/Chats"));
const ChatView = lazy(() => import("./pages/ChatView"));

const App: React.FC = () => {
  return (
    <AppWrapper>
      <Router>
        <Switch>
          <Suspense fallback={<LinearProgress />}>
            <AppContainer>
              <Route exact path="/" component={WebcamCapture} />
              <Route path="/preview" component={Preview} />
              <Route exact path="/chats" component={Chats} />
              <Route path="/chats/view" component={ChatView} />
            </AppContainer>
          </Suspense>
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
`;

const AppContainer = styled.div``;
