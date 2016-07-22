export class Hero {
    
    constructor(public id: number, public name: string){
        this.level = 0;
    }

    public level: number;
}