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

    public randomizeQuestions(): void {
        // Randomize the order of questions using the Fisher-Yates algorithm
        for (let i = this.questionsWithAnswers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questionsWithAnswers[i], this.questionsWithAnswers[j]] = [this.questionsWithAnswers[j], this.questionsWithAnswers[i]];
        }
    }
    
    public count(): number{
        return this.questionsWithAnswers.length;
    }

    public countRightAnswers(): number{
        let ra = 0;
        for(let q of this.questionsWithAnswers){
            for(let a of q.answers){
                if(a.correct && a.selected){
                    ra++
                }
            }
        }
        return ra;
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