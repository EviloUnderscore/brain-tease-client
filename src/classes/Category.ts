export class Category{
    id: string;
    name: string;

    constructor(){
        this.id = '';
        this.name = '';
    }

    public serialize(cat: any){
        this.id = cat.id;
        this.name = cat.name;
    }
}