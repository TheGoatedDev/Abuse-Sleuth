import Link from "next/link";

import {
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
} from "@mantine/core";

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
        <div style={{ width: "350px" }}>
            <Card shadow="sm" p="xl" withBorder>
                <Title align="center">{props.name}</Title>
                <Group position="center">
                    <Title order={3} align="center">
                        {props.price == "$0.00" ? "" : props.price}
                    </Title>
                    {props.smallPriceText && (
                        <Text size="xs">{props.smallPriceText}</Text>
                    )}
                </Group>
                <Space h="sm" />
                <Divider />
                <Space h="sm" />
                <Text align="center">{props.description}</Text>
                <Divider labelPosition="center" label={"What this provides:"} />
                <Space h="sm" />
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
        </div>
    );
};

export default PriceCard;
