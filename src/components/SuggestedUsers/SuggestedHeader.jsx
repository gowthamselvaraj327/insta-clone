import { Avatar, Box, Button, Flex } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import useAuthStore from "../../store/authStore";

const SuggestedHeader = () => {
    const authUser = useAuthStore((state) => state.user);
    const { handleLogout, isLoggingOut } = useLogout();
    if (!authUser) return null;
    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
            <Flex alignItems={"center"} gap={2}>
                <RouterLink to={`${authUser.username}`}>
                    <Avatar.Root size={"lg"}>
                        <Avatar.Fallback />
                        <Avatar.Image src={authUser.profilePicURL} />
                    </Avatar.Root>
                </RouterLink>
                <RouterLink to={`${authUser.username}`}>
                    <Box fontSize={12} fontWeight={"bold"}>
                        {authUser.username}
                    </Box>
                </RouterLink>
            </Flex>
            <Button
                size={"xs"}
                bg={"transparent"}
                _hover={{
                    bg: "transparent",
                }}
                fontSize={14}
                fontWeight={"medium"}
                color={"blue.400"}
                textDecoration={"none"}
                cursor={"pointer"}
                onClick={handleLogout}
                loading={isLoggingOut}
            >
                Log Out
            </Button>
        </Flex>
    );
};

export default SuggestedHeader;
