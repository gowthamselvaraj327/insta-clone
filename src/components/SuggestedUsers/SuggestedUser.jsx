import { Avatar, Box, Button, Flex, VStack } from "@chakra-ui/react";
import { useState } from "react";
import useFollowUser from "../../hooks/useFollowUser";
import useAuthStore from "../../store/authStore";

const SuggestedUser = ({ user, setUser }) => {
    const { handleFollowUser, isFollowing, isUpdating } = useFollowUser(
        user.uid
    );
    const authUser = useAuthStore((state) => state.user);
    const onFollowUser = async () => {
        await handleFollowUser();
        if (setUser)
            setUser({
                ...user,
                followers: isFollowing
                    ? user.followers.filter((uid) => uid !== authUser.uid)
                    : [...user.followers, authUser.uid],
            });
    };
    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
            <Flex alignItems={"center"} gap={2}>
                <Avatar.Root size={"md"}>
                    <Avatar.Fallback />
                    <Avatar.Image src={user.profilePicURL || null} />
                </Avatar.Root>
                <VStack gap={2} alignItems={"flex-start"}>
                    <Box fontSize={12} fontWeight={"bold"}>
                        {user.fullName}
                    </Box>
                    <Box fontSize={11} color={"gray.500"}>
                        {user.followers.length} followers
                    </Box>
                </VStack>
            </Flex>
            {authUser.uid !== user.uid && (
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
                    onClick={onFollowUser}
                    loading={isUpdating}
                >
                    {isFollowing ? "Unfollow" : "Follow"}
                </Button>
            )}
        </Flex>
    );
};

export default SuggestedUser;
