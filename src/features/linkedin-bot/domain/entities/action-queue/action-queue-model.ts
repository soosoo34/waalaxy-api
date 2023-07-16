import {Action} from '../action/action-model';
const {v4: uuidv4} = require('uuid');

export class ActionQueue {
    id: string;
    userId: string;
    actions: Action[];

    constructor(userId: string , props?: { id: string, userId: string, actions: Action[] }) {
        if (props) {
            this.id = props.id;
            this.userId = props.userId;
            this.actions = props.actions;
            return;
        }
        this.id = uuidv4();
        this.userId = userId;
        this.actions = [];
    }

    addActionToQueue(type : string, maxCredits: number): void {
        const action: Action = new Action(type, maxCredits);
        this.actions.push(action);
    }

    processAction() {
        if (this.actions.length === 0) throw new Error('No action to process');
        const action = this.actions[0];
        if (action.credits !== 0) this.actions.shift();
    }
}

export class ActionQueueBuilder {
    private id: string;
    private userId: string;
    private actions: Action[];

    constructor() {
        this.userId = '1';
        this.id = uuidv4();
        this.actions = [];
    }

    withId(id: string): this {
        this.id = id;
        return this;
    }
    withUserId(userId: string): this {
        this.userId = userId;
        return this;
    }

    withActions(actions: Action[]): this {
        this.actions = actions;
        return this;
    }

    build(): ActionQueue {
        return new ActionQueue(this.userId, {id: this.id, userId: this.userId, actions: this.actions});
    }
}
