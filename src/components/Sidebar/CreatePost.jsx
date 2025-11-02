import {
    Box,
    Flex,
    useBreakpointValue,
    Button,
    CloseButton,
    Dialog,
    Portal,
    Textarea,
    Image,
} from "@chakra-ui/react";
import { Tooltip } from "../ui/tooltip";
import { CreatePostLogo } from "../../assets/constants";
import { useRef, useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import usePreviewImg from "../../hooks/usePreviewImg";
import useCreatePost from "../../hooks/useCreatePost";
import useShowToast from "../../hooks/useShowToast";

const CreatePost = () => {
    const showTooltip = useBreakpointValue({ base: true, md: false });
    const showToast = useShowToast();
    const [open, setOpen] = useState(false);
    const [caption, setCaption] = useState("");
    const imageRef = useRef(null);
    const { selectedFile, setSelectedFile, handleImageChange } =
        usePreviewImg();
    const { handleCreatePost, isLoading } = useCreatePost();
    const handlePostCreation = async () => {
        try {
            await handleCreatePost(selectedFile, caption);
            setCaption("");
            setSelectedFile(null);
            setOpen(false);
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };
    return (
        <>
            <Dialog.Root
                lazyMount
                open={open}
                onOpenChange={(e) => setOpen(e.open)}
                motionPreset='slide-in-left'
            >
                <Dialog.Trigger asChild>
                    <Tooltip
                        showArrow
                        content={"Create"}
                        positioning={{ placement: "right-end" }}
                        openDelay={500}
                        disabled={!showTooltip}
                    >
                        <Flex
                            borderRadius={6}
                            _hover={{ bg: "whiteAlpha.400" }}
                            alignItems={"center"}
                            justifyContent={{
                                base: "center",
                                md: "flex-start",
                            }}
                            gap={4}
                            p={2}
                            w={{ base: 10, md: "full" }}
                            textDecoration={"none"}
                            onClick={() => setOpen(true)}
                        >
                            <CreatePostLogo />
                            <Box display={{ base: "none", md: "block" }}>
                                Create
                            </Box>
                        </Flex>
                    </Tooltip>
                </Dialog.Trigger>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content bg={"black"} border={"1px solid gray"}>
                            <Dialog.Header>
                                <Dialog.Title>Create Post</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body pb={6}>
                                <Textarea
                                    placeholder='Post caption....'
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                />
                                <input
                                    type='file'
                                    hidden
                                    ref={imageRef}
                                    onChange={handleImageChange}
                                />
                                <BsFillImageFill
                                    style={{
                                        marginTop: "15px",
                                        marginLeft: "5px",
                                        cursor: "pointer",
                                    }}
                                    size={16}
                                    onClick={() => imageRef.current.click()}
                                />
                                {selectedFile && (
                                    <Flex
                                        mt={5}
                                        w={"full"}
                                        position={"relative"}
                                        justifyContent={"center"}
                                    >
                                        <Image
                                            src={selectedFile}
                                            alt='selected image'
                                        />
                                        <CloseButton
                                            position={"absolute"}
                                            top={2}
                                            right={2}
                                            onClick={() => {
                                                setSelectedFile(null);
                                            }}
                                        />
                                    </Flex>
                                )}
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Button
                                    mr={3}
                                    onClick={handlePostCreation}
                                    loading={isLoading}
                                >
                                    Post
                                </Button>
                            </Dialog.Footer>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size='sm' />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    );
};

export default CreatePost;
