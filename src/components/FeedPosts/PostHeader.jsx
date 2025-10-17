import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

const PostHeader = ({ username, avatar }) => {
    return (
        <Flex
            my={2}
            alignItems={"center"}
            justifyContent={"space-between"}
            w={"full"}
        >
            <Flex gap={2} alignItems={"center"}>
                <Avatar.Root size={"xs"}>
                    <Avatar.Fallback name='Segun Adebayo' />
                    <Avatar.Image src={avatar} />
                </Avatar.Root>
                <Flex fontSize={14} fontWeight={"bold"} gap={2}>
                    {username}
                    <Box color={"grey.500"}>• 1w</Box>
                </Flex>
            </Flex>
            <Box cursor={"pointer"}>
                <Text
                    fontSize={12}
                    fontWeight={"bold"}
                    color={"blue.500"}
                    _hover={{
                        color: "white",
                    }}
                    transition={"0.2s ease-in-out"}
                >
                    Unfollow
                </Text>
            </Box>
        </Flex>
    );
};

export default PostHeader;
