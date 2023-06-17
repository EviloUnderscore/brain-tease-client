import { QuestionCount } from "./QuestionCount";

export class QuestionsCount {
    questionsCount: QuestionCount[];

    constructor(){
        this.questionsCount = [];
    }

    public addAll(questions: any){
        for (let q of questions) {
            let questionCount = new QuestionCount();
            questionCount.serialize(q);
            this.addQuiz(questionCount);
        }       
    }

    public addQuiz(questions: QuestionCount) {
        this.questionsCount.push(questions);
    }


    [Symbol.iterator]() {
        let index = 0;
        const questionsCount = this.questionsCount;

        return {
            next(): IteratorResult<QuestionCount> {
                if (index < questionsCount.length) {
                    return {
                        value: questionsCount[index++],
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