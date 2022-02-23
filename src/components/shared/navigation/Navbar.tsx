import {
    Box,
    Center,
    Divider,
    Group,
    Navbar,
    Skeleton,
    Text,
} from "@mantine/core";
import NavbarButton from "@components/shared/buttons/NavbarButton";
import Link from "next/link";
import { useAuth } from "@contexts/AuthProvider";
import Gravatar from "react-gravatar";

const CustomNavbar: React.FC = () => {
    const { user } = useAuth();

    return (
        <Navbar fixed padding={"md"} width={{ base: 300 }}>
            <Navbar.Section>
                <Center>
                    <Link href="/" passHref>
                        <img
                            src={"/IPSentinel_Logo.svg"}
                            alt={"IP Sentinel Logo"}
                            width={"30%"}
                        />
                    </Link>
                </Center>
            </Navbar.Section>
            <Divider my="md" />
            <Navbar.Section grow>
                <NavbarButton
                    icon={"search"}
                    color={"blue"}
                    href="/dashboard/scan"
                >
                    Check IP
                </NavbarButton>
                <NavbarButton
                    icon={"file-upload"}
                    color={"green"}
                    href="/dashboard/scanlog"
                >
                    Scan Logs
                </NavbarButton>
                <NavbarButton
                    icon={"file"}
                    color={"orange"}
                    href="/dashboard/reports"
                >
                    View Reports
                </NavbarButton>
            </Navbar.Section>
            <Navbar.Section>
                <NavbarButton
                    icon={"bug"}
                    color={"red"}
                    href="/dashboard/developer"
                >
                    Dev Menu
                </NavbarButton>
            </Navbar.Section>
            <Divider mb="sm" />
            <Navbar.Section>
                <Group>
                    <Box>
                        <Gravatar
                            height={48}
                            email={user?.email ?? ""}
                            style={{ borderRadius: "50%" }}
                        />
                    </Box>
                    <Box>
                        {user ? (
                            <Text size="sm">{user?.email}</Text>
                        ) : (
                            <Skeleton />
                        )}
                        <Text size="xs">Plan: TODO</Text>
                    </Box>
                </Group>
            </Navbar.Section>
        </Navbar>
    );
};

export default CustomNavbar;
