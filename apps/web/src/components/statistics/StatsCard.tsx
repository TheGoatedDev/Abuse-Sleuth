import {
    Paper,
    Group,
    RingProgress,
    Center,
    DefaultMantineColor,
    Text,
} from "@abuse-sleuth/ui";

interface Stat {
    label: string;
    stats: number;
    statsMax?: number;
    centerIcon?: JSX.Element;
}

const StatsCard: React.FC<Stat> = (props) => {
    const progress = (props.stats / (props.statsMax ?? 100)) * 100;

    return (
        <Paper withBorder radius="md" p="xs" shadow={"md"} key={props.label}>
            <Group>
                {props.statsMax ? (
                    <RingProgress
                        size={80}
                        roundCaps
                        thickness={8}
                        sections={[
                            {
                                value: progress,
                                color:
                                    progress <= 25
                                        ? "green"
                                        : progress <= 75
                                        ? "orange"
                                        : "red",
                            },
                        ]}
                        label={<Center>{props.centerIcon}</Center>}
                    />
                ) : (
                    <Center mx="md">{props.centerIcon}</Center>
                )}

                <div>
                    <Text
                        color="dimmed"
                        size="xs"
                        transform="uppercase"
                        weight={700}>
                        {props.label}
                    </Text>
                    <Text weight={700} size="xl">
                        {props.stats.toLocaleString()}{" "}
                        {props.statsMax && (
                            <>/ {props.statsMax.toLocaleString()}</>
                        )}
                    </Text>
                </div>
            </Group>
        </Paper>
    );
};

export default StatsCard;
