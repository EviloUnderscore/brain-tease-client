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

    public getHistoriesByQuizId(quiz_id: string): QuizHistories{
        const filteredHistories = new QuizHistories();

        for (const history of this.histories) {
            if (history.quiz_id === quiz_id) {
                filteredHistories.addQuiz(history);
            }
        }

        return filteredHistories;
    }

    public isEmpty(): boolean{
        return this.histories.length <= 0;
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