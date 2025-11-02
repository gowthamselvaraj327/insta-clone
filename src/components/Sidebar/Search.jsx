import {
    Box,
    Flex,
    useBreakpointValue,
    CloseButton,
    Dialog,
    Portal,
    Button,
    Input,
    Field,
} from "@chakra-ui/react";
import { Tooltip } from "../ui/tooltip";
import { SearchLogo } from "../../assets/constants";
import { useRef, useState } from "react";
import useSearchUser from "../../hooks/useSearchUser";
import SuggestedUser from "../SuggestedUsers/SuggestedUser";

const Search = () => {
    const showTooltip = useBreakpointValue({ base: true, md: false });
    const [open, setOpen] = useState(false);
    const { getUserProfile, isLoading, user, setUser } = useSearchUser();

    const searchRef = useRef(null);
    const handleSearchUser = (e) => {
        e.preventDefault();
        getUserProfile(searchRef.current.value);
    };
    // console.log("user", user);

    return (
        <>
            <Dialog.Root
                lazyMount
                open={open}
                onOpenChange={(e) => setOpen(e.open)}
                motionPreset={"slide-in-left"}
            >
                <Dialog.Trigger asChild>
                    <Tooltip
                        showArrow
                        content={"Search"}
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
                            onClick={() => setOpen(true)}
                        >
                            <SearchLogo />
                            <Box display={{ base: "none", md: "block" }}>
                                Search
                            </Box>
                        </Flex>
                    </Tooltip>
                </Dialog.Trigger>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content
                            bg={"black"}
                            border={"1px solid gray"}
                            maxW={"400px"}
                        >
                            <Dialog.Header>
                                <Dialog.Title>Search User</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <form onSubmit={handleSearchUser}>
                                    <Field.Root>
                                        <Field.Label fontSize={"sm"}>
                                            Username
                                        </Field.Label>
                                        <Input
                                            placeholder={"Username"}
                                            size={"sm"}
                                            type={"text"}
                                            ref={searchRef}
                                        />
                                    </Field.Root>
                                    <Flex
                                        w={"full"}
                                        justifyContent={"flex-end"}
                                    >
                                        <Button
                                            type='submit'
                                            ml={"auto"}
                                            size={"sm"}
                                            my={4}
                                            loading={isLoading}
                                        >
                                            Search
                                        </Button>
                                    </Flex>
                                </form>
                                {user && (
                                    <SuggestedUser
                                        user={user}
                                        setUser={setUser}
                                    />
                                )}
                            </Dialog.Body>
                            <Dialog.Footer />
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size='sm' />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    );
};

export default Search;
