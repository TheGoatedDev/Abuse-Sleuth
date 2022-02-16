import { Center, Divider, Group, Navbar, Skeleton, Text } from "@mantine/core";
import NavbarButton from "@components/shared/buttons/NavbarButton";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "@services/firebase";
import Link from "next/link";

const CustomNavbar: React.FC = () => {
    const [user, _loading, _error] = useAuthState(firebaseAuth);

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
                    icon={"search"}
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
                    <div>
                        <Skeleton circle height={52} />
                    </div>
                    <div>
                        {user ? (
                            <Text size="sm">{user?.email}</Text>
                        ) : (
                            <Skeleton />
                        )}
                        <Text size="xs">Plan: TODO</Text>
                    </div>
                </Group>
            </Navbar.Section>
        </Navbar>
    );
};

export default CustomNavbar;
