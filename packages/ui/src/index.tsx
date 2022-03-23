import * as React from "react";

import { AlertBox as importAlertBox } from "./AlertBox";
import { CountryFlagText as importCountryFlagText } from "./CountryFlagText";
import { MantineProvider, IProviderProps } from "./MantineProvider";
import { NavLink as importNavLink } from "./NavLink";
import { StatsCard as importStatsCard } from "./StatsCard";
import { NavbarButton as importNavbarButton } from "./buttons/NavbarButton";
import { DashboardLayout as importDashboardLayout } from "./layouts/DashboardLayout";
import { DashboardNavbar as importDashboardNavbar } from "./navigation/DashboardNavbar";

export const CustomMantineProvider = MantineProvider as (
    props: IProviderProps
) => JSX.Element;

const components = {
    NavbarButton: importNavbarButton,
    AlertBox: importAlertBox,
    DashboardNavbar: importDashboardNavbar,
    NavLink: importNavLink,
    StatsCard: importStatsCard,
    DashboardLayout: importDashboardLayout,
    CountryFlagText: importCountryFlagText,
};

export const NavbarButton = components.NavbarButton;
export const AlertBox = components.AlertBox;
export const DashboardNavbar = components.DashboardNavbar;
export const NavLink = components.NavLink;
export const StatsCard = components.StatsCard;
export const DashboardLayout = components.DashboardLayout;
export const CountryFlagText = components.CountryFlagText;

export * from "@mantine/core";
