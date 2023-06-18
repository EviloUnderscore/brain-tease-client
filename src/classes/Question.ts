export class Question {
    id: string;
    question: string;
    answer: string;
    category: string;
    quiz_id: string;
    type_id: string;

    constructor(){
        this.id = '';
        this.question = '';
        this.answer = '';
        this.category = '';
        this.quiz_id = '';
        this.type_id = '';
    }

    public serialize(question: any){        
        this.id = question.id;
        this.question = question.question;
        this.answer = question.answer;
        this.category = question.category;
        this.quiz_id = question.quiz_id;
        this.type_id = question.type_id;
    }

    deserialize(): {} {
        return {
            id: this.id,
            question: this.question,
            answer: this.answer,
            category: this.category,
            quiz_id: this.quiz_id,
            type_id: this.type_id,
        }
    }
}