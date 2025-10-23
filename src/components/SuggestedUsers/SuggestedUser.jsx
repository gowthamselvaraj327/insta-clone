import { Avatar, Box, Button, Flex, VStack } from "@chakra-ui/react";
import { useState } from "react";

const SuggestedUser = ({ name, followers, avatar }) => {
    const [isFollowed, setIsFollowed] = useState(false);
    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
            <Flex alignItems={"center"} gap={2}>
                <Avatar.Root size={"md"}>
                    <Avatar.Fallback name='Segun Adebayo' />
                    <Avatar.Image src={avatar} />
                </Avatar.Root>
                <VStack gap={2} alignItems={"flex-start"}>
                    <Box fontSize={12} fontWeight={"bold"}>
                        {name}
                    </Box>
                    <Box fontSize={11} color={"gray.500"}>
                        {followers} followers
                    </Box>
                </VStack>
            </Flex>
            <Button
                fontSize={13}
                fontWeight={"medium"}
                p={0}
                bg={"transparent"}
                h={"max-content"}
                color={"blue.400"}
                cursor={"pointer"}
                _hover={{
                    color: "white",
                }}
                onClick={() => setIsFollowed(!isFollowed)}
            >
                {isFollowed ? "Unfollow" : "Follow"}
            </Button>
        </Flex>
    );
};

export default SuggestedUser;
