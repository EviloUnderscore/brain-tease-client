export class Question {
    id: string;
    question: string;
    answer: string;
    category: string;
    quiz_id: string;
    type_id: string;
    fake_answer_1: string;
    fake_answer_2: string;
    fake_answer_3: string;

    constructor(){
        this.id = '';
        this.question = '';
        this.answer = '';
        this.category = '';
        this.quiz_id = '';
        this.type_id = '1';
        this.fake_answer_1 = '';
        this.fake_answer_2 = '';
        this.fake_answer_3 = '';
    }

    public serialize(question: any){        
        this.id = question.id;
        this.question = question.question;
        this.answer = question.answer;
        this.category = question.category;
        this.quiz_id = question.quiz_id;
        this.type_id = question.type_id;
        this.fake_answer_1 = question.fake_answer_1;
        this.fake_answer_2 = question.fake_answer_2;
        this.fake_answer_3 = question.fake_answer_3;
    }

    deserialize(): {} {
        return {
            id: this.id,
            question: this.question,
            answer: this.answer,
            category: this.category,
            quiz_id: this.quiz_id,
            type_id: this.type_id,
            fake_answer_1: this.fake_answer_1,
            fake_answer_2: this.fake_answer_2,
            fake_answer_3: this.fake_answer_3,
        }
    }
}