export interface IKanji {
    char: string;
    reading: string;
    meaning: string;
};

export enum QuestionType {
    Reading,
    Meaning,
};

// Convert a QuestionType into its spelled-out form
export function QuestionTypeString(qtype: QuestionType): string {
    switch (qtype) {
        case QuestionType.Reading:
            return "Reading";
        case QuestionType.Meaning:
            return "Meaning";
    }
};

export interface IQuestion {
    type: QuestionType;
    kanji: IKanji;
    id: number;
};

export enum ResultType {
    Correct,
    Wrong,
};

// Converts a ResultType into its HTML Color (e.g. Wrong -> Red)
export function ResultTypeColor(rtype: ResultType): string {
    switch (rtype) {
        case ResultType.Correct:
            return "#26A65B";
        case ResultType.Wrong:
            return "#f03434";
    }
};

export interface IResult {
    type: ResultType;
    question: IQuestion;
};
