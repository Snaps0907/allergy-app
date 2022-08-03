import { updateProfile, User } from "firebase/auth";
import { makeAutoObservable, runInAction } from "mobx";
import { addUserWellbeing } from "./api/queries";

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

    public updateUserName = async (userName: string) => {
        await updateProfile(this.user!, { displayName: userName });
        this.user = { ...this.user!, displayName: userName };
    }

    public setTodayWellbeing = async (value: number) => {
        const todayDate = new Date().toISOString().split("T")[0];

        const todayWellbeing: Wellbeing = {
            rating: value,
            date: todayDate
        }

        await addUserWellbeing(appStore.user!.uid, todayWellbeing);

        const existingWellbeingIndex = this.wellbeing.findIndex(x => x.date === todayDate);

        runInAction(() => {
            if (existingWellbeingIndex) {
                this.wellbeing = [...this.wellbeing].splice(existingWellbeingIndex, 1, todayWellbeing);
            } else {
                this.wellbeing = [...this.wellbeing, todayWellbeing];
            }
        })
    }
}

export const appStore = new AppStore();