import { Question } from "./Question";

export class Questions {
    questions: Question[];

    constructor() {
        this.questions = [];
    }

    public addAll(questions: any){
        for (let q of questions) {
            let question = new Question();
            question.serialize(q);
            this.addQuiz(question);
        }       
    }
  
  
    public addQuiz(q: Question) {
      this.questions.push(q);
    }

    [Symbol.iterator]() {
        let index = 0;
        const categories = this.questions;

        return {
            next(): IteratorResult<Question> {
                if (index < categories.length) {
                    return {
                        value: categories[index++],
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
