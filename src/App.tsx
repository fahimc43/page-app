import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

const Home = lazy(() => import("./components/pages/Home"));
const Details = lazy(() => import("./components/pages/Details"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<p>Loading...Loading...</p>}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/details" component={Details} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
