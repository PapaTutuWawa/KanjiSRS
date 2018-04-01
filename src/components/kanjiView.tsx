import * as React from "react";

import KanjiInput from "./kanjiInput";

interface IKanjiViewState {
    kanjiIndex: number;
}

interface Question {
    kanji: string;
    reading: string;
    meaning: string;
    type: QuestionType;
}

enum QuestionType {
    Meaning,
    Reading
}

const kanjis: Question[] = [
    {
        kanji: "前",
        reading: "mae",
        meaning: "Before",
        type: QuestionType.Reading
    }, {
        kanji: "出",
        reading: "shutsu",
        meaning: "Exit",
        type: QuestionType.Meaning
    }
];

class KanjiView extends React.Component<{}, IKanjiViewState> {
    constructor(props: any) {
        super(props);

        this.state = {
            kanjiIndex: 0,
        };

        this.checkAnswer = this.checkAnswer.bind(this);
    }

    checkAnswer(input: string) {
        // Clear the input in any case
        (this.refs.input as KanjiInput).clear();

        switch (kanjis[this.state.kanjiIndex].type) {
            case QuestionType.Reading:
                if (input === kanjis[this.state.kanjiIndex].reading) {
                    alert("Correct");
                } else {
                    alert("Wrong");
                    return;
                }
                break;
            case QuestionType.Meaning:
                if (input === kanjis[this.state.kanjiIndex].meaning) {
                    alert("Correct");
                } else {
                    alert("Wrong");
                    return;
                }
                break;
        }

        if (this.state.kanjiIndex + 1 >= kanjis.length) return;
        this.setState({
            kanjiIndex: this.state.kanjiIndex + 1
        });
    }

    render(): any {
        return <div>
            <h1>{kanjis[this.state.kanjiIndex].kanji}</h1>
            <KanjiInput
                ref="input"
                type={kanjis[this.state.kanjiIndex].type}
                validate={this.checkAnswer}
            />
        </div>;
    }
}

export { KanjiView, QuestionType };
