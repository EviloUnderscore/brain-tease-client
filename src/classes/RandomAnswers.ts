import { Question } from "./Question";
import { Questions } from "./Questions";
import { RandomAnswer } from "./RandomAnswer";

export class RandomAnswers {
    question: string;
    answers: RandomAnswer[];

    constructor(){
        this.question = '';
        this.answers = [];
    }

    public unselectAll(): void{
        for(let a of this.answers){
            a.selected = false;
        }
    }

    public addAnswers(question: Question): void{
        const newAC = new RandomAnswer();
        newAC.correct = true;
        newAC.text = question.answer;
        this.answers.push(newAC);
        const FA1 = new RandomAnswer();
        FA1.text = question.fake_answer_1;
        this.answers.push(FA1);
        const FA2 = new RandomAnswer();
        FA2.text = question.fake_answer_2;
        this.answers.push(FA2);
        const FA3 = new RandomAnswer();
        FA3.text = question.fake_answer_3;
        this.answers.push(FA3);

        this.shuffleArray();
    }

    public countRightAnswers(): number{
        let ra = 0;
        for(let a of this.answers){
            if(a.correct && a.selected){
                ra++
            }
        }
        return ra;
    }

    private shuffleArray(): void{
        const arrayLength = this.answers.length;

        for (let i = arrayLength - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.answers[i], this.answers[j]] = [this.answers[j], this.answers[i]];
        }
    }
}