import {
    Box,
    Button,
    Flex,
    Group,
    Input,
    InputGroup,
    Text,
} from "@chakra-ui/react";
import { useState } from "react";
import {
    CommentLogo,
    NotificationsLogo,
    UnlikeLogo,
} from "../../assets/constants";

const PostFooter = ({ username, isProfilePage }) => {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(1000);

    const handleLikes = () => {
        if (liked) {
            setLiked(false);
            setLikes(likes - 1);
        } else {
            setLiked(true);
            setLikes(likes + 1);
        }
    };
    return (
        <Box mb={10} marginTop={"auto"}>
            <Flex gap={4} pt={0} mb={2} mt={4} w={"full"} alignItems={"center"}>
                <Box onClick={handleLikes} fontSize={18} cursor={"pointer"}>
                    {liked ? <UnlikeLogo /> : <NotificationsLogo />}
                </Box>
                <Box fontSize={18} cursor={"pointer"}>
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
                <InputGroup p={0} endElement={<PostButton />}>
                    <Input
                        variant={"flushed"}
                        placeholder='Add a comment ...'
                        fontSize={14}
                    />
                </InputGroup>
            </Flex>
        </Box>
    );
};

const PostButton = () => {
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
        >
            Post
        </Button>
    );
};

export default PostFooter;
