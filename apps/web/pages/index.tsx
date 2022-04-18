import axios from "axios";

import { Box, Button, Container, Group, Title } from "@abuse-sleuth/ui";

import DefaultLayout from "@layouts/DefaultLayout";

export default function Home() {
    return (
        <DefaultLayout>
            <Container p={"xl"} my={"sm"}>
                <Group position="apart" grow mt={"xl"}>
                    <Group>
                        <Title>Better Cyber Ops with Modern Tooling</Title>
                    </Group>
                    <Group>
                        <Title>TODO</Title>
                        <Button
                            onClick={async () => {
                                await axios.get(
                                    process.env.NEXT_PUBLIC_API_BASE_URI
                                );
                            }}>
                            Test
                        </Button>
                    </Group>
                </Group>
            </Container>
        </DefaultLayout>
    );
}
