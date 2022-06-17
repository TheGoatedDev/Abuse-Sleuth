import React from "react";
import { FaCheckSquare } from "react-icons/fa";
import { Column } from "react-table";

import { Button } from "@abuse-sleuth/ui";

import DataTable from "./DataTable";

interface Plan {
    planName: string;

    dailyIPScans: number | "Pay-as-you-go";
    dailyDomainScans: number | "Pay-as-you-go";

    reportLimit: number | "Unlimited";
    reportRetentionWeeks: number;

    canExport: boolean;

    price: number | "Free" | "Vary";
}

interface PlanInternal {
    planName: string;

    dailyIPScans: number | "Pay-as-you-go";
    dailyDomainScans: number | "Pay-as-you-go";

    reportLimit: number | "Unlimited";
    reportRetentionWeeks: number;

    canExport: any;

    price: string;

    actions: any;
}

const PricingTable: React.FC<{ plans: Plan[] }> = (props) => {
    const columns: Column<PlanInternal>[] = [
        {
            Header: "Plan",
            accessor: "planName",
        },
        {
            Header: "Daily IP Scans",
            accessor: "dailyIPScans",
        },
        {
            Header: "Daily Domain Scans",
            accessor: "dailyDomainScans",
        },
        {
            Header: "Report Limit",
            accessor: "reportLimit",
        },
        {
            Header: "Report Retention (Weeks)",
            accessor: "reportRetentionWeeks",
        },
        {
            Header: "Export",
            accessor: "canExport",
        },
        {
            Header: "Price",
            accessor: "price",
        },
        {
            Header: "Actions",
            accessor: "actions",
        },
    ];

    const plans: PlanInternal[] = props.plans.map((plan) => {
        return {
            planName: plan.planName,

            dailyIPScans: plan.dailyIPScans,
            dailyDomainScans: plan.dailyDomainScans,

            reportLimit: plan.reportLimit,
            reportRetentionWeeks: plan.reportRetentionWeeks,

            canExport: plan.canExport ? <FaCheckSquare /> : "",

            price: plan.price.toLocaleString("en-US", {
                style: "currency",
                currency: "usd",
            }),

            actions:
                plan.planName === "Free" ? (
                    <Button compact color={"violet"}>
                        Register
                    </Button>
                ) : (
                    <Button compact color={"violet"}>
                        Subscribe
                    </Button>
                ),
        };
    });

    return (
        <DataTable<PlanInternal>
            tableProps={{ p: "md" }}
            columns={columns}
            data={plans}
        />
    );
};

export default PricingTable;
