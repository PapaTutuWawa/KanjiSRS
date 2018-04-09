// Data needed by the "Improved SM2" Algorithm
export interface ISRSData {
    // (>= 1.3): How easy the item was, with 1.3 being the most difficult
    easiness: number;
    // Number of correct consecutive answers
    correctAnswers: number;
    // When the next review should occur
    nextDueDate: Date;
};

export interface IVocab {
    japanese: string;
    reading: string;
    meaning: string;

    srsData: ISRSData;
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
    vocab: IVocab;
    id: number;
};

export enum ResultType {
    Correct,
    Wrong,
    Forgotten,
};

// Converts a ResultType into its HTML Color (e.g. Wrong -> Red)
export function ResultTypeColor(rtype: ResultType): string {
    switch (rtype) {
        case ResultType.Correct:
            return "#26A65B";
        case ResultType.Wrong:
            return "#f03434";
        case ResultType.Forgotten:
            return "#000000";
    }

    // TypeScript complains otherwise
    return "";
};

export interface IResult {
    type: ResultType;
    question: IQuestion;
};
