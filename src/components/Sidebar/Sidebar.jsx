import { Avatar, Box, Flex, Link, useBreakpointValue } from "@chakra-ui/react";
import { Tooltip } from "../ui/tooltip";
import { Link as RouterLink } from "react-router-dom";
import {
    CreatePostLogo,
    InstagramLogo,
    InstagramMobileLogo,
    NotificationsLogo,
    SearchLogo,
} from "../../assets/constants";
import { AiFillHome } from "react-icons/ai";
import { css } from "@emotion/react";
import { BiLogOut } from "react-icons/bi";

const Sidebar = () => {
    const showTooltip = useBreakpointValue({ base: true, md: false });
    const sidebarItems = [
        {
            icon: <AiFillHome size={24} />,
            text: "Home",
            link: "/",
        },
        {
            icon: <SearchLogo />,
            text: "Search",
        },
        {
            icon: <NotificationsLogo />,
            text: "Notifications",
        },
        {
            icon: <CreatePostLogo />,
            text: "Create",
        },
        {
            icon: (
                <Avatar.Root size={"sm"}>
                    <Avatar.Fallback name='Segun Adebayo' />
                    <Avatar.Image src='/profilepic.png' />
                </Avatar.Root>
            ),
            text: "Profile",
            link: "asaprogrammer",
        },
    ];
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
                    {sidebarItems.map((item, index) => (
                        <Tooltip
                            key={index}
                            showArrow
                            content={item.text}
                            positioning={{ placement: "right-end" }}
                            openDelay={500}
                            disabled={!showTooltip}
                        >
                            <Link
                                display={"flex"}
                                to={item.link || null}
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
                                {item.icon}
                                <Box display={{ base: "none", md: "block" }}>
                                    {item.text}
                                </Box>
                            </Link>
                        </Tooltip>
                    ))}
                </Flex>
                <Tooltip
                    showArrow
                    content={"Logout"}
                    positioning={{ placement: "right-end" }}
                    openDelay={500}
                    disabled={!showTooltip}
                >
                    <Link
                        display={"flex"}
                        to={"/auth"}
                        as={RouterLink}
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
                        <Box display={{ base: "none", md: "block" }}>
                            Logout
                        </Box>
                    </Link>
                </Tooltip>
            </Flex>
        </Box>
    );
};

export default Sidebar;
