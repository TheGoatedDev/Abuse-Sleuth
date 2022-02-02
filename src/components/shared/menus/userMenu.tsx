import { faBars, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Divider, Menu, Text } from "@mantine/core";
import { supabaseClient } from "@services/supabase/supabaseClient";
import { useRouter } from "next/router";

const UserMenu: React.FC = () => {
    const router = useRouter();

    return (
        <Menu
            control={
                <Button variant="subtle" compact>
                    <FontAwesomeIcon size="lg" icon={faBars} />
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
                icon={<FontAwesomeIcon icon={faSignOutAlt} />}
                onClick={() => {
                    supabaseClient.auth.signOut();
                    router.reload();
                }}
            >
                <Text color="red">Logout</Text>
            </Menu.Item>
        </Menu>
    );
};

export default UserMenu;
