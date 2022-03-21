import * as React from "react";

import { Alert, DefaultMantineColor } from "@mantine/core";

import { CustomMantineProvider } from ".";

type IComponentProps = {
    title: string;
    color: DefaultMantineColor;
    icon: React.ReactNode;
};

export const AlertBox: React.FC<IComponentProps> = ({
    children,
    title,
    color,
    icon,
}) => {
    return (
        <Alert title={title} color={color} mb="xs" icon={icon}>
            {children}
        </Alert>
    );
};
