import { Loader, Text } from "@abuse-sleuth/ui";

import StyledLayout from "@components/layouts/StyledLayout";
import { trpc } from "@utils/trpc/reactQueryHooks";

export default function FuckYouAnt() {
    const query = trpc.useQuery(["test", "FUCKYOUANT IN ALL CAPS"], {});

    return (
        <StyledLayout>
            {query.isLoading ? <Loader /> : <Text>{query.data}</Text>}
        </StyledLayout>
    );
}
