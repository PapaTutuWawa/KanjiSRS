import * as React from "react"
import * as ReactDOM from "react-dom"

import { BrowserRouter, Route } from "react-router-dom";

import CssBaseline from "material-ui/CssBaseline";

import Topbar from "./components/topbar";
import { KanjiView } from "./components/kanjiView";
import Dashboard from "./pages/dashboard";

ReactDOM.render(
    <React.Fragment>
        <CssBaseline />
        <Topbar />
        <BrowserRouter>
            <div>
                <Route exact={true} path="/" component={Dashboard} />
                <Route path="/review" component={KanjiView} />
            </div>
        </BrowserRouter>
    </React.Fragment>,
    document.getElementById("app")
);
