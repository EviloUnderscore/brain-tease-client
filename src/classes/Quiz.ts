import { Category } from "./Category";
import { User } from "./User";

export class Quiz{
    id: string;
    name: string;
    description: string;
    category_id: string;
    user_id: string;
    user: User;
    category: Category;

    constructor(){
        this.id = '';
        this.name = '';
        this.description = '';
        this.category_id = '';
        this.user_id = '';
        this.user = new User();
        this.category = new Category();
    }

    serialize(quiz: any){
        this.id = quiz.id;
        this.name = quiz.name;
        this.description = quiz.description;
        this.category_id = quiz.category_id;
        this.user_id = quiz.user_id;
    }

    public toString(): string {
        return `Quiz: ${this.name}\nDescription: ${this.description}\nCategory ID: ${this.category_id}\nUser: ${this.user.toString()}`;
    }
}