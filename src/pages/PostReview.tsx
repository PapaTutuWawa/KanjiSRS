import * as React from "react";

import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import { WithStyles, withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";

import { Link } from "react-router-dom";

const decorate = withStyles(({ palette, spacing }) => ({
    paper: {
        padding: 15,
        margin: 20,
        height: 400
    }
}));

const dashboardLink = (props: any) => <Link to="/user/dashboard" {...props} />;

const dClass = decorate(
    class PostReview extends React.Component<WithStyles<"paper">, {}> {
        render() {
            const { classes } = this.props;
            return <div>
                <Grid container justify="center">
                    <Grid item xs={12} lg={4}>
                        <Paper elevation={4} className={classes.paper}>
                            <Grid container direction="column">
                                <Typography
                                    variant="title"
                                    color="inherit">
                                    Your Review:
                                </Typography>
                                <Button
                                    fullWidth={true}
                                    component={dashboardLink}
                                    variant="raised"
                                    color="primary">
                                    Dashboard
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
