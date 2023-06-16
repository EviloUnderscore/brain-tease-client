import { UsersService } from "src/services/users.service";
import { Quiz } from "./Quiz";

export class Quizzes {
    quizzes: Quiz[];

    constructor() {
        this.quizzes = [];
    }

    public addAll(quizzes: any){
        for (let q of quizzes) {
            this.addQuiz(q);
        }
    }

    public addQuiz(quiz: Quiz) {
        this.quizzes.push(quiz);
    }

    public removeQuiz(quiz: Quiz) {        
        const index = this.quizzes.indexOf(quiz);
        if (index !== -1) {
            this.quizzes.splice(index, 1);
        }
    }

    public getQuizById(quizId: string): Quiz | undefined {
        return this.quizzes.find(quiz => quiz.id === quizId);
    }

    [Symbol.iterator]() {
        let index = 0;
        const quizzes = this.quizzes;

        return {
            next(): IteratorResult<Quiz> {
                if (index < quizzes.length) {
                    return {
                        value: quizzes[index++],
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
