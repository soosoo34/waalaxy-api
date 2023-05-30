// src/features/user/userModel.ts
import {ActionQueue} from '../action-queue/action-queue-model';
import {Action} from "../action/action-model";

let cron = require('node-cron');
const {v4: uuidv4} = require('uuid');

export class User {
    id: string;
    queue: ActionQueue;
    actions: Action[] = [];
    lastCalculation: Date = new Date();


    constructor() {
        this.id = uuidv4();
        this.queue = new ActionQueue(this.id);
    }


    addActionToActions(type: string, maxCredits: number) {
        // check if action already exists
        const action = this.actions.find(action => action.type === type);
        if (action) return;
        this.actions.push(new Action(type, maxCredits));
        this.lastCalculation = new Date();
    }


    getCredit(action: Action) {
        if (!this.actions) {
            throw new Error('Actions is undefined');
        }

        const actionInActions = this.actions.find(actionInActions => actionInActions.type === action.type);

        if (!actionInActions) {
            throw new Error('Action not found');
        }

        if (actionInActions.credits === 0) {
            throw new Error('Action credit is 0');
        }

        actionInActions.credits--;
    }


    shouldRecalculateCredits(): boolean {
        const hoursSinceLastCalculation = Math.abs(new Date().getTime() - this.lastCalculation.getTime()) / (1000 * 60 * 60);
        return hoursSinceLastCalculation >= 24;
    }

    recalculateCreditsIfNeeded() {
        if (this.shouldRecalculateCredits()) {
            this.lastCalculation = new Date();
        }
    }

}
