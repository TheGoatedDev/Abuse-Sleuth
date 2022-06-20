import { showNotification } from "@mantine/notifications";
import { FiRefreshCw } from "react-icons/fi";

import { Button, Group, Stack, Title } from "@abuse-sleuth/ui";

import DashboardUpdatesTable, {
    Severity,
} from "@components/tables/DashboardUpdatesTable";

const RecentUpdates: React.FC = (props) => {
    return (
        <Stack
            sx={(theme) => ({
                flexGrow: 1,
            })}>
            <Group position="apart" align={"flex-start"}>
                <Title order={3}>Recent Updates</Title>
                <Button
                    leftIcon={<FiRefreshCw size={16} />}
                    color="violet"
                    onClick={() => {
                        showNotification({
                            message: "Refreshing Updates",
                            loading: true,
                            color: "violet",
                        });
                    }}>
                    Refresh
                </Button>
            </Group>
            <DashboardUpdatesTable
                updates={[
                    {
                        severity: Severity.INFO,
                        message:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie commodo quam vel auctor.",
                    },
                    {
                        severity: Severity.CRIT,
                        message:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie commodo quam vel auctor.",
                    },
                    {
                        severity: Severity.WARN,
                        message:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie commodo quam vel auctor.",
                    },
                    {
                        severity: Severity.INFO,
                        message:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus molestie commodo quam vel auctor.",
                    },
                ]}
            />
        </Stack>
    );
};

export default RecentUpdates;
