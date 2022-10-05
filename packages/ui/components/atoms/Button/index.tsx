import { Button as MantineButton, ButtonProps } from "@mantine/core";
import { PolymorphicComponentProps } from "@mantine/utils";
import { ElementType } from "react";

import { FCC } from "../../../types";

export const Button: FCC<
    | PolymorphicComponentProps<"button", ButtonProps>
    | (ButtonProps & {
          component?: ElementType<any> | any;
      })
> = (props) => {
    return (
        <MantineButton variant={props.variant ?? "light"} {...props}>
            {props.children}
        </MantineButton>
    );
};
