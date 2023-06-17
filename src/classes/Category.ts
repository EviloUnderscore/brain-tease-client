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

    deserialize(): {} {
        return {
            id: this.id,
            name: this.name,
        }
    }

    clone(): Category{
        const clonedCategory = new Category()
        clonedCategory.id = this.id;
        clonedCategory.name = this.name;
        return clonedCategory;
    }
}