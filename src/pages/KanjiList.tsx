import * as React from "react";

import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import { WithStyles, withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Table, { TableBody, TableCell, TableHead, TableRow } from "material-ui/Table";
import IconButton from "material-ui/IconButton";
import DeleteIcon from "material-ui-icons/Delete";

import { getRecentItems } from "../backend/User";

// We cannot set overflow. But the Docs say it's okay,
// so ignore all the compiler errors
//@ts-ignore
const decorate = withStyles(() => ({
    paper: {
        padding: 15,
        margin: 20,
        'min-width': 300,
        overflow: "auto",
    },
    table: {
        // TODO: On mobile it stil looks weird
        'min-width': 500,
    },
}));

// TODO: Add a toggle for the delete button
type Style = WithStyles<"paper"> & WithStyles<"table">;
const dClass = decorate(
    class Login extends React.Component<Style, {}> {
        constructor(props: any) {
            super(props);
        }

        render() {
            const { classes } = this.props;

            return <div>
                <Grid container justify="center">
                    <Grid item xs={12} lg={4}>
                        <Paper className={classes.paper}>
                            <Grid container direction="column">
                                <Typography variant="title" color="inherit">
                                    Your Kanji
                                </Typography>
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Delete</TableCell>
                                            <TableCell>Kanji</TableCell>
                                            <TableCell>Reading</TableCell>
                                            <TableCell>Meaning</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            getRecentItems().map((kanji) => {
                                                return <TableRow key={kanji.char}>
                                                    <TableCell>
                                                        <IconButton>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="display2" color="inherit">
                                                            {kanji.char}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="subheading" color="inherit">
                                                            {kanji.reading}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>{kanji.meaning}</TableCell>
                                                </TableRow>;
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>;
        }
    }
);

export default dClass;
