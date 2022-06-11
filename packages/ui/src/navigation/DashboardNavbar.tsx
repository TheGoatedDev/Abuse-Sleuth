import Link from "next/link";
import React from "react";

import { Group, Navbar, ScrollArea, Text, Divider } from "@mantine/core";

export type IDashboardNavbarProps = {
    mainZone: React.ReactNode;
    bottomZone: React.ReactNode;
};

export const DashboardNavbar: React.FC<IDashboardNavbarProps> = ({
    mainZone,
    bottomZone,
}) => {
    return (
        <Navbar width={{ base: 250 }} p="sm" fixed>
            <Navbar.Section>
                <Group position="center">
                    <Link href="/" passHref>
                        <Text
                            size="xl"
                            weight={"bolder"}
                            align="center"
                            component="a">
                            Abuse Sleuth
                        </Text>
                    </Link>
                </Group>
            </Navbar.Section>
            <Navbar.Section
                grow
                component={ScrollArea}
                sx={(theme) => ({
                    marginTop: theme.spacing.xs,
                })}>
                {mainZone}
            </Navbar.Section>
            <Divider label="Profile" labelPosition="center" size={"md"} />
            <Navbar.Section>{bottomZone}</Navbar.Section>
        </Navbar>
    );
};

export default DashboardNavbar;
