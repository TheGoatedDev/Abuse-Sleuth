import type { NextPage } from "next";

import {
    Button,
    Group,
    SimpleGrid,
    Stack,
    Text,
    Title,
    Card,
    Center,
    Divider,
    List,
    Grid,
} from "@abuse-sleuth/ui/components/atoms";
import { useMantineTheme, useMediaQuery } from "@abuse-sleuth/ui/hooks";
import { IconCheck } from "@abuse-sleuth/ui/icons";

import Navbar from "@components/main/features/Navbar";
import { AltLayout, Layout } from "@components/main/layouts";

const Pricing: NextPage = () => {
    const theme = useMantineTheme();

    return (
        <AltLayout>
            <Navbar />
            <Center>
                <Stack align={"center"}>
                    <Title>Pricing</Title>
                    <Text>
                        All Pricing plans used for each team you create.
                    </Text>
                    <Grid mx={"sm"} grow justify={"center"}>
                        {[
                            "Starter",
                            "Small Team",
                            "Large Team",
                            "Enterprise",
                        ].map((v) => (
                            <Grid.Col key={v} md={3} sm={4} xs={6}>
                                <Card px="lg" py={"xs"} withBorder>
                                    <Stack>
                                        <Text
                                            align="center"
                                            size={24}
                                            weight="bold"
                                            color="violet">
                                            {v}
                                        </Text>
                                        <Title align="center" order={1}>
                                            Free
                                        </Title>
                                        <Button color={"violet"}>
                                            Get started
                                        </Button>
                                    </Stack>

                                    <Card.Section my="sm">
                                        <Divider />
                                    </Card.Section>

                                    <Group>
                                        <List icon={<IconCheck />}>
                                            <List.Item>
                                                1 User on Team
                                            </List.Item>
                                            <List.Item>
                                                8 Reports on Team
                                            </List.Item>
                                            <List.Item>
                                                1 Week Retention on Reports
                                            </List.Item>
                                        </List>
                                    </Group>
                                </Card>
                            </Grid.Col>
                        ))}
                    </Grid>
                </Stack>
            </Center>
        </AltLayout>
    );
};

export default Pricing;
