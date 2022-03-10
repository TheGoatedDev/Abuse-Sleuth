import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React from "react";
import ReactCountryFlag from "react-country-flag";

import { Group, Text } from "@mantine/core";

type IComponentProps = {
    countryCode: string;
    isPrivateAddress: boolean;
};

export const CountryFlagText: React.FC<IComponentProps> = ({
    countryCode,
    isPrivateAddress,
}) => {
    const router = useRouter();

    return (
        <>
            {isPrivateAddress ? (
                <Group spacing={5}>
                    <FontAwesomeIcon icon={["fas", "lock"]} />
                    <Text size="xs" color="red">
                        Private
                    </Text>
                </Group>
            ) : (
                <>
                    {countryCode !== "Unknown" && (
                        <ReactCountryFlag countryCode={countryCode} />
                    )}{" "}
                    {countryCode}
                </>
            )}
        </>
    );
};
