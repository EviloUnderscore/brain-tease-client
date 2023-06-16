import { User } from "src/classes/User";

export interface Quiz {
    id: string,
    name: string,
    description: string,
    category_id: string,
    user_id: string,
    user: User,
}