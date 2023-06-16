import { User } from "./User";

export class Quiz{
    id: string;
    name: string;
    description: string;
    category_id: string;
    user_id: string;
    user: User;

    constructor(){
        this.id = '';
        this.name = '';
        this.description = '';
        this.category_id = '';
        this.user_id = '';
        this.user = new User();
    }
}