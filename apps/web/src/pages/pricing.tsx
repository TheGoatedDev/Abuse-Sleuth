import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";

import {
    Button,
    Group,
    Title,
    Text,
    useMantineTheme,
    MediaQuery,
    SimpleGrid,
    Paper,
} from "@abuse-sleuth/ui";

import StyledLayout from "@components/layouts/StyledLayout";
import StyledHeader from "@components/navigation/StyledHeader";
import PricingTable from "@components/tables/PricingTable";

export default function Pricing() {
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);

    return (
        <StyledLayout>
            <StyledHeader />

            <Group
                position="center"
                sx={(theme) => ({
                    height: "100vh",
                })}>
                <Paper
                    shadow={"lg"}
                    px={"xs"}
                    sx={(theme) => ({
                        backgroundColor:
                            theme.colorScheme === "dark"
                                ? theme.colors.dark[6]
                                : "",
                    })}>
                    <PricingTable
                        plans={[
                            {
                                planName: "Free",
                                price: "Free",

                                dailyIPScans: 1000,
                                dailyDomainScans: 200,

                                reportLimit: 4,
                                reportRetentionWeeks: 1,

                                canExport: false,
                            },
                            {
                                planName: "Basic",
                                price: 5.0,

                                dailyIPScans: 5000,
                                dailyDomainScans: 400,

                                reportLimit: 6,
                                reportRetentionWeeks: 2,

                                canExport: true,
                            },
                            {
                                planName: "Advanced",
                                price: 25.0,

                                dailyIPScans: 10000,
                                dailyDomainScans: 600,

                                reportLimit: 8,
                                reportRetentionWeeks: 4,

                                canExport: true,
                            },
                            {
                                planName: "PAYG",
                                price: "Vary",

                                dailyIPScans: "Pay-as-you-go",
                                dailyDomainScans: "Pay-as-you-go",

                                reportLimit: "Unlimited",
                                reportRetentionWeeks: 12,

                                canExport: true,
                            },
                        ]}
                    />
                </Paper>
            </Group>
        </StyledLayout>
    );
}
