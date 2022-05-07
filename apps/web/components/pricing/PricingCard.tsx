import Link from "next/link";

import {
    Badge,
    Button,
    Card,
    Center,
    Divider,
    Group,
    List,
    ListItem,
    Space,
    Text,
    Title,
    useMantineTheme,
} from "@abuse-sleuth/ui";

interface PropsType {
    price: string;
    name: string;
    smallPriceText?: string;
    description: string;
    perks: string[];
}

const PriceCard: React.FC<PropsType> = (props) => {
    const perksList = props.perks.map((perk, index) => (
        <ListItem key={index}>{perk}</ListItem>
    ));

    return (
        <Card
            shadow="sm"
            p="xl"
            sx={(theme) => ({
                backgroundColor: theme.colors.dark[6],
                height: "300px",
                width: "350px",
                border: `2px solid ${
                    props.name === "Advanced" ? "gold" : "none"
                }`,
            })}>
            <Title align="center">{props.name}</Title>
            <Group position="center">
                <Title order={3} align="center">
                    {props.price == "$0.00" ? "" : props.price}
                </Title>
                {props.smallPriceText && (
                    <Text size="xs">{props.smallPriceText}</Text>
                )}
                {props.name === "Advanced" ? (
                    <Badge color={"yellow"}>Most Popular</Badge>
                ) : (
                    ""
                )}
            </Group>

            <Divider labelPosition="center" label={"What this provides:"} />
            <Center>
                <List>{perksList}</List>
            </Center>
            <Space h="sm" />
            <Link href={`/auth/signup`} passHref>
                <Button
                    component="a"
                    fullWidth
                    color={
                        props.price == "$0.00" && props.name == "Free"
                            ? "green"
                            : "blue"
                    }>
                    {props.price == "$0.00" && props.name == "Free"
                        ? "Sign up for Free"
                        : "Subscribe"}
                </Button>
            </Link>
        </Card>
    );
};

export default PriceCard;
