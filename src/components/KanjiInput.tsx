import * as React from "react";

import Textfield from "material-ui/TextField";

//@ts-ignore
import { toKana } from "wanakana";

import { QuestionType } from "../models/Review";

interface IKanjiInputProps {
    validate: (input: string) => void;
    type: QuestionType;
}

interface IKanjiInputState {
    input: string;
}

class KanjiInput extends React.Component<IKanjiInputProps, IKanjiInputState> {
    constructor(props: IKanjiInputProps) {
        super(props);

        this.state = {
            input: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.clear = this.clear.bind(this);
    }

    clear() {
        this.setState({
            input: ""
        });
    }


    handleChange(evt: any) {
        let input = evt.target.value;
        // Only use toKana, when we really want the reading
        /*
           TODO: On mobile, we experience a significant input lag

           The official docs suggest doing this
           ```
           var textInput = document.getElementById('wanakana-input');
           wanakana.bind(textInput, options);
           ```
         */
        if (this.props.type == QuestionType.Reading) {
            input = toKana(input);
        }

        this.setState({
            input: input
        });
    }

    handleKeyPress(evt: any) {
        if (evt.key == "Enter") {
            this.props.validate(this.state.input);
            evt.preventDefault();
        }
    }

    private QTypeToName(type: QuestionType): string {
        switch (type) {
            case QuestionType.Reading: return "Reading";
            case QuestionType.Meaning: return "Meaning";
        }
    }

    render() {
        return <div>
            <Textfield
                value={this.state.input}
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
                placeholder={this.QTypeToName(this.props.type)}
                fullWidth={true}
            ></Textfield>
        </div>
    }
}

export default KanjiInput
