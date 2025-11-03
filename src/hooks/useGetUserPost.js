import React, { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import usePostStore from "../store/postStore";
import useUserProfileStore from "../store/useProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetUserPost = () => {
    const [isLoading, setIsLoading] = useState(true);
    const showToast = useShowToast();
    const { posts, setPosts } = usePostStore();
    const userProfile = useUserProfileStore((state) => state.userProfile);

    useEffect(() => {
        const getPosts = async () => {
            if (!userProfile) return;
            setPosts([]);
            try {
                setIsLoading(true);
                const q = query(
                    collection(firestore, "posts"),
                    where("createdBy", "==", userProfile.uid)
                );
                const querySnapshot = await getDocs(q);
                const posts = [];
                querySnapshot.forEach((doc) => {
                    posts.push({ ...doc.data(), id: doc.id });
                });
                posts.sort((a, b) => b.createdAt - a.createdAt);
                setPosts(posts);
            } catch (error) {
                showToast("Error", error.message, "error");
                setPosts([]);
            } finally {
                setIsLoading(false);
            }
        };
        getPosts();
    }, [setPosts, userProfile, showToast]);
    return { isLoading, posts };
};

export default useGetUserPost;
