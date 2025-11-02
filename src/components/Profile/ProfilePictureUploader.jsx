import { Avatar, Button, Center, Field, Flex, Input } from "@chakra-ui/react";

const ProfilePictureUploader = ({
    fileRef,
    selectedFile,
    authUser,
    onImageChange,
}) => {
    return (
        <Field.Root>
            <Flex direction={{ base: "column", sm: "row" }} w={"full"} gap={6}>
                <Center>
                    <Avatar.Root
                        height={"90px"}
                        width={"90px"}
                        border={"2px solid white"}
                    >
                        <Avatar.Fallback />
                        <Avatar.Image
                            src={selectedFile || authUser.profilePicURL}
                        />
                    </Avatar.Root>
                </Center>

                <Center w='full'>
                    <Button w='full' onClick={() => fileRef.current.click()}>
                        Edit Profile Picture
                    </Button>
                </Center>

                <Input
                    type='file'
                    hidden
                    ref={fileRef}
                    onChange={onImageChange}
                />
            </Flex>
        </Field.Root>
    );
};

export default ProfilePictureUploader;
