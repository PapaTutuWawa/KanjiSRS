import { IKanji, QuestionType, IQuestion } from "./Review";

function random(min: number, max: number): number {
    return Math.random() * (max - min) +  min;
}

/*
  Convert a list of Kanji into a list of questions, consisting of
  reading and meaning.
*/
export function generateQuestionQueue(kanjis: IKanji[]): IQuestion[] {
    let ret: IQuestion[] = [];
    kanjis.forEach((kanji) => {
        ret.push({
            type: QuestionType.Reading,
            kanji: kanji
        });
        ret.push({
            type: QuestionType.Meaning,
            kanji: kanji
        });
    });

    return ret;
};

/*
  For a "Review Queue" of n elements, this function will randomly swap
  two elements from the "Queue" n times.
*/
export function shuffleQuestionQueue(questions: IQuestion[]): IQuestion[] {
    for (let i = 0; i < questions.length; i++) {
        let a = random(0, questions.length);
        let b = random(0, questions.length);
        let tmp = questions[b];

        questions[b] = questions[a];
        questions[a] = tmp;
    }

    return questions;
};

export {IQuestion, QuestionType, IKanji};
