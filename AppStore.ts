import { User } from "firebase/auth";
import { makeAutoObservable } from "mobx";

export class AppStore {
    public user: User | null = null;
    public allergies: string[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    public setUser = (user: User | null) => {
        this.user = user;
    }

    public setAllergies = (allergies: string[]) => {
        this.allergies = allergies;
    }
}

export const appStore = new AppStore();