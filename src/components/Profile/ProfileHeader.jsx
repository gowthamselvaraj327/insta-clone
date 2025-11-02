import {
    Avatar,
    AvatarGroup,
    Button,
    defineStyle,
    Flex,
    Text,
    VStack,
} from "@chakra-ui/react";
import useUserProfileStore from "../../store/useProfileStore";
import useAuthStore from "../../store/authStore";
import EditProfile from "./EditProfile";
import useFollowUser from "../../hooks/useFollowUser";

const ProfileHeader = () => {
    const { userProfile } = useUserProfileStore();
    const authUser = useAuthStore((state) => state.user);
    const { isUpdating, handleFollowUser, isFollowing } = useFollowUser(
        userProfile?.uid
    );
    const visitingOwnProfileWithAuth =
        authUser && authUser.username === userProfile.username;
    const visitingAnotherProfileWithAuth =
        authUser && authUser.username !== userProfile.username;
    return (
        <Flex
            gap={{ base: 4, sm: 10 }}
            py={10}
            direction={{ base: "column", sm: "row" }}
        >
            <AvatarGroup>
                <Avatar.Root
                    style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        justifySelf: "center",
                        alignSelf: "flex-start",
                        margin: "auto",
                    }}
                >
                    <Avatar.Fallback />
                    <Avatar.Image
                        alt='Profile Pic'
                        src={userProfile?.profilePicURL || null}
                    />
                </Avatar.Root>
            </AvatarGroup>
            <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
                <Flex
                    gap={4}
                    direction={{ sm: "row", base: "column" }}
                    justifyContent={{ base: "center", sm: "flex-start" }}
                    alignItems={"center"}
                    w={"full"}
                >
                    <Text fontSize={{ base: "sm", md: "lg" }}>
                        {userProfile.username}
                    </Text>
                    {visitingOwnProfileWithAuth && (
                        <Flex
                            gap={4}
                            alignItems={"center"}
                            justifyContent={"center"}
                        >
                            <EditProfile />
                        </Flex>
                    )}
                    {visitingAnotherProfileWithAuth && (
                        <Flex
                            gap={4}
                            alignItems={"center"}
                            justifyContent={"center"}
                        >
                            <Button
                                bg={"blue.500"}
                                color={"white"}
                                _hover={{ bg: "blue.600" }}
                                size={{ sm: "xs", md: "sm" }}
                                onClick={handleFollowUser}
                                loading={isUpdating}
                            >
                                {isFollowing ? "Unfollow" : "Follow"}
                            </Button>
                        </Flex>
                    )}
                </Flex>
                <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
                    <Text fontSize={{ base: "xs", md: "sm" }}>
                        <Text as={"span"} fontWeight={"bold"} mr={1}>
                            {userProfile.posts.length}
                        </Text>
                        Posts
                    </Text>
                    <Text fontSize={{ base: "xs", md: "sm" }}>
                        <Text as={"span"} fontWeight={"bold"} mr={1}>
                            {userProfile.followers.length}
                        </Text>
                        Followers
                    </Text>
                    <Text fontSize={{ base: "xs", md: "sm" }}>
                        <Text as={"span"} fontWeight={"bold"} mr={1}>
                            {userProfile.following.length}
                        </Text>
                        Following
                    </Text>
                </Flex>
                <Flex alignItems={"center"} gap={4}>
                    <Text fontSize={"sm"} fontWeight={"bold"}>
                        {userProfile.fullName}
                    </Text>
                </Flex>
                <Text fontSize={"sm"}>{userProfile.bio}</Text>
            </VStack>
        </Flex>
    );
};

export default ProfileHeader;
