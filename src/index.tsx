import * as React from "react"
import * as ReactDOM from "react-dom"

import { BrowserRouter, Route, Redirect } from "react-router-dom";

import CssBaseline from "material-ui/CssBaseline";

import Topbar from "./components/TopBar";
import Review from "./pages/Review";
import Dashboard from "./pages/Dashboard";
import PostReview from "./pages/PostReview";
import Login from "./pages/Login";
import BottomBar from "./components/BottomBar";

ReactDOM.render(
    <React.Fragment>
        <CssBaseline />
        <BrowserRouter>
            <div>
                <Topbar />
                <Route exact={true} path="/" component={() => <Redirect to="/login" /> } />
                <Route path="/login" component={Login} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/review" component={Review} />
                <Route path="/postReview" component={PostReview} />
            </div>
        </BrowserRouter>
        <BottomBar />
    </React.Fragment>,
    document.getElementById("app")
);
