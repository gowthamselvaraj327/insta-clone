import { useCallback } from "react";
import { toaster } from "../components/ui/toaster";

const useShowToast = () => {
    // useCallback is used to prevent infinite loop by caching the function
    const showToast = useCallback(
        (title, description, type) => {
            toaster.create({
                title: title,
                description: description,
                type: type,
                duration: 3000,
                closable: true,
            });
        },
        [toaster]
    );
    return showToast;
};

export default useShowToast;
