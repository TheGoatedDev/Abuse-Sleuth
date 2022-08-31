import { Text as MantineText, TextProps } from "@mantine/core";

export const Text = (props: TextProps) => {
    return <MantineText {...props}>{props.children}</MantineText>;
};
