import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/useProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import usePostStore from "../store/postStore";

const useGetFeedPosts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { posts, setPosts } = usePostStore();
    const authUser = useAuthStore((state) => state.user);
    const showToast = useShowToast();
    const { setUserProfile } = useUserProfileStore();

    useEffect(() => {
        const getFeedPosts = async () => {
            if (authUser.following.length === 0) {
                setIsLoading(false);
                setPosts([]);
                return;
            }
            try {
                setIsLoading(true);
                const q = query(
                    collection(firestore, "posts"),
                    where("createdBy", "in", authUser.following)
                );
                const querySnapshot = await getDocs(q);
                const feedPosts = [];
                querySnapshot.forEach((doc) => {
                    feedPosts.push({ id: doc.id, ...doc.data() });
                });
                feedPosts.sort((a, b) => b.createdAt - a.createdAt);
                setPosts(feedPosts);
            } catch (error) {
            } finally {
                setIsLoading(false);
            }
        };
        if (authUser) getFeedPosts();
    }, [authUser, showToast, setPosts, setUserProfile]);
    return { isLoading, posts };
};

export default useGetFeedPosts;
