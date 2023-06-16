export class Quiz{
    id: string;
    name: string;
    description: string;
    category_id: string;
    user_id: string

    constructor(){
        this.id = '';
        this.name = '';
        this.description = '';
        this.category_id = '';
        this.user_id = '';
    }
}