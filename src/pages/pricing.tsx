import LayoutStandard from "@components/layouts/LayoutStandard";
import PriceCard from "@components/shared/cards/PriceCards";
import { Group, Space, Title } from "@mantine/core";
import type { NextPage } from "next";

const Pricing: NextPage = () => {
    return (
        <LayoutStandard>
            <Title align="center">Pricing Plans</Title>
            <Space h="lg" />
            <Group position="center" spacing={"md"}>
                <PriceCard
                    price="Free"
                    description="Our forever Free Plan, where you have just enough to get started."
                    perks={[
                        "1000 IP Scans/day",
                        "4 Reports/month",
                        "Each Report retained for 1 week",
                        "No Exporting",
                    ]}
                />
                <PriceCard
                    price="$10.00"
                    smallPriceText="/month"
                    description="Our Basic Plan, Will be able to provide for all your basic scanning needs."
                    perks={[
                        "10000 IP Scans/day",
                        "8 Reports/month",
                        "Each Report retained for 2 weeks",
                        "Exporting Reports to CSV",
                    ]}
                />
                <PriceCard
                    price="$25.00"
                    smallPriceText="/month"
                    description="Our Advanced Plan, this will contain what you need for advanced analyst needs."
                    perks={[
                        "25000 IP Scans/day",
                        "12 Reports/month",
                        "Each Report retained for 4 weeks",
                        "Exporting Reports to CSV",
                    ]}
                />
                <PriceCard
                    price="$50.00"
                    smallPriceText="/month"
                    description="Our Elite Plan, provides everything for your business or personal network."
                    perks={[
                        "50000 IP Scans/day",
                        "16 Reports/month",
                        "Each Report retained for 8 weeks",
                        "Exporting Reports to CSV",
                    ]}
                />
                <PriceCard
                    price="Flexi"
                    description="Our Pay-as-you-go Plan, don't let those restrictions get you down!"
                    perks={[
                        "$0.0001 per IP Scan",
                        "$0.01 per Report ",
                        "Each Report retained for 12 weeks",
                        "Exporting Reports to CSV",
                    ]}
                />
            </Group>
        </LayoutStandard>
    );
};

export default Pricing;
