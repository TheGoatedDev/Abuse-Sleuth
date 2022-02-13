import { AppShell } from "@mantine/core";
import CustomNavbar from "@components/shared/navigation/Navbar";

const LayoutDashboard: React.FC = (props) => {
    return (
        <AppShell
            navbar={<CustomNavbar />}
            styles={(theme) => ({
                main: {
                    padding: theme.spacing.md,
                    marginLeft: 300,
                },
            })}
        >
            {props.children}
        </AppShell>
    );
};

export default LayoutDashboard;
