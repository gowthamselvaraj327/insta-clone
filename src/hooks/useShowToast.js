import { toaster } from "../components/ui/toaster";

const useShowToast = () => {
    const showToast = (title, description, type) => {
        toaster.create({
            title: title,
            description: description,
            type: type,
            duration: 3000,
            closable: true,
        });
    };
    return showToast;
};

export default useShowToast;
