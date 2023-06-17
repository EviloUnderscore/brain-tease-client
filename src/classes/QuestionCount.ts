export class QuestionCount {
    id: string;
    question_count: number;

    constructor(){
        this.id = '';
        this.question_count = 0;
    }

    public serialize(cat: any){        
        this.id = cat.id;
        this.question_count = cat.question_count;
    }

    deserialize(): {} {
        return {
            id: this.id,
            name: this.question_count,
        }
    }
}