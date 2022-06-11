import React from "react";
import ReactCountryFlag from "react-country-flag";

import { Box, Group, Text } from "@mantine/core";

type IComponentProps = {
    countryCode: string;
};

export const CountryFlagText: React.FC<IComponentProps> = ({ countryCode }) => {
    return (
        <Box
            sx={(theme) => ({
                display: "flex",
                alignItems: "center",
            })}>
            {countryCode.length == 2 ? (
                <>
                    <ReactCountryFlag countryCode={countryCode} svg />
                    &nbsp;
                </>
            ) : (
                ""
            )}

            {countryCode}
        </Box>
    );
};
