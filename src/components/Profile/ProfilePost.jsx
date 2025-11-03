import {
    Flex,
    GridItem,
    Image,
    Text,
    CloseButton,
    Dialog,
    Portal,
    Button,
    Avatar,
    Separator,
    VStack,
} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Comment from "../Comment/Comment";
import PostFooter from "../FeedPosts/PostFooter";
import useUserProfileStore from "../../store/useProfileStore";
import useAuthStore from "../../store/authStore";
import { useState } from "react";
import useShowToast from "../../hooks/useShowToast";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../../firebase/firebase";
import {
    arrayRemove,
    collection,
    deleteDoc,
    doc,
    updateDoc,
} from "firebase/firestore";
import usePostStore from "../../store/postStore";
import Caption from "../Comment/Caption";

const ProfilePost = ({ post }) => {
    const userProfile = useUserProfileStore((state) => state.userProfile);
    const deletePostInUserProfile = useUserProfileStore(
        (state) => state.deletePost
    );

    const authUser = useAuthStore((state) => state.user);
    const deletePost = usePostStore((state) => state.deletePost);

    const showToast = useShowToast();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeletePost = async () => {
        if (!window.confirm("Are you sure, you want to delete this post?"))
            return;
        if (isDeleting) return;
        try {
            setIsDeleting(true);
            const imageRef = ref(storage, `posts/${post.id}`);
            await deleteObject(imageRef);
            await deleteDoc(doc(firestore, "posts", post.id));
            await updateDoc(doc(firestore, "users", authUser.uid), {
                posts: arrayRemove(post.id),
            });
            deletePost(post.id);
            deletePostInUserProfile(post.id);
            showToast("Success", "Post deleted successfully", "success");
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Dialog.Root placement={"center"} size={{ base: "lg", md: "xl" }}>
            <Dialog.Trigger asChild>
                <GridItem
                    cursor={"pointer"}
                    borderRadius={4}
                    overflow={"hidden"}
                    border={"1px solid"}
                    borderColor={"whiteAlpha.300"}
                    position={"relative"}
                    aspectRatio={1 / 1}
                >
                    <Flex
                        opacity={0}
                        _hover={{ opacity: 1 }}
                        position={"absolute"}
                        top={0}
                        bottom={0}
                        right={0}
                        left={0}
                        bg={"blackAlpha.700"}
                        transition={"all 0.3s ease"}
                        zIndex={1}
                        justifyContent={"center"}
                    >
                        <Flex
                            justifyContent={"center"}
                            alignItems={"center"}
                            gap={50}
                        >
                            <Flex>
                                <AiFillHeart size={20} />
                                <Text fontWeight={"bold"} ml={2}>
                                    {post.likes.length}
                                </Text>
                            </Flex>
                            <Flex>
                                <FaComment size={20} />
                                <Text fontWeight={"bold"} ml={2}>
                                    {post.comments.length}
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Image
                        src={post.imageURL}
                        alt='Profile post'
                        w={"100%"}
                        h={"100%"}
                        objectFit={"cover"}
                    />
                </GridItem>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Body bg={"black"} pb={5}>
                            <Flex
                                gap={4}
                                w={{ base: "90%", sm: "70%", md: "full" }}
                                mx={"auto"}
                                maxH={"90vh"}
                                minH={"50vh"}
                            >
                                <Flex
                                    borderRadius={4}
                                    overflow={"hidden"}
                                    border={"1px solid"}
                                    borderColor={"whiteAlpha.300"}
                                    flex={1.5}
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                >
                                    <Image
                                        src={post.imageURL}
                                        alt='profile post'
                                    />
                                </Flex>
                                <Flex
                                    flex={1}
                                    flexDir={"column"}
                                    px={10}
                                    display={{ base: "none", md: "flex" }}
                                >
                                    <Flex
                                        alignItems={"center"}
                                        justifyContent={"space-between"}
                                    >
                                        <Flex alignItems={"center"} gap={4}>
                                            <Avatar.Root>
                                                <Avatar.Fallback />
                                                <Avatar.Image
                                                    src={
                                                        userProfile.profilePicURL
                                                    }
                                                />
                                            </Avatar.Root>
                                            <Text
                                                fontWeight={"bold"}
                                                fontSize={12}
                                            >
                                                {userProfile.username}
                                            </Text>
                                        </Flex>
                                        {authUser?.uid === userProfile.uid && (
                                            <Button
                                                size={"sm"}
                                                bg={"transparent"}
                                                color={"white"}
                                                _hover={{
                                                    bg: "whiteAlpha.300",
                                                    color: "red.600",
                                                }}
                                                borderRadius={4}
                                                p={1}
                                                onClick={handleDeletePost}
                                                loading={isDeleting}
                                            >
                                                <MdDelete
                                                    size={20}
                                                    cursor={"pointer"}
                                                />
                                            </Button>
                                        )}
                                    </Flex>
                                    <Separator my={4} bg={"gray.500"} />
                                    <VStack
                                        w={"full"}
                                        alignItems={"start"}
                                        maxH={"350px"}
                                        overflowY={"auto"}
                                    >
                                        {post.caption && (
                                            <Caption post={post} />
                                        )}
                                        {post.comments.map((comment, idx) => (
                                            <Comment
                                                key={comment.id || idx}
                                                comment={comment}
                                            />
                                        ))}
                                    </VStack>
                                    <Separator my={4} bg={"gray.800"} />
                                    <PostFooter
                                        isProfilePage={true}
                                        post={post}
                                    />
                                </Flex>
                            </Flex>
                        </Dialog.Body>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size='sm' />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};

export default ProfilePost;
