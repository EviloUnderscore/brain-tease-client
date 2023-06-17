import { Category } from "./Category";

export class Quiz{
    id: string;
    name: string;
    description: string;
    category_id: string;
    user_id: string;
    authorName: string;
    category: Category;

    constructor(){
        this.id = '';
        this.name = '';
        this.description = '';
        this.category_id = '';
        this.user_id = '';
        this.authorName= '';
        this.category = new Category();
    }

    serialize(quiz: any){
        this.id = quiz.id;
        this.name = quiz.name;
        this.description = quiz.description;
        this.category_id = quiz.category_id;
        this.user_id = quiz.user_id;
        this.authorName = quiz.authorName;
    }
}