import {
    Box,
    Center,
    Group,
    MantineColor,
    Paper,
    RingProgress,
    Text,
} from "@mantine/core";
import {
    IconArrowDownRight,
    IconArrowUpRight,
    IconEqual,
    TablerIcon,
} from "@tabler/icons";
import { abbreviateNumber } from "js-abbreviation-number";
import React, { useEffect, useState } from "react";

type Progress = {
    max: number;
    current: number;
};

type Icons = "up" | "down" | "unchanged";

interface IStatsCard {
    label: string;
    progress: Progress | number;
    withAbbreviation?: boolean;
    color: MantineColor;
    icon: Icons;
}

const icons: Record<Icons, TablerIcon> = {
    up: IconArrowUpRight,
    down: IconArrowDownRight,
    unchanged: IconEqual,
};

export const StatsCard: React.FC<IStatsCard> = (props) => {
    const [value, setValue] = useState<number>(0);
    const [stat, setStat] = useState<string>("0%");

    const Icon = icons[props.icon];

    useEffect(() => {
        setValue(
            typeof props.progress == "number"
                ? props.progress
                : (props.progress.current / props.progress.max) * 100
        );

        setStat(
            typeof props.progress == "number"
                ? `${props.progress}%`
                : props.withAbbreviation
                ? `${abbreviateNumber(
                      props.progress.current
                  )}/${abbreviateNumber(props.progress.max)}`
                : `${props.progress.current}/${props.progress.max}`
        );
    }, [props.progress, props.icon]);

    return (
        <Paper withBorder p={"xs"}>
            <Group>
                <Center>
                    <RingProgress
                        size={80}
                        roundCaps
                        thickness={8}
                        sections={[{ value, color: props.color }]}
                        label={
                            <Center>
                                <Icon size={22} stroke={2.5} />
                            </Center>
                        }
                    />
                </Center>
                <Box>
                    <Text
                        color="dimmed"
                        size="xs"
                        transform="uppercase"
                        weight={"bold"}>
                        {props.label}
                    </Text>
                    <Text weight={"bold"} size="xl">
                        {stat}
                    </Text>
                </Box>
            </Group>
        </Paper>
    );
};
