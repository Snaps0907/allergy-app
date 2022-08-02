import React from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { appStore } from '../AppStore';
import { getUserAllergies } from '../api/queries';

const auth = getAuth();

export function useAuthentication() {
    React.useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            appStore.setUser(user);

            if (user) {
                const allergies = await getUserAllergies(user.uid);
                appStore.setAllergies(allergies);
            }
        });
    }, []);
}