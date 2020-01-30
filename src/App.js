import React from "react";
import HomePage from "./pages/homepage/homepage.component";
import "./App.css";
import { Switch, Route } from "react-router-dom";

const HatsPage = () => <h1>Hats PAge here!!</h1>;

function App() {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/shop/hats" component={HatsPage} />
            </Switch>
        </div>
    );
}

export default App;
