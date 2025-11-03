import { Box, Link, Avatar, useBreakpointValue } from "@chakra-ui/react";
import { Tooltip } from "../ui/tooltip";
import { Link as RouterLink } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const ProfileLink = () => {
    const showTooltip = useBreakpointValue({ base: true, md: false });
    const authUser = useAuthStore((state) => state.user);
    return (
        <Tooltip
            showArrow
            content={"Profile"}
            positioning={{ placement: "right-end" }}
            openDelay={500}
            disabled={!showTooltip}
        >
            <Link
                display={"flex"}
                to={`/${authUser?.username}`}
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
                <Avatar.Root size={"sm"}>
                    <Avatar.Fallback />
                    <Avatar.Image src={authUser?.profilePicURL || null} />
                </Avatar.Root>
                <Box display={{ base: "none", md: "block" }}>Profile</Box>
            </Link>
        </Tooltip>
    );
};

export default ProfileLink;
