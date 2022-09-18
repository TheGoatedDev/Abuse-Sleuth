import {
    ActionIcon,
    Group,
    Menu,
    Stack,
    Text,
    ThemeIcon,
    UnstyledButton,
} from "@mantine/core";
import {
    IconChevronRight,
    IconDots,
    IconList,
    IconLock,
    IconPlus,
    IconUsers,
} from "@tabler/icons";
import Link from "next/link";
import { forwardRef } from "react";

import { Session } from "@abuse-sleuth/authentication";
import { Team } from "@abuse-sleuth/prisma";

const TeamButton = forwardRef<
    HTMLButtonElement,
    {
        teamData?: Team;
    }
>(function Button({ teamData, ...other }, ref) {
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
                    <Text size="sm">{teamData ? teamData.teamName : ""}</Text>
                </Group>
                <IconChevronRight size={18} stroke={2} />
            </Group>
        </UnstyledButton>
    );
});

type DashboardNavTeamButtonProps = {
    teamsWithPlan: { team: Team; planName: string }[];
    hrefGenerator: (id: string) => string;
    teamCreatehref: string;
    teamViewAllhref: string;
    session: Session | null;
    setActiveTeam: (teamId: string) => void;
    activeTeam?: Team;
};

// TODO: Simplify This (Move the hrefs away from here)

export const DashboardNavTeamButton: React.FC<DashboardNavTeamButtonProps> = (
    props
) => {
    return (
        <Menu position="right-end" width={200}>
            <Menu.Target>
                <TeamButton teamData={props.activeTeam} />
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Teams</Menu.Label>
                {props.teamsWithPlan
                    ? props.teamsWithPlan.map((teamWithPlan, i) => (
                          <Menu.Item
                              onClick={() => {
                                  props.setActiveTeam(teamWithPlan.team.id);
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
                <Link href={props.teamViewAllhref} passHref>
                    <Menu.Item component="a" icon={<IconList />}>
                        View All Teams
                    </Menu.Item>
                </Link>
                <Link href={props.teamCreatehref} passHref>
                    <Menu.Item component="a" icon={<IconPlus />}>
                        Create Team
                    </Menu.Item>
                </Link>
            </Menu.Dropdown>
        </Menu>
    );
};
