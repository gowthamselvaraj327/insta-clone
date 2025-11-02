import {
    Button,
    Dialog,
    Flex,
    Portal,
    Stack,
    Heading,
    CloseButton,
    useBreakpointValue,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import usePreviewImg from "../../hooks/usePreviewImg";
import useAuthStore from "../../store/authStore";
import useEditProfile from "../../hooks/useEditProfile";
import useShowToast from "../../hooks/useShowToast";
import EditProfileForm from "./EditProfileForm";

const EditProfile = () => {
    const size = useBreakpointValue({ base: "xl", sm: "sm" });
    const [isOpen, setIsOpen] = useState(false);
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        bio: "",
    });
    const fileRef = useRef(null);

    const { handleImageChange, selectedFile, setSelectedFile } =
        usePreviewImg();
    const authUser = useAuthStore((state) => state.user);
    const { editProfile, isUpdating } = useEditProfile();
    const showToast = useShowToast();

    const handleEditProfile = async () => {
        try {
            await editProfile(inputs, selectedFile);
            setSelectedFile(null);
            setIsOpen(false);
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
            <Dialog.Trigger asChild>
                <Button
                    bg={"white"}
                    color={"black"}
                    _hover={{ bg: "whiteAlpha.800" }}
                    size={{ sm: "xs", md: "sm" }}
                >
                    Edit Profile
                </Button>
            </Dialog.Trigger>

            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content
                        bg={"black"}
                        boxShadow={"xl"}
                        border={"1px solid gray"}
                        mx={3}
                    >
                        <Dialog.Header>
                            <Heading fontSize={{ base: "2xl", sm: "3xl" }}>
                                Edit Profile
                            </Heading>
                        </Dialog.Header>

                        <Dialog.Body>
                            <Stack
                                gap={4}
                                w={"full"}
                                maxW={"md"}
                                bg={"black"}
                                p={6}
                                my={0}
                            >
                                <EditProfileForm
                                    inputs={inputs}
                                    setInputs={setInputs}
                                    fileRef={fileRef}
                                    handleImageChange={handleImageChange}
                                    selectedFile={selectedFile}
                                    authUser={authUser}
                                />
                            </Stack>
                        </Dialog.Body>

                        <Dialog.Footer
                            gap={4}
                            w={"full"}
                            maxW={"md"}
                            bg={"black"}
                            my={0}
                            alignSelf={"center"}
                        >
                            <Flex
                                gap={4}
                                w='full'
                                direction={{ base: "column", sm: "row" }}
                            >
                                {/* Cancel */}
                                <Dialog.ActionTrigger asChild>
                                    <Button
                                        flex={1}
                                        w='full'
                                        bg='red.400'
                                        color='white'
                                        _hover={{ bg: "red.500" }}
                                        size={size}
                                    >
                                        Cancel
                                    </Button>
                                </Dialog.ActionTrigger>

                                {/* Submit */}
                                <Button
                                    flex={1}
                                    w='full'
                                    bg='blue.400'
                                    color='white'
                                    _hover={{ bg: "blue.500" }}
                                    size={size}
                                    loading={isUpdating}
                                    onClick={handleEditProfile}
                                >
                                    Submit
                                </Button>
                            </Flex>
                        </Dialog.Footer>

                        <Dialog.CloseTrigger asChild>
                            <CloseButton size='sm' />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};

export default EditProfile;
