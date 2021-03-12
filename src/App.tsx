import { LinearProgress } from "@material-ui/core";
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const WebcamCapture = lazy(() => import("./pages/WebcamCapture"));
const Preview = lazy(() => import("./pages/Preview"));

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Suspense fallback={<LinearProgress />}>
          <Route exact path="/" component={WebcamCapture} />
          <Route path="/preview" component={Preview} />
        </Suspense>
      </Switch>
    </Router>
  );
};

export default App;
