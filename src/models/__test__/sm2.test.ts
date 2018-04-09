import { ISRSData, ResultType } from "../Review";
import { easinessDelta, updateVocab } from "../srs/sm2";

test("checks if the easiness delta is correct", () => {
    // Just calculate some values by hand and compare them
    expect(easinessDelta(0)).toBeCloseTo(-0.8);
    expect(easinessDelta(1)).toBeCloseTo(-0.5);
    expect(easinessDelta(2)).toBeCloseTo(-0.16);
    expect(easinessDelta(3)).toBeCloseTo(0.22);
    expect(easinessDelta(4)).toBeCloseTo(0.64);
    expect(easinessDelta(5)).toBeCloseTo(1.1);
});

test("checks if the vocabulary get's correctly updated", () => {
    const example = {
        japanese: "japanese",
        reading: "reading",
        meaning: "",

        srsData: {
            easiness: 2.5,
            correctAnswers: 3,
            nextDueDate: new Date(),
        }
    }

    const update = updateVocab(example, ResultType.Correct);

    // Check if we don't accidentaly change the actual data of the vocabulary
    expect(update.japanese).toEqual(update.japanese);
    expect(update.reading).toEqual(update.reading);
    expect(update.meaning).toEqual(update.meaning);

    // Check if the metadata gets correctly updated
    expect(update.srsData.easiness).toBeCloseTo(2.72);
});
