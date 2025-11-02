import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import { Tooltip } from "../ui/tooltip";
import { CreatePostLogo } from "../../assets/constants";

const CreatePost = () => {
    const showTooltip = useBreakpointValue({ base: true, md: false });
    return (
        <Tooltip
            showArrow
            content={"Create"}
            positioning={{ placement: "right-end" }}
            openDelay={500}
            disabled={!showTooltip}
        >
            <Flex
                borderRadius={6}
                _hover={{ bg: "whiteAlpha.400" }}
                alignItems={"center"}
                justifyContent={{
                    base: "center",
                    md: "flex-start",
                }}
                gap={4}
                p={2}
                w={{ base: 10, md: "full" }}
                textDecoration={"none"}
            >
                <CreatePostLogo />
                <Box display={{ base: "none", md: "block" }}>Create</Box>
            </Flex>
        </Tooltip>
    );
};

export default CreatePost;
