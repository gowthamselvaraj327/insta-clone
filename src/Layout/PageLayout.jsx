import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import Navbar from "../components/Navbar/Navbar";

const PageLayout = ({ children }) => {
    const { pathname } = useLocation();
    const [user, loading] = useAuthState(auth);
    const canRenderSidebar = pathname !== "/auth" && user;
    const canRenderNavbar = !user && !loading && pathname !== "/auth";
    const checkingUserIsAuth = !user && loading;
    if (checkingUserIsAuth) return <PageLayoutSpinner />;

    return (
        <Flex direction={canRenderNavbar ? "column" : "row"}>
            {/* Sidebar on left side */}
            {canRenderSidebar && (
                <Box w={{ base: "70px", md: "240px" }}>
                    <Sidebar />
                </Box>
            )}
            {/* Navbar */}
            {canRenderNavbar && <Navbar />}
            {/* Page Content on Right side */}
            <Box
                flex={1}
                w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }}
                mx={"auto"}
            >
                {children}
            </Box>
        </Flex>
    );
};

export default PageLayout;

const PageLayoutSpinner = () => {
    return (
        <Flex
            flexDir='column'
            h='100vh'
            alignItems='center'
            justifyContent='center'
        >
            <Spinner size='xl' />
        </Flex>
    );
};
