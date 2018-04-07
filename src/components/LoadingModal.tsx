import * as React from "react";

import { CircularProgress } from "material-ui/Progress";
import Modal from "material-ui/Modal";
import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import { WithStyles, withStyles } from "material-ui/styles";

interface ILoadingProps {
    show: boolean;
}

const decorate = withStyles(() => ({
    paper: {
        padding: 15,
        margin: 20,
        'min-width': 300,
    }
}));

const dClass = decorate(
    class Loading extends React.Component<WithStyles<"paper"> & ILoadingProps, {}> {
        render() {
            const { classes } = this.props;

            return <Modal
                       open={this.props.show}
                       onClose={() => {} }>
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
        }
    }
);

export default dClass;
