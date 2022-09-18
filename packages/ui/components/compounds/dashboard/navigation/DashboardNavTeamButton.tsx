import {
    Group,
    MantineColor,
    Text,
    ThemeIcon,
    UnstyledButton,
    Menu,
    ActionIcon,
    Stack,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import {
    IconArrowRight,
    IconChevronRight,
    IconDots,
    IconEdit,
    IconLock,
    IconPlus,
    IconUsers,
} from "@tabler/icons";
import Link from "next/link";
import { forwardRef, useEffect } from "react";

import { Session } from "@abuse-sleuth/authentication";
import { useSession } from "@abuse-sleuth/authentication/nextjs/client";
import { Team } from "@abuse-sleuth/prisma";
import { trpcClient } from "@abuse-sleuth/trpc/nextjs/client";

const TeamButton = forwardRef<
    HTMLButtonElement,
    {
        teamData: Team[] | undefined;
        activeTeamId?: string;
    }
>(function Button({ teamData, activeTeamId, ...other }, ref) {
    return (
        <UnstyledButton
            ref={ref}
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
            })}
            {...other}>
            <Group position="apart">
                <Group>
                    <ThemeIcon size={"lg"} color={"cyan"} variant="light">
                        <IconUsers />
                    </ThemeIcon>
                    <Text size="sm">
                        {teamData
                            ? teamData.find((x) => x.id == activeTeamId)
                                  ?.teamName
                            : "Loading"}
                    </Text>
                </Group>
                <IconChevronRight size={18} stroke={2} />
            </Group>
        </UnstyledButton>
    );
});

type DashboardNavTeamButtonProps = {
    teamsWithPlan: { team: Team; planName: string }[];
    hrefGenerator: (id: string) => string;
    session: Session | null;
    setActiveTeam: (teamId: string) => void;
};

export const DashboardNavTeamButton: React.FC<DashboardNavTeamButtonProps> = (
    props
) => {
    return (
        <Menu position="right-end" width={200}>
            <Menu.Target>
                <TeamButton
                    teamData={props.teamsWithPlan.map((x) => x.team)}
                    activeTeamId={
                        props.session?.user?.activeTeamId ?? undefined
                    }
                />
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Teams</Menu.Label>
                {props.teamsWithPlan
                    ? props.teamsWithPlan.map((teamWithPlan, i) => (
                          <Menu.Item
                              onClick={() => {
                                  if (
                                      teamWithPlan.team.id !==
                                      props.session?.user?.activeTeamId
                                  ) {
                                      props.setActiveTeam(teamWithPlan.team.id);
                                  }
                              }}
                              key={i}
                              rightSection={
                                  <Link
                                      href={props.hrefGenerator(
                                          teamWithPlan.team.id
                                      )}
                                      passHref>
                                      <ActionIcon component="a" color={"dark"}>
                                          <IconDots size={"20px"} />
                                      </ActionIcon>
                                  </Link>
                              }>
                              <Group>
                                  {teamWithPlan.team.locked && (
                                      <IconLock size={"18px"} />
                                  )}
                                  <Stack spacing={0}>
                                      <Text lineClamp={1}>
                                          {teamWithPlan.team.teamName}
                                      </Text>
                                      <Text size="xs" color={"dimmed"}>
                                          Plan: {teamWithPlan.planName}
                                      </Text>
                                  </Stack>
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
