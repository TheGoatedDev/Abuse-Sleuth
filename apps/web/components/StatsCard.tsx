import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import { Card, Group, MantineColor, Text, Title } from "@mantine/core";

type IComponentProps = {
    title: string;
    stat: string;
    icon: IconProp;
    color: MantineColor;
};

const StatsCard: React.FC<IComponentProps> = ({ title, stat, icon, color }) => {
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
                    <FontAwesomeIcon icon={icon} size="lg" />
                    <Title order={5}>{title}:</Title>
                </Group>
                <Text color={color} weight="bold">
                    {stat}
                </Text>
            </Group>
        </Card>
    );
};

export default StatsCard;
