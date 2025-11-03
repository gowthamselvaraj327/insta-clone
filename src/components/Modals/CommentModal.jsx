import {
    Button,
    CloseButton,
    Dialog,
    Field,
    Flex,
    Input,
    Portal,
} from "@chakra-ui/react";
import Comment from "../Comment/Comment";
import { useEffect, useRef } from "react";
import usePostComment from "../../hooks/usePostComment";

const CommentModal = ({ commentModalOpen, setCommentModalOpen, post }) => {
    const commentsRef = useRef(null);
    const commentsContainerRef = useRef(null);
    const { handlePostComment, isCommenting } = usePostComment();

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        await handlePostComment(commentsRef.current.value, post.id);
        commentsRef.current.value = null;
    };

    useEffect(() => {
        const scrollToBottom = () => {
            commentsContainerRef.current.scrollTop =
                commentsContainerRef.current.scrollHeight;
        };
        if (commentModalOpen) {
            setTimeout(() => {
                scrollToBottom();
            }, 100);
        }
    }, [commentModalOpen, post.comments.length]);
    return (
        <Dialog.Root
            lazyMount
            open={commentModalOpen}
            onOpenChange={(e) => setCommentModalOpen(e.open)}
        >
            <Dialog.Trigger asChild />
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content
                        bg={"black"}
                        border={"1px solid gray"}
                        maxW={"400px"}
                    >
                        <Dialog.Header>
                            <Dialog.Title>Comments</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body pb={6}>
                            <Flex
                                mb={4}
                                gap={4}
                                flexDir={"column"}
                                maxH={"250px"}
                                overflowY={"auto"}
                                ref={commentsContainerRef}
                            >
                                {post.comments.map((comment, idx) => (
                                    <Comment
                                        key={comment.id || idx}
                                        comment={comment}
                                    />
                                ))}
                            </Flex>
                            <form
                                style={{ marginTop: "2rem" }}
                                onSubmit={handleSubmitComment}
                            >
                                <Input
                                    placeholder={"comment"}
                                    size={"sm"}
                                    type={"text"}
                                    ref={commentsRef}
                                />
                                <Flex w={"full"} justifyContent={"flex-end"}>
                                    <Button
                                        type='submit'
                                        ml={"auto"}
                                        size={"sm"}
                                        my={4}
                                        loading={isCommenting}
                                    >
                                        Post
                                    </Button>
                                </Flex>
                            </form>
                        </Dialog.Body>
                        <Dialog.Footer />
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size='sm' />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};

export default CommentModal;
