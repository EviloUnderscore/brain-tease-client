import { QuizHistory } from "./QuizHistory";

export class QuizHistories{
    histories: QuizHistory[];

    constructor() {
        this.histories = [];
    }

    public addAll(histories: any){
        for (let h of histories) {
            let history = new QuizHistory();
            history.serialize(h);
            this.addQuiz(history);
        }       
    }

    public addQuiz(history: QuizHistory) {
        this.histories.push(history);
    }

    [Symbol.iterator]() {
        let index = 0;
        const histories = this.histories;

        return {
            next(): IteratorResult<QuizHistory> {
                if (index < histories.length) {
                    return {
                        value: histories[index++],
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