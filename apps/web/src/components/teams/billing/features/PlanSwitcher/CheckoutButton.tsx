import Link from "next/link";
import { FC } from "react";

import { trpcClient } from "@abuse-sleuth/trpc/nextjs/client";
import { Button } from "@abuse-sleuth/ui/components/atoms";

import Routes from "@utils/routes";

export const CheckoutButton: FC<{ productId: string; teamId: string }> = ({
    productId,
    teamId,
}) => {
    const getCheckoutSession = trpcClient.stripe.getCheckoutSession.useQuery({
        teamId,
        productId,
        checkout: {
            cancel_url:
                process.env["NEXT_PUBLIC_VERCEL_URL"] ??
                "http://localhost:3000" + Routes.team.view(teamId),
            success_url:
                process.env["NEXT_PUBLIC_VERCEL_URL"] ??
                "http://localhost:3000" + Routes.team.billing(teamId),
        },
    });

    return (
        <Link href={getCheckoutSession.data ?? "#"} passHref>
            <Button component={"a"} loading={getCheckoutSession.isLoading}>
                Switch Plan
            </Button>
        </Link>
    );
};

export default CheckoutButton;
