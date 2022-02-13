import { AppShell } from "@mantine/core";
import CustomNavbar from "@components/shared/navigation/Navbar";

const LayoutDashboard: React.FC = (props) => {
    return (
        <AppShell
            navbar={<CustomNavbar />}
            fixed
            styles={(theme) => ({
                main: {
                    padding: theme.spacing.md,
                },
            })}
        >
            {props.children}
        </AppShell>
    );
};

export default LayoutDashboard;
