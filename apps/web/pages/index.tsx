import DefaultLayout from "@layouts/defaultLayout";
import { Box, Container, Group, Title } from "@mantine/core";

export default function Home() {
    return (
        <DefaultLayout>
            <Container padding={"xl"} my={"sm"}>
                <Group position="apart" grow mt={"xl"}>
                    <Group>
                        <Title>Better Cyber Ops with Modern Tooling</Title>
                    </Group>
                    <Group>
                        <Title>TODO</Title>
                    </Group>
                </Group>
            </Container>
        </DefaultLayout>
    );
}
