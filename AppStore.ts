import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import { makeAutoObservable } from "mobx";

export interface Wellbeing {
    date: string;
    rating: number;
}

export class AppStore {
    public user: User | null = null;
    public allergies: string[] = [];
    public wellbeing: Wellbeing[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    public get todayWellbeing() {
        const today = new Date().toISOString().split("T")[0];

        return this.wellbeing.find(x => {
            return x.date === today;
        })?.rating || 2;
    }

    public setUser = (user: User | null) => {
        this.user = user;
    }

    public setAllergies = (allergies: string[]) => {
        this.allergies = allergies;
    }

    public setWellbeing = (wellbeing: Wellbeing[]) => {
        this.wellbeing = wellbeing;
    }

    public updateUserName = (userName: string) => {
        this.user = { ...this.user!, displayName: userName };
    }
}

export const appStore = new AppStore();