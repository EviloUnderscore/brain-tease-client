import { UsersService } from "src/services/users.service";
import { Quiz } from "./Quiz";

export class Quizzes {
    quizzes: Quiz[];

    constructor() {
        this.quizzes = [];
    }

    public addAll(quizzes: any){
        for (let q of quizzes) {
            let quiz = new Quiz();
            quiz.serialize(q);
            this.addQuiz(quiz);
        }       
    }

    public clone(): Quizzes {
        const clonedQuizzes = new Quizzes();
        
        for (const quiz of this.quizzes) {
            const clonedQuiz = quiz.clone();
            clonedQuizzes.addQuiz(clonedQuiz);
        }
        
        return clonedQuizzes;
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

    public toString(): string {
        return this.quizzes.map(quiz => quiz.toString()).join("\n");
    }

    public sortByDate(){
        this.quizzes.sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return dateA.getTime() - dateB.getTime();
        });
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
