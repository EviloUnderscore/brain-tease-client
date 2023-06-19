import { Questions } from "./Questions";
import { RandomAnswers } from "./RandomAnswers";

export class QuestionsWithAnswers {
    questionsWithAnswers: RandomAnswers[];

    constructor(){
        this.questionsWithAnswers = [];
    }

    public generateQuestionsWithRandomAnswers(questions: Questions): void{
        for(let q of questions){
            const newRA = new RandomAnswers();
            newRA.question = q.question;
            newRA.addAnswers(q);
            this.questionsWithAnswers.push(newRA);
        }
    }

    [Symbol.iterator]() {
        let index = 0;
        const questionsWithAnswers = this.questionsWithAnswers;

        return {
            next(): IteratorResult<RandomAnswers> {
                if (index < questionsWithAnswers.length) {
                    return {
                        value: questionsWithAnswers[index++],
                        done: false
                    };
                } else {
                    return {
                        value: undefined,
                        done: true
                    };
                }
            }
        };
    }
}