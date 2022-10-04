import {
    ActionIcon,
    Group,
    Menu,
    Text,
    ThemeIcon,
    UnstyledButton,
} from "@mantine/core";
import {
    IconChevronRight,
    IconDots,
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
    teams: Team[];
    hrefGenerator: (id: string) => string;
    teamCreateOnClick: () => void;
    session: Session | null;
    setActiveTeam: (teamId: string) => void;
    activeTeam?: Team;
};

// TODO: Simplify This (Move the hrefs away from here)

export const DashboardNavTeamButton: React.FC<DashboardNavTeamButtonProps> = (
    props
) => {
    return (
        <Menu position="right-end" width={250}>
            <Menu.Target>
                <TeamButton teamData={props.activeTeam} />
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Teams</Menu.Label>
                {props.teams
                    ? props.teams.map((team, i) => (
                          <Menu.Item
                              onClick={() => {
                                  props.setActiveTeam(team.id);
                              }}
                              key={i}
                              rightSection={
                                  <Link
                                      href={props.hrefGenerator(team.id)}
                                      passHref>
                                      <ActionIcon component="a" color={"dark"}>
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
                <Menu.Item
                    onClick={props.teamCreateOnClick}
                    icon={<IconPlus />}>
                    Create Team
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};
