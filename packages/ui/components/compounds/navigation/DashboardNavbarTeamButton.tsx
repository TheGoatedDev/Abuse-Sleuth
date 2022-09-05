import {
    Group,
    MantineColor,
    Text,
    ThemeIcon,
    UnstyledButton,
    Menu,
    ActionIcon,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import {
    IconArrowRight,
    IconDots,
    IconEdit,
    IconLock,
    IconPlus,
    IconUsers,
} from "@tabler/icons";
import Link from "next/link";
import { useEffect } from "react";

import { useSession } from "@abuse-sleuth/authentication/nextjs/client";
import { Team } from "@abuse-sleuth/prisma";
import { trpcClient } from "@abuse-sleuth/trpc/nextjs/client";

const Button: React.FC<{ teamData: Team[] | null; activeTeamId?: string }> = (
    props
) => {
    return (
        <UnstyledButton
            sx={(theme) => ({
                display: "block",
                width: "100%",
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,

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
            <Group position="apart">
                <Group>
                    <ThemeIcon size={"lg"} color={"cyan"} variant="light">
                        <IconUsers />
                    </ThemeIcon>
                    <Text size="sm">
                        {props.teamData
                            ? props.teamData.find(
                                  (x) => x.id == props.activeTeamId
                              )?.teamName
                            : "Loading"}
                    </Text>
                </Group>
                <IconArrowRight />
            </Group>
        </UnstyledButton>
    );
};

export const DashboardNavbarTeamButton: React.FC = (props) => {
    const { data: session } = useSession();
    const teamGetSelf = trpcClient.teams.getSelf.useQuery();
    const userSetActiveTeam = trpcClient.users.setActiveTeam.useMutation();

    return (
        <Menu position="right" width={200}>
            <Menu.Target>
                <Button
                    data={teamGetSelf.data ?? null}
                    activeTeamId={session?.user?.activeTeamId ?? undefined}
                />
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Teams</Menu.Label>
                {teamGetSelf.data
                    ? teamGetSelf.data.map((team, i) => (
                          <Menu.Item
                              onClick={() => {
                                  userSetActiveTeam.mutate({ teamId: team.id });
                              }}
                              key={i}
                              rightSection={
                                  <Link href={`/team/${team.id}`} passHref>
                                      <ActionIcon component="a">
                                          <IconDots size={"20px"} />
                                      </ActionIcon>
                                  </Link>
                              }>
                              <Group>
                                  {team.locked && <IconLock size={"18px"} />}
                                  <Text lineClamp={1}>{team.teamName}</Text>
                              </Group>
                          </Menu.Item>
                      ))
                    : "Loading"}
                <Menu.Divider />
                <Menu.Label>Actions</Menu.Label>
                <Link href={"/team/create"} passHref>
                    <Menu.Item component="a" icon={<IconPlus />}>
                        Create Team
                    </Menu.Item>
                </Link>
            </Menu.Dropdown>
        </Menu>
    );
};
