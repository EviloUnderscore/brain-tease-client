export class Quiz{
    id: string;
    name: string;
    description: string;
    user_id: string;
    category_id: string;

    constructor(){
        this.id = '';
        this.name = '';
        this.description = '';
        this.user_id = '';
        this.category_id = '';
    }
}