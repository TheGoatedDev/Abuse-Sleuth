import Link from "next/link";

import { Anchor, Box, Container, Group, Loader, Title } from "@abuse-sleuth/ui";

import DefaultLayout from "@layouts/DefaultLayout";

export default function Home() {
    return (
        <Group
            sx={(theme) => ({
                height: "100vh",
                justifyContent: "center",
            })}
            direction="column"
            align="center">
            <Title>Page Not Found</Title>
            <Link href={"/"} passHref>
                <Anchor>Go to Home</Anchor>
            </Link>
        </Group>
    );
}
