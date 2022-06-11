import React from "react";

import { Card, Group, MantineColor, Text, Title } from "@mantine/core";

export type IStatsCardProps = {
    title: string;
    stat: React.ReactNode;
    icon: React.ReactNode;
    color: MantineColor;
};

export const StatsCard: React.FC<IStatsCardProps> = ({
    title,
    stat,
    icon,
    color,
}) => {
    return (
        <Card
            shadow={"md"}
            withBorder
            sx={(theme) => ({
                borderWidth: "2px",
                borderColor: theme.colors.dark[7],
            })}>
            <Group spacing={"xs"} direction="column">
                <Group>
                    {icon}
                    <Title order={5}>{title}:</Title>
                </Group>
                <Text color={color} weight="bold">
                    {stat}
                </Text>
            </Group>
        </Card>
    );
};
