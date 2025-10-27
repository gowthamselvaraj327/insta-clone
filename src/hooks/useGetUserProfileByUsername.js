import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import useUserProfileStore from "../store/useProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetUserProfileByUsername = (username) => {
    const [isLoading, setIsLoading] = useState(true);
    const showToast = useShowToast();
    const { userProfile, setUserProfile } = useUserProfileStore();

    useEffect(() => {
        const getUserProfile = async () => {
            setIsLoading(true);
            try {
                const q = query(
                    collection(firestore, "users"),
                    where("username", "==", username)
                );
                const userSnap = await getDocs(q);
                if (userSnap.empty) return setUserProfile(null);
                let userDoc;
                userSnap.forEach((doc) => {
                    userDoc = doc.data();
                });
                setUserProfile(userDoc);
                console.log(userDoc);
            } catch (error) {
                // showToast is trying to force the dom to show the error while dom is rendering the component,
                // so added the showToast to queuemicrotask which will show the toast once dom completed the rendering
                queueMicrotask(() => {
                    showToast("Error", error.message, "error");
                });
            } finally {
                setIsLoading(false);
            }
        };

        getUserProfile();
    }, [setUserProfile, username, showToast]);
    return { isLoading, userProfile };
};

export default useGetUserProfileByUsername;
