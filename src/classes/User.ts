export class User{
    uid: string;
    email: string;
    displayName: string;

    constructor(){
        this.uid = '';
        this.email = '';
        this.displayName = '';
    }

    public serialize(user: any){
        this.uid = user.uid;
        this.email = user.email;
        this.displayName = user.displayName;
    }
}