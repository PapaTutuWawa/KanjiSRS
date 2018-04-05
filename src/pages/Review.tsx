import * as React from "react";

import Grid from "material-ui/Grid";
import { WithStyles, withStyles } from "material-ui/styles";

import { KanjiView } from "../components/KanjiView";

const decorate = withStyles(({ palette, spacing }) => ({
    review: {
        margin: 15,
    }
}));

const dClass = decorate(
    class Review extends React.Component<WithStyles<"review">, {}> {
        render() {
            const { classes } = this.props;
            return <div>
                <Grid container justify="center">
                    <Grid item xs={12} lg={3} className={classes.review}>
                        <KanjiView  />
                    </Grid>
                </Grid>
            </div>;
        }
    }
);

export default dClass;
