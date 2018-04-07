import * as React from "react";

import { BrowserRouter, Route, Redirect } from "react-router-dom";
import AuthRoute from "./AuthRoute";

import CssBaseline from "material-ui/CssBaseline";

import Topbar from "./TopBar";
import BottomBar from "./BottomBar";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Review from "../pages/Review";
import PostReview from "../pages/PostReview";
import VocabList from "../pages/VocabList";

import { IResult } from "../models/Review";
import { fetchLastReview } from "../models/User";

interface IApplicationState {
    // TODO: For debugging only!
    auth: boolean;
    lastReview: IResult[];
}

// TODO: Set the Content Security Policy
export default class Application extends React.Component<{}, IApplicationState> {
    constructor(props: any) {
        super(props);

        this.state = {
            auth: false,
            lastReview: [],
        };

        this.checkAuth = this.checkAuth.bind(this);
        this.login = this.login.bind(this);
        this.getLastReview = this.getLastReview.bind(this);
        this.setLastReview = this.setLastReview.bind(this);
    }

    // NOTE: Because I fear that Promises need to be used, I already implement
    //       it like this!
    // Implementation
    // NOTE: If we succeed in logging in, we will resolve the Promise. If we fail, we
    //       reject the Promise.
    login(username: string, password: string): Promise<string> {
        return new Promise<string>((res, rej) => {
            // Just to see the timeout
            setTimeout(() => {
                if (username === "test" && password === "test") {
                    // TODO: SessionStorage seems fine, but look out for better ways
                    // NOTE: Cookies would be nice as they are persistent, but (I think) they
                    //       that they arent as secure.
                    sessionStorage.setItem("sessionID", "abc");
                    this.setState({
                        auth: true,
                    });

                    res("");
                } else {
                    rej("Wrong username or password");
                }
            }, 3000);
        });
    }

    logout() {
        // Perform the logout
        // TODO: Actually perform the logout
        sessionStorage.setItem("sessionID", "");
    }

    setLastReview(review: IResult[]) {
        this.setState({
            lastReview: review,
        });
    }

    getLastReview(): IResult[] {
        return this.state.lastReview;
    }

    componentWillMount() {
        const review = fetchLastReview();
        this.setState({
            lastReview: review,
        });
    }

    checkAuth() {
        return sessionStorage.getItem("sessionID") === "abc";
    }

    render() {
        /*
           For some reason, TypeScript complains about the properties we give to the custom
           components not matching, since we use styles (using withStyles/WithStyles). These
           are, however, not critical, so we just silence them.
         */
        // TODO: 404 page
        return <React.Fragment>
            <CssBaseline />
            <BrowserRouter>
                <div>
                    <Topbar isAuth={this.checkAuth} logout={this.logout} />
                    <Route exact={true} path="/" component={() => <Redirect to="/login" /> } />
                    <Route path="/login" component={() => {
                            return <Login login={this.login} isAuth={this.checkAuth} />;
                    }} />
                    <AuthRoute path="/user/dashboard" component={() => {
                            //@ts-ignore
                            return <Dashboard getLastReview={this.getLastReview} />;
                    }} isAuth={this.checkAuth} />
                    <AuthRoute path="/user/review" component={() => {
                        return <Review setLastReview={this.setLastReview} />;
                    }} isAuth={this.checkAuth} />
                    <AuthRoute path="/user/postReview" component={() => {
                            //@ts-ignore
                            return <PostReview getLastReview={this.getLastReview} />;
                    }} isAuth={this.checkAuth} />
                    <AuthRoute path="/user/vocab" component={VocabList} isAuth={this.checkAuth} />
                    <BottomBar />
                </div>
            </BrowserRouter>
        </React.Fragment>;
    }
};
