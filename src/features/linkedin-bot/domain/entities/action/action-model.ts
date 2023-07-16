const { v4: uuidv4 } = require('uuid');
export class Action {
    public type: string;
    public id: string;
    public credits: number;
    public maxCredits: number;
    constructor(type: string, maxCredits: number, props?: { type: string, maxCredits: number, credits: number, id: string }) {
        if (props) {
            this.type = props.type;
            this.maxCredits = props.maxCredits;
            this.credits = props.credits;
            this.id = props.id;
            return;
        }
        this.type = type;
        this.maxCredits = maxCredits;
        this.credits = Math.floor(Math.random() * (maxCredits - (maxCredits * 0.8) + 1)) + (maxCredits * 0.8);
        this.id = uuidv4();
    }
}

export class ActionBuilder {
    private type: string;
    private id: string;
    private credits: number;
    private maxCredits: number;

    constructor() {
        this.type = 'like';
        this.id = uuidv4();
        this.credits = 5;
        this.maxCredits = 10;
    }

    withType(type: string): this {
        this.type = type;
        return this;
    }

    withId(id: string): this {
        this.id = id;
        return this;
    }

    withCredits(credits: number): this {
        this.credits = credits;
        return this;
    }

    withMaxCredits(maxCredits: number): this {
        this.maxCredits = maxCredits;
        return this;
    }

    build(): Action {
        return new Action(this.type, this.maxCredits , {type: this.type, maxCredits: this.maxCredits, credits: this.credits, id: this.id});
    }
}
