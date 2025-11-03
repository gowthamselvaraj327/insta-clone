import { Box, Image } from "@chakra-ui/react";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";

const FeedPost = ({ username, avatar, img }) => {
    return (
        <>
            <PostHeader username={username} avatar={avatar} />
            <Box my={2} borderRadius={4} overflow={"hidden"}>
                <Image src={img} alt='User Posted Image' />
            </Box>
            {/* <PostFooter username={username} /> */}
        </>
    );
};

export default FeedPost;
