import {
    Global,
    MantineProvider as Provider,
    MantineProviderProps,
} from "@mantine/core";

export const MantineProvider = (props: MantineProviderProps) => {
    return (
        <Provider
            withNormalizeCSS
            theme={{
                colorScheme: "dark",
                white: "#FFF",
            }}>
            {props.children}
        </Provider>
    );
};

export const GlobalStyling = () => {
    return (
        <Global
            styles={(theme) => {
                return {
                    "*": {
                        boxSizing: "border-box",
                    },
                    html: {
                        overflowX: "hidden",
                    },
                    body: {
                        backgroundColor: theme.colors.dark[7],
                        color: "#FFF",
                    },
                };
            }}
        />
    );
};
