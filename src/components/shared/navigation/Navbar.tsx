import { faSearchengin } from "@fortawesome/free-brands-svg-icons";
import { faBug, faFile } from "@fortawesome/free-solid-svg-icons";
import { Center, Divider, Group, Navbar, Skeleton, Text } from "@mantine/core";
import NavbarButton from "@components/shared/buttons/NavbarButton";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "@services/firebase";

const CustomNavbar: React.FC = () => {
    const [user, _loading, _error] = useAuthState(firebaseAuth);

    return (
        <Navbar fixed padding={"md"} width={{ base: 300 }}>
            <Navbar.Section>
                <Center>
                    <img
                        src={"/IPSentinel_Logo.svg"}
                        alt={"IP Sentinel Logo"}
                        width={"30%"}
                    />
                </Center>
            </Navbar.Section>
            <Divider my="md" />
            <Navbar.Section grow>
                <NavbarButton
                    icon={faSearchengin}
                    color={"blue"}
                    href="/dashboard/scan"
                >
                    Check IP
                </NavbarButton>
                <NavbarButton
                    icon={faSearchengin}
                    color={"green"}
                    href="/dashboard/scanlog"
                >
                    Scan Logs
                </NavbarButton>
                <NavbarButton
                    icon={faFile}
                    color={"orange"}
                    href="/dashboard/reports"
                >
                    View Reports
                </NavbarButton>
            </Navbar.Section>
            <Navbar.Section>
                <NavbarButton
                    icon={faBug}
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
