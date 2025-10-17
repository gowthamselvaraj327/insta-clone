import { Avatar, Box, Flex, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const SuggestedHeader = () => {
    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
            <Flex alignItems={"center"} gap={2}>
                <Avatar.Root size={"lg"}>
                    <Avatar.Fallback name='Segun Adebayo' />
                    <Avatar.Image src='/profilepic.png' />
                </Avatar.Root>
                <Box fontSize={12} fontWeight={"bold"}>
                    asaprogrammer
                </Box>
            </Flex>
            <Link
                as={RouterLink}
                to={"/auth"}
                fontSize={14}
                fontWeight={"medium"}
                color={"blue.400"}
                textDecoration={"none"}
                cursor={"pointer"}
            >
                Log Out
            </Link>
        </Flex>
    );
};

export default SuggestedHeader;
