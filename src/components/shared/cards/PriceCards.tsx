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
    smallPriceText?: string;
    description: string;
    perks: string[];
}

const PriceCard: React.FC<PropsType> = (props) => {
    const perksList = props.perks.map((perk, index) => (
        <ListItem key={index}>{perk}</ListItem>
    ));

    return (
        <div style={{ width: "350px", height: "350px" }}>
            <Card shadow="sm" padding="xl">
                <Group position="center">
                    <Title align="center">{props.price}</Title>
                    <Text size="xs">{props.smallPriceText}</Text>
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
                <Button fullWidth>Subscribe</Button>
            </Card>
        </div>
    );
};

export default PriceCard;
