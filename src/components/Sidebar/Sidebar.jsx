import { Box, Button, Flex, Link, useBreakpointValue } from "@chakra-ui/react";
import { Tooltip } from "../ui/tooltip";
import { Link as RouterLink } from "react-router-dom";
import { InstagramLogo, InstagramMobileLogo } from "../../assets/constants";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import SidebarItems from "./SidebarItems";

const Sidebar = () => {
    const showTooltip = useBreakpointValue({ base: true, md: false });
    const { handleLogout, isLoggingOut, error } = useLogout();
    return (
        <Box
            h={"100vh"}
            borderRight={"1px solid"}
            borderColor={"whiteAlpha.300"}
            py={8}
            position={"sticky"}
            top={0}
            left={0}
            px={{ base: 2, md: 4 }}
        >
            <Flex direction={"column"} gap={10} w={"full"} h={"full"}>
                <Link
                    to={"/"}
                    as={RouterLink}
                    pl={2}
                    display={{ base: "none", md: "block" }}
                    cursor={"pointer"}
                >
                    <InstagramLogo />
                </Link>
                <Link
                    to={"/"}
                    as={RouterLink}
                    p={2}
                    display={{ base: "block", md: "none" }}
                    cursor={"pointer"}
                    borderRadius={6}
                    w={10}
                    _hover={{ bg: "whiteAlpha.200" }}
                >
                    <InstagramMobileLogo />
                </Link>
                <Flex direction={"column"} gap={5} cursor={"pointer"}>
                    <SidebarItems />
                </Flex>
                <Tooltip
                    showArrow
                    content={"Logout"}
                    positioning={{ placement: "right-end" }}
                    openDelay={500}
                    disabled={!showTooltip}
                >
                    <Flex
                        onClick={handleLogout}
                        borderRadius={6}
                        _hover={{ bg: "whiteAlpha.400" }}
                        alignItems={"center"}
                        justifyContent={{ base: "center", md: "flex-start" }}
                        gap={4}
                        p={2}
                        mt={"auto"}
                        w={{ base: 10, md: "full" }}
                        textDecoration={"none"}
                    >
                        <BiLogOut size={24} />
                        <Button
                            display={{ base: "none", md: "block" }}
                            loading={isLoggingOut}
                            variant={"ghost"}
                            _hover={{ bg: "transparent" }}
                        >
                            Logout
                        </Button>
                    </Flex>
                </Tooltip>
            </Flex>
        </Box>
    );
};

export default Sidebar;
