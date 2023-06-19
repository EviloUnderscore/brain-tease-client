export class QuizHistory{
    id: string;
    score: number;
    user_id: string;
    quiz_id: string;
    created_at: Date;

    constructor(){
        this.id = '';
        this.score = 0;
        this.user_id = '';
        this.quiz_id = '';
        this.created_at = new Date();
    }

    serialize(history: any){
        this.id = history.id;
        this.score = history.score;
        this.user_id = history.user_id;
        this.quiz_id = history.quiz_id;
        this.created_at = history.created_at;
    }

    deserialize(): {}{
        return {
            id: this.id,
            score: this.score,
            user_id: this.user_id,
            quiz_id: this.quiz_id,
            created_at: this.created_at,
        }
    }
}