import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetUserProfileById = (userId) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userProfile, setUserProfile] = useState(null);

    const showToast = useShowToast();

    useEffect(() => {
        if (!userId) return;
        const getUserProfile = async () => {
            try {
                setIsLoading(true);
                setUserProfile(null);
                const userRef = await getDoc(doc(firestore, "users", userId));

                if (userRef.exists) setUserProfile(userRef.data());
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        };
        getUserProfile();
    }, [userId, showToast, setUserProfile]);
    return { isLoading, userProfile };
};

export default useGetUserProfileById;
