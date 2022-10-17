import { List, Stack, Text } from "@mantine/core";
import { IconCheck } from "@tabler/icons";
import React, { ReactNode } from "react";

import { Button, Icon } from "../../atoms";

type PricingCardProps = {
    title: string;
    description: string;
    pricing: number;
    currency: string;
    listItems?: ReactNode[];
    button?: ReactNode;
};

export const PricingCard: React.FC<PricingCardProps> = ({
    title,
    description,
    pricing,
    currency,
    listItems,
    button = <Button disabled>This Button does nothing</Button>,
}) => {
    return (
        <Stack spacing={"md"}>
            <Stack spacing={0}>
                <Text size="lg" weight={"bold"}>
                    {title}
                </Text>
                <Text color={"dimmed"}>{description}</Text>
            </Stack>
            <Stack spacing={0}>
                <Text size={32} weight={"bolder"} style={{ lineHeight: 1 }}>
                    {pricing === 0
                        ? "Free"
                        : (pricing / 100).toLocaleString("en-GB", {
                              style: "currency",
                              currency: currency ?? "GBP",
                          })}
                </Text>
                <Text color={"dimmed"}>
                    {pricing === 0 ? "Forever" : "Per Month"}
                </Text>
            </Stack>
            {button}
            <List
                withPadding
                icon={<Icon icon={<IconCheck />} color={"green"} />}>
                {listItems?.map((v, i) => (
                    <List.Item key={i}>{v}</List.Item>
                ))}
            </List>
        </Stack>
    );
};
