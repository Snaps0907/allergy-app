import { collection, query, where, getDocs, addDoc, deleteDoc } from 'firebase/firestore';
import { Wellbeing } from '../AppStore';
import { firestore } from './firebase';

export const getUserAllergies = async (userId: string) => {
    const allergies: string[] = [];

    const q = query(getAllergiesCollection(), where("userId", "==", userId));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        allergies.push(doc.data().value);
    });

    return allergies;
}

export const addUserAllergy = async (userId: string, value: string) => {
    await addDoc(getAllergiesCollection(), { userId, value });
}

export const removeUserAllergy = async (userId: string, value: string) => {
    const q = query(getAllergiesCollection(), where("userId", "==", userId), where("value", "==", value));

    const querySnapshot = await getDocs(q);

    querySnapshot.docs.map(x => deleteDoc(x.ref));
}

export const getUserWellbeing = async (userId: string) => {
    const wellbeing: Wellbeing[] = [];

    const q = query(getWellbeingCollection(), where("userId", "==", userId));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        wellbeing.push(doc.data() as Wellbeing);
    });

    return wellbeing;
}

export const addUserWellbeing = async (userId: string, value: Wellbeing) => {
    const q = query(getWellbeingCollection(), where("userId", "==", userId), where("date", "==", value.date));

    const querySnapshot = await getDocs(q);

    querySnapshot.docs.map(async x => await deleteDoc(x.ref));

    await addDoc(getWellbeingCollection(), { userId, ...value });
}

const getAllergiesCollection = () => {
    return collection(firestore, "user-allergies");
}

const getWellbeingCollection = () => {
    return collection(firestore, "user-wellbeing");
}