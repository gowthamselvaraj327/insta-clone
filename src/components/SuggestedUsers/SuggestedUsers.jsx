import { Flex, Text, VStack } from "@chakra-ui/react";
import SuggestedHeader from "./SuggestedHeader";
import SuggestedUser from "./SuggestedUser";

const SuggestedUsers = () => {
    return (
        <VStack py={8} px={6} gap={4}>
            <SuggestedHeader />
            <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                w={"full"}
            >
                <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
                    Suggested for you
                </Text>
                <Text
                    fontSize={12}
                    fontWeight={"bold"}
                    _hover={{
                        color: "gray.400",
                    }}
                    cursor={"pointer"}
                >
                    See all
                </Text>
            </Flex>
            <SuggestedUser name="Dan Abrahmov" followers={1392} avatar="/img2.png" />
            <SuggestedUser name="Ryan Florence" followers={567} avatar="/img1.png" />
            <SuggestedUser name="Christian Nwamba" followers={759} avatar="/img3.png" />
        </VStack>
    );
};

export default SuggestedUsers;
