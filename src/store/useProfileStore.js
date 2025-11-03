import { create } from "zustand";

const useUserProfileStore = create((set) => ({
    userProfile: null,
    setUserProfile: (userProfile) => set({ userProfile }),
    addPost: (post) =>
        set((state) => ({
            userProfile: {
                ...state.userProfile,
                posts: [post.id, ...state.userProfile.posts],
            },
        })),
    deletePost: (postId) =>
        set((state) => ({
            userProfile: {
                ...state.userProfile,
                posts: state.userProfile.posts.filter((id) => postId !== id),
            },
        })),
}));
export default useUserProfileStore;
