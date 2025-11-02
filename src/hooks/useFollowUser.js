import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/useProfileStore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useFollowUser = (userId) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const setAuthUser = useAuthStore((state) => state.setUser);
    const { userProfile, setUserProfile } = useUserProfileStore();
    const showToast = useShowToast();

    const handleFollowUser = async () => {
        try {
            setIsUpdating(true);
            const currentUserRef = doc(firestore, "users", authUser.uid);
            const userToFollowOrUnFollowRef = doc(firestore, "users", userId);

            // Adding or removing the User to follow or unfollow userId in current authenticated user's following array
            await updateDoc(currentUserRef, {
                following: isFollowing
                    ? arrayRemove(userId)
                    : arrayUnion(userId),
            });

            // Adding or removing the authenticated user id in user to follow or unfollow user's followers array
            await updateDoc(userToFollowOrUnFollowRef, {
                followers: isFollowing
                    ? arrayRemove(authUser.uid)
                    : arrayUnion(authUser.uid),
            });

            if (isFollowing) {
                // unfollow Logic
                setAuthUser({
                    ...authUser,
                    following: authUser.following.filter(
                        (uid) => uid !== userId
                    ),
                });

                setUserProfile({
                    ...userProfile,
                    followers: userProfile.followers.filter(
                        (uid) => uid !== authUser.uid
                    ),
                });

                localStorage.setItem(
                    "userInfo",
                    JSON.stringify({
                        ...authUser,
                        following: authUser.following.filter(
                            (uid) => uid !== userId
                        ),
                    })
                );
                setIsFollowing(false);
            } else {
                // follow logic
                setAuthUser({
                    ...authUser,
                    following: [...authUser.following, userId],
                });

                setUserProfile({
                    ...userProfile,
                    followers: [...userProfile.followers, authUser.uid],
                });

                localStorage.setItem(
                    "userInfo",
                    JSON.stringify({
                        ...authUser,
                        following: [...authUser.following, userId],
                    })
                );
                setIsFollowing(true);
            }
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsUpdating(false);
        }
    };

    useEffect(() => {
        if (authUser) {
            const isFollowing = authUser.following.includes(userId);
            setIsFollowing(isFollowing);
        }
    }, [authUser, userId]);
    return { isUpdating, isFollowing, handleFollowUser };
};

export default useFollowUser;
