import * as React from "react";

import Card, { CardContent, CardActions } from "material-ui/Card";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import { WithStyles, withStyles } from "material-ui/styles";
import Popover from "material-ui/Popover";

import KanjiInput from "./KanjiInput";

import { IQuestion, QuestionType } from "../models/ReviewQueue";

interface IKanjiViewState {
    popupMessage: string;
    popupOpen: boolean;

    correct: boolean;
}

interface IKanjiViewProps {
    question: IQuestion;
    validate: (answer: string) => boolean;
}

const decorate = withStyles(() => ({
    card: {
        'margin-top': 10,
        padding: 10,
    },
    popupText: {
        margin: 20,
    }
}));

// TODO: We cause a setState after dismount somewhere!
type Style = WithStyles<"card"> & WithStyles<"popupText">;
const dClass = decorate(
    class KanjiView extends React.Component<Style & IKanjiViewProps, IKanjiViewState> {
        // Needed for the Popover to be positioned next to the Kanji
        private kanjiRef: any = null;
        private popupTimeout: any = null;

        constructor(props: any) {
            super(props);

            this.state = {
                popupMessage: "Correct",
                popupOpen: false,
                correct: true // Let's stay positive
            };

            this.checkAnswer = this.checkAnswer.bind(this);
            this.resetPopup = this.resetPopup.bind(this);
            this.showPopup = this.showPopup.bind(this);
        }

        resetPopup() {
            if (!this.state.popupOpen) return;

            this.setState({
                popupOpen: false
            });
        }
        showPopup(msg: string) {

            this.setState({
                popupMessage: msg,
                popupOpen: true
            });

            this.popupTimeout = setTimeout(this.resetPopup, 1000);
        }

        componentWillDismount() {
            clearTimeout(this.popupTimeout);
        }

        checkAnswer(input: string) {
            // Clear the input in any case
            (this.refs.input as KanjiInput).clear();

            /*
               Prevent writing the same thing over and over by having
               to functions, which set the correct-state and show
               the popup
             */
            const correct = () => {
                // Set the state to correct, so we get the right colour
                this.setState({
                    correct: true,
                });

                this.showPopup("Correct")
            };
            const wrong = () => {
                // Set the state to correct, so we get the right colour
                this.setState({
                    correct: false,
                });

                this.showPopup("Wrong")
            };

            if (this.props.validate(input)) {
                correct();
            } else {
                wrong();
            }
        }

        render(): any {
            const { question, classes } = this.props;
            return <div>
                <Card className={classes.card}>
                    <CardContent>
                        <Grid container justify="center">
                            <Typography
                                variant="display4"
                                color="inherit"
                            ><span
                                 ref={(node) => this.kanjiRef = node }
                             >{question.kanji.char}</span></Typography>
                        </Grid>
                        <Popover
                            open={this.state.popupOpen}
                            anchorEl={this.kanjiRef}
                            anchorReference="anchorEl"
                            anchorPosition={{ top: 0, left: 0 }}
                            onClose={() => {} }
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            PaperProps={{
                                style: {
                                    // If the answer given was correct, then the paper should appear green. But
                                    // if the answer was wrong, then the paper should be red.
                                    backgroundColor: this.state.correct ? "#26A65B" : "#f03434",
                                    color: "white",
                                }
                            }}
                        >
                            <Typography
                                className={classes.popupText}
                                variant="title"
                                color="inherit">{this.state.popupMessage}</Typography>
                        </Popover>
                    </CardContent>
                    <CardActions>
                        <Grid container justify="center">
                            <KanjiInput
                                ref="input"
                                type={question.type}
                                validate={this.checkAnswer}
                            />
                        </Grid>
                    </CardActions>
                </Card>
            </div>;
        }
    });

export { dClass as KanjiView, QuestionType };
