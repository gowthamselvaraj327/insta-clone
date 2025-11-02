import { Box, Link, useBreakpointValue } from "@chakra-ui/react";
import { Tooltip } from "../ui/tooltip";
import { AiFillHome } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";

const Home = () => {
    const showTooltip = useBreakpointValue({ base: true, md: false });
    return (
        <Tooltip
            showArrow
            content={"Home"}
            positioning={{ placement: "right-end" }}
            openDelay={500}
            disabled={!showTooltip}
        >
            <Link
                display={"flex"}
                to={"/"}
                as={RouterLink}
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
                <AiFillHome size={24} />
                <Box display={{ base: "none", md: "block" }}>Home</Box>
            </Link>
        </Tooltip>
    );
};

export default Home;
