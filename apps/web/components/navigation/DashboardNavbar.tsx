import { useRouter } from "next/router";
import { FaFile, FaHandPaper, FaHome, FaSearch, FaUser } from "react-icons/fa";
import { FCC } from "types/types";

import {
    ActionIcon,
    Center,
    DefaultMantineColor,
    Navbar,
    Stack,
    Tooltip,
} from "@abuse-sleuth/ui";

const NavbarButton: FCC<{
    href: string;
    tooltip: string;
}> = (props) => {
    const router = useRouter();
    const isActive = router.pathname === props.href;

    return (
        <Tooltip
            label={props.tooltip}
            position="right"
            withArrow
            gutter={16}
            transition="slide-left">
            <ActionIcon
                size="xl"
                variant={!isActive ? "outline" : "filled"}
                color={"violet"}
                radius="xl"
                onClick={() => router.push(props.href)}>
                {props.children}
            </ActionIcon>
        </Tooltip>
    );
};

const DashboardNavbar: React.FC = () => {
    return (
        <Navbar width={{ base: 60 }}>
            <Navbar.Section mt="xs">
                <Center>
                    <img
                        src="/logo.svg"
                        width={"45px"}
                        alt="Abuse Sleuth Logo"
                    />
                </Center>
            </Navbar.Section>
            <Navbar.Section grow>
                <Stack
                    style={{
                        height: "100%",
                    }}
                    align={"center"}
                    justify="center">
                    <NavbarButton href="/dashboard" tooltip="Home">
                        <FaHome size={24} />
                    </NavbarButton>

                    <NavbarButton href="/scan" tooltip="Scanning">
                        <FaSearch size={24} />
                    </NavbarButton>

                    <NavbarButton href="/reports" tooltip="View Reports">
                        <FaFile size={24} />
                    </NavbarButton>
                </Stack>
            </Navbar.Section>
            <Navbar.Section mb="xs">
                <Stack align={"center"} justify="center">
                    <NavbarButton href="/user" tooltip="Account">
                        <FaUser size={24} />
                    </NavbarButton>
                </Stack>
            </Navbar.Section>
        </Navbar>
    );
};

export default DashboardNavbar;
