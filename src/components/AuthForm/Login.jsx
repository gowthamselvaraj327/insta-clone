import { Alert, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";

const Login = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });
    const { loading, error, login } = useLogin();
    return (
        <>
            <Input
                placeholder='Email'
                fontSize={14}
                type='email'
                value={inputs.email}
                onChange={(e) =>
                    setInputs({ ...inputs, email: e.target.value })
                }
                size={"sm"}
            />
            <Input
                placeholder='Password'
                fontSize={14}
                type='password'
                value={inputs.password}
                onChange={(e) =>
                    setInputs({ ...inputs, password: e.target.value })
                }
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
                onClick={() => login(inputs)}
                loading={loading}
            >
                Log in
            </Button>
        </>
    );
};

export default Login;
