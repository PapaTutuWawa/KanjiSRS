import * as React from "react";

import { TableRow, TableCell } from "material-ui/Table";
import Typography from "material-ui/Typography";

import { IResult, QuestionTypeString, ResultTypeColor } from "../models/Review";

interface IVocabTableRowProps {
    result: IResult;
}

export default class VocabTableRow extends React.Component<IVocabTableRowProps, {}> {
    render() {
        return <TableRow
                   style={{
                       backgroundColor: ResultTypeColor(this.props.result.type),
                   }}>
            <TableCell>
                <Typography variant="display1" style={{ color: "white" }}>
                    { this.props.result.question.vocab.japanese }
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant="body1" style={{ color: "white" }}>
                    { QuestionTypeString(this.props.result.question.type) }
                </Typography>
            </TableCell>
        </TableRow>;
    }
};
