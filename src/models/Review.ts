export interface IKanji {
    char: string;
    reading: string;
    meaning: string;
};

export enum QuestionType {
    Reading,
    Meaning,
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

export interface IResult {
    type: ResultType;
    question: IQuestion;
};
