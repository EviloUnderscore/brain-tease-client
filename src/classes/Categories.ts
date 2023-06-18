import { Category } from "./Category";

export class Categories {
    categories: Category[];

    constructor() {
        this.categories = [];
    }

    public sortByName(){
        this.categories.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();

            if (nameA < nameB) {
            return -1;
            } else if (nameA > nameB) {
            return 1;
            } else {
            return 0;
            }
        });
    }

    [Symbol.iterator]() {
        let index = 0;
        const categories = this.categories;

        return {
            next(): IteratorResult<Category> {
                if (index < categories.length) {
                    return {
                        value: categories[index++],
                        done: false
                    };
                } else {
                    return {
                        value: undefined,
                        done: true
                    };
                }
            }
        };
    }
}
