import { collection, doc, getDoc, query } from "firebase/firestore";
import { auth, firestore } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import useAuthStore from "../store/authStore";

const useLogin = () => {
    const showToast = useShowToast();
    const [signInWithEmailAndPassword, user, loading, error] =
        useSignInWithEmailAndPassword(auth);
    const loginUser = useAuthStore((state) => state.login);
    const login = async (inputs) => {
        if (!inputs.email || !inputs.password) {
            showToast("Error", "Please fill all the fields", "error");
            return;
        }
        try {
            const userCred = await signInWithEmailAndPassword(
                inputs.email,
                inputs.password
            );

            if (userCred) {
                const userRef = doc(firestore, "users", userCred.user.uid);
                const querySnapshot = await getDoc(userRef);

                localStorage.setItem(
                    "userInfo",
                    JSON.stringify(querySnapshot.data())
                );
                loginUser(querySnapshot.data());
            }
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };
    return { loading, error, login };
};

export default useLogin;
