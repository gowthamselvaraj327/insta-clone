import { Box, Image } from "@chakra-ui/react";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";

const FeedPost = ({ post }) => {
    const { isLoading, userProfile } = useGetUserProfileById(post.createdBy);
    return (
        <>
            <PostHeader post={post} userProfile={userProfile} />
            <Box my={2} borderRadius={4} overflow={"hidden"}>
                <Image src={post.imageURL} alt='Feed Post Image' />
            </Box>
            <PostFooter post={post} userProfile={userProfile} />
        </>
    );
};

export default FeedPost;
