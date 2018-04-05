import * as React from "react";

import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import Textfield from "material-ui/TextField";
import { WithStyles, withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import { CircularProgress } from "material-ui/Progress";
import Modal from "material-ui/Modal";

import { Redirect } from "react-router-dom";

const decorate = withStyles(() => ({
    paper: {
        padding: 15,
        margin: 20,
        'min-width': 300,
    },
    input: {
        width: "50%"
    },
    loginButton: {
        marginTop: 15,
    }
}));

interface ILoginState {
    auth: boolean;
    loading: boolean;
}

type Style = WithStyles<"paper"> & WithStyles<"input"> & WithStyles<"loginButton">;
const dClass = decorate(
    class Login extends React.Component<Style, ILoginState> {
        constructor(props: any) {
            super(props);

            this.state = {
                auth: false,
                loading: false,
            };

            this.handleLogin = this.handleLogin.bind(this);
        }

        handleLogin(evt: any) {
            this.setState({
                loading: true,
            });

            setTimeout(() => {
                this.setState({
                    auth: true
                });
            }, 3000);
        }

        render() {
            const { classes } = this.props;

            return <div>
                { this.state.auth ? <Redirect to="/dashboard" /> : null }
                <Modal
                    aria-labelledby="Logging you in"
                    aria-describedby="Please wait..."
                    open={this.state.loading}
                    onClose={() => {} }
                >
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} lg={2}>
                            <Paper className={classes.paper}>
                                <Typography variant="title" color="inherit">
                                    Please wait...
                                </Typography>
                                <CircularProgress />
                            </Paper>
                        </Grid>
                    </Grid>
                </Modal>
                <Grid container justify="center">
                    <Grid item xs={12} lg={4}>
                        <Paper className={classes.paper}>
                            <Grid container direction="column">
                                <Typography variant="title" color="inherit">Login</Typography>

                                <Textfield label="Username" className={classes.input} />
                                <Textfield label="Password" type="password" className={classes.input} />

                                <Button
                                    variant="raised"
                                    color="primary"
                                    className={classes.loginButton}
                                    onClick={this.handleLogin}
                                >
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
