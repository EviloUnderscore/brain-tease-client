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
            this.addQuestion(question);
        }       
    }

    public removeQuestion(question: Question) {        
        const index = this.questions.indexOf(question);
        if (index !== -1) {
            this.questions.splice(index, 1);
        }
    }
  
  
    public addQuestion(q: Question) {
      this.questions.push(q);
    }

    public isEmpty(): boolean{
        return this.questions.length <= 0;
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
