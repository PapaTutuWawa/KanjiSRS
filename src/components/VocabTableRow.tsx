import * as React from "react";

import { TableRow, TableCell } from "material-ui/Table";
import Typography from "material-ui/Typography";

import { IResult, QuestionTypeString, ResultTypeColor } from "../models/Review";

interface IVocabTableRowProps {
    result: IResult;
}

export default class VocabTableRow extends React.Component<IVocabTableRowProps, {}> {
    render() {
        // TODO: The vocabulary should appear white
        return <TableRow
                   style={{
                       backgroundColor: ResultTypeColor(this.props.result.type)
                   }}>
            <TableCell>
                <Typography variant="display1" color="inherit">
                    { this.props.result.question.vocab.japanese }
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant="body1" color="inherit">
                    { QuestionTypeString(this.props.result.question.type) }
                </Typography>
            </TableCell>
        </TableRow>;
    }
};
