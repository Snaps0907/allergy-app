import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from './firebase';

export const getUserAllergies = async (userId: string) => {
    const allergies: string[] = [];

    const q = query(collection(firestore, "user-allergies"), where("userId", "==", userId));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        allergies.push(doc.data().value);
    });

    return allergies;
}