import {Action} from '../action/action-model';
const cron = require('node-cron');
const {v4: uuidv4} = require('uuid');

export class ActionQueue {
    id: string;
    userId: string;
    actions: Action[];

    constructor(userId: string) {
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
