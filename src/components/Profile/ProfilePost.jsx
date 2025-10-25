import {
    Flex,
    GridItem,
    Image,
    Text,
    CloseButton,
    Dialog,
    Portal,
    Button,
    Box,
    Avatar,
    Separator,
    VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Comment from "../Comment/Comment";
import PostFooter from "../FeedPosts/PostFooter";

const ProfilePost = ({ img }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    return (
        <Dialog.Root placement={"center"} size={{ base: "lg", md: "xl" }}>
            <Dialog.Trigger asChild>
                <GridItem
                    cursor={"pointer"}
                    borderRadius={4}
                    overflow={"hidden"}
                    border={"1px solid"}
                    borderColor={"whiteAlpha.300"}
                    position={"relative"}
                    aspectRatio={1 / 1}
                >
                    <Flex
                        opacity={0}
                        _hover={{ opacity: 1 }}
                        position={"absolute"}
                        top={0}
                        bottom={0}
                        right={0}
                        left={0}
                        bg={"blackAlpha.700"}
                        transition={"all 0.3s ease"}
                        zIndex={1}
                        justifyContent={"center"}
                    >
                        <Flex
                            justifyContent={"center"}
                            alignItems={"center"}
                            gap={50}
                        >
                            <Flex>
                                <AiFillHeart size={20} />
                                <Text fontWeight={"bold"} ml={2}>
                                    7
                                </Text>
                            </Flex>
                            <Flex>
                                <FaComment size={20} />
                                <Text fontWeight={"bold"} ml={2}>
                                    7
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Image
                        src={img}
                        alt='Profile post'
                        w={"100%"}
                        h={"100%"}
                        objectFit={"cover"}
                    />
                </GridItem>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Body bg={"black"} pb={5}>
                            <Flex
                                gap={4}
                                w={{ base: "90%", sm: "70%", md: "full" }}
                                mx={"auto"}
                            >
                                <Box
                                    borderRadius={4}
                                    overflow={"hidden"}
                                    border={"1px solid"}
                                    borderColor={"whiteAlpha.300"}
                                    flex={1.5}
                                >
                                    <Image src={img} alt='profile post' />
                                </Box>
                                <Flex
                                    flex={1}
                                    flexDir={"column"}
                                    px={10}
                                    display={{ base: "none", md: "flex" }}
                                >
                                    <Flex
                                        alignItems={"center"}
                                        justifyContent={"space-between"}
                                    >
                                        <Flex
                                            alignItems={"center"}
                                            gap={4}
                                        >
                                            <Avatar.Root>
                                                <Avatar.Fallback name='Segun Adebayo' />
                                                <Avatar.Image src='/profilepic.png' />
                                            </Avatar.Root>
                                            <Text
                                                fontWeight={"bold"}
                                                fontSize={12}
                                            >
                                                asaprogrammer_
                                            </Text>
                                        </Flex>
                                        <Box
                                            _hover={{
                                                bg: "whiteAlpha.300",
                                                color: "red.600",
                                            }}
                                            borderRadius={4}
                                            p={1}
                                        >
                                            <MdDelete
                                                size={20}
                                                cursor={"pointer"}
                                            />
                                        </Box>
                                    </Flex>
                                    <Separator my={4} bg={"gray.500"} />
                                    <VStack w={"full"} alignItems={"start"} maxH={"350px"} overflowY={"auto"}>
                                        <Comment 
                                            createdAt="1d ago"
                                            username="asaprogrammer_"
                                            profilepic="/profilepic.png"
                                            text="Dummy images from unsplash"
                                        />
                                        <Comment 
                                            createdAt="2d ago"
                                            username="abrahmov"
                                            profilepic="https://randomuser.me/api/portraits/men/71.jpg"
                                            text="Nice Pic"
                                        />
                                        <Comment 
                                            createdAt="5h ago"
                                            username="kentdodds"
                                            profilepic="https://randomuser.me/api/portraits/men/72.jpg"
                                            text="Good!!"
                                        />
                                        <Comment 
                                            createdAt="5h ago"
                                            username="kentdodds"
                                            profilepic="https://randomuser.me/api/portraits/men/72.jpg"
                                            text="Good!!"
                                        />
                                        <Comment 
                                            createdAt="5h ago"
                                            username="kentdodds"
                                            profilepic="https://randomuser.me/api/portraits/men/72.jpg"
                                            text="Good!!"
                                        />
                                        <Comment 
                                            createdAt="5h ago"
                                            username="kentdodds"
                                            profilepic="https://randomuser.me/api/portraits/men/72.jpg"
                                            text="Good!!"
                                        />
                                        <Comment 
                                            createdAt="5h ago"
                                            username="kentdodds"
                                            profilepic="https://randomuser.me/api/portraits/men/72.jpg"
                                            text="Good!!"
                                        />
                                        <Comment 
                                            createdAt="5h ago"
                                            username="kentdodds"
                                            profilepic="https://randomuser.me/api/portraits/men/72.jpg"
                                            text="Good!!"
                                        />
                                        <Comment 
                                            createdAt="5h ago"
                                            username="kentdodds"
                                            profilepic="https://randomuser.me/api/portraits/men/72.jpg"
                                            text="Good!!"
                                        />
                                        <Comment 
                                            createdAt="5h ago"
                                            username="kentdodds"
                                            profilepic="https://randomuser.me/api/portraits/men/72.jpg"
                                            text="Good!!"
                                        />
                                    </VStack>
                                    <Separator my={4} bg={"gray.800"} />
                                    <PostFooter isProfilePage={true} />
                                </Flex>
                            </Flex>
                        </Dialog.Body>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size='sm' />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};

export default ProfilePost;
