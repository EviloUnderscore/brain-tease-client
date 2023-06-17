import { Category } from "./Category";

export class Quiz{
    id: string;
    name: string;
    description: string;
    category_id: string;
    user_id: string;
    authorName: string;
    created_at: Date;
    updated_at: Date;
    category: Category;

    constructor(){
        this.id = '';
        this.name = '';
        this.description = '';
        this.category_id = '';
        this.user_id = '';
        this.authorName= '';
        this.created_at = new Date();
        this.updated_at = new Date();
        this.category = new Category();
    }

    serialize(quiz: any){
        this.id = quiz.id;
        this.name = quiz.name;
        this.description = quiz.description;
        this.category_id = quiz.category_id;
        this.user_id = quiz.user_id;
        this.authorName = quiz.authorName;
        this.created_at = quiz.created_at;
        this.updated_at = quiz.updated_at;
    }

    deserialize(): {}{
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            category_id: this.category_id,
            user_id: this.user_id,
            authorName: this.authorName,
            created_at: this.created_at,
            updated_at: this.updated_at,
            category: this.category.deserialize(),
        }
    }

    clone(): Quiz {
        const clonedQuiz = new Quiz();
        clonedQuiz.id = this.id;
        clonedQuiz.name = this.name;
        clonedQuiz.description = this.description;
        clonedQuiz.category_id = this.category_id;
        clonedQuiz.user_id = this.user_id;
        clonedQuiz.authorName = this.authorName;
        clonedQuiz.created_at = new Date(new Date(this.created_at).getTime());
        clonedQuiz.updated_at = new Date(new Date(this.updated_at).getTime());
        clonedQuiz.category = this.category.clone();
        return clonedQuiz;
    }
}