import React from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { appStore } from '../AppStore';
import { getUserAllergies, getUserWellbeing } from '../api/queries';

const auth = getAuth();

export function useAuthentication() {
    React.useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const allergies = await getUserAllergies(user.uid);
                appStore.setAllergies(allergies);
                const wellbeing = await getUserWellbeing(user.uid);
                appStore.setWellbeing(wellbeing);
            }

            appStore.setUser(user);
        });
    }, []);
}