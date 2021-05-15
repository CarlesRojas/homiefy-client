import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

// Pages
import MoneySummary from "pages/MoneySummary";
import Utilities from "pages/Utilities";
import PostIt from "pages/PostIt";

// Components
import Navbar from "components/Navbar";

export default function App() {
    return (
        <div className="app">
            <Router>
                <Switch>
                    <Route
                        path="/utilities"
                        component={Utilities}
                        exact
                    ></Route>
                    <Route path="/postIt" component={PostIt} exact></Route>
                    <Route path="/" component={MoneySummary} exact></Route>
                </Switch>
            </Router>
            <Navbar />
        </div>
    );
}
