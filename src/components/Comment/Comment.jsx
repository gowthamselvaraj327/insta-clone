import { Avatar, Flex, Text } from "@chakra-ui/react";

const Comment = ({ createdAt, username, profilepic, text }) => {
    return (
        <Flex gap={4}>
            <Avatar.Root size={"xs"}>
                <Avatar.Fallback name='Segun Adebayo' />
                <Avatar.Image src={profilepic} />
            </Avatar.Root>
            <Flex direction={"column"}>
                <Flex gap={2}>
                    <Text fontWeight={"bold"} fontSize={12}>
                        {username}
                    </Text>
                    <Text fontSize={14}>{text}</Text>
                </Flex>
                <Text fontSize={12} color={"gray"}>
                    {createdAt}
                </Text>
            </Flex>
        </Flex>
    );
};

export default Comment;
