import { Link } from "react-router-dom";
import useUserProfileStore from "../../store/useProfileStore";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import { timeAgo } from "../../utils/timeAgo";

const Caption = ({post}) => {
    const userProfile = useUserProfileStore(state => state.userProfile)
    return (
        <Flex gap={4}>
            <Link to={`/${userProfile?.username}`}>
                <Avatar.Root size={"xs"}>
                    <Avatar.Fallback />
                    <Avatar.Image src={userProfile?.profilePicURL || null} />
                </Avatar.Root>
            </Link>
            <Flex direction={"column"}>
                <Flex gap={2} alignItems={"center"}>
                    <Link to={`/${userProfile?.username}`}>
                        <Text fontWeight={"bold"} fontSize={12}>
                            {userProfile?.username || null}
                        </Text>
                    </Link>
                    <Text fontSize={14}>{post.caption}</Text>
                </Flex>
                <Text fontSize={12} color={"gray"}>
                    {timeAgo(post.createdAt)}
                </Text>
            </Flex>
        </Flex>
    );
};

export default Caption;
