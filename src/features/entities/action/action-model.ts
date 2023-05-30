const { v4: uuidv4 } = require('uuid');
export class Action {
    public type: string;
    public id: string;
    public credits: number;
    public maxCredits: number;
    constructor(type: string, maxCredits: number) {
        this.type = type;
        this.maxCredits = maxCredits;
        this.credits = Math.floor(Math.random() * (maxCredits - (maxCredits * 0.8) + 1)) + (maxCredits * 0.8);
        this.id = uuidv4();
    }

}
