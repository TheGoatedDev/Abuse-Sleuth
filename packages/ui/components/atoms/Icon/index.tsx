import { MantineColor, useMantineTheme } from "@mantine/core";
import { TablerIconProps } from "@tabler/icons";
import React from "react";
import { FCC } from "../../../types";

type IconProps = Omit<TablerIconProps, "color"> & { icon: any, color: MantineColor }

export const Icon: FCC<IconProps> = ({ color, icon, ...others }) => {
    const theme = useMantineTheme()

    const clone = React.cloneElement(
        icon,
        { color: theme.colors[color][7], ...others }
    )
    return (
        <>
            {clone}
        </>
    )
}
