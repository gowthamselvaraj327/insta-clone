import { Alert, Button, Input } from "@chakra-ui/react";
import { PasswordInput } from "../ui/password-input";
import { useState } from "react";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";

const Signup = () => {
    const [inputs, setInputs] = useState({
        email: "",
        username: "",
        fullName: "",
        password: "",
    });
    const { loading, error, signup } = useSignUpWithEmailAndPassword();
    return (
        <>
            <Input
                placeholder='Email'
                fontSize={14}
                type='email'
                value={inputs.email}
                size={"sm"}
                onChange={(e) =>
                    setInputs({ ...inputs, email: e.target.value })
                }
            />
            <Input
                placeholder='Username'
                fontSize={14}
                type='text'
                value={inputs.username}
                size={"sm"}
                onChange={(e) =>
                    setInputs({ ...inputs, username: e.target.value })
                }
            />
            <Input
                placeholder='Full Name'
                fontSize={14}
                type='text'
                value={inputs.fullName}
                size={"sm"}
                onChange={(e) =>
                    setInputs({ ...inputs, fullName: e.target.value })
                }
            />
            <PasswordInput
                value={inputs.password}
                onChange={(e) =>
                    setInputs({ ...inputs, password: e.target.value })
                }
                placeholder='Password'
                size={"sm"}
            />
            {error && (
                <Alert.Root status='error'>
                    <Alert.Indicator />
                    <Alert.Title />
                    <Alert.Description>{error.message}</Alert.Description>
                </Alert.Root>
            )}
            <Button
                w={"full"}
                colorPalette={"blue"}
                size={"sm"}
                fontSize={14}
                loading={loading}
                onClick={() => signup(inputs)}
            >
                Sign Up
            </Button>
        </>
    );
};

export default Signup;
