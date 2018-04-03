import * as React from "react";

import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import { WithStyles, withStyles } from "material-ui/styles";

const decorate = withStyles(({ palette, spacing }) => ({
    paper: {
        padding: 15,
        margin: 20,
        height: 400
    }
}));


const dClass = decorate(
    class PostReview extends React.Component<WithStyles<"paper">, {}> {
        render() {
            const { classes } = this.props;
            return <div>
                <Grid container>
                    <Grid item xs={4} />
                    <Grid item xs={4}>
                        <Paper elevation={4} className={classes.paper}>
                            Stuff
                        </Paper>
                    </Grid>
                    <Grid item xs={4} />
                </Grid>
            </div>;
        }
    }
);
export default dClass;
