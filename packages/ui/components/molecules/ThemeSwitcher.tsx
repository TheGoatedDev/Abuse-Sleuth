import { AppShell } from "@mantine/core";
import { NextLink } from "@mantine/next";

import {
    signOut,
    useSession,
} from "@abuse-sleuth/authentication/nextjs/client";
import { trpcClient } from "@abuse-sleuth/trpc/nextjs/client";
import { ActionIcon, Group } from "@abuse-sleuth/ui/components/atoms";
import { DashboardNavTeamButton } from "@abuse-sleuth/ui/components/compounds";
import { useMantineColorScheme } from "@abuse-sleuth/ui/hooks";
import { IconSun, IconMoonStars } from "@abuse-sleuth/ui/icons";

export const ThemeSwitcher: React.FC = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    return (
        <Group
            position="center"
            sx={(theme) => ({
                position: "absolute",
                right: 20,
                bottom: 20,
            })}>
            <ActionIcon
                onClick={() => toggleColorScheme()}
                size="lg"
                sx={(theme) => ({
                    backgroundColor:
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[6]
                            : theme.colors.gray[0],
                    color:
                        theme.colorScheme === "dark"
                            ? theme.colors.yellow[4]
                            : theme.colors.blue[6],
                    "&:hover": {
                        backgroundColor:
                            theme.colorScheme === "dark"
                                ? theme.colors.dark[5]
                                : theme.colors.gray[4],
                    },
                })}>
                {colorScheme === "dark" ? (
                    <IconSun size={18} />
                ) : (
                    <IconMoonStars size={18} />
                )}
            </ActionIcon>
        </Group>
    );
};
