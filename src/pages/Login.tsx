import * as React from "react";

import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import Textfield from "material-ui/TextField";
import { WithStyles, withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import Loading from "../components/LoadingModal";
import Popover from "material-ui/Popover";

import { Redirect } from "react-router-dom";

const decorate = withStyles(() => ({
    paper: {
        padding: 15,
        margin: 20,
        'min-width': 300,
    },
    popupText: {
        margin: 20,
    },
    input: {
        width: "50%"
    },
    loginButton: {
        marginTop: 15,
    }
}));

interface ILoginState {
    waiting: boolean;

    popupOpen: boolean;
    popupMessage: string;
}

interface ILoginProps {
    login: (username: string, password: string) => Promise<string>;
    isAuth: () => boolean;
}

type Style = WithStyles<"paper"> & WithStyles<"input"> & WithStyles<"loginButton"> & WithStyles<"popupText">;
const dClass = decorate(
    class Login extends React.Component<Style & ILoginProps, ILoginState> {
        private loginButtonRef: HTMLInputElement = {} as HTMLInputElement;
        private usernameRef: HTMLInputElement = {} as HTMLInputElement;
        private passwordRef: HTMLInputElement = {} as HTMLInputElement;

        constructor(props: any) {
            super(props);

            this.state = {
                waiting: false,
                popupOpen: false,
                popupMessage: "",
            };

            this.handleLogin = this.handleLogin.bind(this);
            this.handleKeyPress = this.handleKeyPress.bind(this);
            this.showError = this.showError.bind(this);
            this.validateLoginInput = this.validateLoginInput.bind(this);
        }

        /*
           A simple wrapper that sets the popup's message and finally
           displays it.

           @msg: The message that should be displayed
         */
        showError(msg: string) {
            this.setState({
                popupOpen: true,
                popupMessage: msg,
            });
        }

        /*
           Checks if the user has entered all required user information.
           If that's the case, then this function will return true. False
           otherwise.
         */
        validateLoginInput(): boolean {
            return this.usernameRef.value.length !== 0
                && this.passwordRef.value.length !== 0;
        }

        async handleLogin() {
            // Validate the login info first
            if (!this.validateLoginInput()) {
                // TODO: Make this prettier (Show what's missing)
                // TODO: Perhaps clear the password field
                this.showError("Username or password not specified");
                return;
            }

            // Show the Waiting Circle
            this.setState({
                waiting: true,
            });

            const username = this.usernameRef.value;
            const password = this.passwordRef.value;

            // Wait for the login to be done
            await this.props.login(username, password).catch((err) => {
                this.setState({
                    waiting: false,
                });

                this.showError(err);
            });
        }

        handleKeyPress(evt: any) {
            if (evt.key === "Enter") {
                evt.preventDefault();
                this.handleLogin();
            }
        }

        render() {
            const { classes } = this.props;

            return <div>
                { this.props.isAuth() ? <Redirect to="/dashboard" /> : null }
                <Loading show={this.state.waiting} />}
                <Popover
                    open={this.state.popupOpen}
                    anchorEl={this.loginButtonRef}
                    anchorReference="anchorEl"
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "left"
                    }}
                    transformOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                    }}
            onClose={() => this.setState({ popupOpen: false }) }
            PaperProps={{
                style: {
                    backgroundColor: "#f03434",
                    color: "white",
                }
            }}
            >
            <Typography variant="title" color="inherit" className={classes.popupText}>
                {this.state.popupMessage}
            </Typography>
                </Popover>
                <Grid container justify="center">
                    <Grid item xs={12} lg={4}>
                        <Paper className={classes.paper}>
                            <Grid container direction="column">
                                <Typography variant="title" color="inherit">Login</Typography>

                                <Textfield
                                    label="Username"
                                    className={classes.input}
                                    onKeyPress={this.handleKeyPress}
                                    inputRef={(node) => this.usernameRef = node } />
                                <Textfield
                                    label="Password"
                                    type="password"
                                    className={classes.input}
                                    onKeyPress={this.handleKeyPress}
                                    inputRef={(node) => this.passwordRef = node } />

                                <Button
                                    variant="raised"
                                    color="primary"
                                    className={classes.loginButton}
                                    onClick={this.handleLogin}
                                    buttonRef={(node) => this.loginButtonRef = node }>
                                    Login
                                </Button>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>;
        }
    }
);

export default dClass;
