import Link from "next/link";
import { useRouter } from "next/router";

import {
    IconDashboard,
    IconFileDescription,
    IconFilePlus,
    IconSearch,
    IconUser,
} from "@abuse-sleuth/ui/icons";
import {
    ActionIcon,
    Center,
    Group,
    Navbar,
    Stack,
    ThemeIcon,
    Tooltip,
    UnstyledButton,
    Text,
    MantineColor,
    Divider,
    NavLink,
} from "@abuse-sleuth/ui/mantine";

const NavbarButton: React.FC<{
    href: string;
    color: MantineColor;
    label: string;
    icon: JSX.Element;
}> = (props) => {
    const router = useRouter();
    const isActive = router.pathname === props.href;

    return (
        <Link href={props.href} passHref>
            <UnstyledButton
                mt={4}
                component="a"
                sx={(theme) => ({
                    display: "block",
                    width: "100%",
                    padding: theme.spacing.xs,
                    borderRadius: theme.radius.sm,
                    backgroundColor: isActive
                        ? theme.colorScheme === "dark"
                            ? theme.colors.dark[6]
                            : theme.colors.gray[0]
                        : "transparent",
                    color:
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[0]
                            : theme.black,

                    "&:hover": {
                        backgroundColor:
                            theme.colorScheme === "dark"
                                ? theme.colors.dark[6]
                                : theme.colors.gray[0],
                    },
                })}>
                <Group>
                    <ThemeIcon size={"lg"} color={props.color} variant="light">
                        {props.icon}
                    </ThemeIcon>
                    <Text size="sm">{props.label}</Text>
                </Group>
            </UnstyledButton>
        </Link>
    );
};

const DashboardNavbar: React.FC = () => {
    return (
        <Navbar width={{ base: 200 }} p="sm">
            <Navbar.Section mt="xs">
                <Center>
                    <Link href={"/"}>
                        <img
                            src="/logo.svg"
                            width={"45px"}
                            alt="Abuse Sleuth Logo"
                        />
                    </Link>
                </Center>
            </Navbar.Section>
            <Navbar.Section grow mt="md">
                <NavbarButton
                    href="/dashboard"
                    label="Home"
                    color={"blue"}
                    icon={<IconDashboard />}
                />

                <NavbarButton
                    href="/report/new"
                    label="New Report"
                    color={"green"}
                    icon={<IconFilePlus />}
                />

                <NavbarButton
                    href="/report/view"
                    label="View Reports"
                    color={"violet"}
                    icon={<IconFileDescription />}
                />
            </Navbar.Section>

            <Navbar.Section mb="xs">
                <Stack align={"center"} justify="center">
                    <NavbarButton
                        href="/account"
                        label="View Account"
                        color={"blue"}
                        icon={<IconUser />}
                    />
                </Stack>
            </Navbar.Section>
        </Navbar>
    );
};

export default DashboardNavbar;
