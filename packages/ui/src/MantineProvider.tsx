import React from "react";

import {
    MantineProvider as MantineLibProvider,
    MantineProviderProps,
} from "@mantine/core";

export type IProviderProps = MantineProviderProps & {
    children: React.ReactNode;
};

export const MantineProvider: React.FC<IProviderProps> = ({
    children,
    ...props
}) => {
    return (
        <MantineLibProvider
            theme={{
                colorScheme: "dark",
            }}
            {...props}>
            {children}
        </MantineLibProvider>
    );
};
