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
    progress: number;
    stats: number;
    centerIcon?: JSX.Element;
}

const StatsCard: React.FC<Stat> = (props) => {
    return (
        <Paper withBorder radius="md" p="xs" shadow={"md"} key={props.label}>
            <Group>
                <RingProgress
                    size={80}
                    roundCaps
                    thickness={8}
                    sections={[
                        {
                            value: props.progress,
                            color:
                                props.progress <= 25
                                    ? "green"
                                    : props.progress <= 75
                                    ? "orange"
                                    : "red",
                        },
                    ]}
                    label={<Center>{props.centerIcon}</Center>}
                />

                <div>
                    <Text
                        color="dimmed"
                        size="xs"
                        transform="uppercase"
                        weight={700}>
                        {props.label}
                    </Text>
                    <Text weight={700} size="xl">
                        {props.stats.toLocaleString()}
                    </Text>
                </div>
            </Group>
        </Paper>
    );
};

export default StatsCard;
