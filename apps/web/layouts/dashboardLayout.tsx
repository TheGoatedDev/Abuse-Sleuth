import MyNavbar from "@components/nav/dashboard/Navbar";

import { AppShell, Box } from "@mantine/core";

const DashboardLayout: React.FC = (props) => {
    return (
        <AppShell
            sx={(theme) => ({
                height: "100vh",
            })}
            padding={0}
            navbar={<MyNavbar />}>
            <Box
                sx={(theme) => ({
                    marginLeft: "250px",
                })}>
                {props.children}
            </Box>
        </AppShell>
    );
};

export default DashboardLayout;
