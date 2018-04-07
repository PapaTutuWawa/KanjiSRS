import * as React from "react";

import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import { WithStyles, withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Table, { TableBody, TableCell, TableHead, TableRow } from "material-ui/Table";
import IconButton from "material-ui/IconButton";
import Button from "material-ui/Button";
import DeleteIcon from "material-ui-icons/Delete";
import AddIcon from "material-ui-icons/Add";
import CloseIcon from "material-ui-icons/Close";
import Dialog, { DialogActions, DialogContent, DialogTitle } from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import Snackbar from "material-ui/Snackbar";

// Move this into the Application Component
import { getRecentItems } from "../models/User";
import { IVocab } from "../models/Review";

// We cannot set overflow. But the Docs say it's okay,
// so ignore all the compiler errors
//@ts-ignore
const decorate = withStyles(() => ({
    paper: {
        padding: 15,
        margin: 20,
        'min-width': 300,
        overflowX: "auto",
    },
    table: {
        // TODO: On mobile it stil looks weird
        'min-width': 500,
    },
    addFab: {
        position: "absolute",
        bottom: 20,
        right: 20,
    },
}));

interface IVocabListState {
    showDialog: boolean;
    snackOpen: boolean;
    snackMessage: string;
}

interface IVocabListProps {
    addVocabulary: (vocab: IVocab) => boolean;
}

// TODO: Add a toggle for the delete button
type Style = WithStyles<"paper"> & WithStyles<"table"> & WithStyles<"addFab">;
const dClass = decorate(
    class VocabList extends React.Component<Style& IVocabListProps, IVocabListState> {
        private japaneseRef: any = null;
        private readingRef: any = null;
        private meaningRef: any = null;

        constructor(props: any) {
            super(props);

            this.state = {
                showDialog: false,
                snackOpen: false,
                snackMessage: "",
            };

            this.showDialog = this.showDialog.bind(this);
            this.hideDialog = this.hideDialog.bind(this);
            this.addVocabulary = this.addVocabulary.bind(this);
        }

        showDialog() {
            this.setState({
                showDialog: true,
            });
        }
        hideDialog() {
            this.setState({
                showDialog: false,
            });
        }

        addVocabulary() {
            this.hideDialog();
            const ret = this.props.addVocabulary({
                japanese: this.japaneseRef.value,
                reading: this.readingRef.value,
                meaning: this.meaningRef.value,
            });

            if (ret) {
                this.setState({
                    snackOpen: true,
                    snackMessage: "Vocabulary added",
                });
            } else {
                this.setState({
                    snackOpen: true,
                    snackMessage: "An error occured while adding the vocabulary",
                });
            }

        }

        render() {
            const { classes } = this.props;

            return <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    open={this.state.snackOpen}
                    autoHideDuration={3000}
            onClose={(evt) => this.setState({snackOpen: false})}
            SnackbarContentProps={{
                'aria-describedby': "message-id",
            }}
            message={<span id="message-id">{this.state.snackMessage}</span> }
            action={[
                <IconButton
                    key={"snackBarCloseButton"}
                    onClick={(evt) => this.setState({snackOpen: false})}>
                    <CloseIcon />
                </IconButton>
            ]}
                ></Snackbar>
                <Dialog
                    disableBackdropClick
                    open={this.state.showDialog}
                    onClose={this.hideDialog}>
                    <DialogTitle>Add Vocabulary</DialogTitle>
                    <DialogContent>
                        <Grid container direction="column">
                            <TextField
                                inputRef={(node) => this.japaneseRef = node }
                                label="Japanese"/>
                            <TextField
                                inputRef={(node) => this.readingRef = node }
                                label="Reading"/>
                            <TextField
                                inputRef={(node) => this.meaningRef = node }
                                label="Meaning"/>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={(evt) => this.hideDialog() } color="primary">
                            Cancel
                        </Button>
                        <Button onClick={(evt) => this.addVocabulary() } color="secondary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
                <Button
                    variant="fab"
                    color="primary"
                    onClick={(evt) => this.showDialog() }
                    className={classes.addFab}>
                    <AddIcon />
                </Button>
                <Grid container justify="center">
                    <Grid item xs={12} lg={4}>
                        <Paper className={classes.paper}>
                            <Grid container direction="column">
                                <Typography variant="title" color="inherit">
                                    Your Vocabulary
                                </Typography>
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Delete</TableCell>
                                            <TableCell>Vocabulary</TableCell>
                                            <TableCell>Reading</TableCell>
                                            <TableCell>Meaning</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            getRecentItems().map((vocab) => {
                                                return <TableRow key={vocab.japanese}>
                                                    <TableCell>
                                                        <IconButton>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="display2" color="inherit">
                                                            {vocab.japanese}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="subheading" color="inherit">
                                                            {vocab.reading}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>{vocab.meaning}</TableCell>
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
