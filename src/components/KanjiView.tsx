import * as React from "react";

import Grow from "material-ui/transitions/Grow";
import Paper from "material-ui/Paper";
import Card, { CardContent, CardActions } from "material-ui/Card";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import { WithStyles, withStyles } from "material-ui/styles";

import KanjiInput from "./KanjiInput";

import { IKanji,
         QuestionType,
         generateQuestionQueue,
         shuffleQuestionQueue } from "../models/ReviewQueue";

interface IKanjiViewState {
    kanjiIndex: number;
    grow: boolean;

    popupOpen: boolean;
    correct: boolean;
}

const kanjis: IKanji[] = [
    {
        char: "前",
        reading: "まえ",
        meaning: "Before"
    }, {
        char: "出",
        reading: "しゅつ",
        meaning: "Exit"
    }
];

const queue = shuffleQuestionQueue(generateQuestionQueue(kanjis));

const decorate = withStyles(() => ({
    card: {
        'margin-top': 10,
        padding: 10,
    },
    popup: {
        padding: 10,
        'margin-left': 10,
        width: 100,
        height: 100,
    }
}));

const dClass = decorate(
    class KanjiView extends React.Component<WithStyles<"card"> & WithStyles<"popup">, IKanjiViewState> {
        private popupMessage: string = "";

        constructor(props: any) {
            super(props);

            this.state = {
                kanjiIndex: 0,
                grow: false,
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
            this.popupMessage = msg;

            this.setState({
                popupOpen: true
            });

            setTimeout(this.resetPopup, 1000);
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

            // Check if the reading or the meaning was correct and show the appropriate popup
            switch (queue[this.state.kanjiIndex].type) {
                case QuestionType.Reading:
                    if (input === queue[this.state.kanjiIndex].kanji.reading) {
                        correct();
                    } else {
                        wrong();
                        return;
                    }
                    break;
                case QuestionType.Meaning:
                    if (input.toLowerCase() === queue[this.state.kanjiIndex].kanji.meaning.toLowerCase()) {
                        correct();
                    } else {
                        wrong();
                        return;
                    }
                    break;
            }

            if (this.state.kanjiIndex + 1 >= queue.length) return;
            this.setState({
                kanjiIndex: this.state.kanjiIndex + 1,
                grow: !this.state.grow,
            });
        }

        render(): any {
            const { classes } = this.props;
            return <div>
                <Card className={classes.card}>
                    <CardContent>
                        <Grid container justify="center">
                            <Typography
                                variant="display4"
                                color="inherit"
                            >{queue[this.state.kanjiIndex].kanji.char}</Typography>
                            <Grow in={this.state.popupOpen}>
                                <Paper elevation={4} className={classes.popup} style={{
                                    // If the answer given was correct, then the paper should appear green. But
                                    // if the answer was wrong, then the paper should be red.
                                    'background-color': this.state.correct ? "#26A65B" : "#f03434",
                                    color: this.state.correct ? "white" : "black"
                                }}>
                                    <Grid container justify="center">
                                        {this.popupMessage}
                                    </Grid>
                                </Paper>
                            </Grow>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Grid container justify="center">
                            <KanjiInput
                                ref="input"
                                type={queue[this.state.kanjiIndex].type}
                                validate={this.checkAnswer}
                            />
                        </Grid>
                    </CardActions>
                </Card>
            </div>;
        }
});

export { dClass as KanjiView, QuestionType };
