import { RandomAnswer } from "./RandomAnswer";

export class RandomAnswers {
    question: string;
    answers: RandomAnswer[];

    constructor(){
        this.question = '';
        this.answers = [];
    }
}