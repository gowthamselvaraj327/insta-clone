import {
    Box,
    Button,
    Flex,
    Group,
    Input,
    InputGroup,
    Text,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import {
    CommentLogo,
    NotificationsLogo,
    UnlikeLogo,
} from "../../assets/constants";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/authStore";
import useLikePost from "../../hooks/useLikePost";

const PostFooter = ({ post, username, isProfilePage }) => {
    const [comment, setComment] = useState("");
    const { handlePostComment, isCommenting } = usePostComment();
    const authUser = useAuthStore((state) => state.user);
    const commentRef = useRef(null);
    const { handleLikePost, isLiked, isUpdating, likes } = useLikePost(post);

    const handleSubmitComment = async () => {
        await handlePostComment(comment, post.id);
        setComment("");
    };
    return (
        <Box mb={10} marginTop={"auto"}>
            <Flex gap={4} pt={0} mb={2} mt={4} w={"full"} alignItems={"center"}>
                <Box onClick={handleLikePost} fontSize={18} cursor={"pointer"}>
                    {isLiked ? <UnlikeLogo /> : <NotificationsLogo />}
                </Box>
                <Box
                    fontSize={18}
                    cursor={"pointer"}
                    onClick={() => commentRef.current.focus()}
                >
                    <CommentLogo />
                </Box>
            </Flex>
            <Text fontWeight={600} fontSize={"sm"}>
                {likes} likes
            </Text>
            {!isProfilePage && (
                <>
                    <Text fontWeight={700} fontSize={"sm"}>
                        {username}{" "}
                        <Text as={"span"} fontWeight={400}>
                            Feeling Good
                        </Text>
                    </Text>
                    <Text fontSize={"sm"} color={"gray"}>
                        View all 1,000 comments
                    </Text>
                </>
            )}
            <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={2}
                w={"full"}
            >
                {authUser && (
                    <InputGroup
                        p={0}
                        endElement={
                            <PostButton
                                handleSubmit={handleSubmitComment}
                                isCommenting={isCommenting}
                            />
                        }
                    >
                        <Input
                            variant={"flushed"}
                            placeholder='Add a comment ...'
                            fontSize={14}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            ref={commentRef}
                        />
                    </InputGroup>
                )}
            </Flex>
        </Box>
    );
};

const PostButton = ({ handleSubmit, isCommenting }) => {
    return (
        <Button
            fontSize={14}
            color={"blue.500"}
            fontWeight={600}
            cursor={"pointer"}
            _hover={{
                color: "white",
            }}
            bg={"transparent"}
            me='-7'
            onClick={handleSubmit}
            loading={isCommenting}
        >
            Post
        </Button>
    );
};

export default PostFooter;
