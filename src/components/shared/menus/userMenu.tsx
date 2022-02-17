import { SignOutIcon, UserIcon } from "@icons";
import { Button, Divider, Menu, Text, ThemeIcon } from "@mantine/core";
import { sendAPIAuthSignOut } from "@services/api";
import { useRouter } from "next/router";

const UserMenu: React.FC = () => {
    const router = useRouter();

    return (
        <Menu
            control={
                <Button
                    radius={"xl"}
                    variant="subtle"
                    style={{
                        padding: "0px",
                    }}
                >
                    <ThemeIcon size={"lg"} radius={"xl"} color={"cyan"}>
                        <UserIcon size="lg" />
                    </ThemeIcon>
                </Button>
            }
        >
            <Menu.Label>User Menu</Menu.Label>
            <Menu.Item onClick={() => router.push("profile")}>
                View Profile
            </Menu.Item>
            <Divider />
            <Menu.Label>User Interactions</Menu.Label>
            <Menu.Item
                icon={<SignOutIcon />}
                onClick={() => {
                    sendAPIAuthSignOut();
                    router.reload();
                }}
            >
                <Text color="red">Logout</Text>
            </Menu.Item>
        </Menu>
    );
};

export default UserMenu;
