import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ReactCountryFlag from "react-country-flag";

import { Box, Group, Text } from "@abuse-sleuth/ui";

type IComponentProps = {
    countryCode: string;
    isPrivateAddress: boolean;
};

export const CountryFlagText: React.FC<IComponentProps> = ({
    countryCode,
    isPrivateAddress,
}) => {
    return (
        <Box
            sx={(theme) => ({
                display: "flex",
                alignItems: "center",
            })}>
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
                        <>
                            <ReactCountryFlag countryCode={countryCode} svg />
                            &nbsp;
                        </>
                    )}

                    {countryCode}
                </>
            )}
        </Box>
    );
};
