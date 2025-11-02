import { Field, Input, Stack } from "@chakra-ui/react";
import ProfilePictureUploader from "./ProfilePictureUploader";

const EditProfileForm = ({
    inputs,
    setInputs,
    fileRef,
    handleImageChange,
    selectedFile,
    authUser,
}) => {
    return (
        <Stack gap={4}>
            <ProfilePictureUploader
                fileRef={fileRef}
                selectedFile={selectedFile}
                authUser={authUser}
                onImageChange={handleImageChange}
            />

            <Field.Root>
                <Field.Label fontSize={"sm"}>Full Name</Field.Label>
                <Input
                    placeholder={"Full Name"}
                    size={"sm"}
                    type={"text"}
                    value={inputs.fullName || authUser.fullName}
                    onChange={(e) =>
                        setInputs({ ...inputs, fullName: e.target.value })
                    }
                />
            </Field.Root>

            <Field.Root>
                <Field.Label fontSize={"sm"}>Username</Field.Label>
                <Input
                    placeholder={"Username"}
                    size={"sm"}
                    type={"text"}
                    value={inputs.username || authUser.username}
                    onChange={(e) =>
                        setInputs({ ...inputs, username: e.target.value })
                    }
                />
            </Field.Root>

            <Field.Root>
                <Field.Label fontSize={"sm"}>Bio</Field.Label>
                <Input
                    placeholder={"Bio"}
                    size={"sm"}
                    type={"text"}
                    value={inputs.bio || authUser.bio}
                    onChange={(e) =>
                        setInputs({ ...inputs, bio: e.target.value })
                    }
                />
            </Field.Root>
        </Stack>
    );
};

export default EditProfileForm;
