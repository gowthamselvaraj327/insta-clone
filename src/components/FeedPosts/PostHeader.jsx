import {
    Avatar,
    Box,
    Button,
    Flex,
    Skeleton,
    SkeletonCircle,
} from "@chakra-ui/react";
import { timeAgo } from "../../utils/timeAgo";
import { Link } from "react-router-dom";
import useFollowUser from "../../hooks/useFollowUser";

const PostHeader = ({ post, userProfile }) => {
    const { handleFollowUser, isFollowing, isUpdating } = useFollowUser(
        post.createdBy
    );
    return (
        <Flex
            my={2}
            alignItems={"center"}
            justifyContent={"space-between"}
            w={"full"}
        >
            <Flex gap={2} alignItems={"center"}>
                {userProfile ? (
                    <Link to={`/${userProfile?.username}`}>
                        <Avatar.Root size={"xs"}>
                            <Avatar.Fallback />
                            <Avatar.Image
                                src={userProfile?.profilePicURL || null}
                            />
                        </Avatar.Root>
                    </Link>
                ) : (
                    <SkeletonCircle size={"10"} />
                )}
                <Flex fontSize={12} fontWeight={"bold"} gap={2}>
                    {userProfile ? (
                        <Link to={`/${userProfile?.username}`}>
                            {userProfile?.username}
                        </Link>
                    ) : (
                        <Skeleton h={"10px"} w={"100px"} />
                    )}
                    <Box color={"grey.500"}>• {timeAgo(post.createdAt)}</Box>
                </Flex>
            </Flex>
            <Box cursor={"pointer"}>
                <Button
                    size={"xs"}
                    bg={"transparent"}
                    fontSize={12}
                    fontWeight={"bold"}
                    color={"blue.500"}
                    _hover={{
                        color: "white",
                    }}
                    transition={"0.2s ease-in-out"}
                    onClick={handleFollowUser}
                    _loading={isUpdating}
                >
                    {isFollowing ? "Unfollow" : "Follow"}
                </Button>
            </Box>
        </Flex>
    );
};

export default PostHeader;
