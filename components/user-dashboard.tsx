'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/firebase/config';
import { getAuth, signOut } from 'firebase/auth'
import { Button } from '@/components/ui/button'

interface User {
    uid: string;
    email?: string | null;
    displayName?: string | null;
}

export default function UserDashboard() {
    const [user, setUser] = useState<User | null>(null);

    const handleSignOut = async () => {
        const auth = getAuth()
        try {
            await signOut(auth)
            // Redirect to home page or sign-in page after sign out
        } catch (error) {
            console.error('Error signing out:', error)
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                // Map the currentUser object to your custom User type
                const mappedUser: User = {
                    uid: currentUser.uid,
                    email: currentUser.email,
                    displayName: currentUser.displayName,
                };
                setUser(mappedUser);
            } else {
                setUser(null);
            }
        });

        // Cleanup the subscription when the component unmounts
        return () => unsubscribe();
    }, []);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Button onClick={handleSignOut}>Sign Out</Button>
        </div>
    );
}
